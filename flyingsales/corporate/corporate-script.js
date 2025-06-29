// Corporate Flying Sales Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
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

    // Professional status tracking functionality
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            const row = this.closest('.lead-row');
            const phoneNumber = row.querySelector('.phone-number').textContent;
            const status = this.value;
            
            // Store the status in localStorage for persistence
            localStorage.setItem(`corporate_status_${phoneNumber}`, status);
            
            // Professional visual feedback
            if (status === 'sold') {
                row.style.background = 'linear-gradient(135deg, rgba(44, 90, 160, 0.05), rgba(76, 175, 80, 0.05))';
                row.style.borderLeft = '4px solid #2c5aa0';
                row.style.boxShadow = '0 5px 15px rgba(44, 90, 160, 0.1)';
            } else if (status === 'maybe') {
                row.style.background = 'linear-gradient(135deg, rgba(255, 193, 7, 0.05), rgba(255, 152, 0, 0.05))';
                row.style.borderLeft = '4px solid #ffc107';
                row.style.boxShadow = '0 5px 15px rgba(255, 193, 7, 0.1)';
            } else if (status === 'no') {
                row.style.background = 'linear-gradient(135deg, rgba(244, 67, 54, 0.05), rgba(229, 57, 53, 0.05))';
                row.style.borderLeft = '4px solid #f44336';
                row.style.boxShadow = '0 5px 15px rgba(244, 67, 54, 0.1)';
            } else {
                row.style.background = '';
                row.style.borderLeft = '';
                row.style.boxShadow = '';
            }
            
            // Show professional notification
            showCorporateNotification(`Status updated for ${phoneNumber}: ${status}`);
        });
    });

    // Load saved statuses on page load
    loadSavedStatuses();
    
    // Add professional hover effects
    addCorporateHoverEffects();
    
    // Add subtle scroll animations
    addScrollAnimations();
});

// Function to load saved statuses from localStorage
function loadSavedStatuses() {
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        const row = select.closest('.lead-row');
        const phoneNumber = row.querySelector('.phone-number').textContent;
        const savedStatus = localStorage.getItem(`corporate_status_${phoneNumber}`);
        
        if (savedStatus) {
            select.value = savedStatus;
            
            // Apply visual styling based on saved status
            if (savedStatus === 'sold') {
                row.style.background = 'linear-gradient(135deg, rgba(44, 90, 160, 0.05), rgba(76, 175, 80, 0.05))';
                row.style.borderLeft = '4px solid #2c5aa0';
                row.style.boxShadow = '0 5px 15px rgba(44, 90, 160, 0.1)';
            } else if (savedStatus === 'maybe') {
                row.style.background = 'linear-gradient(135deg, rgba(255, 193, 7, 0.05), rgba(255, 152, 0, 0.05))';
                row.style.borderLeft = '4px solid #ffc107';
                row.style.boxShadow = '0 5px 15px rgba(255, 193, 7, 0.1)';
            } else if (savedStatus === 'no') {
                row.style.background = 'linear-gradient(135deg, rgba(244, 67, 54, 0.05), rgba(229, 57, 53, 0.05))';
                row.style.borderLeft = '4px solid #f44336';
                row.style.boxShadow = '0 5px 15px rgba(244, 67, 54, 0.1)';
            }
        }
    });
}

// Function to show professional notifications
function showCorporateNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.corporate-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'corporate-notification';
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: #ffffff;
        color: #1a1a1a;
        padding: 20px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 0.95rem;
        transform: translateX(100%) scale(0.9);
        transition: all 0.3s ease;
        border: 1px solid #e5e5e5;
        max-width: 350px;
        border-left: 4px solid #2c5aa0;
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
        notification.style.transform = 'translateX(100%) scale(0.9)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Function to add professional hover effects
function addCorporateHoverEffects() {
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Add hover effects to feature cards
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Add hover effects to step cards
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
}

// Function to add subtle scroll animations
function addScrollAnimations() {
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
    const elementsToAnimate = document.querySelectorAll('.step, .option-card, .feature');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Add professional loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Add entrance animations
        const animatedElements = document.querySelectorAll('.hero-content, .hero-stats, .feature, .step, .option-card');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }, 100);
});

// Add professional navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}); 