// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initFAQ();
    initSmoothScrolling();
    initFormValidation();
    initProjectTracking();
    initAnimations();
    initResumeButton();
    initSuccessAnimation();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update icon
        updateThemeIcon(isDark);
        
        // Update 3D background theme
        if (window.updateThreeTheme) {
            window.updateThreeTheme(isDark);
        }
    });
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (isDark) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = this.querySelector('input[name="name"]');
            const email = this.querySelector('input[name="email"]');
            const message = this.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            // Clear previous errors
            clearFormErrors();
            
            // Validate name
            if (!name.value.trim()) {
                showFieldError(name, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showFieldError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showFieldError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showFieldError(message, 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showFieldError(message, 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
}

function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach(error => error.remove());
    
    const fields = document.querySelectorAll('.form-group input, .form-group textarea');
    fields.forEach(field => {
        field.style.borderColor = '';
    });
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Project Tracking
function initProjectTracking() {
    const projectCards = document.querySelectorAll('.project-card[data-project]');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectName = this.getAttribute('data-project');
            trackProjectView(projectName);
        });
    });
}

function trackProjectView(projectName) {
    // Send tracking data to server
    fetch(`/track-project/${projectName}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Project view tracked:', data);
    })
    .catch(error => {
        console.error('Error tracking project view:', error);
    });
}

function getCSRFToken() {
    const token = document.querySelector('[name=csrfmiddlewaretoken]');
    return token ? token.value : '';
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .project-card, .process-step, .info-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .project-card, .process-step, .info-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .service-card.animate-in, .project-card.animate-in, 
        .process-step.animate-in, .info-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(1) { transition-delay: 0.1s; }
        .service-card:nth-child(2) { transition-delay: 0.2s; }
        .service-card:nth-child(3) { transition-delay: 0.3s; }
        .service-card:nth-child(4) { transition-delay: 0.4s; }
        .service-card:nth-child(5) { transition-delay: 0.5s; }
        
        .project-card:nth-child(1) { transition-delay: 0.1s; }
        .project-card:nth-child(2) { transition-delay: 0.2s; }
        .project-card:nth-child(3) { transition-delay: 0.3s; }
        .project-card:nth-child(4) { transition-delay: 0.4s; }
        .project-card:nth-child(5) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Navbar scroll effect
window.addEventListener('scroll', debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        if (document.body.classList.contains('dark-mode')) {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        if (document.body.classList.contains('dark-mode')) {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    }
}, 10));

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// Resume Button Functionality
function initResumeButton() {
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Open resume PDF in new tab
            window.open('/static/documents/resumewithPythonNEW.pdf', '_blank');
        });
    }
}

// Success Animation Functionality
function initSuccessAnimation() {
    // Check if we're on the contact page and if there's a success message
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    
    if (success === 'true') {
        showSuccessAnimation();
    }
}

function showSuccessAnimation() {
    const successAnimation = document.getElementById('success-animation');
    if (successAnimation) {
        successAnimation.classList.remove('hidden');
        successAnimation.classList.add('show');
        
        // Create confetti pieces
        createConfetti();
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideSuccessAnimation();
        }, 5000);
    }
}

function hideSuccessAnimation() {
    const successAnimation = document.getElementById('success-animation');
    if (successAnimation) {
        successAnimation.classList.remove('show');
        setTimeout(() => {
            successAnimation.classList.add('hidden');
        }, 300);
    }
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    if (!confettiContainer) return;
    
    // Clear existing confetti
    confettiContainer.innerHTML = '';
    
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        
        // Random position
        piece.style.left = Math.random() * 100 + '%';
        
        // Random delay
        piece.style.animationDelay = Math.random() * 3 + 's';
        
        // Random size
        const size = Math.random() * 8 + 6;
        piece.style.width = size + 'px';
        piece.style.height = size + 'px';
        
        confettiContainer.appendChild(piece);
    }
}

// Enhanced form submission with success animation
function enhanceContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let the form submit normally, but prepare for success animation
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            }
        });
    }
}

// Initialize enhanced contact form
document.addEventListener('DOMContentLoaded', function() {
    enhanceContactForm();
});

