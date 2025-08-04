/**
 * AI Blog Generator Component
 * Automatically researches topics, generates blog content, creates images,
 * and saves blog posts relevant to Prosoft Digital Space services
 */

class AIBlogGenerator {
    constructor() {
        this.apiEndpoints = {
            research: 'https://api.tavily.com/search', // Research API
            content: 'https://api.openai.com/v1/chat/completions', // Content generation
            images: 'https://api.unsplash.com/search/photos' // Image search
        };
        
        this.prosoftServices = [
            'Web Development',
            'Mobile App Development', 
            'Digital Marketing',
            'AI Solutions',
            'Cloud Services',
            'Cybersecurity',
            'Data Analytics',
            'E-commerce Solutions',
            'UI/UX Design',
            'Software Consulting'
        ];
        
        this.blogTemplate = {
            title: '',
            content: '',
            excerpt: '',
            author: 'Prosoft Digital Space',
            date: '',
            category: '',
            tags: [],
            featuredImage: '',
            readTime: 0
        };
    }

    /**
     * Main function to generate a complete blog post
     * @param {string} topic - The topic to research and write about
     * @param {string} category - Blog category (optional)
     * @returns {Promise<Object>} Generated blog post object
     */
    async generateBlogPost(topic, category = 'Technology') {
        try {
            console.log(`🔍 Starting blog generation for topic: ${topic}`);
            
            // Step 1: Research the topic
            const researchData = await this.researchTopic(topic);
            
            // Step 2: Generate blog content
            const blogContent = await this.generateContent(topic, researchData);
            
            // Step 3: Find and download relevant images
            const images = await this.generateImages(topic, blogContent.title);
            
            // Step 4: Create complete blog post
            const blogPost = this.createBlogPost(blogContent, images, category);
            
            // Step 5: Save blog post
            await this.saveBlogPost(blogPost);
            
            console.log(`✅ Blog post generated successfully: ${blogPost.title}`);
            return blogPost;
            
        } catch (error) {
            console.error('❌ Error generating blog post:', error);
            throw error;
        }
    }

    /**
     * Research the given topic using web search
     * @param {string} topic - Topic to research
     * @returns {Promise<Object>} Research data
     */
    async researchTopic(topic) {
        console.log(`📚 Researching topic: ${topic}`);
        
        try {
            // Simulate research data (replace with actual API call)
            const mockResearchData = {
                summary: `Research summary for ${topic}`,
                keyPoints: [
                    `Key insight 1 about ${topic}`,
                    `Key insight 2 about ${topic}`,
                    `Key insight 3 about ${topic}`
                ],
                trends: [`Current trend 1`, `Current trend 2`],
                statistics: [`Stat 1`, `Stat 2`],
                relevantServices: this.findRelevantServices(topic)
            };
            
            // Create a demo blog post for testing
            if (topic.toLowerCase() === 'demo') {
                const demoBlogPost = {
                    id: 'demo-post-' + Date.now(),
                    title: 'The Future of Digital Transformation in African Businesses',
                    content: `<h2>Introduction</h2>
                    <p>Digital transformation is revolutionizing how businesses operate across Africa, creating unprecedented opportunities for growth and innovation. At Prosoft Digital Space, we've witnessed firsthand how technology can transform traditional business models and drive sustainable success.</p>
                    
                    <h2>Key Trends Shaping the Digital Landscape</h2>
                    <p>The African digital economy is experiencing rapid growth, with mobile technology leading the charge. From mobile banking solutions to e-commerce platforms, businesses are leveraging technology to reach new markets and improve operational efficiency.</p>
                    
                    <h2>How Prosoft Digital Space Can Help</h2>
                    <p>Our comprehensive suite of services includes:</p>
                    <ul>
                        <li><strong>Web Development:</strong> Creating responsive, user-friendly websites that drive engagement</li>
                        <li><strong>Mobile App Development:</strong> Building native and cross-platform applications</li>
                        <li><strong>Digital Marketing:</strong> Implementing data-driven strategies to boost online presence</li>
                        <li><strong>E-commerce Solutions:</strong> Developing robust online stores with secure payment systems</li>
                        <li><strong>Cloud Services:</strong> Providing scalable infrastructure for growing businesses</li>
                    </ul>
                    
                    <h2>Success Stories</h2>
                    <p>We've helped numerous businesses across Ghana and West Africa achieve their digital transformation goals. From small startups to established enterprises, our tailored solutions have driven measurable results.</p>
                    
                    <h2>The Road Ahead</h2>
                    <p>As we look to the future, emerging technologies like AI, blockchain, and IoT will continue to reshape the business landscape. Partnering with Prosoft Digital Space ensures your business stays ahead of the curve.</p>
                    
                    <h2>Get Started Today</h2>
                    <p>Ready to transform your business? Contact Prosoft Digital Space today to discuss how we can help you leverage technology for sustainable growth and success.</p>`,
                    excerpt: 'Discover how digital transformation is revolutionizing African businesses and learn how Prosoft Digital Space can help your company leverage technology for sustainable growth and success.',
                    category: 'Digital Transformation',
                    tags: ['digital transformation', 'technology', 'business growth', 'africa', 'innovation'],
                    author: 'Prosoft Digital Team',
                    dateCreated: new Date().toISOString(),
                    dateFormatted: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    readTime: 5,
                    featuredImage: {
                        url: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background: linear-gradient(135deg, #0a1628 0%, #1a2b4a 100%);">
                            <rect width="800" height="400" fill="url(#grad)"/>
                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#0a1628;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#1a2b4a;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <circle cx="200" cy="150" r="60" fill="#fa4905" opacity="0.8"/>
                            <circle cx="400" cy="200" r="40" fill="#b03200" opacity="0.6"/>
                            <circle cx="600" cy="120" r="50" fill="#fa4905" opacity="0.7"/>
                            <text x="400" y="250" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">Digital Transformation</text>
                            <text x="400" y="280" text-anchor="middle" fill="#fa4905" font-family="Arial, sans-serif" font-size="16">Powered by Prosoft Digital Space</text>
                        </svg>`),
                        alt: 'Digital Transformation Concept'
                    },
                    views: Math.floor(Math.random() * 500) + 100,
                    likes: Math.floor(Math.random() * 50) + 10
                };
                
                return demoBlogPost;
            }
            
            return mockResearchData;
            
        } catch (error) {
            console.error('Error researching topic:', error);
            return { summary: '', keyPoints: [], trends: [], statistics: [] };
        }
    }

    /**
     * Find Prosoft services relevant to the topic
     * @param {string} topic - The topic to match services with
     * @returns {Array} Relevant services
     */
    findRelevantServices(topic) {
        const topicLower = topic.toLowerCase();
        return this.prosoftServices.filter(service => {
            const serviceLower = service.toLowerCase();
            return topicLower.includes(serviceLower.split(' ')[0]) || 
                   serviceLower.includes(topicLower.split(' ')[0]);
        });
    }

    /**
     * Generate blog content using AI
     * @param {string} topic - Main topic
     * @param {Object} researchData - Research findings
     * @returns {Promise<Object>} Generated content
     */
    async generateContent(topic, researchData) {
        console.log(`✍️ Generating content for: ${topic}`);
        
        const prompt = this.createContentPrompt(topic, researchData);
        
        // Simulate content generation (replace with actual AI API)
        const generatedContent = {
            title: `${topic}: Transforming Business with Prosoft Digital Solutions`,
            content: this.generateMockContent(topic, researchData),
            excerpt: `Discover how ${topic} is revolutionizing businesses and how Prosoft Digital Space can help you leverage this technology for growth.`,
            tags: this.generateTags(topic),
            readTime: this.calculateReadTime(2000) // Approximate word count
        };
        
        return generatedContent;
    }

    /**
     * Create content generation prompt
     * @param {string} topic - Main topic
     * @param {Object} researchData - Research data
     * @returns {string} AI prompt
     */
    createContentPrompt(topic, researchData) {
        return `
        Write a comprehensive blog post about "${topic}" that:
        1. Explains the topic in an engaging, accessible way
        2. Highlights current trends and statistics
        3. Connects the topic to Prosoft Digital Space services: ${researchData.relevantServices.join(', ')}
        4. Provides actionable insights for businesses
        5. Includes a compelling call-to-action
        6. Uses a professional yet conversational tone
        7. Is SEO-optimized with relevant keywords
        
        Research insights to include:
        ${researchData.keyPoints.join('\n')}
        
        Current trends:
        ${researchData.trends.join('\n')}
        
        Make it approximately 1500-2000 words with proper headings and structure.
        `;
    }

    /**
     * Generate mock content (replace with actual AI generation)
     * @param {string} topic - Main topic
     * @param {Object} researchData - Research data
     * @returns {string} Generated HTML content
     */
    generateMockContent(topic, researchData) {
        return `
        <article class="blog-content">
            <h2>Introduction to ${topic}</h2>
            <p>In today's rapidly evolving digital landscape, ${topic} has emerged as a game-changing technology that's reshaping how businesses operate and compete. At Prosoft Digital Space, we've witnessed firsthand how organizations leverage ${topic} to drive innovation, improve efficiency, and create exceptional customer experiences.</p>
            
            <h2>Understanding ${topic}: The Fundamentals</h2>
            <p>${researchData.summary || `${topic} represents a significant shift in how we approach technology solutions.`}</p>
            
            <h2>Current Trends and Market Insights</h2>
            <ul>
                ${researchData.trends.map(trend => `<li>${trend}</li>`).join('')}
            </ul>
            
            <h2>How Prosoft Digital Space Can Help</h2>
            <p>Our expertise in ${researchData.relevantServices.join(', ')} positions us uniquely to help your business harness the power of ${topic}. We offer:</p>
            <ul>
                <li>Strategic consultation and planning</li>
                <li>Custom solution development</li>
                <li>Implementation and integration services</li>
                <li>Ongoing support and optimization</li>
            </ul>
            
            <h2>Key Benefits for Your Business</h2>
            <div class="benefits-grid">
                ${researchData.keyPoints.map(point => `<div class="benefit-item"><p>${point}</p></div>`).join('')}
            </div>
            
            <h2>Getting Started</h2>
            <p>Ready to explore how ${topic} can transform your business? Our team of experts is here to guide you through every step of your digital transformation journey.</p>
            
            <div class="cta-section">
                <h3>Let's Build Something Amazing Together</h3>
                <p>Contact Prosoft Digital Space today to discuss how we can help you leverage ${topic} for your business success.</p>
                <a href="#contact" class="cta-button">Get Started Today</a>
            </div>
        </article>
        `;
    }

    /**
     * Generate relevant tags for the blog post
     * @param {string} topic - Main topic
     * @returns {Array} Array of tags
     */
    generateTags(topic) {
        const baseTags = ['Technology', 'Digital Transformation', 'Business Solutions', 'Prosoft'];
        const topicTags = topic.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
        return [...baseTags, ...topicTags].slice(0, 8);
    }

    /**
     * Calculate estimated reading time
     * @param {number} wordCount - Number of words
     * @returns {number} Reading time in minutes
     */
    calculateReadTime(wordCount) {
        const wordsPerMinute = 200;
        return Math.ceil(wordCount / wordsPerMinute);
    }

    /**
     * Generate and download relevant images
     * @param {string} topic - Main topic
     * @param {string} title - Blog title
     * @returns {Promise<Object>} Image data
     */
    async generateImages(topic, title) {
        console.log(`🖼️ Generating images for: ${topic}`);
        
        try {
            // Simulate image generation/search
            const images = {
                featured: {
                    url: `https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop`,
                    alt: `${topic} - Featured Image`,
                    caption: `Exploring ${topic} with Prosoft Digital Space`
                },
                inline: [
                    {
                        url: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop`,
                        alt: `${topic} Implementation`,
                        caption: `Modern ${topic} solutions`
                    },
                    {
                        url: `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=300&fit=crop`,
                        alt: `Business Technology`,
                        caption: `Transforming business with technology`
                    }
                ]
            };
            
            return images;
            
        } catch (error) {
            console.error('Error generating images:', error);
            return { featured: null, inline: [] };
        }
    }

    /**
     * Create complete blog post object
     * @param {Object} content - Generated content
     * @param {Object} images - Generated images
     * @param {string} category - Blog category
     * @returns {Object} Complete blog post
     */
    createBlogPost(content, images, category) {
        const now = new Date();
        const slug = this.createSlug(content.title);
        
        return {
            ...this.blogTemplate,
            id: this.generateId(),
            title: content.title,
            slug: slug,
            content: content.content,
            excerpt: content.excerpt,
            category: category,
            tags: content.tags,
            featuredImage: images.featured,
            inlineImages: images.inline,
            readTime: content.readTime,
            date: now.toISOString(),
            dateFormatted: now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            status: 'published',
            seo: {
                metaTitle: content.title,
                metaDescription: content.excerpt,
                keywords: content.tags.join(', ')
            }
        };
    }

    /**
     * Create URL-friendly slug
     * @param {string} title - Blog title
     * @returns {string} URL slug
     */
    createSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }

    /**
     * Generate unique ID
     * @returns {string} Unique identifier
     */
    generateId() {
        return 'blog_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Save blog post to file system
     * @param {Object} blogPost - Complete blog post object
     * @returns {Promise<void>}
     */
    async saveBlogPost(blogPost) {
        console.log(`💾 Saving blog post: ${blogPost.title}`);
        
        try {
            // Create HTML file for the blog post
            const htmlContent = this.generateBlogHTML(blogPost);
            const filename = `blog-${blogPost.slug}.html`;
            
            // Save to file system (this would need to be implemented with actual file operations)
            console.log(`Blog post would be saved as: ${filename}`);
            
            // Update blog index
            await this.updateBlogIndex(blogPost);
            
            return {
                success: true,
                filename: filename,
                path: `./blogs/${filename}`
            };
            
        } catch (error) {
            console.error('Error saving blog post:', error);
            throw error;
        }
    }

    /**
     * Generate complete HTML for blog post
     * @param {Object} blogPost - Blog post data
     * @returns {string} Complete HTML
     */
    generateBlogHTML(blogPost) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${blogPost.seo.metaTitle} | Prosoft Digital Space</title>
    <meta name="description" content="${blogPost.seo.metaDescription}">
    <meta name="keywords" content="${blogPost.seo.keywords}">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div id="nav-placeholder"></div>
    
    <main class="blog-post-main">
        <article class="blog-post">
            <header class="blog-header">
                <div class="blog-meta">
                    <span class="category">${blogPost.category}</span>
                    <span class="read-time">${blogPost.readTime} min read</span>
                </div>
                <h1 class="blog-title">${blogPost.title}</h1>
                <p class="blog-excerpt">${blogPost.excerpt}</p>
                <div class="blog-info">
                    <span class="author">By ${blogPost.author}</span>
                    <span class="date">${blogPost.dateFormatted}</span>
                </div>
                ${blogPost.featuredImage ? `
                <div class="featured-image">
                    <img src="${blogPost.featuredImage.url}" alt="${blogPost.featuredImage.alt}">
                    <caption>${blogPost.featuredImage.caption}</caption>
                </div>
                ` : ''}
            </header>
            
            <div class="blog-content">
                ${blogPost.content}
            </div>
            
            <footer class="blog-footer">
                <div class="tags">
                    ${blogPost.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="share-buttons">
                    <h4>Share this post:</h4>
                    <a href="#" class="share-btn twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="share-btn linkedin"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="share-btn facebook"><i class="fab fa-facebook"></i></a>
                </div>
                
                <div class="cta-footer">
                    <h3>Ready to Transform Your Business?</h3>
                    <p>Let Prosoft Digital Space help you leverage cutting-edge technology for your success.</p>
                    <a href="#contact" class="btn-primary">Get Started Today</a>
                </div>
            </footer>
        </article>
        
        <aside class="blog-sidebar">
            <div class="related-posts">
                <h3>Related Posts</h3>
                <!-- Related posts would be populated here -->
            </div>
            
            <div class="newsletter-signup">
                <h3>Stay Updated</h3>
                <p>Get the latest insights delivered to your inbox.</p>
                <form class="newsletter-form">
                    <input type="email" placeholder="Your email address" required>
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </aside>
    </main>
    
    <div id="footer-placeholder"></div>
    
    <script src="script.js"></script>
    <script>
        // Load navigation and footer
        fetch('nav-widget.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('nav-placeholder').innerHTML = data;
            });
            
        fetch('footer-widget.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            });
    </script>
</body>
</html>
        `;
    }

    /**
     * Update blog index with new post
     * @param {Object} blogPost - New blog post
     * @returns {Promise<void>}
     */
    async updateBlogIndex(blogPost) {
        console.log('📝 Updating blog index...');
        
        // This would update the main blog.html file with the new post
        // Implementation would involve reading existing blog index,
        // adding new post to the list, and saving updated version
        
        const blogIndexEntry = {
            id: blogPost.id,
            title: blogPost.title,
            excerpt: blogPost.excerpt,
            category: blogPost.category,
            date: blogPost.date,
            dateFormatted: blogPost.dateFormatted,
            readTime: blogPost.readTime,
            featuredImage: blogPost.featuredImage,
            slug: blogPost.slug,
            tags: blogPost.tags
        };
        
        console.log('Blog index entry created:', blogIndexEntry);
    }

    /**
     * Generate multiple blog posts from a list of topics
     * @param {Array} topics - Array of topics
     * @param {string} category - Blog category
     * @returns {Promise<Array>} Array of generated blog posts
     */
    async generateMultiplePosts(topics, category = 'Technology') {
        console.log(`🚀 Generating ${topics.length} blog posts...`);
        
        const results = [];
        
        for (const topic of topics) {
            try {
                const blogPost = await this.generateBlogPost(topic, category);
                results.push({ success: true, topic, blogPost });
                
                // Add delay between generations to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 2000));
                
            } catch (error) {
                console.error(`Failed to generate blog for topic: ${topic}`, error);
                results.push({ success: false, topic, error: error.message });
            }
        }
        
        return results;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIBlogGenerator;
}

// Global instance for browser use
if (typeof window !== 'undefined') {
    window.AIBlogGenerator = AIBlogGenerator;
}

// Example usage
if (typeof window !== 'undefined') {
    // Initialize the blog generator
    const blogGenerator = new AIBlogGenerator();
    
    // Example function to generate a blog post
    window.generateBlogPost = async function(topic) {
        try {
            const result = await blogGenerator.generateBlogPost(topic);
            console.log('Generated blog post:', result);
            return result;
        } catch (error) {
            console.error('Error generating blog post:', error);
            throw error;
        }
    };
    
    // Example function to generate multiple posts
    window.generateMultiplePosts = async function(topics) {
        try {
            const results = await blogGenerator.generateMultiplePosts(topics);
            console.log('Generated multiple blog posts:', results);
            return results;
        } catch (error) {
            console.error('Error generating multiple blog posts:', error);
            throw error;
        }
    };
}