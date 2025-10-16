// ===== MAIN WEBSITE FUNCTIONALITY =====

class PersonalShopperWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupSlideshow();
        this.setupAnimations();
        this.setupForms();
        this.setupCounters();
        this.setupSmoothScrolling();
    }

    // Loading Screen
    setupLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.loading-screen').classList.add('loaded');
                setTimeout(() => {
                    document.querySelector('.loading-screen').style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Navigation
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        // Sticky navigation
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Hero Slideshow
    setupSlideshow() {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Auto-advance slides
        setInterval(nextSlide, 5000);

        // Manual slide control (optional)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            } else if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }
        });
    }

    // Animations
    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.service-card, .step, .gallery-item, .contact-method').forEach(el => {
            observer.observe(el);
        });
    }

    // Forms
    setupForms() {
        const consultationForm = document.getElementById('consultation-form');
        
        if (consultationForm) {
            consultationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(consultationForm);
            });
        }

        // Form field animations
        document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('focused');
            });

            field.addEventListener('blur', () => {
                if (!field.value) {
                    field.parentElement.classList.remove('focused');
                }
            });

            // Check initial state
            if (field.value) {
                field.parentElement.classList.add('focused');
            }
        });
    }

    // Form submission handler
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            this.showNotification('Thank you! Your consultation request has been sent successfully.', 'success');
            
            // Reset form
            form.reset();
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('focused');
            });

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Counter animations
    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    }

    // Smooth scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    border-left: 4px solid #FF6FA1;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    max-width: 400px;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                }
                .notification-success { border-left-color: #25D366; }
                .notification-error { border-left-color: #dc3545; }
                .notification-warning { border-left-color: #ffc107; }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex: 1;
                }
                .notification-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.25rem;
                    opacity: 0.7;
                    transition: opacity 0.2s ease;
                }
                .notification-close:hover { opacity: 1; }
                .notification.show { transform: translateX(0); }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });

        // Auto-remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PersonalShopperWebsite();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersonalShopperWebsite;
}