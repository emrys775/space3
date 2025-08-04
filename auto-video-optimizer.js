const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const VideoOptimizer = require('./video-optimizer');
const { exec } = require('child_process');

/**
 * Automatic Video Optimizer
 * Watches for new videos and optimizes them automatically
 */
class AutoVideoOptimizer {
    constructor() {
        this.optimizer = new VideoOptimizer();
        this.watchedFolders = ['assets', 'assets2', 'assest3', 'videos'];
        this.videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv', '.wmv', '.m4v'];
        this.watchers = [];
        this.processingQueue = new Set();
        this.debounceTime = 5000; // 5 seconds debounce for videos (larger files)
    }

    /**
     * Check FFmpeg availability before starting
     */
    checkFFmpegAvailability() {
        return new Promise((resolve, reject) => {
            exec('ffmpeg -version', (error, stdout, stderr) => {
                if (error) {
                    console.error('\n❌ FFmpeg is not installed or not in your PATH.');
                    console.error('\n📋 To use automatic video optimization, please install FFmpeg:');
                    console.error('\n🔧 Installation options:');
                    console.error('   1. Using Winget: winget install Gyan.FFmpeg');
                    console.error('   2. Using Chocolatey: choco install ffmpeg');
                    console.error('   3. Manual installation: See FFMPEG_INSTALLATION_GUIDE.md');
                    console.error('\n📖 For detailed instructions, check: FFMPEG_INSTALLATION_GUIDE.md');
                    console.error('\n⚠️  After installation, restart your terminal and try again.\n');
                    reject(error);
                } else {
                    console.log('✅ FFmpeg is available and ready for video optimization.');
                    resolve();
                }
            });
        });
    }

    /**
     * Start watching for new videos
     */
    async startWatching() {
        console.log('🎬 Starting automatic video optimization watcher...');
        
        // Check FFmpeg availability first
        try {
            await this.checkFFmpegAvailability();
        } catch (error) {
            process.exit(1);
        }

        // Create videos folder if it doesn't exist
        if (!fs.existsSync('videos')) {
            fs.mkdirSync('videos', { recursive: true });
            console.log('📁 Created videos folder');
        }
        
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

        console.log('\n🎯 Auto-video-optimization is now active!');
        console.log('📁 Monitored folders:', this.watchedFolders.join(', '));
        console.log('🎥 Supported formats:', this.videoExtensions.join(', '));
        console.log('\n💡 Any new videos added will be automatically optimized!');
        console.log('⏱️  Note: Video optimization takes longer than images, please be patient.');
    }

    /**
     * Handle new or modified files
     */
    async handleNewFile(filePath, action) {
        const fileName = path.basename(filePath);
        const fileExt = path.extname(fileName).toLowerCase();

        // Check if it's a video file
        if (!this.videoExtensions.includes(fileExt)) {
            return;
        }

        // Skip backup files
        if (fileName.endsWith('.original')) {
            return;
        }

        // Avoid processing the same file multiple times
        if (this.processingQueue.has(filePath)) {
            return;
        }

        console.log(`\n🆕 New video detected: ${fileName} (${action})`);
        console.log('⏳ Video will be processed in 5 seconds...');
        
        // Add to processing queue
        this.processingQueue.add(filePath);

        // Debounce to avoid processing files that are still being written
        setTimeout(async () => {
            try {
                await this.optimizeNewVideo(filePath);
            } catch (error) {
                console.error(`❌ Error optimizing ${fileName}:`, error.message);
            } finally {
                this.processingQueue.delete(filePath);
            }
        }, this.debounceTime);
    }

    /**
     * Optimize a newly added video
     */
    async optimizeNewVideo(filePath) {
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

            console.log(`\n🔄 Optimizing video: ${fileName} (${this.formatBytes(originalSize)})`);
            console.log('⏱️  This may take several minutes depending on video size...');

            // Create backup of original
            const backupPath = filePath + '.original';
            fs.copyFileSync(filePath, backupPath);

            // Get video info first
            const videoInfo = await this.optimizer.getVideoInfo(filePath);
            console.log(`📊 Video info: ${videoInfo.width}x${videoInfo.height}, ${videoInfo.fps.toFixed(1)}fps, ${videoInfo.duration.toFixed(1)}s`);

            // Create temporary output path
            const tempOutputPath = filePath.replace(path.extname(filePath), '_optimized.mp4');
            
            // Build FFmpeg arguments
            const ffmpegArgs = this.optimizer.buildFFmpegArgs(filePath, tempOutputPath, videoInfo);
            
            // Run optimization
            await this.optimizer.runFFmpeg(ffmpegArgs);

            // Replace original with optimized version
            const finalOutputPath = filePath.replace(path.extname(filePath), '.mp4');
            
            // If the extension changed, remove the original file
            if (path.extname(filePath) !== '.mp4') {
                fs.unlinkSync(filePath);
            }
            
            // Move optimized file to final location
            fs.renameSync(tempOutputPath, finalOutputPath);

            const optimizedStats = fs.statSync(finalOutputPath);
            const optimizedSize = optimizedStats.size;
            const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

            console.log(`\n✅ ${fileName}: ${this.formatBytes(originalSize)} → ${this.formatBytes(optimizedSize)} (${savings}% saved)`);
            console.log(`💾 Original backed up as: ${path.basename(backupPath)}`);
            console.log(`🎬 Optimized video: ${path.basename(finalOutputPath)}`);

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
        console.log('\n🛑 Stopping video optimization watcher...');
        
        this.watchers.forEach(watcher => {
            watcher.close();
        });
        
        this.watchers = [];
        console.log('✅ Video watcher stopped');
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
        console.log('\n🧹 Cleaning up video backup files...');
        
        this.watchedFolders.forEach(folder => {
            if (fs.existsSync(folder)) {
                const files = fs.readdirSync(folder);
                
                files.forEach(file => {
                    if (file.endsWith('.original') && this.isVideoFile(file.replace('.original', ''))) {
                        const backupPath = path.join(folder, file);
                        fs.unlinkSync(backupPath);
                        console.log(`🗑️  Removed: ${file}`);
                    }
                });
            }
        });
        
        console.log('✅ Video backup cleanup completed');
    }

    /**
     * Check if file is a video
     */
    isVideoFile(fileName) {
        const ext = path.extname(fileName).toLowerCase();
        return this.videoExtensions.includes(ext);
    }

    /**
     * Get optimization statistics
     */
    async getOptimizationStats() {
        console.log('\n📊 Video Optimization Statistics');
        console.log('='.repeat(40));
        
        let totalOriginal = 0;
        let totalOptimized = 0;
        let videoCount = 0;
        
        for (const folder of this.watchedFolders) {
            if (fs.existsSync(folder)) {
                const files = fs.readdirSync(folder);
                
                for (const file of files) {
                    if (this.isVideoFile(file) && !file.endsWith('.original')) {
                        const filePath = path.join(folder, file);
                        const backupPath = filePath + '.original';
                        
                        if (fs.existsSync(backupPath)) {
                            const originalSize = fs.statSync(backupPath).size;
                            const optimizedSize = fs.statSync(filePath).size;
                            
                            totalOriginal += originalSize;
                            totalOptimized += optimizedSize;
                            videoCount++;
                            
                            const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
                            console.log(`📹 ${file}: ${savings}% saved`);
                        }
                    }
                }
            }
        }
        
        if (videoCount > 0) {
            const totalSavings = totalOriginal - totalOptimized;
            const savingsPercentage = ((totalSavings / totalOriginal) * 100).toFixed(1);
            
            console.log('='.repeat(40));
            console.log(`🎥 Total videos optimized: ${videoCount}`);
            console.log(`📦 Original total size: ${this.formatBytes(totalOriginal)}`);
            console.log(`🗜️  Optimized total size: ${this.formatBytes(totalOptimized)}`);
            console.log(`💾 Total savings: ${this.formatBytes(totalSavings)} (${savingsPercentage}%)`);
        } else {
            console.log('📭 No optimized videos found');
        }
    }
}

/**
 * CLI Interface
 */
if (require.main === module) {
    const args = process.argv.slice(2);
    const autoOptimizer = new AutoVideoOptimizer();
    
    if (args.includes('--cleanup')) {
        // Clean up backup files
        autoOptimizer.cleanupBackups();
    } else if (args.includes('--stats')) {
        // Show optimization statistics
        autoOptimizer.getOptimizationStats();
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

module.exports = AutoVideoOptimizer;