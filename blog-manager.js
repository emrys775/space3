/**
 * Blog Management System
 * Handles saving, loading, and managing blog posts
 */

class BlogManager {
    constructor() {
        this.storageKey = 'prosoftBlogPosts';
        this.blogPosts = this.loadBlogPosts();
    }

    /**
     * Save a blog post to local storage
     * @param {Object} blogPost - The blog post object
     * @returns {Promise<boolean>} - Success status
     */
    async saveBlogPost(blogPost) {
        try {
            // Generate unique ID if not present
            if (!blogPost.id) {
                blogPost.id = this.generateId();
            }

            // Add metadata
            blogPost.createdAt = new Date().toISOString();
            blogPost.updatedAt = new Date().toISOString();
            blogPost.status = 'published';
            blogPost.views = 0;
            blogPost.likes = 0;

            // Add to blog posts array
            const existingIndex = this.blogPosts.findIndex(post => post.id === blogPost.id);
            if (existingIndex >= 0) {
                // Update existing post
                blogPost.updatedAt = new Date().toISOString();
                this.blogPosts[existingIndex] = blogPost;
            } else {
                // Add new post
                this.blogPosts.unshift(blogPost); // Add to beginning
            }

            // Save to storage
            this.saveBlogPosts();

            // Create individual blog post file
            await this.createBlogPostFile(blogPost);

            return true;
        } catch (error) {
            console.error('Error saving blog post:', error);
            return false;
        }
    }

    /**
     * Load all blog posts from storage
     * @returns {Array} - Array of blog posts
     */
    loadBlogPosts() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading blog posts:', error);
            return [];
        }
    }

    /**
     * Save blog posts to storage
     */
    saveBlogPosts() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.blogPosts));
        } catch (error) {
            console.error('Error saving blog posts to storage:', error);
        }
    }

    /**
     * Get all blog posts
     * @returns {Array} - Array of blog posts
     */
    getAllBlogPosts() {
        return this.blogPosts;
    }

    /**
     * Get blog posts by category
     * @param {string} category - Category name
     * @returns {Array} - Filtered blog posts
     */
    getBlogPostsByCategory(category) {
        return this.blogPosts.filter(post => 
            post.category.toLowerCase() === category.toLowerCase()
        );
    }

    /**
     * Get recent blog posts
     * @param {number} limit - Number of posts to return
     * @returns {Array} - Recent blog posts
     */
    getRecentBlogPosts(limit = 5) {
        return this.blogPosts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    }

    /**
     * Search blog posts
     * @param {string} query - Search query
     * @returns {Array} - Matching blog posts
     */
    searchBlogPosts(query) {
        const searchTerm = query.toLowerCase();
        return this.blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    /**
     * Delete a blog post
     * @param {string} postId - Blog post ID
     * @returns {boolean} - Success status
     */
    deleteBlogPost(postId) {
        try {
            const index = this.blogPosts.findIndex(post => post.id === postId);
            if (index >= 0) {
                this.blogPosts.splice(index, 1);
                this.saveBlogPosts();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting blog post:', error);
            return false;
        }
    }

    /**
     * Get blog post by ID
     * @param {string} postId - Blog post ID
     * @returns {Object|null} - Blog post or null
     */
    getBlogPostById(postId) {
        return this.blogPosts.find(post => post.id === postId) || null;
    }

    /**
     * Update blog post views
     * @param {string} postId - Blog post ID
     */
    incrementViews(postId) {
        const post = this.getBlogPostById(postId);
        if (post) {
            post.views = (post.views || 0) + 1;
            this.saveBlogPosts();
        }
    }

    /**
     * Update blog post likes
     * @param {string} postId - Blog post ID
     */
    incrementLikes(postId) {
        const post = this.getBlogPostById(postId);
        if (post) {
            post.likes = (post.likes || 0) + 1;
            this.saveBlogPosts();
        }
    }

    /**
     * Generate unique ID for blog post
     * @returns {string} - Unique ID
     */
    generateId() {
        return 'blog_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Create individual blog post HTML file
     * @param {Object} blogPost - Blog post object
     */
    async createBlogPostFile(blogPost) {
        const fileName = this.generateFileName(blogPost.title);
        const htmlContent = this.generateBlogPostHTML(blogPost);
        
        try {
            // Save the HTML file to the blog-posts folder
            const response = await fetch('http://localhost:8001/save-blog-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileName: fileName,
                    content: htmlContent,
                    postId: blogPost.id
                })
            });
            
            if (response.ok) {
                console.log(`Blog post saved successfully: blog-posts/${fileName}`);
                // Also store in localStorage as backup
                localStorage.setItem(`blogPost_${blogPost.id}`, htmlContent);
                return true;
            } else {
                throw new Error('Failed to save blog post file');
            }
        } catch (error) {
            console.error('Error saving blog post file:', error);
            // Fallback to localStorage only
            localStorage.setItem(`blogPost_${blogPost.id}`, htmlContent);
            console.log(`Blog post stored in localStorage as fallback: ${fileName}`);
            return false;
        }
    }

    /**
     * Generate filename from blog title
     * @param {string} title - Blog title
     * @returns {string} - Filename
     */
    generateFileName(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 50) + '.html';
    }

    /**
     * Generate HTML content for blog post
     * @param {Object} blogPost - Blog post object
     * @returns {string} - HTML content
     */
    generateBlogPostHTML(blogPost) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${blogPost.title} | Prosoft Digital Space</title>
    <meta name="description" content="${blogPost.excerpt}">
    <meta name="keywords" content="${blogPost.tags.join(', ')}">
    <meta name="author" content="${blogPost.author}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${blogPost.title}">
    <meta property="og:description" content="${blogPost.excerpt}">
    <meta property="og:image" content="${blogPost.featuredImage?.url || ''}">
    <meta property="og:type" content="article">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${blogPost.title}">
    <meta name="twitter:description" content="${blogPost.excerpt}">
    <meta name="twitter:image" content="${blogPost.featuredImage?.url || ''}">
    
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .blog-post-container {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 0;
            background: #ffffff;
            min-height: calc(100vh - 4rem);
            box-shadow: 0 25px 80px rgba(0,0,0,0.08);
            border-radius: 20px;
            overflow: hidden;
        }
        
        .blog-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 4rem 3rem 3rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .blog-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.1);
            z-index: 1;
        }
        
        .blog-header > * {
            position: relative;
            z-index: 2;
        }
        
        .blog-title {
            font-family: 'Playfair Display', serif;
            font-size: 3.2rem;
            color: white;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            font-weight: 700;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .blog-meta {
            display: flex;
            justify-content: center;
            gap: 2.5rem;
            margin-bottom: 2rem;
            color: rgba(255, 255, 255, 0.95);
            flex-wrap: wrap;
            font-size: 0.95rem;
        }
        
        .blog-meta span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.25rem;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 25px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            font-weight: 500;
        }
        
        .blog-meta span:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
        }
        
        .featured-image {
            width: 100%;
            height: 450px;
            object-fit: cover;
            margin: -2rem 0 0;
            border-radius: 20px 20px 0 0;
        }
        
        .image-caption {
            text-align: center;
            font-style: italic;
            color: #64748b;
            margin: 1.5rem 0;
            font-size: 0.9rem;
            padding: 0 3rem;
        }
        
        .blog-content {
            padding: 3rem;
            line-height: 1.8;
            color: #374151;
            font-size: 1.125rem;
        }
        
        .article-intro {
            margin-bottom: 3rem;
            padding: 2.5rem;
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border-radius: 16px;
            border-left: 5px solid #fa4905;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        
        .lead-paragraph {
            font-size: 1.3rem;
            font-weight: 500;
            color: #1e293b;
            margin: 0;
            line-height: 1.7;
        }
        
        .blog-content h2 {
            font-family: 'Playfair Display', serif;
            color: #1e293b;
            margin-top: 3.5rem;
            margin-bottom: 1.5rem;
            font-size: 2.2rem;
            font-weight: 600;
            position: relative;
            padding-bottom: 0.75rem;
        }
        
        .blog-content h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #fa4905, #ff6b35);
            border-radius: 2px;
        }
        
        .blog-content h3 {
            font-family: 'Inter', sans-serif;
            color: #374151;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-size: 1.6rem;
            font-weight: 600;
        }
        
        .blog-content p {
            margin-bottom: 1.5rem;
            text-align: justify;
            hyphens: auto;
        }
        
        .blog-content p:first-of-type {
            font-size: 1.2rem;
            font-weight: 500;
            color: #1e293b;
        }
        
        .blog-content ul, .blog-content ol {
            margin: 2rem 0;
            padding-left: 0;
        }
        
        .blog-content li {
            margin-bottom: 1rem;
            padding-left: 2rem;
            position: relative;
            list-style: none;
            line-height: 1.7;
        }
        
        .blog-content ul li::before {
            content: '▸';
            position: absolute;
            left: 0;
            color: #fa4905;
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .blog-content ol {
            counter-reset: list-counter;
        }
        
        .blog-content ol li {
            counter-increment: list-counter;
        }
        
        .blog-content ol li::before {
            content: counter(list-counter);
            position: absolute;
            left: 0;
            background: #fa4905;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .blog-content blockquote {
            margin: 2.5rem 0;
            padding: 2rem;
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border-left: 5px solid #fa4905;
            border-radius: 0 12px 12px 0;
            font-style: italic;
            font-size: 1.2rem;
            color: #1e293b;
            position: relative;
        }
        
        .blog-content blockquote::before {
            content: '"';
            position: absolute;
            top: -10px;
            left: 15px;
            font-size: 4rem;
            color: #fa4905;
            opacity: 0.3;
            font-family: serif;
        }
        
        .highlight-box, .strategy-list, .development-tips, .solution-categories, .security-checklist {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 2rem;
            margin: 2rem 0;
            border-left: 4px solid #3b82f6;
        }
        
        .call-to-action {
            background: linear-gradient(135deg, #fa4905, #ff6b35);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            margin: 3rem 0;
        }
        
        .call-to-action h3 {
            color: white;
            margin-top: 0;
        }
        
        .blog-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 2rem 0;
            padding-top: 2rem;
            border-top: 2px solid #f0f0f0;
        }
        
        .tag {
            background: #fa4905;
            color: #ffffff;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.9rem;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .tag:hover {
            background: #b03200;
            transform: translateY(-1px);
        }
        
        .blog-footer {
            background: #f8fafc;
            padding: 3rem;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .share-buttons {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 2.5rem;
            flex-wrap: wrap;
        }
        
        .share-btn {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 12px 24px;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            text-decoration: none;
            color: #ffffff;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .share-btn.facebook { 
            background: linear-gradient(135deg, #3b5998, #4c70ba);
        }
        
        .share-btn.twitter { 
            background: linear-gradient(135deg, #1da1f2, #0d8bd9);
        }
        
        .share-btn.linkedin { 
            background: linear-gradient(135deg, #0077b5, #005885);
        }
        
        .share-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        
        .back-to-blog {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            color: #fa4905;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            padding: 12px 24px;
            border: 2px solid #fa4905;
            border-radius: 30px;
            transition: all 0.3s ease;
            background: white;
        }
        
        .back-to-blog:hover {
            background: #fa4905;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(250, 73, 5, 0.3);
        }
        
        @media (max-width: 1024px) {
            .blog-post-container {
                margin: 1rem;
                border-radius: 12px;
            }
            
            .blog-header {
                padding: 3rem 2rem 2.5rem;
            }
            
            .blog-title {
                font-size: 2.8rem;
            }
            
            .blog-content {
                padding: 2.5rem;
            }
        }
        
        @media (max-width: 768px) {
            .blog-post-container {
                margin: 0.5rem;
                border-radius: 8px;
            }
            
            .blog-header {
                padding: 2.5rem 1.5rem 2rem;
            }
            
            .blog-title {
                font-size: 2.2rem;
                line-height: 1.3;
            }
            
            .blog-meta {
                gap: 1rem;
                flex-direction: column;
                align-items: center;
            }
            
            .blog-meta span {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
            }
            
            .featured-image {
                height: 300px;
            }
            
            .blog-content {
                padding: 2rem 1.5rem;
                font-size: 1rem;
            }
            
            .blog-content h2 {
                font-size: 1.8rem;
                margin-top: 2.5rem;
            }
            
            .blog-content h3 {
                font-size: 1.4rem;
            }
            
            .article-intro {
                padding: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .lead-paragraph {
                font-size: 1.1rem;
            }
            
            .blog-tags {
                padding: 2rem 1.5rem;
                gap: 0.75rem;
            }
            
            .blog-footer {
                padding: 2rem 1.5rem;
            }
            
            .share-buttons {
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }
            
            .share-btn {
                width: 200px;
                justify-content: center;
            }
        }
        
        @media (max-width: 480px) {
            .blog-header {
                padding: 2rem 1rem 1.5rem;
            }
            
            .blog-title {
                font-size: 1.8rem;
            }
            
            .blog-content {
                padding: 1.5rem 1rem;
            }
            
            .blog-content h2 {
                font-size: 1.6rem;
            }
            
            .article-intro {
                padding: 1rem;
            }
            
            .blog-tags {
                padding: 1.5rem 1rem;
            }
            
            .blog-footer {
                padding: 1.5rem 1rem;
            }
        }
    </style>
</head>
<body>
    <div id="nav-placeholder"></div>
    
    <div class="blog-post-container">
        <div class="blog-header">
            <h1 class="blog-title">${blogPost.title}</h1>
            
            <div class="blog-meta">
                <span><i class="fas fa-user"></i> ${blogPost.author}</span>
                <span><i class="fas fa-calendar"></i> ${blogPost.dateFormatted}</span>
                <span><i class="fas fa-clock"></i> ${blogPost.readTime} min read</span>
                <span><i class="fas fa-folder"></i> ${blogPost.category}</span>
                <span><i class="fas fa-eye"></i> <span id="viewCount">${blogPost.views || 0}</span> views</span>
            </div>
            
            ${blogPost.featuredImage ? `
                <img src="${blogPost.featuredImage.url}" alt="${blogPost.featuredImage.alt}" class="featured-image">
                <p class="image-caption">${blogPost.featuredImage.caption}</p>
            ` : ''}
        </div>
        
        <div class="blog-content">
            ${blogPost.content}
        </div>
        
        <div class="blog-tags">
            ${blogPost.tags.map(tag => `<a href="#" class="tag">${tag}</a>`).join('')}
        </div>
        
        <div class="blog-footer">
            <div class="share-buttons">
                <a href="#" class="share-btn facebook" onclick="shareOnFacebook()">
                    <i class="fab fa-facebook-f"></i> Share
                </a>
                <a href="#" class="share-btn twitter" onclick="shareOnTwitter()">
                    <i class="fab fa-twitter"></i> Tweet
                </a>
                <a href="#" class="share-btn linkedin" onclick="shareOnLinkedIn()">
                    <i class="fab fa-linkedin-in"></i> Share
                </a>
            </div>
            
            <a href="blog.html" class="back-to-blog">
                <i class="fas fa-arrow-left"></i> Back to Blog
            </a>
        </div>
    </div>
    
    <div id="footer-placeholder"></div>
    
    <script>
        // Load navigation and footer
        document.addEventListener('DOMContentLoaded', function() {
            loadWidgets();
            incrementViews();
        });
        
        function loadWidgets() {
            fetch('nav-widget.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('nav-placeholder').innerHTML = data;
                })
                .catch(error => console.log('Navigation widget not found'));
                
            fetch('footer-widget.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('footer-placeholder').innerHTML = data;
                })
                .catch(error => console.log('Footer widget not found'));
        }
        
        function incrementViews() {
            // In a real implementation, this would update the server
            const viewCount = document.getElementById('viewCount');
            if (viewCount) {
                const currentViews = parseInt(viewCount.textContent) || 0;
                viewCount.textContent = currentViews + 1;
            }
        }
        
        function shareOnFacebook() {
            const url = encodeURIComponent(window.location.href);
            window.open(\`https://www.facebook.com/sharer/sharer.php?u=\${url}\`, '_blank');
        }
        
        function shareOnTwitter() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('${blogPost.title}');
            window.open(\`https://twitter.com/intent/tweet?url=\${url}&text=\${text}\`, '_blank');
        }
        
        function shareOnLinkedIn() {
            const url = encodeURIComponent(window.location.href);
            window.open(\`https://www.linkedin.com/sharing/share-offsite/?url=\${url}\`, '_blank');
        }
    </script>
</body>
</html>`;
    }

    /**
     * Export blog posts as JSON
     * @returns {string} - JSON string of all blog posts
     */
    exportBlogPosts() {
        return JSON.stringify(this.blogPosts, null, 2);
    }

    /**
     * Import blog posts from JSON
     * @param {string} jsonData - JSON string of blog posts
     * @returns {boolean} - Success status
     */
    importBlogPosts(jsonData) {
        try {
            const importedPosts = JSON.parse(jsonData);
            if (Array.isArray(importedPosts)) {
                this.blogPosts = importedPosts;
                this.saveBlogPosts();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing blog posts:', error);
            return false;
        }
    }

    /**
     * Get blog statistics
     * @returns {Object} - Blog statistics
     */
    getBlogStats() {
        const totalPosts = this.blogPosts.length;
        const totalViews = this.blogPosts.reduce((sum, post) => sum + (post.views || 0), 0);
        const totalLikes = this.blogPosts.reduce((sum, post) => sum + (post.likes || 0), 0);
        
        const categories = {};
        this.blogPosts.forEach(post => {
            categories[post.category] = (categories[post.category] || 0) + 1;
        });
        
        const mostPopular = this.blogPosts
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5);
        
        return {
            totalPosts,
            totalViews,
            totalLikes,
            categories,
            mostPopular,
            averageViews: totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0,
            averageLikes: totalPosts > 0 ? Math.round(totalLikes / totalPosts) : 0
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogManager;
} else {
    window.BlogManager = BlogManager;
}