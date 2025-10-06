// Enhanced JavaScript for Personal Shopper Website
document.addEventListener('DOMContentLoaded', function() {
    // QR Code Generation
    new QRCode(document.getElementById("qrcode"), {
        text: "https://wa.me/message/WPWII6NUPSVHM1",
        width: 200,
        height: 200,
        colorDark: "#FF6FA1",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Enhanced Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Fade in animation for sections on scroll
    const fadeElements = document.querySelectorAll('.section, .service-card, .step');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Initial check
    fadeInOnScroll();
    
    // Check on scroll with throttle
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                fadeInOnScroll();
            }, 100);
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.pageX - button.offsetLeft;
            const y = e.pageY - button.offsetTop;
            
            button.style.setProperty('--x', x + 'px');
            button.style.setProperty('--y', y + 'px');
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
        });
    });

    // Statistics counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.hero-stats');
    
    const animateStats = function() {
        const statsTop = statsSection.getBoundingClientRect().top;
        const statsVisible = 150;
        
        if (statsTop < window.innerHeight - statsVisible) {
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
                }, 30);
            });
            
            // Remove event listener after animation
            window.removeEventListener('scroll', animateStats);
        }
    };
    
    window.addEventListener('scroll', animateStats);

    // Service card interaction enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add CSS variables for dynamic effects
    document.documentElement.style.setProperty('--pink', '#FF6FA1');
    document.documentElement.style.setProperty('--gold', '#D4AF37');
});

// Add some global styles for enhanced effects
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .btn::after {
        content: '';
        position: absolute;
        top: var(--y, 50%);
        left: var(--x, 50%);
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }
    
    .btn:hover::after {
        width: 300px;
        height: 300px;
    }
    
    body.loaded .hero-content {
        animation: fadeInUp 1s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .floating-element {
        transition: transform 0.3s ease-out;
    }
`;
document.head.appendChild(style);