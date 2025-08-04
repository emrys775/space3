// Configuration file for AI services
const CONFIG = {
    GOOGLE_AI_API_KEY: 'AIzaSyCnXduDGfMs7Gau3JHqp7N4rLFiTv1ofSs',
    GOOGLE_AI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    
    // Predefined prompts for Prosoft Digital Space services
    SERVICE_PROMPTS: {
        'web-development': 'Modern web development workspace with multiple monitors showing code, responsive design layouts, and digital interfaces, professional lighting, tech startup atmosphere',
        'mobile-apps': 'Mobile app development scene with smartphones displaying various app interfaces, coding environment, UI/UX design elements, modern office setting',
        'ai-solutions': 'Artificial intelligence and machine learning workspace with data visualizations, neural network diagrams, futuristic technology, clean modern environment',
        'digital-marketing': 'Digital marketing campaign setup with social media analytics, content creation tools, marketing dashboards, creative workspace',
        'graphic-design': 'Professional graphic design studio with creative tools, color palettes, design mockups, artistic workspace, modern equipment',
        'video-editing': 'Video production and editing suite with professional equipment, timeline interfaces, color grading tools, creative studio environment',
        'drone-services': 'Professional drone photography and videography setup with drones, camera equipment, aerial view planning, outdoor professional setting',
        'it-consulting': 'IT consulting meeting room with technology infrastructure diagrams, server equipment, professional business environment, modern office'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}