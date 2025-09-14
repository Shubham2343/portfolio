// Vanilla JavaScript 3D Animation System
class Animation3D {
    constructor() {
        this.particles = [];
        this.waves = [];
        this.shapes = [];
        this.floatingElements = [];
        this.isDarkMode = false;
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.createWaves();
        this.createShapes();
        this.createFloatingElements();
        this.setupEventListeners();
        this.startAnimation();
        this.initInteractiveElements();
    }
    
    createParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation duration
            const duration = Math.random() * 20 + 15;
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            // Random color
            const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    createWaves() {
        const container = document.getElementById('waves-container');
        if (!container) return;
        
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'wave';
            
            // Random position
            wave.style.left = Math.random() * 50 - 25 + '%';
            wave.style.top = Math.random() * 50 - 25 + '%';
            
            // Random size
            const size = Math.random() * 100 + 200;
            wave.style.width = size + '%';
            wave.style.height = size + '%';
            
            // Random animation duration
            const duration = Math.random() * 10 + 15;
            wave.style.animationDuration = duration + 's';
            wave.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(wave);
            this.waves.push(wave);
        }
    }
    
    createShapes() {
        const container = document.getElementById('shapes-container');
        if (!container) return;
        
        const shapeTypes = ['circle', 'square', 'triangle'];
        
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            
            shape.className = `geometric-shape ${shapeType}`;
            
            // Random position
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 40 + 20;
            if (shapeType !== 'triangle') {
                shape.style.width = size + 'px';
                shape.style.height = size + 'px';
            }
            
            // Random animation duration
            const duration = Math.random() * 15 + 20;
            shape.style.animationDuration = duration + 's';
            shape.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(shape);
            this.shapes.push(shape);
        }
    }
    
    createFloatingElements() {
        const container = document.getElementById('floating-elements');
        if (!container) return;
        
        for (let i = 0; i < 50; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            // Random position
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 4 + 2;
            element.style.width = size + 'px';
            element.style.height = size + 'px';
            
            // Random animation duration
            const duration = Math.random() * 10 + 15;
            element.style.animationDuration = duration + 's';
            element.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(element);
            this.floatingElements.push(element);
        }
    }
    
    setupEventListeners() {
        // Mouse movement for parallax effect
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        });
        
        // Scroll for parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            // Apply parallax to background elements
            this.particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 0.1;
                particle.style.transform = `translateY(${parallax * speed}px)`;
            });
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    initInteractiveElements() {
        // 3D tilt effect for cards
        const tiltElements = document.querySelectorAll('[data-tilt]');
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.handleTilt(e, element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.resetTilt(element);
            });
        });
        
        // 3D hover effects for service and project cards
        const hoverElements = document.querySelectorAll('[data-3d-hover]');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.enhance3DHover(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.reset3DHover(element);
            });
        });
    }
    
    handleTilt(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    }
    
    resetTilt(element) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    
    enhance3DHover(element) {
        element.style.transform = 'perspective(1000px) rotateX(10deg) rotateY(10deg) translateZ(30px) scale(1.05)';
        element.style.transition = 'transform 0.3s ease';
    }
    
    reset3DHover(element) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    }
    
    startAnimation() {
        const animate = () => {
            this.updateAnimations();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    updateAnimations() {
        // Update particle positions based on mouse movement
        this.particles.forEach((particle, index) => {
            const speed = (index % 5 + 1) * 0.1;
            const x = this.mouseX * speed;
            const y = this.mouseY * speed;
            
            const currentTransform = particle.style.transform || '';
            if (!currentTransform.includes('translate')) {
                particle.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
        
        // Update wave positions
        this.waves.forEach((wave, index) => {
            const speed = (index + 1) * 0.05;
            const x = this.mouseX * speed;
            const y = this.mouseY * speed;
            
            const currentTransform = wave.style.transform || '';
            if (!currentTransform.includes('translate')) {
                wave.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }
    
    updateTheme(isDarkMode) {
        this.isDarkMode = isDarkMode;
        
        // Update particle colors
        this.particles.forEach(particle => {
            const colors = isDarkMode 
                ? ['#4f46e5', '#7c3aed', '#0891b2', '#2563eb']
                : ['#6366f1', '#8b5cf6', '#06b6d4', '#3b82f6'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        });
        
        // Update wave opacity
        this.waves.forEach(wave => {
            wave.style.opacity = isDarkMode ? '0.05' : '0.1';
        });
        
        // Update shape opacity
        this.shapes.forEach(shape => {
            shape.style.opacity = isDarkMode ? '0.05' : '0.1';
        });
    }
    
    handleResize() {
        // Recreate elements if needed
        this.particles.forEach(particle => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize 3D animations when DOM is loaded
let animation3D;

document.addEventListener('DOMContentLoaded', function() {
    animation3D = new Animation3D();
});

// Make updateTheme globally available
window.updateThreeTheme = function(isDarkMode) {
    if (animation3D) {
        animation3D.updateTheme(isDarkMode);
    }
};

// Enhanced scroll animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.trigger3DEffect(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .project-card, .process-step, .info-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax for hero section
            const heroVisual = document.querySelector('.hero-visual');
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${rate}px)`;
            }
            
            // Parallax for floating cards
            const cards = document.querySelectorAll('.floating-cards .card');
            cards.forEach((card, index) => {
                const speed = (index + 1) * 0.1;
                card.style.transform += ` translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    trigger3DEffect(element) {
        // Add 3D entrance effect
        element.style.transform = 'perspective(1000px) rotateX(90deg) translateY(50px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px)';
            element.style.opacity = '1';
        }, 100);
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    new ScrollAnimations();
});

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupRAF();
        this.optimizeAnimations();
    }
    
    setupRAF() {
        // Use requestAnimationFrame for smooth animations
        let ticking = false;
        
        const updateAnimations = () => {
            // Update all animations here
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
        window.addEventListener('resize', requestTick);
    }
    
    optimizeAnimations() {
        // Reduce animation complexity on mobile
        if (window.innerWidth < 768) {
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                if (index % 2 === 0) {
                    particle.style.display = 'none';
                }
            });
        }
    }
}

// Initialize performance optimizer
document.addEventListener('DOMContentLoaded', function() {
    new PerformanceOptimizer();
});
