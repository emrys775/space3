const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

/**
 * Video Optimizer for SpaceB Project
 * Reduces video file sizes while maintaining quality for fast loading
 */
class VideoOptimizer {
    constructor() {
        this.videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv', '.wmv', '.m4v'];
        this.videoFolders = ['assets', 'assets2', 'assest3', 'video'];
        this.optimizedFolder = 'optimized-videos';
        this.compressionSettings = {
            // High quality, good compression
            quality: {
                crf: 23, // Constant Rate Factor (18-28, lower = better quality)
                preset: 'medium', // Encoding speed vs compression efficiency
                maxBitrate: '2M', // Maximum bitrate
                bufsize: '4M' // Buffer size
            },
            // Web-optimized settings
            web: {
                maxWidth: 1920,
                maxHeight: 1080,
                fps: 30,
                audioCodec: 'aac',
                audioBitrate: '128k'
            }
        };
    }

    /**
     * Check if FFmpeg is available
     */
    async checkFFmpeg() {
        try {
            await execPromise('ffmpeg -version');
            return true;
        } catch (error) {
            console.error('❌ FFmpeg not found. Please install FFmpeg:');
            console.error('   Windows: Download from https://ffmpeg.org/download.html');
            console.error('   Or use: winget install FFmpeg');
            console.error('   macOS: brew install ffmpeg');
            console.error('   Linux: sudo apt install ffmpeg');
            return false;
        }
    }

    /**
     * Check ffmpeg availability
     */
    checkFFmpegAvailability() {
        exec('ffmpeg -version', (error, stdout, stderr) => {
            if (error) {
                console.error('\n❌ FFmpeg is not installed or not in your PATH.');
                console.error('\n📋 To use video optimization, please install FFmpeg:');
                console.error('\n🔧 Installation options:');
                console.error('   1. Using Winget: winget install Gyan.FFmpeg');
                console.error('   2. Using Chocolatey: choco install ffmpeg');
                console.error('   3. Manual installation: See FFMPEG_INSTALLATION_GUIDE.md');
                console.error('\n📖 For detailed instructions, check: FFMPEG_INSTALLATION_GUIDE.md');
                console.error('\n⚠️  After installation, restart your terminal and try again.\n');
                process.exit(1);
            } else {
                console.log('✅ FFmpeg is available and ready for video optimization.');
            }
        });
    }

    /**
     * Initialize the optimization process
     */
    async init() {
        console.log('🎬 Starting Video Optimization Process...');
        
        // Check FFmpeg availability
        const ffmpegAvailable = await this.checkFFmpeg();
        if (!ffmpegAvailable) {
            return;
        }

        // Create optimized folder if it doesn't exist
        if (!fs.existsSync(this.optimizedFolder)) {
            fs.mkdirSync(this.optimizedFolder, { recursive: true });
        }

        let totalOriginalSize = 0;
        let totalOptimizedSize = 0;
        let processedCount = 0;

        for (const folder of this.videoFolders) {
            if (fs.existsSync(folder)) {
                console.log(`\n📁 Processing folder: ${folder}`);
                const result = await this.optimizeFolder(folder);
                totalOriginalSize += result.originalSize;
                totalOptimizedSize += result.optimizedSize;
                processedCount += result.count;
            } else {
                console.log(`⚠️  Folder not found: ${folder}`);
            }
        }

        this.printSummary(totalOriginalSize, totalOptimizedSize, processedCount);
    }

    /**
     * Optimize all videos in a specific folder
     */
    async optimizeFolder(folderPath) {
        const files = fs.readdirSync(folderPath);
        let originalSize = 0;
        let optimizedSize = 0;
        let count = 0;

        // Create corresponding optimized subfolder
        const optimizedSubfolder = path.join(this.optimizedFolder, folderPath);
        if (!fs.existsSync(optimizedSubfolder)) {
            fs.mkdirSync(optimizedSubfolder, { recursive: true });
        }

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isFile() && this.isVideoFile(file)) {
                try {
                    console.log(`\n🔄 Processing: ${file}...`);
                    const result = await this.optimizeVideo(filePath, optimizedSubfolder);
                    originalSize += result.originalSize;
                    optimizedSize += result.optimizedSize;
                    count++;
                    
                    const savings = ((result.originalSize - result.optimizedSize) / result.originalSize * 100).toFixed(1);
                    console.log(`✅ ${file}: ${this.formatBytes(result.originalSize)} → ${this.formatBytes(result.optimizedSize)} (${savings}% saved)`);
                } catch (error) {
                    console.error(`❌ Error optimizing ${file}:`, error.message);
                }
            }
        }

        return { originalSize, optimizedSize, count };
    }

    /**
     * Optimize a single video file
     */
    async optimizeVideo(inputPath, outputFolder) {
        const fileName = path.basename(inputPath, path.extname(inputPath));
        const outputPath = path.join(outputFolder, `${fileName}.mp4`);
        
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;

        // Get video information
        const videoInfo = await this.getVideoInfo(inputPath);
        
        // Build FFmpeg command
        const ffmpegArgs = this.buildFFmpegArgs(inputPath, outputPath, videoInfo);
        
        // Run FFmpeg optimization
        await this.runFFmpeg(ffmpegArgs);

        const optimizedStats = fs.statSync(outputPath);
        const optimizedSize = optimizedStats.size;

        return { originalSize, optimizedSize };
    }

    /**
     * Get video information using FFprobe
     */
    async getVideoInfo(inputPath) {
        try {
            const { stdout } = await execPromise(
                `ffprobe -v quiet -print_format json -show_format -show_streams "${inputPath}"`
            );
            const info = JSON.parse(stdout);
            
            const videoStream = info.streams.find(s => s.codec_type === 'video');
            const audioStream = info.streams.find(s => s.codec_type === 'audio');
            
            return {
                duration: parseFloat(info.format.duration),
                width: videoStream ? videoStream.width : 0,
                height: videoStream ? videoStream.height : 0,
                fps: videoStream ? eval(videoStream.r_frame_rate) : 30,
                hasAudio: !!audioStream,
                bitrate: parseInt(info.format.bit_rate) || 0
            };
        } catch (error) {
            console.warn(`⚠️  Could not get video info for ${path.basename(inputPath)}, using defaults`);
            return {
                duration: 0,
                width: 1920,
                height: 1080,
                fps: 30,
                hasAudio: true,
                bitrate: 0
            };
        }
    }

    /**
     * Build FFmpeg arguments for optimization
     */
    buildFFmpegArgs(inputPath, outputPath, videoInfo) {
        const args = [
            '-i', inputPath,
            '-c:v', 'libx264', // Video codec
            '-crf', this.compressionSettings.quality.crf.toString(),
            '-preset', this.compressionSettings.quality.preset,
            '-maxrate', this.compressionSettings.quality.maxBitrate,
            '-bufsize', this.compressionSettings.quality.bufsize
        ];

        // Scale video if too large
        const maxWidth = this.compressionSettings.web.maxWidth;
        const maxHeight = this.compressionSettings.web.maxHeight;
        
        if (videoInfo.width > maxWidth || videoInfo.height > maxHeight) {
            args.push('-vf', `scale='min(${maxWidth},iw)':'min(${maxHeight},ih)':force_original_aspect_ratio=decrease`);
        }

        // Limit frame rate if too high
        if (videoInfo.fps > this.compressionSettings.web.fps) {
            args.push('-r', this.compressionSettings.web.fps.toString());
        }

        // Audio settings
        if (videoInfo.hasAudio) {
            args.push(
                '-c:a', this.compressionSettings.web.audioCodec,
                '-b:a', this.compressionSettings.web.audioBitrate
            );
        }

        // Output settings
        args.push(
            '-movflags', '+faststart', // Enable fast start for web
            '-pix_fmt', 'yuv420p', // Ensure compatibility
            '-y', // Overwrite output file
            outputPath
        );

        return args;
    }

    /**
     * Run FFmpeg with progress tracking
     */
    async runFFmpeg(args) {
        return new Promise((resolve, reject) => {
            const ffmpeg = spawn('ffmpeg', args);
            let stderr = '';

            ffmpeg.stderr.on('data', (data) => {
                stderr += data.toString();
                // Extract progress information
                const timeMatch = stderr.match(/time=([\d:.]+)/);
                if (timeMatch) {
                    process.stdout.write(`\r⏳ Processing... ${timeMatch[1]}`);
                }
            });

            ffmpeg.on('close', (code) => {
                process.stdout.write('\r'); // Clear progress line
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`FFmpeg exited with code ${code}`));
                }
            });

            ffmpeg.on('error', (error) => {
                reject(error);
            });
        });
    }

    /**
     * Check if file is a video
     */
    isVideoFile(fileName) {
        const ext = path.extname(fileName).toLowerCase();
        return this.videoExtensions.includes(ext);
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
     * Print optimization summary
     */
    printSummary(originalSize, optimizedSize, count) {
        const totalSavings = originalSize - optimizedSize;
        const savingsPercentage = originalSize > 0 ? ((totalSavings / originalSize) * 100).toFixed(1) : '0';
        
        console.log('\n' + '='.repeat(50));
        console.log('🎬 VIDEO OPTIMIZATION SUMMARY');
        console.log('='.repeat(50));
        console.log(`🎥 Videos processed: ${count}`);
        console.log(`📦 Original total size: ${this.formatBytes(originalSize)}`);
        console.log(`🗜️  Optimized total size: ${this.formatBytes(optimizedSize)}`);
        console.log(`💾 Total savings: ${this.formatBytes(totalSavings)} (${savingsPercentage}%)`);
        console.log(`📁 Optimized videos saved to: ${this.optimizedFolder}/`);
        console.log('='.repeat(50));
        
        if (count > 0) {
            console.log('\n💡 Next steps:');
            console.log('1. Review optimized videos in the optimized-videos folder');
            console.log('2. Test video playback and quality');
            console.log('3. Replace original videos with optimized versions if satisfied');
            console.log('4. Update video paths in your code if needed');
        }
    }

    /**
     * Replace original videos with optimized versions
     */
    async replaceOriginalVideos() {
        console.log('\n🔄 Replacing original videos with optimized versions...');
        
        for (const folder of this.videoFolders) {
            const optimizedFolderPath = path.join(this.optimizedFolder, folder);
            
            if (fs.existsSync(optimizedFolderPath)) {
                const files = fs.readdirSync(optimizedFolderPath);
                
                for (const file of files) {
                    const optimizedFilePath = path.join(optimizedFolderPath, file);
                    const originalFileName = path.basename(file, '.mp4');
                    
                    // Find original file with any supported extension
                    const originalFiles = fs.readdirSync(folder).filter(f => {
                        const nameWithoutExt = path.basename(f, path.extname(f));
                        return nameWithoutExt === originalFileName && this.isVideoFile(f);
                    });
                    
                    if (originalFiles.length > 0) {
                        const originalFilePath = path.join(folder, originalFiles[0]);
                        
                        // Backup original
                        const backupPath = originalFilePath + '.original';
                        fs.copyFileSync(originalFilePath, backupPath);
                        
                        // Replace with optimized version
                        fs.copyFileSync(optimizedFilePath, originalFilePath.replace(path.extname(originalFilePath), '.mp4'));
                        
                        // Remove old file if extension changed
                        if (path.extname(originalFilePath) !== '.mp4') {
                            fs.unlinkSync(originalFilePath);
                        }
                        
                        console.log(`✅ Replaced: ${originalFiles[0]} → ${path.basename(file)}`);
                    }
                }
            }
        }
        
        console.log('\n🎉 All videos have been replaced with optimized versions!');
    }
}

/**
 * CLI Interface
 */
if (require.main === module) {
    const args = process.argv.slice(2);
    const optimizer = new VideoOptimizer();
    
    if (args.includes('--replace')) {
        // Replace original videos with optimized versions
        optimizer.replaceOriginalVideos().catch(console.error);
    } else {
        // Run optimization
        optimizer.init().catch(console.error);
    }
}

module.exports = VideoOptimizer;