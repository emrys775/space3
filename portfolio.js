// Portfolio data with different categories
const portfolioData = {
    // Management Systems for Web Development
    webDevelopment: [
        {
            id: 1,
            name: "School Management System",
            description: "A digital platform to manage all school operations from admissions to results.",
            detailedDescription: "Comprehensive school management solution that streamlines all educational operations. Features include student information management, examination systems, attendance tracking, fee management, timetable scheduling, e-learning modules, automated report card generation, and SMS alert systems for parents and staff.",
            targetUsers: ["Private Schools", "Public Schools", "Colleges", "Training Centers", "Educational Institutions"],
            keyFeatures: ["Student Information System", "Examination Management", "Attendance Tracking", "Fee Management", "Timetable Scheduling", "E-learning Platform", "Report Card Generation", "SMS Alerts", "Parent Portal"],
            subscriptionFee: "GHS 250 – GHS 500 per month",
            extraInfo: "Includes mobile app and parent portal for enhanced value and accessibility",
            scalability: 5,
            category: "Web Development",
            icon: "fas fa-graduation-cap",
            color: "#4CAF50",
            image: "web dev/prosoft img (1).jpg"
        },
        {
            id: 2,
            name: "Church Management System",
            description: "Helps churches manage members, donations, events, and communication with ease.",
            detailedDescription: "Complete church administration platform designed to strengthen community connections and streamline operations. Manages member databases, tracks donations and tithes, organizes events and services, maintains sermon archives, facilitates group communications, and provides comprehensive reporting for church leadership.",
            targetUsers: ["Churches", "Ministries", "Christian NGOs", "Religious Organizations", "Faith Communities"],
            keyFeatures: ["Member Database", "Donation Tracking", "Event Management", "Sermon Archive", "SMS/Email Communication", "Group Management", "Financial Reports", "Volunteer Coordination"],
            subscriptionFee: "GHS 150 – GHS 300 per month",
            extraInfo: "Optional mobile app and USSD integration for enhanced member engagement",
            scalability: 4,
            category: "Web Development",
            icon: "fas fa-church",
            color: "#9C27B0",
            image: "web dev/prosoft img (12).jpg"
        },
        {
            id: 3,
            name: "Hospital Management System",
            description: "Streamlines clinic/hospital operations including patient care and billing.",
            detailedDescription: "Advanced healthcare management solution that digitizes hospital operations for improved patient care and operational efficiency. Includes patient record management, appointment scheduling, billing systems, laboratory result tracking, pharmacy management, and staff coordination tools.",
            targetUsers: ["Clinics", "Hospitals", "Health Centers", "Medical Practices", "Healthcare Facilities"],
            keyFeatures: ["Patient Records", "Appointment Scheduling", "Billing System", "Lab Results Management", "Pharmacy Integration", "Staff Management", "Insurance Integration", "Medical Reports"],
            subscriptionFee: "GHS 400 – GHS 900 per month",
            extraInfo: "Can integrate with insurance systems and Ministry of Health platforms",
            scalability: 5,
            category: "Web Development",
            icon: "fas fa-hospital",
            color: "#F44336",
            image: "web dev/prosoft img (10).jpg"
        },
        {
            id: 4,
            name: "Business Management System (ERP Lite)",
            description: "All-in-one tool to manage your business operations from sales to HR.",
            detailedDescription: "Comprehensive business management solution designed for SMEs and startups. Integrates sales management, inventory control, human resources, payroll processing, customer relationship management, and detailed reporting in one unified platform for streamlined business operations.",
            targetUsers: ["SMEs", "Startups", "Agencies", "Distributors", "Growing Businesses"],
            keyFeatures: ["Sales Management", "Inventory Control", "HR Management", "Payroll Processing", "CRM Integration", "Financial Reports", "Dashboard Analytics", "Multi-user Access"],
            subscriptionFee: "GHS 300 – GHS 700 per month",
            extraInfo: "Optional POS module available for retail businesses",
            scalability: 5,
            category: "Web Development",
            icon: "fas fa-briefcase",
            color: "#2196F3",
            image: "web dev/prosoft img (3).jpg"
        },
        {
            id: 5,
            name: "Property Management System",
            description: "Helps landlords and real estate firms manage tenants, rent, and maintenance.",
            detailedDescription: "Professional property management solution for real estate professionals and landlords. Features tenant record management, rent tracking and collection, automated invoicing, maintenance request logging, lease document management, and comprehensive property portfolio oversight.",
            targetUsers: ["Real Estate Companies", "Property Agents", "Landlords", "Property Managers", "Real Estate Investors"],
            keyFeatures: ["Tenant Records", "Rent Tracking", "Automated Invoicing", "Maintenance Logs", "Lease Management", "Property Portfolio", "Payment Tracking", "Tenant Communication"],
            subscriptionFee: "GHS 250 – GHS 600 per month",
            extraInfo: "Includes tenant portal and mobile alert notifications",
            scalability: 4,
            category: "Web Development",
            icon: "fas fa-building",
            color: "#FF9800",
            image: "web dev/prosoft img (2).jpg"
        },
        {
            id: 6,
            name: "Farm Management System",
            description: "A smart dashboard to manage crops, staff, and financials across farms.",
            detailedDescription: "Intelligent agricultural management platform designed for modern farming operations. Includes land mapping, crop tracking and monitoring, staff management, payroll processing, input usage tracking, yield analysis, and comprehensive financial reporting for data-driven farming decisions.",
            targetUsers: ["Agribusinesses", "Commercial Farms", "Agricultural Cooperatives", "Farm Managers", "Agricultural Enterprises"],
            keyFeatures: ["Land Mapping", "Crop Tracking", "Staff Management", "Payroll System", "Input Usage Monitoring", "Yield Analysis", "Financial Reports", "Weather Integration"],
            subscriptionFee: "GHS 350 – GHS 800 per month",
            extraInfo: "GPS integration, weather data, and mobile app for field operations",
            scalability: 4,
            category: "Web Development",
            icon: "fas fa-seedling",
            color: "#4CAF50",
            image: "web dev/prosoft img (8).jpg"
        },
        {
            id: 7,
            name: "Livestock Management System",
            description: "Tracks animal records, breeding, health, feeding, and sales in livestock farms.",
            detailedDescription: "Specialized livestock management solution for animal farming operations. Maintains detailed animal profiles, tracks breeding programs, monitors health and medication schedules, logs feeding patterns, manages sales transactions, and provides comprehensive livestock inventory reports.",
            targetUsers: ["Poultry Farms", "Cattle Ranches", "Fish Farms", "Livestock Ranches", "Animal Husbandry Operations"],
            keyFeatures: ["Animal Profiles", "Breeding Management", "Health Monitoring", "Medication Tracking", "Feeding Logs", "Sales Tracking", "Inventory Reports", "Performance Analytics"],
            subscriptionFee: "GHS 300 – GHS 750 per month",
            extraInfo: "Barcode tagging system and detailed livestock inventory reporting",
            scalability: 4,
            category: "Web Development",
            icon: "fas fa-cow",
            color: "#795548",
            image: "web dev/prosoft img (5).jpg"
        },
        {
            id: 8,
            name: "Gym & Fitness Management System",
            description: "Helps gyms manage members, subscriptions, trainers, and schedules.",
            detailedDescription: "Complete fitness center management platform that streamlines gym operations. Features membership management, attendance tracking, subscription billing, trainer scheduling, class bookings, payment processing, and member progress tracking for enhanced fitness facility management.",
            targetUsers: ["Gyms", "Fitness Centers", "Wellness Clubs", "Personal Trainers", "Sports Facilities"],
            keyFeatures: ["Membership Management", "Attendance Tracking", "Subscription Billing", "Trainer Schedules", "Class Bookings", "Payment Processing", "Member Progress", "Equipment Management"],
            subscriptionFee: "GHS 200 – GHS 450 per month",
            extraInfo: "Mobile check-in system and personalized workout plan modules",
            scalability: 4,
            category: "Web Development",
            icon: "fas fa-dumbbell",
            color: "#E91E63",
            image: "web dev/prosoft img (7).jpg"
        },
        {
            id: 9,
            name: "Restaurant Management System",
            description: "Manages orders, tables, menu, kitchen, billing, and delivery efficiently.",
            detailedDescription: "Comprehensive restaurant operations platform that digitizes food service management. Includes POS system, order management, table reservations, kitchen display systems, inventory tracking, billing automation, and delivery coordination for seamless restaurant operations.",
            targetUsers: ["Restaurants", "Cafés", "Bars", "Food Trucks", "Catering Services"],
            keyFeatures: ["POS System", "Order Management", "Table Reservations", "Kitchen Display", "Inventory Tracking", "Billing Automation", "Delivery Coordination", "Menu Management"],
            subscriptionFee: "GHS 250 – GHS 600 per month",
            extraInfo: "Mobile menu, delivery integration, and QR code ordering system",
            scalability: 4,
            category: "Web Development",
            icon: "fas fa-utensils",
            color: "#FF5722",
            image: "web dev/prosoft img (6).jpg"
        },
        {
            id: 10,
            name: "Hotel/Property Booking System",
            description: "A complete hotel front desk and guest experience management platform.",
            detailedDescription: "Advanced hospitality management system for hotels and accommodation providers. Features room booking management, guest check-in/check-out, billing systems, housekeeping coordination, guest services, and comprehensive reporting for optimal hotel operations and guest satisfaction.",
            targetUsers: ["Hotels", "Resorts", "Hostels", "Airbnb Hosts", "Hospitality Businesses"],
            keyFeatures: ["Room Booking", "Guest Check-in/out", "Billing System", "Housekeeping Management", "Guest Services", "Reporting Dashboard", "Rate Management", "Guest Communication"],
            subscriptionFee: "GHS 350 – GHS 900 per month",
            extraInfo: "Integration with online travel agencies (OTAs) like Booking.com",
            scalability: 5,
            category: "Web Development",
            icon: "fas fa-bed",
            color: "#3F51B5",
            image: "web dev/prosoft img 13.jpg"
        }
    ],
    
    // Branding & Print projects
    branding: [
        {
            id: 4,
            name: "AFA Brand Identity Package",
            description: "Complete brand identity design for AFA organization",
            detailedDescription: "Comprehensive branding project including logo design, brand guidelines, merchandise design, and marketing materials. Created a modern, professional identity that reflects the organization's values and mission. The project included extensive research, concept development, and final implementation across multiple touchpoints.",
            category: "Branding & Print",
            image: "Branding/AFA LOGO PNG FORMAT.png",
            images: [
                "Branding/AFA LOGO PNG FORMAT.png",
                "Branding/AFA PEN MOCKUP 2 JPEG.jpg",
                "Branding/AFA TSHIRT MOCKUP 1 JPEG.jpg"
            ],
            type: "Brand Identity",
            client: "AFA Organization",
            year: "2024",
            services: ["Logo Design", "Brand Guidelines", "Merchandise Design", "Marketing Materials"]
        },
        {
            id: 5,
            name: "Food Diary App Branding",
            description: "Mobile app branding and UI design mockups",
            detailedDescription: "Created comprehensive branding for a food diary mobile application including logo design, color scheme, typography selection, and UI mockups. Designed for modern, health-conscious users with focus on clean, intuitive interface that encourages daily use and healthy eating habits.",
            category: "Branding & Print",
            image: "Branding/FOOD DIARY MOCKUP PRE DESIGN.jpg",
            images: [
                "Branding/FOOD DIARY MOCKUP PRE DESIGN.jpg",
                "Branding/FOOD DIARY MOCKUP PRE DESIGN BLACK.jpg"
            ],
            type: "App Branding",
            client: "Health Tech Startup",
            year: "2024",
            services: ["App Branding", "UI Design", "Color Scheme", "Typography"]
        },
        {
            id: 6,
            name: "Orga Studio Training Materials",
            description: "Professional training flyer design for educational programs",
            detailedDescription: "Designed professional training flyers for Orga Studio's educational programs. Created engaging layouts that effectively communicate course information, benefits, and call-to-action. The design maintains brand consistency while highlighting key program features and instructor credentials.",
            category: "Branding & Print",
            image: "Branding/MMMMOCKUP Orga Studio Training Flyer jpg.jpg",
            images: [
                "Branding/MMMMOCKUP Orga Studio Training Flyer jpg.jpg",
                "Branding/klarion flyer mockup 2.jpg"
            ],
            type: "Print Design",
            client: "Orga Studio",
            year: "2024",
            services: ["Flyer Design", "Print Layout", "Marketing Materials", "Brand Application"]
        },
        {
            id: 7,
            name: "Bronzy Care Pharmacy Branding",
            description: "Healthcare branding and marketing materials",
            detailedDescription: "Developed complete branding package for Bronzy Care Pharmacy including logo design, signage concepts, and promotional materials. Created a trustworthy, professional healthcare brand identity that instills confidence in patients while maintaining approachability and warmth.",
            category: "Branding & Print",
            image: "Branding/MOCKUP 2BRONZY CARE PHARMCY JPG.jpg",
            images: [
                "Branding/MOCKUP 2BRONZY CARE PHARMCY JPG.jpg"
            ],
            type: "Healthcare Branding",
            client: "Bronzy Care Pharmacy",
            year: "2024",
            services: ["Logo Design", "Healthcare Branding", "Signage Design", "Marketing Materials"]
        },
        {
            id: 8,
            name: "Custom Apparel Collection",
            description: "T-shirt and cap designs for various lifestyle brands",
            detailedDescription: "Created custom apparel designs including t-shirts and caps for multiple clients across different industries. Designs range from corporate branding to lifestyle and fashion applications, each tailored to target audience preferences and brand personality. Focus on wearable art that serves as mobile brand ambassadors.",
            category: "Branding & Print",
            image: "Branding/Mockup 360 Red Tshirt.jpg",
            images: [
                "Branding/Mockup 360 Red Tshirt.jpg",
                "Branding/Mockup 360 Yellow Tshirt.jpg",
                "Branding/Men_s Cap 2 Mockup jpeg.jpg"
            ],
            type: "Apparel Design",
            client: "Various Lifestyle Brands",
            year: "2024",
            services: ["Apparel Design", "Brand Merchandise", "Fashion Graphics", "Product Mockups"]
        },
        {
            id: 9,
            name: "Portfolio Showcase Collection",
            description: "Creative portfolio pieces showcasing design versatility",
            detailedDescription: "A curated collection of portfolio pieces demonstrating design versatility across different styles and applications. Each piece represents a unique approach to visual communication, from minimalist corporate designs to bold creative expressions. These works showcase technical skills and creative problem-solving abilities.",
            category: "Branding & Print",
            image: "Branding/portfolio (1).jpeg",
            images: [
                "Branding/portfolio (1).jpeg",
                "Branding/portfolio (2).jpeg",
                "Branding/portfolio (3).jpeg",
                "Branding/portfolio (4).jpeg",
                "Branding/portfolio (5).jpeg",
                "Branding/portfolio (6).jpeg",
                "Branding/portfolio (8).jpeg"
            ],
            type: "Portfolio Showcase",
            client: "Personal Portfolio",
            year: "2024",
            services: ["Graphic Design", "Visual Identity", "Creative Direction", "Brand Development"]
        }
    ],
    
    // Web Design projects
    webDesign: [
        {
            id: 10,
            name: "Corporate Website Design",
            description: "Modern corporate website design for professional services",
            detailedDescription: "Designed and developed a modern, responsive corporate website featuring clean layouts, professional imagery, and intuitive navigation. Optimized for user experience and conversion.",
            category: "Web Design",
            image: "Branding/portfolio (7).jpeg",
            type: "Corporate Design"
        },
        {
            id: 11,
            name: "E-commerce Platform",
            description: "Complete e-commerce website design and development",
            detailedDescription: "Full-stack e-commerce solution with modern design, secure payment integration, inventory management, and mobile-responsive layout. Built for optimal user experience and sales conversion.",
            category: "Web Design",
            image: "Branding/portfolio (17).jpg",
            type: "E-commerce Design"
        },
        {
            id: 12,
            name: "Restaurant Website",
            description: "Modern restaurant website with online ordering system",
            detailedDescription: "Designed and developed a beautiful restaurant website featuring menu displays, online ordering system, reservation booking, and location information. Mobile-optimized for on-the-go customers.",
            category: "Web Design",
            image: "Branding/portfolio (1).jpeg",
            type: "Restaurant Design"
        },
        {
            id: 13,
            name: "Portfolio Website",
            description: "Creative portfolio website for digital artist",
            detailedDescription: "Custom portfolio website showcasing digital artwork with interactive galleries, project case studies, and contact forms. Designed to highlight creativity while maintaining professional presentation.",
            category: "Web Design",
            image: "Branding/portfolio (2).jpeg",
            type: "Portfolio Design"
        }
    ]
};

// Get all portfolio items
function getAllPortfolioItems() {
    return [
        ...portfolioData.webDevelopment,
        ...portfolioData.branding,
        ...portfolioData.webDesign
    ];
}

// Filter portfolio items by category
function getPortfolioByCategory(category) {
    if (category === 'all') {
        return getAllPortfolioItems();
    }
    
    switch(category) {
        case 'web-development':
            return portfolioData.webDevelopment;
        case 'branding':
            return portfolioData.branding;
        case 'web-design':
            return portfolioData.webDesign;
        default:
            return getAllPortfolioItems();
    }
}

// Generate portfolio grid
function generatePortfolioGrid(category = 'all') {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const items = getPortfolioByCategory(category);
    
    portfolioGrid.innerHTML = items.map(item => {
        if (item.category === 'Branding & Print') {
            return `
                <div class="portfolio-item branding-item" data-category="${item.category.toLowerCase().replace(/\s+/g, '-').replace('&', '')}" onclick="openImageGallery(${item.id})">
                    <div class="portfolio-image">
                        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                        <div class="image-overlay">
                            <i class="fas fa-search-plus"></i>
                        </div>
                    </div>
                    <div class="portfolio-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="portfolio-meta">
                            <span class="portfolio-type">${item.type}</span>
                        </div>
                    </div>
                </div>
            `;
        } else if (item.category === 'Web Design') {
            // Special case for Corporate Website Design (ID 10)
            const clickHandler = item.id === 10 ? `onclick="openExternalLink('https://kitpapa.net/solvy/')"` : '';
            
            return `
                <div class="portfolio-item" data-category="${item.category.toLowerCase().replace(/\s+/g, '-')}" ${clickHandler}>
                    <div class="portfolio-image">
                        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="portfolio-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="portfolio-meta">
                            <span class="portfolio-type">${item.type}</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Web Development apps (existing format)
            return `
                <div class="portfolio-item" data-category="${item.category.toLowerCase().replace(/\s+/g, '-')}" onclick="openModal(${item.id})">
                    <div class="portfolio-image">
                        <img src="${item.image}" alt="${item.name}" class="portfolio-image-display" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div class="portfolio-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="portfolio-meta">
                            <span class="portfolio-category" style="background: ${item.color}">${item.category}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');
}

// Modal functionality for web development apps
const modal = document.getElementById('appModal');
const closeBtn = document.querySelector('.close');

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star" style="color: #9aff00;"></i>';
        } else {
            stars += '<i class="far fa-star" style="color: #666;"></i>';
        }
    }
    return stars;
}

function openModal(appId) {
    const app = getAllPortfolioItems().find(item => item.id === appId);
    if (!app || app.category !== 'Web Development') return;
    
    document.getElementById('modalTitle').textContent = app.name;
    document.getElementById('modalDescription').textContent = app.detailedDescription;
    document.getElementById('modalTargetUsers').textContent = app.targetUsers.join(', ');
    document.getElementById('modalMonetization').textContent = app.subscriptionFee;
    
    // Display key features as a formatted list
    document.getElementById('modalAI').innerHTML = `
        <div class="key-features">
            <h4>Key Features:</h4>
            <ul>
                ${app.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="extra-info">
                <strong>Additional Info:</strong> ${app.extraInfo}
            </div>
        </div>
    `;
    
    document.getElementById('modalScalability').innerHTML = `
        <div class="scalability-display">
            <div class="stars">${generateStars(app.scalability)}</div>
            <span class="rating-text">${app.scalability}/5</span>
        </div>
    `;
    
    document.getElementById('modalTags').innerHTML = `
        <span class="tag category-tag" style="background: ${app.color}">${app.category}</span>
        <span class="tag subscription-tag">${app.subscriptionFee}</span>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Portfolio navigation functionality
function initializePortfolioNavigation() {
    const navButtons = document.querySelectorAll('.portfolio-nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category and filter portfolio
            const category = button.getAttribute('data-category');
            generatePortfolioGrid(category);
        });
    });
}

// Image Gallery functionality
let currentGalleryImages = [];
let currentImageIndex = 0;

function openImageGallery(itemId) {
    const item = getAllPortfolioItems().find(item => item.id === itemId);
    if (!item || !item.images) return;
    
    currentGalleryImages = item.images;
    currentImageIndex = 0;
    
    const modal = document.getElementById('imageGalleryModal');
    const title = document.getElementById('galleryTitle');
    const description = document.getElementById('galleryDescription');
    
    title.textContent = item.name;
    description.textContent = item.description;
    
    updateGalleryImage();
    updateGalleryThumbnails();
    updateGalleryCounter();
    
    modal.style.display = 'block';
}

function closeImageGallery() {
    const modal = document.getElementById('imageGalleryModal');
    modal.style.display = 'none';
}

function previousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateGalleryImage();
        updateGalleryThumbnails();
        updateGalleryCounter();
    }
}

function nextImage() {
    if (currentImageIndex < currentGalleryImages.length - 1) {
        currentImageIndex++;
        updateGalleryImage();
        updateGalleryThumbnails();
        updateGalleryCounter();
    }
}

function goToImage(index) {
    if (index >= 0 && index < currentGalleryImages.length) {
        currentImageIndex = index;
        updateGalleryImage();
        updateGalleryThumbnails();
        updateGalleryCounter();
    }
}

function updateGalleryImage() {
    const mainImage = document.getElementById('galleryImage');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (currentGalleryImages.length > 0 && mainImage) {
        mainImage.src = currentGalleryImages[currentImageIndex];
        mainImage.alt = `Gallery image ${currentImageIndex + 1}`;
    }
    
    // Update navigation buttons
    if (prevBtn) prevBtn.disabled = currentImageIndex === 0;
    if (nextBtn) nextBtn.disabled = currentImageIndex === currentGalleryImages.length - 1;
}

function updateGalleryThumbnails() {
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    thumbnailsContainer.innerHTML = '';
    
    currentGalleryImages.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`;
        thumbnail.onclick = () => goToImage(index);
        
        const img = document.createElement('img');
        img.src = image;
        img.alt = `Thumbnail ${index + 1}`;
        
        thumbnail.appendChild(img);
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function updateGalleryCounter() {
    const counter = document.getElementById('imageCounter');
    if (counter) {
        counter.textContent = `${currentImageIndex + 1} of ${currentGalleryImages.length}`;
    }
}

// Function to open external links in popup
function openExternalLink(url) {
    const popup = window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    if (!popup) {
        // Fallback if popup is blocked
        window.open(url, '_blank');
    }
}

// Event listeners
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    generatePortfolioGrid('all');
    initializePortfolioNavigation();
    
    // Initialize mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Gallery modal event listeners
    const galleryModal = document.getElementById('imageGalleryModal');
    const galleryCloseBtn = document.querySelector('.gallery-close');
    
    if (galleryCloseBtn) {
        galleryCloseBtn.addEventListener('click', closeImageGallery);
    }
    
    if (galleryModal) {
        galleryModal.addEventListener('click', function(event) {
            if (event.target === galleryModal) {
                closeImageGallery();
            }
        });
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // Regular modal escape
    if (event.key === 'Escape') {
        closeModal();
    }
    
    // Gallery keyboard navigation
    const galleryModal = document.getElementById('imageGalleryModal');
    if (galleryModal && galleryModal.style.display === 'block') {
        switch(event.key) {
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeImageGallery();
                break;
        }
    }
});