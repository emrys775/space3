// Smooth scrolling for navigation links
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

// Chart.js configuration for analytics dashboard
function initializeCharts() {
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Website Performance',
                    data: [65, 78, 85, 92, 88, 95],
                    borderColor: '#fa4905',
                    backgroundColor: 'rgba(250, 73, 5, 0.1)',
                    pointBackgroundColor: '#fa4905',
                    pointBorderColor: '#fa4905',
                    tension: 0.4
                }, {
                    label: 'User Engagement',
                    data: [45, 62, 70, 75, 82, 89],
                    borderColor: '#b03200',
                    backgroundColor: 'rgba(176, 50, 0, 0.1)',
                    pointBackgroundColor: '#b03200',
                    pointBorderColor: '#b03200',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// Initialize charts when page loads
window.addEventListener('load', () => {
    if (typeof Chart !== 'undefined') {
        initializeCharts();
    }
});

// Hero image slideshow
const heroImages = [
    "assets2/hand-holding-smartphone-social-media-concept.jpg",
    "assets2/pexels-cottonbro-6565761.jpg",
    "assets2/pexels-pavel-danilyuk-7653099.jpg",
    "assets2/pexels-planeteelevene-31861814.jpg",
    "assets2/pexels-shutter-click-1079538113-27998876.jpg",
    "assets2/top-view-unrecognizable-hacker-performing-cyberattack-night.jpg"
];

let currentImageIndex = 0;

function changeHeroImage() {
    const slideshowImage = document.getElementById("slideshow-image");
    const heroSection = document.querySelector('.hero');
    
    if (slideshowImage && heroSection) {
        // Fade out current image
        slideshowImage.classList.remove('active');
        
        setTimeout(() => {
            // Change to next image
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            slideshowImage.src = heroImages[currentImageIndex];
            slideshowImage.alt = `Professional technology image ${currentImageIndex + 1}`;
            
            // Update background image to match current slideshow image
            const heroBackground = heroSection.querySelector('::before') || heroSection;
            heroSection.style.setProperty('--bg-image', `url('${heroImages[currentImageIndex]}')`);
            
            // Fade in new image
            slideshowImage.classList.add('active');
        }, 500); // Half of the transition duration
    }
}

// Initialize hero background on page load
function initializeHeroBackground() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.setProperty('--bg-image', `url('${heroImages[currentImageIndex]}')`);
    }
}

// Start slideshow after page loads
setTimeout(() => {
    initializeHeroBackground();
    setInterval(changeHeroImage, 3000); // Change every 3 seconds
}, 1000); // Wait 1 second before starting

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 22, 40, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 22, 40, 0.95)';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.about-card, .service-card, .feature, .portfolio-item, .blog-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            // Simulate form submission
            const button = newsletterForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.style.background = '#b03200';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#fa4905';
                newsletterForm.querySelector('input[type="email"]').value = '';
            }, 2000);
        }
    });
}

// CTA button interactions
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Simulate action based on button text
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes('see our work') || buttonText.includes('portfolio')) {
            document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
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
    
    .modal {
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        background-color: #0f1d2e;
        margin: 15% auto;
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        width: 90%;
        max-width: 500px;
        color: #ffffff;
        text-align: center;
    }
    
    .modal-content h3 {
        color: #fa4905;
        margin-bottom: 1rem;
    }
    
    .close {
        color: #b0b0b0;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        line-height: 1;
    }
    
    .close:hover {
        color: #fa4905;
    }
    
    .nav-menu.active {
        display: flex;
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        height: calc(100vh - 80px);
        background: rgba(10, 22, 40, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        gap: 2rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Modal functionality
function showModal(title, message) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });
    
    // Auto close after 3 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.style.display = 'none';
            modal.remove();
        }
    }, 3000);
}

// Main contact form functionality
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.contact-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        if (response.ok) {
            // Show success message
            const subject = formData.get('subject');
            let successMessage = 'Thank you for your message! We will get back to you within 24 hours.';
            
            if (subject === 'consultation') {
                successMessage = 'Thank you for requesting a consultation! Our team will contact you within 24 hours to schedule your free consultation.';
            } else if (subject === 'quote') {
                successMessage = 'Thank you for your quote request! We will review your requirements and send you a detailed proposal within 48 hours.';
            }
            
            showModal('Message Sent Successfully', successMessage);
            
            // Reset form
            form.reset();
            
            // Show success toast
            showToast('Message sent successfully!', 'success');
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show error message
        showModal('Submission Error', 'There was an error sending your message. Please try again or contact us directly.');
        showToast('Failed to send message. Please try again.', 'error');
        console.error('Form submission error:', error);
    });
}

// Function to set contact form subject when CTA buttons are clicked
function setContactSubject(subject) {
    // Wait for the page to scroll to contact section
    setTimeout(() => {
        const subjectSelect = document.getElementById('contactSubject');
        if (subjectSelect) {
            subjectSelect.value = subject;
        }
    }, 800); // Wait for smooth scroll to complete
}



// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ''), 50);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
});

// Observe counter elements
document.querySelectorAll('[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add loading states to buttons
function addLoadingState(button, duration = 2000) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    }, duration);
}

// Enhanced form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add form validation to newsletter
const emailInput = document.querySelector('.newsletter-form input[type="email"]');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value;
        if (email && !validateEmail(email)) {
            emailInput.style.borderColor = '#ff4444';
            showToast('Please enter a valid email address', 'error');
        } else {
            emailInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    const toastStyles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: '#ffffff',
        fontWeight: '500',
        zIndex: '10001',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    };
    
    Object.assign(toast.style, toastStyles);
    
    if (type === 'error') {
        toast.style.background = '#ff4444';
    } else if (type === 'success') {
        toast.style.background = '#fa4905';
        toast.style.color = '#0a1628';
    } else {
        toast.style.background = '#1a2f4a';
    }
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Contact form functionality
function openContactForm(type) {
    const modal = document.getElementById('contactFormModal');
    const formTitle = document.getElementById('formTitle');
    
    if (type === 'consultation') {
        formTitle.textContent = 'Book Consultation';
    } else if (type === 'quote') {
        formTitle.textContent = 'Request Quote';
    } else {
        formTitle.textContent = 'Contact Us';
    }
    
    modal.style.display = 'block';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    // Close when clicking outside the modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formTitle = document.getElementById('formTitle').textContent;
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Close the modal
        document.getElementById('contactFormModal').style.display = 'none';
        
        // Show success message
        let successMessage;
        if (formTitle.includes('Consultation')) {
            successMessage = 'Thank you for booking a consultation! We will contact you within 24 hours to schedule your free consultation.';
        } else if (formTitle.includes('Quote')) {
            successMessage = 'Thank you for your quote request! Our team will review your requirements and send you a detailed quote within 2 business days.';
        } else {
            successMessage = 'Thank you for reaching out! We will get back to you soon.';
        }
        
        showModal('Success', successMessage);
        
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Blog Sidebar Widget Loader
function loadBlogSidebar() {
    const blogLayout = document.querySelector('.blog-layout');
    if (blogLayout && !document.querySelector('.blog-sidebar')) {
        fetch('sidebar-widget.html')
            .then(response => response.text())
            .then(html => {
                blogLayout.insertAdjacentHTML('beforeend', html);
            })
            .catch(error => {
                console.log('Sidebar widget not found, using inline sidebar');
            });
    }
}

// Load sidebar on blog pages
if (document.querySelector('.blog-layout')) {
    loadBlogSidebar();
}

// FAQ Toggle Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts if Chart.js is available
    if (typeof Chart !== 'undefined') {
        initializeCharts();
    }
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize other components
    console.log('Prosoft Digital Space website loaded successfully!');
});