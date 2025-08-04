# Blog Sidebar Widget

This document explains how to use the reusable blog sidebar widget for any blog post on the Prosoft Digital Space website.

## Files Created

1. **`sidebar-widget.html`** - The reusable sidebar widget HTML
2. **`blog-template.html`** - Template for creating new blog posts
3. **Updated `script.js`** - Added automatic sidebar loading functionality

## How to Use

### For New Blog Posts

1. Copy `blog-template.html` and rename it to your new blog post filename (e.g., `blog-new-post.html`)
2. Update the following in your new file:
   - Page title in the `<title>` tag
   - Blog category in the `<span class="blog-category">` tag
   - Blog post title in the `<h1>` tag
   - Reading time, date, and author in the blog meta section
   - Icon class in the article image section
   - Replace placeholder content with your actual blog content
   - Update the call-to-action button text and link

3. The sidebar will automatically load when the page loads (no additional setup required)

### For Existing Blog Posts

Existing blog posts already have the sidebar integrated. If you need to add the sidebar to a new page:

1. Ensure your blog post has the `blog-layout` class structure:
   ```html
   <div class="blog-layout">
       <main class="blog-main">
           <!-- Your blog content here -->
       </main>
       <!-- Sidebar will be automatically loaded here -->
   </div>
   ```

2. Include the `script.js` file in your page
3. The sidebar will automatically load

## Sidebar Features

The sidebar widget includes:

- **Recent Posts** - Links to the latest blog articles
- **Advertisement Spaces** - Monetization opportunities
- **Categories** - Content organization with post counts
- **Newsletter Signup** - Email subscription form
- **Banner Ads** - Additional promotional space

## Customizing the Sidebar

To modify the sidebar content:

1. Edit `sidebar-widget.html`
2. Update recent posts, categories, or advertisement content as needed
3. The changes will automatically apply to all blog posts that use the widget

## Technical Details

- The sidebar loads via JavaScript fetch API
- Falls back gracefully if the widget file is not found
- Responsive design that stacks below main content on mobile devices
- Uses existing CSS classes from `styles.css`

## Benefits

- **Consistency** - Same sidebar across all blog posts
- **Maintainability** - Update once, applies everywhere
- **Easy Integration** - Just use the template or add the blog-layout structure
- **Automatic Loading** - No manual inclusion required