// Portfolio data
const portfolioApps = [
    {
        id: 1,
        name: "EduTrack",
        description: "Comprehensive school management platform for administrative tasks and communication",
        detailedDescription: "Comprehensive school management platform that streamlines administrative tasks, enhances communication, and improves learning outcomes. Features include real-time attendance tracking, automated grading system, secure parent-teacher messaging, detailed academic reports, and data-driven insights for better decision making. Proven to reduce administrative workload by 70% and increase parent engagement by 85%.",
        targetUsers: ["Private Schools", "Educational Institutions", "School Administrators", "Teachers", "Parents"],
        monetization: "Subscription",
        aiIntegration: "Advanced AI capabilities include performance prediction algorithms that analyze student data to forecast academic outcomes, automated grading system with intelligent assessment, and intelligent chatbot for handling parent queries with natural language processing.",
        scalability: 5,
        category: "Education",
        icon: "fas fa-graduation-cap",
        color: "#4CAF50"
    },
    {
        id: 2,
        name: "SmartBiz Assistant",
        description: "All-in-one virtual assistant for SMEs with bookings, CRM, and invoicing",
        detailedDescription: "Comprehensive business management solution designed specifically for small and medium enterprises. Features include automated booking system, customer relationship management, invoice generation and tracking, inventory management, and business analytics dashboard. Streamlines operations and reduces manual work by up to 60%.",
        targetUsers: ["Small Businesses", "Medium Enterprises", "Freelancers", "Service Providers", "Consultants"],
        monetization: "Monthly Fee",
        aiIntegration: "Intelligent chatbot for customer service, smart reminder system that learns user patterns, automated invoice generation with AI-powered data extraction, and predictive analytics for business insights.",
        scalability: 5,
        category: "Business",
        icon: "fas fa-briefcase",
        color: "#2196F3"
    },
    {
        id: 3,
        name: "SkillConnect",
        description: "Platform connecting skilled workers with clients for home services",
        detailedDescription: "Marketplace platform that bridges the gap between skilled artisans and customers needing home services. Features include real-time job matching, secure payment processing, rating and review system, job tracking, and emergency service requests. Supports electricians, plumbers, carpenters, and other skilled trades.",
        targetUsers: ["General Public", "Homeowners", "Electricians", "Plumbers", "Carpenters", "Skilled Artisans"],
        monetization: "Commission per job",
        aiIntegration: "Advanced job matching algorithm based on skills, location, and availability, fraud detection system using behavioral analysis, route optimization for service providers, and dynamic pricing based on demand patterns.",
        scalability: 4,
        category: "Marketplace",
        icon: "fas fa-tools",
        color: "#FF9800"
    },
    {
        id: 4,
        name: "RentBuddy",
        description: "Complete rental property and tenant management solution",
        detailedDescription: "Comprehensive property management platform for landlords and property managers. Features include tenant screening, lease management, rent collection automation, maintenance request tracking, financial reporting, and property analytics. Simplifies property management and improves tenant relationships.",
        targetUsers: ["Landlords", "Property Managers", "Real Estate Investors", "Property Management Companies", "Tenants"],
        monetization: "Monthly Fee",
        aiIntegration: "Automated rent reminder system with personalized messaging, lease analysis for optimal terms, tenant risk profiling using credit and behavioral data, and predictive maintenance scheduling.",
        scalability: 4,
        category: "Real Estate",
        icon: "fas fa-home",
        color: "#9C27B0"
    },
    {
        id: 5,
        name: "StudyPal Africa",
        description: "Comprehensive exam preparation and learning platform for African students",
        detailedDescription: "Educational platform tailored for African curriculum with exam preparation materials, interactive learning content, practice tests, and study guides. Features include offline content access, progress tracking, peer study groups, and localized content for different African educational systems.",
        targetUsers: ["Senior High School Students", "Tertiary Students", "WASSCE Candidates", "University Students", "Adult Learners"],
        monetization: "In-app purchases, ads",
        aiIntegration: "Personalized AI tutors that adapt to individual learning styles, adaptive learning algorithms that adjust difficulty based on performance, automated question generation from curriculum content, and intelligent study scheduling.",
        scalability: 5,
        category: "Education",
        icon: "fas fa-book",
        color: "#4CAF50"
    },
    {
        id: 6,
        name: "AgriMarket Pro",
        description: "Direct farmer-to-market platform for agricultural produce trading",
        detailedDescription: "Digital marketplace connecting farmers directly with buyers, eliminating middlemen and ensuring fair prices. Features include real-time market prices, quality assessment tools, logistics coordination, payment processing, and agricultural advisory services. Supports both fresh produce and processed agricultural products.",
        targetUsers: ["Smallholder Farmers", "Commercial Farmers", "Produce Vendors", "Retailers", "Food Processors", "Exporters"],
        monetization: "Transaction fee",
        aiIntegration: "Machine learning algorithms for price prediction based on market trends, yield forecasting using weather and historical data, intelligent agricultural chatbot for farming advice, and demand prediction for crop planning.",
        scalability: 5,
        category: "Agriculture",
        icon: "fas fa-seedling",
        color: "#8BC34A"
    },
    {
        id: 7,
        name: "MobiClinic",
        description: "On-demand mobile healthcare consultations and telemedicine",
        detailedDescription: "Telemedicine platform providing remote healthcare consultations, medical advice, and health monitoring. Features include video consultations, prescription management, health record storage, appointment scheduling, and emergency consultation services. Bridges healthcare gaps in underserved areas.",
        targetUsers: ["Rural Communities", "Urban Residents", "Elderly Patients", "Chronic Disease Patients", "Healthcare Providers"],
        monetization: "Pay per consult",
        aiIntegration: "AI-powered symptom checker for preliminary diagnosis, intelligent appointment triage system, natural language processing for medical records analysis, and predictive health analytics for early intervention.",
        scalability: 4,
        category: "Healthcare",
        icon: "fas fa-stethoscope",
        color: "#F44336"
    },
    {
        id: 8,
        name: "FinCoach",
        description: "Personal finance management and budgeting assistant",
        detailedDescription: "Comprehensive financial wellness platform helping users manage money, create budgets, track expenses, and achieve financial goals. Features include expense categorization, savings challenges, investment guidance, debt management, and financial education resources tailored for young professionals.",
        targetUsers: ["Working Class Youth", "Young Professionals", "Students", "First-time Savers", "Debt Management Seekers"],
        monetization: "Freemium, premium insights",
        aiIntegration: "Intelligent budgeting algorithms that learn spending patterns, expense prediction based on historical data, personalized saving goal recommendations, and AI-driven financial advice tailored to individual circumstances.",
        scalability: 5,
        category: "Finance",
        icon: "fas fa-chart-pie",
        color: "#607D8B"
    },
    {
        id: 9,
        name: "SolarSplit",
        description: "Shared solar energy billing and usage tracking system",
        detailedDescription: "Community solar management platform that enables shared solar installations with transparent billing and usage tracking. Features include real-time energy monitoring, automated billing distribution, usage analytics, maintenance scheduling, and community energy sharing. Perfect for residential complexes, schools, and community centers.",
        targetUsers: ["Residential Communities", "Schools", "Community Centers", "Apartment Complexes", "Small Businesses"],
        monetization: "Fee per meter",
        aiIntegration: "Machine learning algorithms for energy usage forecasting, payment risk scoring based on consumption patterns, predictive maintenance alerts, and optimization recommendations for energy efficiency.",
        scalability: 4,
        category: "Energy",
        icon: "fas fa-solar-panel",
        color: "#FFC107"
    },
    {
        id: 10,
        name: "TalentScout AI",
        description: "AI-powered CV builder and intelligent job matching platform",
        detailedDescription: "Comprehensive career development platform combining CV optimization with intelligent job matching. Features include AI-enhanced resume building, skill gap analysis, interview preparation, job application tracking, and personalized career recommendations. Helps job seekers stand out in competitive markets.",
        targetUsers: ["Job Seekers", "Fresh Graduates", "Career Changers", "Professionals", "Recruiters"],
        monetization: "Freemium",
        aiIntegration: "Advanced CV improvement suggestions using natural language processing, intelligent job matching based on skills and preferences, application tracking with success prediction, and personalized career path recommendations.",
        scalability: 5,
        category: "HR",
        icon: "fas fa-user-tie",
        color: "#3F51B5"
    },
    {
        id: 11,
        name: "LocalCart",
        description: "Hyperlocal e-commerce platform for neighborhood shopping",
        detailedDescription: "Neighborhood-focused e-commerce platform connecting local businesses with nearby customers. Features include same-day delivery, local product discovery, community marketplace, small business support tools, and neighborhood-specific promotions. Strengthens local economies while providing convenient shopping.",
        targetUsers: ["Urban Residents", "Local Businesses", "Small Retailers", "Neighborhood Shops", "Delivery Partners"],
        monetization: "Sales % commission",
        aiIntegration: "Intelligent product recommendation engine based on local preferences, demand prediction for inventory optimization, dynamic pricing algorithms, and personalized shopping experience based on purchase history.",
        scalability: 4,
        category: "E-commerce",
        icon: "fas fa-shopping-cart",
        color: "#E91E63"
    },
    {
        id: 12,
        name: "TutorNow",
        description: "Online tutoring marketplace connecting students with qualified teachers",
        detailedDescription: "Comprehensive tutoring platform facilitating online and in-person learning connections. Features include tutor verification, subject-specific matching, session scheduling, progress tracking, payment processing, and learning resource sharing. Supports various subjects and learning levels.",
        targetUsers: ["Students", "Parents", "Professional Tutors", "Subject Experts", "Educational Institutions"],
        monetization: "Platform fee",
        aiIntegration: "Smart tutor-student matching based on learning styles and subject expertise, automated lesson scheduling optimization, progress tracking with performance analytics, and personalized learning recommendations.",
        scalability: 4,
        category: "Education",
        icon: "fas fa-chalkboard-teacher",
        color: "#4CAF50"
    },
    {
        id: 13,
        name: "QuickCase",
        description: "Legal document templates and lawyer matching service",
        detailedDescription: "Comprehensive legal assistance platform providing document templates, lawyer matching, and legal guidance for businesses and individuals. Features include customizable legal templates, lawyer verification system, consultation booking, document review services, and legal compliance tracking.",
        targetUsers: ["Entrepreneurs", "Small Business Owners", "Startups", "General Public", "Legal Professionals"],
        monetization: "Per document/lead",
        aiIntegration: "Intelligent legal document suggestion based on business needs, automated clause explanations in simple language, legal risk assessment, and smart lawyer matching based on expertise and case requirements.",
        scalability: 4,
        category: "Legal",
        icon: "fas fa-gavel",
        color: "#795548"
    },
    {
        id: 14,
        name: "FarmPlanner",
        description: "Comprehensive farm input planning and crop tracking system",
        detailedDescription: "Agricultural management platform helping farmers optimize crop production through intelligent planning and tracking. Features include crop rotation planning, input cost calculation, weather monitoring, pest and disease alerts, harvest tracking, and market price integration.",
        targetUsers: ["Smallholder Farmers", "Commercial Farmers", "Agricultural Cooperatives", "Farm Managers", "Agricultural Extension Officers"],
        monetization: "Freemium",
        aiIntegration: "Machine learning algorithms for optimal crop rotation recommendations, rainfall and weather pattern prediction, automated pest and disease alerts based on environmental conditions, and yield prediction modeling.",
        scalability: 5,
        category: "Agriculture",
        icon: "fas fa-tractor",
        color: "#8BC34A"
    },
    {
        id: 15,
        name: "ChopTracker",
        description: "Complete inventory and POS system for food businesses",
        detailedDescription: "Restaurant and food service management platform combining inventory tracking with point-of-sale functionality. Features include real-time stock monitoring, automated reordering, sales analytics, menu management, staff scheduling, and customer relationship management.",
        targetUsers: ["Restaurant Owners", "Food Vendors", "Caterers", "Food Truck Operators", "Cafe Managers"],
        monetization: "Subscription",
        aiIntegration: "Predictive analytics for stock management, AI-powered waste reduction insights, demand forecasting for menu items, and intelligent pricing recommendations based on costs and market trends.",
        scalability: 4,
        category: "Food & Beverage",
        icon: "fas fa-utensils",
        color: "#FF5722"
    },
    {
        id: 16,
        name: "HealthWatch",
        description: "Comprehensive lifestyle and health tracking application",
        detailedDescription: "Personal health monitoring platform that tracks various health metrics and lifestyle habits. Features include activity tracking, nutrition logging, sleep monitoring, medication reminders, health goal setting, and integration with wearable devices for comprehensive health insights.",
        targetUsers: ["Health-Conscious Individuals", "Fitness Enthusiasts", "Chronic Disease Patients", "Wellness Coaches", "Healthcare Providers"],
        monetization: "Wearable sync",
        aiIntegration: "Intelligent habit building recommendations based on user behavior, health risk scoring using multiple data points, personalized wellness coaching, and predictive health analytics for early intervention.",
        scalability: 4,
        category: "Healthcare",
        icon: "fas fa-heartbeat",
        color: "#F44336"
    },
    {
        id: 17,
        name: "Learn2Earn",
        description: "Gamified learning platform with micro-rewards system",
        detailedDescription: "Educational gaming platform that makes learning engaging through gamification and reward systems. Features include interactive quizzes, learning challenges, progress tracking, achievement badges, micro-rewards for completion, and social learning competitions. Transforms education into an enjoyable experience.",
        targetUsers: ["Students", "Young Learners", "Adult Learners", "Educational Institutions", "Corporate Training Programs"],
        monetization: "Ads, brand sponsors",
        aiIntegration: "Adaptive learning algorithms that adjust pace based on individual performance, intelligent quiz generation engine, personalized learning path recommendations, and behavioral analysis for optimal engagement strategies.",
        scalability: 4,
        category: "Education",
        icon: "fas fa-gamepad",
        color: "#4CAF50"
    },
    {
        id: 18,
        name: "BuildEstimate",
        description: "Accurate cost calculator for construction and renovation projects",
        detailedDescription: "Construction cost estimation platform providing accurate project budgeting for builders and homeowners. Features include material cost databases, labor cost calculations, project timeline estimation, supplier integration, cost comparison tools, and detailed project breakdowns.",
        targetUsers: ["Construction Companies", "Independent Builders", "Homeowners", "Architects", "Project Managers"],
        monetization: "Pay per estimate",
        aiIntegration: "Machine learning algorithms for material cost prediction based on market trends, automated blueprint analysis for quantity estimation, regional cost adjustments, and project complexity assessment.",
        scalability: 3,
        category: "Construction",
        icon: "fas fa-hard-hat",
        color: "#9E9E9E"
    },
    {
        id: 19,
        name: "Voice2Doc",
        description: "Advanced speech-to-text transcription for students and professionals",
        detailedDescription: "Professional transcription service converting speech to text with high accuracy for various use cases. Features include real-time transcription, multi-language support, speaker identification, automatic punctuation, searchable transcripts, and integration with popular productivity tools.",
        targetUsers: ["Students", "Business Professionals", "Journalists", "Researchers", "Content Creators"],
        monetization: "Freemium",
        aiIntegration: "Advanced AI transcription with natural language processing, intelligent summary generation, voice pattern recognition for speaker tagging, and context-aware punctuation and formatting.",
        scalability: 5,
        category: "Productivity",
        icon: "fas fa-microphone",
        color: "#00BCD4"
    },
    {
        id: 20,
        name: "BizLaunch Kit",
        description: "Comprehensive step-by-step startup guidance platform",
        detailedDescription: "Complete entrepreneurship support platform guiding aspiring business owners through the startup process. Features include business plan templates, market research tools, legal requirement checklists, funding guidance, mentor matching, and progress tracking for business milestones.",
        targetUsers: ["Aspiring Entrepreneurs", "First-time Business Owners", "Startup Founders", "Business Students", "Innovation Hubs"],
        monetization: "Freemium + tools",
        aiIntegration: "Intelligent business planning assistance with market analysis, automated idea feasibility validation using market data, personalized startup roadmaps, and AI-powered business model recommendations.",
        scalability: 5,
        category: "Business",
        icon: "fas fa-rocket",
        color: "#2196F3"
    }
];

// DOM elements
const portfolioGrid = document.getElementById('portfolioGrid');
const modal = document.getElementById('appModal');
const closeBtn = document.querySelector('.close');

// Generate portfolio grid
function generatePortfolioGrid() {
    portfolioGrid.innerHTML = '';
    
    portfolioApps.forEach(app => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <div class="app-preview" style="background: linear-gradient(135deg, ${app.color}20, ${app.color}10)">
                    ${app.id === 1 ? `<img src="assest3/prosoft image (10).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 2 ? `<img src="assest3/prosoft image (3).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 3 ? `<img src="assest3/prosoft image (17).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 4 ? `<img src="assest3/prosoft image (2).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 5 ? `<img src="assest3/prosoft image (8).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 6 ? `<img src="assest3/prosoft image 18.jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 7 ? `<img src="assest3/prosoft image (11).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 8 ? `<img src="assest3/prosoft image (8).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 9 ? `<img src="assest3/prosoft image.jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 10 ? `<img src="assest3/prosoft image (5).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 11 ? `<img src="assest3/prosoft image (15).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 12 ? `<img src="assest3/prosoft image 5.jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 13 ? `<img src="assest3/prosoft image 2.jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 14 ? `<img src="assest3/prosoft image (14).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 15 ? `<img src="assest3/prosoft image (3).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 16 ? `<img src="assest3/prosoft image (11).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 17 ? `<img src="assest3/prosoft image (17).jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 18 ? `<img src="assest3/prosoft image 4.jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : app.id === 19 ? `<img src="assest3/prosoft image 6.jpg" alt="${app.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">` : `
                    <div class="app-icon-large" style="color: ${app.color}">
                        <i class="${app.icon}"></i>
                    </div>
                    <div class="app-mockup">
                        <div class="phone-frame">
                            <div class="screen">
                                <div class="app-ui" style="border-top: 3px solid ${app.color}">
                                    <div class="ui-header">
                                        <div class="ui-title">${app.name}</div>
                                        <div class="ui-icon" style="background: ${app.color}">
                                            <i class="${app.icon}"></i>
                                        </div>
                                    </div>
                                    <div class="ui-content">
                                        <div class="ui-element" style="background: ${app.color}20"></div>
                                        <div class="ui-element" style="background: ${app.color}15"></div>
                                        <div class="ui-element" style="background: ${app.color}10"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`}
                </div>
            </div>
            <div class="portfolio-content">
                <h3>${app.name}</h3>
                <p>${app.description}</p>
                <div class="portfolio-tags">
                    <span>${app.category}</span>
                    <span>${app.monetization}</span>
                </div>
                <div class="portfolio-actions">
                    <button class="view-details-btn" onclick="openModal(${app.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Generate star rating
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Open modal with app details
function openModal(appId) {
    const app = portfolioApps.find(a => a.id === appId);
    if (!app) return;
    
    document.getElementById('modalTitle').textContent = app.name;
    document.getElementById('modalDescription').textContent = app.detailedDescription;
    
    // Format target users as a list
    const targetUsersList = app.targetUsers.map(user => `<li>${user}</li>`).join('');
    document.getElementById('modalTargetUsers').innerHTML = `<ul>${targetUsersList}</ul>`;
    
    document.getElementById('modalMonetization').textContent = app.monetization;
    document.getElementById('modalAI').textContent = app.aiIntegration;
    
    // Set scalability stars
    document.getElementById('modalScalability').innerHTML = `
        <div class="scalability-display">
            <div class="stars">${generateStars(app.scalability)}</div>
            <span class="rating-text">${app.scalability}/5</span>
        </div>
    `;
    
    // Set tags
    document.getElementById('modalTags').innerHTML = `
        <span class="tag category-tag" style="background: ${app.color}">${app.category}</span>
        <span class="tag monetization-tag">${app.monetization}</span>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Initialize portfolio
document.addEventListener('DOMContentLoaded', () => {
    generatePortfolioGrid();
    
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});