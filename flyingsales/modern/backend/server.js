const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Initialize SQLite database
const db = new sqlite3.Database('flying_sales.db');

// Create tables
db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Business leads table
    db.run(`CREATE TABLE IF NOT EXISTS business_leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        business_name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        address TEXT NOT NULL,
        status TEXT DEFAULT '',
        customer_email TEXT DEFAULT '',
        user_id INTEGER,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // Sales notifications table
    db.run(`CREATE TABLE IF NOT EXISTS sales_notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        business_name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        address TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        user_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // Create default admin user
    const hashedPassword = bcrypt.hashSync('flying123', 10);
    db.run(`INSERT OR IGNORE INTO users (username, password, email) VALUES (?, ?, ?)`, 
        ['admin', hashedPassword, 'your-email@example.com']);
});

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail', // Change this to your email service
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Routes

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    });
});

// Get business leads for user
app.get('/api/leads', authenticateToken, (req, res) => {
    db.all('SELECT * FROM business_leads WHERE user_id = ? ORDER BY id', [req.user.id], (err, leads) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(leads);
    });
});

// Update lead status
app.put('/api/leads/:id/status', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { status, customer_email } = req.body;

    const updateQuery = 'UPDATE business_leads SET status = ?, customer_email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?';
    
    db.run(updateQuery, [status, customer_email || '', id, req.user.id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        // If status is 'sold' and email is provided, send notification
        if (status === 'sold' && customer_email) {
            sendSalesNotification(id, req.user.id, customer_email);
        }

        res.json({ success: true });
    });
});

// Import CSV data
app.post('/api/leads/import', authenticateToken, upload.single('csvFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const leads = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const businessName = row['Business Name'] || row['business_name'] || row[0];
            const phoneNumber = row['Phone Number'] || row['phone_number'] || row[1];
            const address = row['Address'] || row['address'] || row[2] || '';

            if (businessName && phoneNumber) {
                leads.push({
                    business_name: businessName,
                    phone_number: phoneNumber,
                    address: address,
                    user_id: req.user.id
                });
            }
        })
        .on('end', () => {
            // Clear existing leads for this user
            db.run('DELETE FROM business_leads WHERE user_id = ?', [req.user.id], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }

                // Insert new leads
                const stmt = db.prepare('INSERT INTO business_leads (business_name, phone_number, address, user_id) VALUES (?, ?, ?, ?)');
                
                leads.forEach(lead => {
                    stmt.run(lead.business_name, lead.phone_number, lead.address, lead.user_id);
                });

                stmt.finalize((err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }

                    // Clean up uploaded file
                    fs.unlinkSync(filePath);

                    res.json({ 
                        success: true, 
                        message: `Successfully imported ${leads.length} leads`,
                        count: leads.length
                    });
                });
            });
        })
        .on('error', (err) => {
            fs.unlinkSync(filePath);
            res.status(500).json({ error: 'Error parsing CSV file' });
        });
});

// Export data
app.get('/api/leads/export', authenticateToken, (req, res) => {
    db.all('SELECT * FROM business_leads WHERE user_id = ? ORDER BY id', [req.user.id], (err, leads) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        // Convert to CSV
        const csvHeader = 'Business Name,Phone Number,Address,Status,Customer Email\n';
        const csvData = leads.map(lead => 
            `"${lead.business_name}","${lead.phone_number}","${lead.address}","${lead.status}","${lead.customer_email || ''}"`
        ).join('\n');

        const csvContent = csvHeader + csvData;

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="flying-sales-data-${new Date().toISOString().split('T')[0]}.csv"`);
        res.send(csvContent);
    });
});

// Get sales notifications (for admin)
app.get('/api/notifications', authenticateToken, (req, res) => {
    db.all(`
        SELECT sn.*, u.username, u.email as user_email 
        FROM sales_notifications sn 
        JOIN users u ON sn.user_id = u.id 
        ORDER BY sn.created_at DESC
    `, (err, notifications) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(notifications);
    });
});

// Function to send sales notification email
function sendSalesNotification(leadId, userId, customerEmail) {
    // Get lead details
    db.get('SELECT * FROM business_leads WHERE id = ? AND user_id = ?', [leadId, userId], (err, lead) => {
        if (err || !lead) return;

        // Get user details
        db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
            if (err || !user) return;

            // Save notification to database
            db.run(`
                INSERT INTO sales_notifications (business_name, phone_number, address, customer_email, user_id)
                VALUES (?, ?, ?, ?, ?)
            `, [lead.business_name, lead.phone_number, lead.address, customerEmail, userId]);

            // Send email notification
            const mailOptions = {
                from: process.env.EMAIL_USER || 'your-email@gmail.com',
                to: user.email, // Your email address
                subject: `🎉 New Sale! - ${lead.business_name}`,
                html: `
                    <h2>🎉 New Sale Notification</h2>
                    <p><strong>Sales Rep:</strong> ${user.username}</p>
                    <p><strong>Business:</strong> ${lead.business_name}</p>
                    <p><strong>Phone:</strong> ${lead.phone_number}</p>
                    <p><strong>Address:</strong> ${lead.address}</p>
                    <p><strong>Customer Email:</strong> ${customerEmail}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                    
                    <hr>
                    <p><em>This is an automated notification from Flying Sales Lead Management System.</em></p>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        });
    });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Flying Sales Backend is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Flying Sales Backend running on port ${PORT}`);
    console.log(`📧 Email notifications will be sent to: ${process.env.EMAIL_USER || 'your-email@gmail.com'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('✅ Database connection closed');
        }
        process.exit(0);
    });
});
