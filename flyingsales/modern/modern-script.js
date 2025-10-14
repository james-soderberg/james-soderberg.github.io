// Modern Flying Sales Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    checkLoginStatus();
    
    // Initialize login functionality
    initializeLogin();
    
    // Initialize sell tab functionality
    initializeSellTab();
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced status tracking functionality
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            const row = this.closest('.lead-row');
            const phoneNumber = row.querySelector('.phone-number').textContent;
            const status = this.value;
            
            // Store the status in localStorage for persistence
            localStorage.setItem(`modern_status_${phoneNumber}`, status);
            
            // Enhanced visual feedback with modern styling
            if (status === 'sold') {
                row.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 150, 0.1))';
                row.style.borderLeft = '4px solid #00d4ff';
                row.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
            } else if (status === 'maybe') {
                row.style.background = 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1))';
                row.style.borderLeft = '4px solid #ffc107';
                row.style.boxShadow = '0 10px 30px rgba(255, 193, 7, 0.2)';
            } else if (status === 'no') {
                row.style.background = 'linear-gradient(135deg, rgba(255, 0, 150, 0.1), rgba(220, 53, 69, 0.1))';
                row.style.borderLeft = '4px solid #ff0080';
                row.style.boxShadow = '0 10px 30px rgba(255, 0, 150, 0.2)';
            } else {
                row.style.background = '';
                row.style.borderLeft = '';
                row.style.boxShadow = '';
            }
            
            // Show modern notification
            showModernNotification(`Status updated for ${phoneNumber}: ${status}`);
        });
    });

    // Load saved statuses on page load
    loadSavedStatuses();
    
    // Add modern hover effects
    addModernHoverEffects();
    
    // Add parallax effect to hero section
    addParallaxEffect();
});

// Function to load saved statuses from localStorage
function loadSavedStatuses() {
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        const row = select.closest('.lead-row');
        const phoneNumber = row.querySelector('.phone-number').textContent;
        const savedStatus = localStorage.getItem(`modern_status_${phoneNumber}`);
        
        if (savedStatus) {
            select.value = savedStatus;
            
            // Apply visual styling based on saved status
            if (savedStatus === 'sold') {
                row.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 150, 0.1))';
                row.style.borderLeft = '4px solid #00d4ff';
                row.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
            } else if (savedStatus === 'maybe') {
                row.style.background = 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1))';
                row.style.borderLeft = '4px solid #ffc107';
                row.style.boxShadow = '0 10px 30px rgba(255, 193, 7, 0.2)';
            } else if (savedStatus === 'no') {
                row.style.background = 'linear-gradient(135deg, rgba(255, 0, 150, 0.1), rgba(220, 53, 69, 0.1))';
                row.style.borderLeft = '4px solid #ff0080';
                row.style.boxShadow = '0 10px 30px rgba(255, 0, 150, 0.2)';
            }
        }
    });
}

// Function to show modern notifications
function showModernNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.modern-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'modern-notification';
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: linear-gradient(135deg, rgba(0, 212, 255, 0.9), rgba(0, 153, 204, 0.9));
        backdrop-filter: blur(20px);
        color: white;
        padding: 20px 25px;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 212, 255, 0.3);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 0.95rem;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border: 1px solid rgba(0, 212, 255, 0.3);
        max-width: 350px;
    `;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Function to add modern hover effects
function addModernHoverEffects() {
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 30px 80px rgba(0, 212, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Add hover effects to feature cards
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 212, 255, 0.2)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Function to add parallax effect
function addParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroSection && heroVisual) {
            const rate = scrolled * -0.5;
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add modern loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Add entrance animations
        const animatedElements = document.querySelectorAll('.hero-content, .hero-visual, .feature, .step, .option-card');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }, 100);
});

// Add modern scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.step, .option-card, .feature');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
});

// Login and Authentication Functions
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('flyingSalesLoggedIn') === 'true';
    if (isLoggedIn) {
        showAuthenticatedUI();
    }
}

function initializeLogin() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const modal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('login-form');

    // Open modal when login button is clicked
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }

    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple authentication - you can change these credentials
            if (username === 'admin' && password === 'flying123') {
                localStorage.setItem('flyingSalesLoggedIn', 'true');
                modal.style.display = 'none';
                showAuthenticatedUI();
                showModernNotification('Login successful! Welcome to Flying Sales.');
                loginForm.reset();
            } else {
                showModernNotification('Invalid credentials. Please try again.');
            }
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('flyingSalesLoggedIn');
            showUnauthenticatedUI();
            showModernNotification('Logged out successfully.');
        });
    }
}

function showAuthenticatedUI() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const sellTab = document.getElementById('sell-tab');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'block';
    if (sellTab) sellTab.style.display = 'block';
}

function showUnauthenticatedUI() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const sellTab = document.getElementById('sell-tab');
    const sellSection = document.getElementById('sell-section');
    
    if (loginBtn) loginBtn.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (sellTab) sellTab.style.display = 'none';
    if (sellSection) sellSection.style.display = 'none';
}

function initializeSellTab() {
    const sellTab = document.getElementById('sell-tab');
    const sellSection = document.getElementById('sell-section');
    
    if (sellTab) {
        sellTab.addEventListener('click', function(e) {
            e.preventDefault();
            showSellSection();
        });
    }
}

function showSellSection() {
    const sellSection = document.getElementById('sell-section');
    if (sellSection) {
        sellSection.style.display = 'block';
        sellSection.scrollIntoView({ behavior: 'smooth' });
        populateBusinessData();
    }
}

function populateBusinessData() {
    const leadsContainer = document.getElementById('leads-container');
    if (!leadsContainer) return;
    
    // Check if data is already populated
    if (leadsContainer.children.length > 0) return;
    
    // Generate 100 dummy business entries
    const businessData = generateBusinessData();
    
    businessData.forEach((business, index) => {
        const businessRow = document.createElement('div');
        businessRow.className = 'business-row';
        businessRow.innerHTML = `
            <div class="business-name">${business.name}</div>
            <div class="business-phone">${business.phone}</div>
            <div class="business-address">${business.address}</div>
            <div class="status-container">
                <select class="status-dropdown" data-business-id="${index}">
                    <option value="">Select Status</option>
                    <option value="voicemail">Left Voicemail</option>
                    <option value="maybe">Maybe (call back)</option>
                    <option value="sold">Sold</option>
                    <option value="no">No</option>
                </select>
                <input type="email" class="email-input" placeholder="Enter customer email address" data-business-id="${index}">
                <button class="submit-btn" data-business-id="${index}">Submit</button>
            </div>
        `;
        leadsContainer.appendChild(businessRow);
    });
    
    // Add event listeners for status dropdowns
    addStatusDropdownListeners();
    
    // Add event listeners for submit buttons
    addSubmitButtonListeners();
}

function generateBusinessData() {
    const businessNames = [
        'Tech Solutions Inc', 'Digital Marketing Pro', 'Creative Design Studio', 'Business Consulting Group',
        'Innovation Labs', 'Strategic Partners LLC', 'Growth Capital Corp', 'Premier Services Co',
        'Elite Business Solutions', 'Advanced Systems Inc', 'Professional Services Group', 'Excellence Consulting',
        'Dynamic Solutions Ltd', 'Prime Business Group', 'Strategic Innovations', 'Global Enterprises',
        'Premier Consulting', 'Advanced Technologies', 'Business Excellence Inc', 'Strategic Solutions',
        'Innovation Partners', 'Professional Group', 'Elite Services', 'Growth Solutions',
        'Creative Innovations', 'Strategic Business', 'Advanced Consulting', 'Premier Technologies',
        'Excellence Solutions', 'Dynamic Enterprises', 'Professional Innovations', 'Elite Consulting',
        'Growth Technologies', 'Strategic Services', 'Advanced Business', 'Premier Solutions',
        'Innovation Excellence', 'Professional Enterprises', 'Elite Technologies', 'Growth Consulting',
        'Creative Solutions', 'Strategic Innovations', 'Advanced Services', 'Premier Business',
        'Excellence Technologies', 'Dynamic Consulting', 'Professional Solutions', 'Elite Innovations',
        'Growth Enterprises', 'Strategic Technologies', 'Advanced Excellence', 'Premier Consulting',
        'Innovation Services', 'Professional Business', 'Elite Solutions', 'Growth Innovations',
        'Creative Consulting', 'Strategic Excellence', 'Advanced Enterprises', 'Premier Technologies',
        'Excellence Business', 'Dynamic Solutions', 'Professional Innovations', 'Elite Services',
        'Growth Excellence', 'Strategic Consulting', 'Advanced Solutions', 'Premier Innovations',
        'Innovation Business', 'Professional Excellence', 'Elite Technologies', 'Growth Services',
        'Creative Excellence', 'Strategic Solutions', 'Advanced Business', 'Premier Innovations',
        'Excellence Services', 'Dynamic Business', 'Professional Technologies', 'Elite Excellence',
        'Growth Solutions', 'Strategic Business', 'Advanced Excellence', 'Premier Services',
        'Innovation Excellence', 'Professional Solutions', 'Elite Business', 'Growth Technologies',
        'Creative Business', 'Strategic Excellence', 'Advanced Services', 'Premier Solutions',
        'Excellence Innovations', 'Dynamic Excellence', 'Professional Business', 'Elite Solutions',
        'Growth Excellence', 'Strategic Services', 'Advanced Innovations', 'Premier Business',
        'Innovation Solutions', 'Professional Excellence', 'Elite Services', 'Growth Business',
        'Creative Excellence', 'Strategic Business', 'Advanced Solutions', 'Premier Excellence'
    ];
    
    const cities = [
        'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego',
        'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco',
        'Indianapolis', 'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Detroit',
        'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee', 'Albuquerque',
        'Tucson', 'Fresno', 'Sacramento', 'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Colorado Springs',
        'Raleigh', 'Miami', 'Virginia Beach', 'Omaha', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington',
        'Tampa', 'New Orleans', 'Wichita', 'Cleveland', 'Bakersfield', 'Aurora', 'Anaheim', 'Honolulu',
        'Santa Ana', 'Corpus Christi', 'Riverside', 'Lexington', 'Stockton', 'Henderson', 'Saint Paul', 'St. Louis',
        'Milwaukee', 'Columbus', 'Charlotte', 'Fort Worth', 'Seattle', 'Denver', 'Washington', 'Boston',
        'Nashville', 'Baltimore', 'Oklahoma City', 'Portland', 'Las Vegas', 'Louisville', 'Milwaukee', 'Albuquerque',
        'Tucson', 'Fresno', 'Sacramento', 'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Colorado Springs',
        'Raleigh', 'Miami', 'Virginia Beach', 'Omaha', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington',
        'Tampa', 'New Orleans', 'Wichita', 'Cleveland', 'Bakersfield', 'Aurora', 'Anaheim', 'Honolulu'
    ];
    
    const states = [
        'NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA', 'TX', 'FL', 'TX', 'OH', 'NC', 'CA',
        'IN', 'WA', 'CO', 'DC', 'MA', 'TX', 'TN', 'MI', 'OK', 'OR', 'NV', 'TN', 'KY', 'MD', 'WI', 'NM',
        'AZ', 'CA', 'CA', 'AZ', 'MO', 'GA', 'CA', 'CO', 'NC', 'FL', 'VA', 'NE', 'CA', 'MN', 'OK', 'TX',
        'FL', 'LA', 'KS', 'OH', 'CA', 'CO', 'CA', 'HI', 'CA', 'TX', 'CA', 'KY', 'CA', 'NV', 'MN', 'MO',
        'WI', 'OH', 'NC', 'TX', 'WA', 'CO', 'DC', 'MA', 'TN', 'MD', 'OK', 'OR', 'NV', 'KY', 'WI', 'NM',
        'AZ', 'CA', 'CA', 'AZ', 'MO', 'GA', 'CA', 'CO', 'NC', 'FL', 'VA', 'NE', 'CA', 'MN', 'OK', 'TX',
        'FL', 'LA', 'KS', 'OH', 'CA', 'CO', 'CA', 'HI', 'CA', 'TX', 'CA', 'KY', 'CA', 'NV', 'MN', 'MO'
    ];
    
    const businessData = [];
    
    for (let i = 0; i < 100; i++) {
        const name = businessNames[i % businessNames.length];
        const city = cities[i % cities.length];
        const state = states[i % states.length];
        const streetNumber = Math.floor(Math.random() * 9999) + 1;
        const streetNames = ['Main St', 'Oak Ave', 'Pine Rd', 'Cedar Blvd', 'Elm St', 'Maple Ave', 'First St', 'Second Ave', 'Park Rd', 'Center St'];
        const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
        const zipCode = Math.floor(Math.random() * 90000) + 10000;
        
        const phoneAreaCode = Math.floor(Math.random() * 900) + 100;
        const phoneNumber = Math.floor(Math.random() * 9000000) + 1000000;
        const phone = `(${phoneAreaCode}) ${Math.floor(phoneNumber / 10000)}-${phoneNumber % 10000}`;
        
        businessData.push({
            name: name,
            phone: phone,
            address: `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}`
        });
    }
    
    return businessData;
}

function addStatusDropdownListeners() {
    const statusDropdowns = document.querySelectorAll('.status-dropdown');
    const emailInputs = document.querySelectorAll('.email-input');
    
    statusDropdowns.forEach(dropdown => {
        const businessId = dropdown.getAttribute('data-business-id');
        const emailInput = document.querySelector(`.email-input[data-business-id="${businessId}"]`);
        const businessRow = dropdown.closest('.business-row');
        const businessName = businessRow.querySelector('.business-name').textContent;
        
        // Load saved status if exists
        const savedStatus = localStorage.getItem(`business_status_${businessId}`);
        if (savedStatus) {
            dropdown.value = savedStatus;
            if (savedStatus === 'sold') {
                emailInput.classList.add('show');
                const savedEmail = localStorage.getItem(`business_email_${businessId}`);
                if (savedEmail) {
                    emailInput.value = savedEmail;
                }
            }
        }
        
        dropdown.addEventListener('change', function() {
            const status = this.value;
            const businessId = this.getAttribute('data-business-id');
            
            // Save status to localStorage
            localStorage.setItem(`business_status_${businessId}`, status);
            
            // Show/hide email input based on status
            if (status === 'sold') {
                emailInput.classList.add('show');
                emailInput.focus();
            } else {
                emailInput.classList.remove('show');
                emailInput.value = '';
                localStorage.removeItem(`business_email_${businessId}`);
            }
            
            // Apply visual styling based on status
            applyStatusStyling(businessRow, status);
            
            // Show notification
            showModernNotification(`Status updated for ${businessName}: ${getStatusDisplayName(status)}`);
        });
    });
    
    // Add email input listeners
    emailInputs.forEach(emailInput => {
        emailInput.addEventListener('input', function() {
            const businessId = this.getAttribute('data-business-id');
            const email = this.value;
            
            if (email) {
                localStorage.setItem(`business_email_${businessId}`, email);
            } else {
                localStorage.removeItem(`business_email_${businessId}`);
            }
        });
        
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            if (email && !isValidEmail(email)) {
                this.style.borderColor = '#ff0080';
                showModernNotification('Please enter a valid email address');
            } else {
                this.style.borderColor = 'rgba(0, 212, 255, 0.3)';
            }
        });
    });
}

function applyStatusStyling(row, status) {
    // Reset any existing styling
    row.style.background = '';
    row.style.borderLeft = '';
    row.style.boxShadow = '';
    
    switch (status) {
        case 'sold':
            row.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 150, 0.1))';
            row.style.borderLeft = '4px solid #00d4ff';
            row.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
            break;
        case 'maybe':
            row.style.background = 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1))';
            row.style.borderLeft = '4px solid #ffc107';
            row.style.boxShadow = '0 10px 30px rgba(255, 193, 7, 0.2)';
            break;
        case 'voicemail':
            row.style.background = 'linear-gradient(135deg, rgba(108, 117, 125, 0.1), rgba(73, 80, 87, 0.1))';
            row.style.borderLeft = '4px solid #6c757d';
            row.style.boxShadow = '0 10px 30px rgba(108, 117, 125, 0.2)';
            break;
        case 'no':
            row.style.background = 'linear-gradient(135deg, rgba(255, 0, 150, 0.1), rgba(220, 53, 69, 0.1))';
            row.style.borderLeft = '4px solid #ff0080';
            row.style.boxShadow = '0 10px 30px rgba(255, 0, 150, 0.2)';
            break;
    }
}

function getStatusDisplayName(status) {
    switch (status) {
        case 'voicemail': return 'Left Voicemail';
        case 'maybe': return 'Maybe (call back)';
        case 'sold': return 'Sold';
        case 'no': return 'No';
        default: return status;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function addSubmitButtonListeners() {
    const submitButtons = document.querySelectorAll('.submit-btn');
    
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const businessId = this.getAttribute('data-business-id');
            const status = document.querySelector(`.status-dropdown[data-business-id="${businessId}"]`).value;
            const email = document.querySelector(`.email-input[data-business-id="${businessId}"]`).value;
            const businessRow = this.closest('.business-row');
            const businessName = businessRow.querySelector('.business-name').textContent;
            
            if (!status) {
                showModernNotification('Please select a status first.');
                return;
            }
            
            if (status === 'sold' && !email) {
                showModernNotification('Please enter customer email for sold leads.');
                return;
            }
            
            if (status === 'sold' && email && !isValidEmail(email)) {
                showModernNotification('Please enter a valid email address.');
                return;
            }
            
            // Update status on server
            updateLeadStatus(businessId, status, email);
            
            // Apply visual styling based on status
            applyStatusStyling(businessRow, status);
            
            // Show notification
            showModernNotification(`Status updated for ${businessName}: ${getStatusDisplayName(status)}`);
        });
    });
} 