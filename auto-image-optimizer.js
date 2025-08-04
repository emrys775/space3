const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const ImageOptimizer = require('./image-optimizer');

/**
 * Automatic Image Optimizer
 * Watches for new images and optimizes them automatically
 */
class AutoImageOptimizer {
    constructor() {
        this.optimizer = new ImageOptimizer();
        this.watchedFolders = ['assets', 'assets2', 'assest3'];
        this.imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
        this.watchers = [];
        this.processingQueue = new Set();
        this.debounceTime = 2000; // 2 seconds debounce
    }

    /**
     * Start watching for new images
     */
    startWatching() {
        console.log('🔍 Starting automatic image optimization watcher...');
        
        this.watchedFolders.forEach(folder => {
            if (fs.existsSync(folder)) {
                const watcher = chokidar.watch(folder, {
                    ignored: /(^|[\/\\])\../, // ignore dotfiles
                    persistent: true,
                    ignoreInitial: true // don't trigger for existing files
                });

                watcher
                    .on('add', (filePath) => this.handleNewFile(filePath, 'added'))
                    .on('change', (filePath) => this.handleNewFile(filePath, 'modified'))
                    .on('ready', () => {
                        console.log(`✅ Watching folder: ${folder}`);
                    })
                    .on('error', (error) => {
                        console.error(`❌ Watcher error for ${folder}:`, error);
                    });

                this.watchers.push(watcher);
            } else {
                console.log(`⚠️  Folder not found: ${folder}`);
            }
        });

        console.log('\n🎯 Auto-optimization is now active!');
        console.log('📁 Monitored folders:', this.watchedFolders.join(', '));
        console.log('🖼️  Supported formats:', this.imageExtensions.join(', '));
        console.log('\n💡 Any new images added will be automatically optimized!');
    }

    /**
     * Handle new or modified files
     */
    async handleNewFile(filePath, action) {
        const fileName = path.basename(filePath);
        const fileExt = path.extname(fileName).toLowerCase();

        // Check if it's an image file
        if (!this.imageExtensions.includes(fileExt)) {
            return;
        }

        // Avoid processing the same file multiple times
        if (this.processingQueue.has(filePath)) {
            return;
        }

        console.log(`\n🆕 New image detected: ${fileName} (${action})`);
        
        // Add to processing queue
        this.processingQueue.add(filePath);

        // Debounce to avoid processing files that are still being written
        setTimeout(async () => {
            try {
                await this.optimizeNewImage(filePath);
            } catch (error) {
                console.error(`❌ Error optimizing ${fileName}:`, error.message);
            } finally {
                this.processingQueue.delete(filePath);
            }
        }, this.debounceTime);
    }

    /**
     * Optimize a newly added image
     */
    async optimizeNewImage(filePath) {
        const fileName = path.basename(filePath);
        const folderName = path.dirname(filePath);
        
        try {
            // Check if file still exists (might have been deleted)
            if (!fs.existsSync(filePath)) {
                console.log(`⚠️  File no longer exists: ${fileName}`);
                return;
            }

            const originalStats = fs.statSync(filePath);
            const originalSize = originalStats.size;

            console.log(`🔄 Optimizing: ${fileName} (${this.formatBytes(originalSize)})`);

            // Create backup of original
            const backupPath = filePath + '.original';
            fs.copyFileSync(filePath, backupPath);

            // Optimize the image in place
            const result = await this.optimizer.optimizeImage(filePath, folderName);
            
            // Replace original with optimized version
            const optimizedPath = path.join(folderName, fileName);
            if (fs.existsSync(optimizedPath) && optimizedPath !== filePath) {
                fs.copyFileSync(optimizedPath, filePath);
                fs.unlinkSync(optimizedPath); // Remove temporary optimized file
            }

            const optimizedStats = fs.statSync(filePath);
            const optimizedSize = optimizedStats.size;
            const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

            console.log(`✅ ${fileName}: ${this.formatBytes(originalSize)} → ${this.formatBytes(optimizedSize)} (${savings}% saved)`);
            console.log(`💾 Original backed up as: ${path.basename(backupPath)}`);

        } catch (error) {
            console.error(`❌ Failed to optimize ${fileName}:`, error.message);
            
            // Restore from backup if optimization failed
            const backupPath = filePath + '.original';
            if (fs.existsSync(backupPath)) {
                fs.copyFileSync(backupPath, filePath);
                console.log(`🔄 Restored original file from backup`);
            }
        }
    }

    /**
     * Stop watching for changes
     */
    stopWatching() {
        console.log('\n🛑 Stopping image optimization watcher...');
        
        this.watchers.forEach(watcher => {
            watcher.close();
        });
        
        this.watchers = [];
        console.log('✅ Watcher stopped');
    }

    /**
     * Format bytes to human readable format
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Clean up backup files
     */
    cleanupBackups() {
        console.log('\n🧹 Cleaning up backup files...');
        
        this.watchedFolders.forEach(folder => {
            if (fs.existsSync(folder)) {
                const files = fs.readdirSync(folder);
                
                files.forEach(file => {
                    if (file.endsWith('.original')) {
                        const backupPath = path.join(folder, file);
                        fs.unlinkSync(backupPath);
                        console.log(`🗑️  Removed: ${file}`);
                    }
                });
            }
        });
        
        console.log('✅ Backup cleanup completed');
    }
}

/**
 * CLI Interface
 */
if (require.main === module) {
    const args = process.argv.slice(2);
    const autoOptimizer = new AutoImageOptimizer();
    
    if (args.includes('--cleanup')) {
        // Clean up backup files
        autoOptimizer.cleanupBackups();
    } else {
        // Start watching
        autoOptimizer.startWatching();
        
        // Handle graceful shutdown
        process.on('SIGINT', () => {
            autoOptimizer.stopWatching();
            process.exit(0);
        });
        
        process.on('SIGTERM', () => {
            autoOptimizer.stopWatching();
            process.exit(0);
        });
    }
}

module.exports = AutoImageOptimizer;