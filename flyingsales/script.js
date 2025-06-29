// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
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

    // Status tracking functionality
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            const row = this.closest('.lead-row');
            const phoneNumber = row.querySelector('.phone-number').textContent;
            const status = this.value;
            
            // Store the status in localStorage for persistence
            localStorage.setItem(`status_${phoneNumber}`, status);
            
            // Visual feedback
            if (status === 'sold') {
                row.style.backgroundColor = '#d4edda';
                row.style.borderLeft = '4px solid #28a745';
            } else if (status === 'maybe') {
                row.style.backgroundColor = '#fff3cd';
                row.style.borderLeft = '4px solid #ffc107';
            } else if (status === 'no') {
                row.style.backgroundColor = '#f8d7da';
                row.style.borderLeft = '4px solid #dc3545';
            } else {
                row.style.backgroundColor = '';
                row.style.borderLeft = '';
            }
            
            // Show success message
            showNotification(`Status updated for ${phoneNumber}: ${status}`);
        });
    });

    // Load saved statuses on page load
    loadSavedStatuses();
});

// Function to load saved statuses from localStorage
function loadSavedStatuses() {
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        const row = select.closest('.lead-row');
        const phoneNumber = row.querySelector('.phone-number').textContent;
        const savedStatus = localStorage.getItem(`status_${phoneNumber}`);
        
        if (savedStatus) {
            select.value = savedStatus;
            
            // Apply visual styling based on saved status
            if (savedStatus === 'sold') {
                row.style.backgroundColor = '#d4edda';
                row.style.borderLeft = '4px solid #28a745';
            } else if (savedStatus === 'maybe') {
                row.style.backgroundColor = '#fff3cd';
                row.style.borderLeft = '4px solid #ffc107';
            } else if (savedStatus === 'no') {
                row.style.backgroundColor = '#f8d7da';
                row.style.borderLeft = '4px solid #dc3545';
            }
        }
    });
}

// Function to show notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add hover effects for option cards
document.addEventListener('DOMContentLoaded', function() {
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation for page transitions
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 