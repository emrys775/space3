const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * Image Optimizer for SpaceB Project
 * Reduces image file sizes while maintaining quality for fast loading
 */
class ImageOptimizer {
    constructor() {
        this.imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
        this.imageFolders = ['assets', 'assets2', 'assest3'];
        this.optimizedFolder = 'optimized-images';
        this.compressionSettings = {
            jpeg: { quality: 85, progressive: true },
            png: { compressionLevel: 8, progressive: true },
            webp: { quality: 85, effort: 6 }
        };
    }

    /**
     * Initialize the optimization process
     */
    async init() {
        console.log('🚀 Starting Image Optimization Process...');
        
        // Create optimized folder if it doesn't exist
        if (!fs.existsSync(this.optimizedFolder)) {
            fs.mkdirSync(this.optimizedFolder, { recursive: true });
        }

        let totalOriginalSize = 0;
        let totalOptimizedSize = 0;
        let processedCount = 0;

        for (const folder of this.imageFolders) {
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
     * Optimize all images in a specific folder
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

            if (stat.isFile() && this.isImageFile(file)) {
                try {
                    const result = await this.optimizeImage(filePath, optimizedSubfolder);
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
     * Optimize a single image file
     */
    async optimizeImage(inputPath, outputFolder) {
        const fileName = path.basename(inputPath);
        const fileExt = path.extname(fileName).toLowerCase();
        const outputPath = path.join(outputFolder, fileName);
        
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;

        let sharpInstance = sharp(inputPath);
        
        // Get image metadata
        const metadata = await sharpInstance.metadata();
        
        // Resize if image is too large (max width: 1920px)
        if (metadata.width > 1920) {
            sharpInstance = sharpInstance.resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        // Apply compression based on file type
        switch (fileExt) {
            case '.jpg':
            case '.jpeg':
                await sharpInstance
                    .jpeg(this.compressionSettings.jpeg)
                    .toFile(outputPath);
                break;
                
            case '.png':
                await sharpInstance
                    .png(this.compressionSettings.png)
                    .toFile(outputPath);
                break;
                
            case '.webp':
                await sharpInstance
                    .webp(this.compressionSettings.webp)
                    .toFile(outputPath);
                break;
                
            default:
                // For other formats, just copy
                fs.copyFileSync(inputPath, outputPath);
        }

        const optimizedStats = fs.statSync(outputPath);
        const optimizedSize = optimizedStats.size;

        return { originalSize, optimizedSize };
    }

    /**
     * Check if file is an image
     */
    isImageFile(fileName) {
        const ext = path.extname(fileName).toLowerCase();
        return this.imageExtensions.includes(ext);
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
        const savingsPercentage = ((totalSavings / originalSize) * 100).toFixed(1);
        
        console.log('\n' + '='.repeat(50));
        console.log('📊 OPTIMIZATION SUMMARY');
        console.log('='.repeat(50));
        console.log(`📸 Images processed: ${count}`);
        console.log(`📦 Original total size: ${this.formatBytes(originalSize)}`);
        console.log(`🗜️  Optimized total size: ${this.formatBytes(optimizedSize)}`);
        console.log(`💾 Total savings: ${this.formatBytes(totalSavings)} (${savingsPercentage}%)`);
        console.log(`📁 Optimized images saved to: ${this.optimizedFolder}/`);
        console.log('='.repeat(50));
        
        if (count > 0) {
            console.log('\n💡 Next steps:');
            console.log('1. Review optimized images in the optimized-images folder');
            console.log('2. Replace original images with optimized versions if satisfied');
            console.log('3. Update image paths in your code if needed');
        }
    }

    /**
     * Replace original images with optimized versions
     */
    async replaceOriginalImages() {
        console.log('\n🔄 Replacing original images with optimized versions...');
        
        for (const folder of this.imageFolders) {
            const optimizedFolderPath = path.join(this.optimizedFolder, folder);
            
            if (fs.existsSync(optimizedFolderPath)) {
                const files = fs.readdirSync(optimizedFolderPath);
                
                for (const file of files) {
                    const optimizedFilePath = path.join(optimizedFolderPath, file);
                    const originalFilePath = path.join(folder, file);
                    
                    if (fs.existsSync(originalFilePath)) {
                        fs.copyFileSync(optimizedFilePath, originalFilePath);
                        console.log(`✅ Replaced: ${originalFilePath}`);
                    }
                }
            }
        }
        
        console.log('\n🎉 All images have been replaced with optimized versions!');
    }
}

/**
 * CLI Interface
 */
if (require.main === module) {
    const args = process.argv.slice(2);
    const optimizer = new ImageOptimizer();
    
    if (args.includes('--replace')) {
        // Replace original images with optimized versions
        optimizer.replaceOriginalImages().catch(console.error);
    } else {
        // Run optimization
        optimizer.init().catch(console.error);
    }
}

module.exports = ImageOptimizer;