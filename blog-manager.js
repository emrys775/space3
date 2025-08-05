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