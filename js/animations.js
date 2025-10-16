// ===== ADVANCED ANIMATIONS AND INTERACTIONS =====

class AdvancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupParallax();
        this.setupMicroInteractions();
    }

    // Scroll-based animations
    setupScrollAnimations() {
        // Create GSAP-like scroll animations with Intersection Observer
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    animateElement(element) {
        const animationType = element.getAttribute('data-animate');
        
        switch(animationType) {
            case 'fade-up':
                this.fadeUp(element);
                break;
            case 'fade-in':
                this.fadeIn(element);
                break;
            case 'slide-left':
                this.slideLeft(element);
                break;
            case 'slide-right':
                this.slideRight(element);
                break;
            case 'scale':
                this.scaleIn(element);
                break;
        }
    }

    fadeUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeIn(element) {
        element.style.opacity = '0';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease';
            element.style.opacity = '1';
        });
    }

    slideLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    slideRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    // Hover effects
    setupHoverEffects() {
        // Service card hover effects
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCardHover(card);
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }

    enhanceCardHover(card) {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15), 0 0 30px rgba(255,111,161,0.2)';
        
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    }

    resetCardHover(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
        
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
    }

    createRippleEffect(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Remove existing ripples
        const existingRipples = button.querySelectorAll('.ripple');
        existingRipples.forEach(ripple => ripple.remove());
        
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
    }

    // Parallax effects
    setupParallax() {
        const hero = document.querySelector('.hero');
        
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    }

    // Micro-interactions
    setupMicroInteractions() {
        // Social link animations
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.animateSocialLink(link);
            });
        });

        // Form input enhancements
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.enhanceFormInput(input);
            });
            
            input.addEventListener('blur', () => {
                this.resetFormInput(input);
            });
        });
    }

    animateSocialLink(link) {
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        }
    }

    enhanceFormInput(input) {
        input.parentElement.style.transform = 'translateY(-2px)';
    }

    resetFormInput(input) {
        input.parentElement.style.transform = 'translateY(0)';
    }

    // Utility function for staggered animations
    staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * delay);
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedAnimations();
});

// Add CSS for ripple effect
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;

document.head.appendChild(rippleStyles);

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle scroll events for performance
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations here
}, 10));

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedAnimations;
}