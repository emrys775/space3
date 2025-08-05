// Performance and Animation Handler
class PerformanceAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.optimizeImages();
        this.preloadCriticalResources();
        this.setupSmoothScrolling();
        this.addHoverEffects();
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // Optimize images with lazy loading and WebP support
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add lazy loading
            img.loading = 'lazy';
            
            // Add fade-in effect when image loads
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.3s ease';
            });

            // Set initial opacity for smooth loading
            img.style.opacity = '0';
        });
    }

    // Preload critical resources
    preloadCriticalResources() {
        const criticalImages = [
            'assets/PROSOFT logo.png',
            'assets2/hand-holding-smartphone-social-media-concept.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Enhanced smooth scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Add hover effects for interactive elements
    addHoverEffects() {
        // Portfolio items hover effect
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px) scale(1.02)';
                item.style.transition = 'all 0.3s ease';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Service cards hover effect
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                card.style.transition = 'all 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            });
        });

        // Button hover effects
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                btn.style.transition = 'all 0.2s ease';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    }

    // Add staggered animations to lists
    addStaggeredAnimations(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * delay}ms`;
            el.classList.add('animate-fade-in-up');
        });
    }

    // Performance monitoring
    monitorPerformance() {
        // Monitor Core Web Vitals
        if ('web-vitals' in window) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceAnimations();
    
    // Add scroll animations to specific sections
    const animatedSections = document.querySelectorAll('.service-card, .portfolio-item, .feature-item');
    animatedSections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
});

// Service Worker for caching (if supported)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Optimize font loading
if ('fonts' in document) {
    document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
    });
}

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--animation-delay', '0.01ms');
}