const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8001;
const BLOG_POSTS_DIR = path.join(__dirname, 'blog-posts');

// Ensure blog-posts directory exists
if (!fs.existsSync(BLOG_POSTS_DIR)) {
    fs.mkdirSync(BLOG_POSTS_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    if (pathname === '/save-blog-post' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { fileName, content, postId } = data;
                
                if (!fileName || !content) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing fileName or content' }));
                    return;
                }
                
                const filePath = path.join(BLOG_POSTS_DIR, fileName);
                
                fs.writeFile(filePath, content, 'utf8', (err) => {
                    if (err) {
                        console.error('Error saving blog post:', err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Failed to save file' }));
                        return;
                    }
                    
                    console.log(`Blog post saved: ${fileName}`);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: true, 
                        fileName: fileName,
                        path: `blog-posts/${fileName}`
                    }));
                });
                
            } catch (error) {
                console.error('Error parsing request:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        
    } else if (pathname === '/list-blog-posts' && req.method === 'GET') {
        // List all blog post files
        fs.readdir(BLOG_POSTS_DIR, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to read directory' }));
                return;
            }
            
            const htmlFiles = files.filter(file => file.endsWith('.html'));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ files: htmlFiles }));
        });
        
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Blog server running on http://localhost:${PORT}`);
    console.log(`Blog posts will be saved to: ${BLOG_POSTS_DIR}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down blog server...');
    server.close(() => {
        console.log('Blog server stopped.');
        process.exit(0);
    });
});