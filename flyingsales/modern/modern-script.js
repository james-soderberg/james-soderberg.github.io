// Modern Flying Sales Website JavaScript
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