# Video Optimization Guide for SpaceB Project

## Overview
This guide explains how to use both manual and automatic video optimization to reduce file sizes while maintaining quality for faster loading times and better web performance.

## 🚀 NEW: Automatic Video Optimization
For seamless development, use the automatic video optimizer that watches for new videos and optimizes them in real-time:

```bash
npm run auto-optimize-videos
```

This will automatically optimize any new videos you add to the project. The system monitors all asset folders and the dedicated `videos/` folder.

## Prerequisites

### FFmpeg Installation
Video optimization requires FFmpeg. Install it based on your operating system:

**Windows:**
```bash
# Using winget (recommended)
winget install FFmpeg

# Or download from https://ffmpeg.org/download.html
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install ffmpeg
```

## Features

### Smart Video Compression
- **H.264 Encoding**: Uses industry-standard codec for maximum compatibility
- **Constant Rate Factor (CRF)**: Maintains consistent quality (CRF 23 for optimal balance)
- **Intelligent Scaling**: Automatically resizes videos larger than 1920x1080
- **Frame Rate Optimization**: Limits frame rate to 30fps for web delivery
- **Fast Start**: Enables progressive loading for web playback

### Audio Optimization
- **AAC Encoding**: High-quality, web-compatible audio codec
- **Bitrate Control**: Optimized 128kbps audio bitrate
- **Audio Preservation**: Maintains audio quality while reducing size

### Supported Formats
- **Input**: MP4, AVI, MOV, MKV, WebM, FLV, WMV, M4V
- **Output**: MP4 (optimized for web)

## Manual Video Optimization

### 1. Run Video Optimization (Preview Mode)
```bash
npm run optimize-videos
```
This will:
- Process all videos in asset folders
- Create optimized versions in the `optimized-videos/` folder
- Show detailed compression statistics
- **Keep your original videos unchanged**

### 2. Replace Original Videos (Production Mode)
```bash
npm run optimize-videos-replace
```
This will:
- Replace your original videos with optimized versions
- Create `.original` backups of source files
- **⚠️ Warning**: This permanently modifies your original files

## Automatic Video Optimization

### Start Automatic Optimization
```bash
npm run auto-optimize-videos
```

This will:
- Monitor all asset folders (`assets`, `assets2`, `assest3`, `videos`)
- Automatically optimize any new videos added
- Create backups of original files
- Show real-time optimization progress
- Keep running until you stop it (Ctrl+C)

### Stop Automatic Optimization
Press `Ctrl+C` in the terminal to stop the watcher gracefully.

## How Automatic Optimization Works

1. **File Detection**: Monitors asset folders for new or modified video files
2. **Debounce Wait**: Waits 5 seconds to ensure file operations are complete
3. **Video Analysis**: Analyzes video properties (resolution, frame rate, duration)
4. **Backup Creation**: Creates a `.original` backup of the new video
5. **Optimization**: Applies smart compression while maintaining quality
6. **Replacement**: Replaces the original with the optimized version
7. **Reporting**: Shows file size savings and optimization results

## Optimization Settings

### Video Quality Settings
| Parameter | Value | Description |
|-----------|-------|-------------|
| **CRF** | 23 | Constant Rate Factor (18-28, lower = better quality) |
| **Preset** | medium | Encoding speed vs compression efficiency |
| **Max Bitrate** | 2M | Maximum bitrate for quality control |
| **Buffer Size** | 4M | Buffer size for bitrate control |

### Web Optimization Settings
| Parameter | Value | Description |
|-----------|-------|-------------|
| **Max Resolution** | 1920x1080 | Maximum video dimensions |
| **Max Frame Rate** | 30fps | Optimal frame rate for web |
| **Audio Codec** | AAC | Web-compatible audio format |
| **Audio Bitrate** | 128k | Optimal audio quality/size balance |

## Usage Scenarios

### Development Workflow
```bash
# Terminal 1: Start auto-optimization
npm run auto-optimize-videos

# Terminal 2: Continue development
# Any videos you add will be automatically optimized
```

### Adding New Videos
1. Copy/paste videos into any monitored folder
2. The system automatically detects and optimizes them
3. Original files are backed up with `.original` extension
4. Optimized versions replace the originals
5. Progress is shown in real-time

### Batch Processing Existing Videos
```bash
# Optimize all existing videos
npm run optimize-videos

# Review optimized videos, then replace if satisfied
npm run optimize-videos-replace
```

## File Management

### Backup System
- Original files are saved as `filename.mp4.original`
- Backups are created before any optimization
- Use backups to restore if needed

### Cleanup Operations
```bash
# Remove all video backup files
npm run cleanup-video-backups

# View optimization statistics
npm run video-stats
```

## Expected Results

### Typical Compression Ratios
- **High-resolution videos**: 60-80% size reduction
- **Standard videos**: 40-60% size reduction
- **Already optimized videos**: 10-30% size reduction

### Performance Improvements
- **Loading Speed**: 2-5x faster video loading
- **Bandwidth Usage**: 40-80% reduction
- **Mobile Performance**: Significantly improved
- **Streaming Quality**: Better progressive loading

## Example Output

```
🎬 Starting automatic video optimization watcher...
✅ Watching folder: assets
✅ Watching folder: videos

🎯 Auto-video-optimization is now active!
📁 Monitored folders: assets, assets2, assest3, videos
🎥 Supported formats: .mp4, .avi, .mov, .mkv, .webm, .flv, .wmv, .m4v

💡 Any new videos added will be automatically optimized!

🆕 New video detected: demo-video.mov (added)
⏳ Video will be processed in 5 seconds...

🔄 Optimizing video: demo-video.mov (45.2 MB)
📊 Video info: 1920x1080, 29.97fps, 120.5s
⏳ Processing... 00:01:23.45

✅ demo-video.mov: 45.2 MB → 12.8 MB (71.7% saved)
💾 Original backed up as: demo-video.mov.original
🎬 Optimized video: demo-video.mp4
```

## Folder Structure After Optimization

```
spaceB/
├── assets/              # Original + optimized videos
├── assets2/             # Original + optimized videos
├── assest3/             # Original + optimized videos
├── videos/              # Dedicated video folder
├── optimized-videos/    # Manual optimization output
│   ├── assets/
│   ├── assets2/
│   ├── assest3/
│   └── videos/
└── video-optimizer.js
```

## Best Practices

### Development
1. **Start auto-optimization** during development for seamless workflow
2. **Use dedicated videos folder** for better organization
3. **Monitor console output** for optimization progress
4. **Test optimized videos** to ensure quality meets requirements

### Production
1. **Clean up backups** before deployment: `npm run cleanup-video-backups`
2. **Verify video compatibility** across different browsers
3. **Test loading performance** on various connection speeds
4. **Consider CDN delivery** for large video files

### Quality Control
1. **Review optimized videos** before replacing originals
2. **Adjust CRF settings** if quality is not satisfactory
3. **Keep backups** until you're satisfied with results
4. **Test on mobile devices** for performance validation

## Troubleshooting

### Common Issues

**FFmpeg not found:**
```bash
# Verify FFmpeg installation
ffmpeg -version

# Install if missing (see Prerequisites section)
```

**Video not being detected:**
- Check if file is in monitored folders
- Verify file extension is supported
- Wait 5 seconds after copying files
- Check console for error messages

**Optimization fails:**
- Ensure sufficient disk space
- Check video file is not corrupted
- Verify FFmpeg has necessary codecs
- Review console error messages

**Quality issues:**
- Adjust CRF value in `video-optimizer.js` (lower = better quality)
- Modify preset for different speed/quality balance
- Test with different source videos

### Recovery

**Restore original video:**
```bash
# If you have a backup
copy video.mp4.original video.mp4
```

**Stop and restart watcher:**
```bash
# Press Ctrl+C to stop
# Then restart
npm run auto-optimize-videos
```

## Advanced Configuration

To modify optimization settings, edit the compression settings in `video-optimizer.js`:

```javascript
this.compressionSettings = {
    quality: {
        crf: 23,           // Lower = better quality (18-28)
        preset: 'medium',  // faster, fast, medium, slow, slower
        maxBitrate: '2M',  // Maximum bitrate
        bufsize: '4M'      // Buffer size
    },
    web: {
        maxWidth: 1920,    // Maximum width
        maxHeight: 1080,   // Maximum height
        fps: 30,           // Target frame rate
        audioCodec: 'aac', // Audio codec
        audioBitrate: '128k' // Audio bitrate
    }
};
```

## Integration with Web Development

### HTML5 Video Tags
```html
<!-- Optimized video with fallbacks -->
<video controls preload="metadata">
    <source src="videos/demo-video.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

### Progressive Loading
Optimized videos include fast-start metadata for immediate playback:

```html
<video controls preload="auto" poster="thumbnail.jpg">
    <source src="videos/optimized-video.mp4" type="video/mp4">
</video>
```

## System Requirements

- **Node.js**: >= 14.0.0
- **FFmpeg**: Latest stable version
- **Disk Space**: 2x video file size during optimization
- **Memory**: Sufficient RAM for video processing
- **CPU**: Multi-core recommended for faster encoding

## Performance Monitoring

### Check Optimization Statistics
```bash
npm run video-stats
```

This shows:
- Total videos optimized
- Original vs optimized file sizes
- Percentage savings per video
- Overall compression statistics

### Monitor System Resources
- **CPU Usage**: Video encoding is CPU-intensive
- **Disk I/O**: Monitor during batch processing
- **Memory Usage**: Large videos require more RAM
- **Network**: Consider bandwidth for video delivery