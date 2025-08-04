# FFmpeg Installation Guide for Video Optimization

## Overview
FFmpeg is required for video optimization in the SpaceB project. This guide provides step-by-step installation instructions for Windows.

## Windows Installation

### Method 1: Using Winget (Recommended)
```powershell
# Install FFmpeg using Windows Package Manager
winget install Gyan.FFmpeg
```

### Method 2: Using Chocolatey
```powershell
# Install Chocolatey first (if not already installed)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install FFmpeg
choco install ffmpeg
```

### Method 3: Manual Installation
1. **Download FFmpeg**:
   - Go to https://www.gyan.dev/ffmpeg/builds/
   - Download the latest "release" build (full version)
   - Extract the ZIP file to `C:\ffmpeg`

2. **Add to PATH**:
   - Open System Properties (Win + R, type `sysdm.cpl`)
   - Click "Environment Variables"
   - Under "System Variables", find and select "Path"
   - Click "Edit" → "New"
   - Add: `C:\ffmpeg\bin`
   - Click "OK" to save

3. **Restart Terminal**:
   - Close all terminal windows
   - Open a new PowerShell/Command Prompt
   - Test: `ffmpeg -version`

### Method 4: Using Scoop
```powershell
# Install Scoop first (if not already installed)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Install FFmpeg
scoop install ffmpeg
```

## Verification
After installation, verify FFmpeg is working:

```powershell
# Check FFmpeg version
ffmpeg -version

# Should show something like:
# ffmpeg version 6.1.1 Copyright (c) 2000-2023 the FFmpeg developers
```

## Troubleshooting

### FFmpeg Not Found
If you get "command not found" error:

1. **Check PATH**: Ensure FFmpeg is in your system PATH
2. **Restart Terminal**: Close and reopen your terminal
3. **Restart IDE**: Close and reopen your code editor
4. **Reboot System**: If all else fails, restart your computer

### Permission Issues
If you encounter permission errors:

```powershell
# Run PowerShell as Administrator
# Then retry the installation command
```

### Alternative: Portable FFmpeg
If you can't install globally, you can use a portable version:

1. Download FFmpeg portable from https://www.gyan.dev/ffmpeg/builds/
2. Extract to your project folder: `spaceB/ffmpeg/`
3. Update the video optimizer to use the local path

## Testing Installation
Once installed, test with the video optimization system:

```bash
# Test video optimization
npm run optimize-videos

# Start automatic optimization
npm run auto-optimize-videos
```

## Next Steps
After successful FFmpeg installation:

1. **Test Video Optimization**: Run `npm run optimize-videos`
2. **Start Auto-Optimization**: Run `npm run auto-optimize-videos`
3. **Add Test Videos**: Copy some videos to the `videos/` folder
4. **Monitor Progress**: Watch the console for optimization results

## Support
If you continue to have issues:

1. Check the [FFmpeg official documentation](https://ffmpeg.org/documentation.html)
2. Verify your Windows version compatibility
3. Try a different installation method
4. Consider using Windows Subsystem for Linux (WSL)

## Alternative Solutions
If FFmpeg installation is not possible:

1. **Online Video Compressors**: Use web-based tools for manual optimization
2. **Cloud Processing**: Consider cloud-based video optimization services
3. **Pre-optimized Videos**: Use already optimized videos in your project
4. **Different Tools**: Consider alternative video processing libraries

---

**Note**: FFmpeg is essential for the automatic video optimization features. Without it, the video optimization scripts will not function.