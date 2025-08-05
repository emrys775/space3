# Deployment Guide for Prosoft Digital Space

This guide will walk you through deploying your Prosoft Digital Space website to Vercel.

## Prerequisites

1. **Git Repository**: Your project should be in a Git repository (GitHub, GitLab, or Bitbucket)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Node.js**: Ensure you have Node.js installed locally (for development)

## Step-by-Step Deployment Process

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub** (recommended):
   - Create a new repository on GitHub
   - Add the remote origin:
     ```bash
     git remote add origin https://github.com/yourusername/prosoft-digital-space.git
     git branch -M main
     git push -u origin main
     ```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Sign in to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your repository from the list
   - Click "Import"

3. **Configure Project**:
   - **Project Name**: `prosoft-digital-space` (or your preferred name)
   - **Framework Preset**: Select "Other" (since it's a static site)
   - **Root Directory**: Leave as `./` (root)
   - **Build Command**: Leave empty or use `npm run build`
   - **Output Directory**: Leave empty (Vercel will serve from root)
   - **Install Command**: `npm install` (optional, since no build dependencies)

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)
   - Your site will be available at `https://your-project-name.vercel.app`

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**:
   ```bash
   cd "d:\Trae AI Projects\spaceB"
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N` (for first deployment)
   - Project name? `prosoft-digital-space`
   - In which directory is your code located? `./`

### Step 3: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

### Step 4: Environment Variables (If Needed)

If your project uses any API keys or environment variables:

1. **In Vercel Dashboard**:
   - Go to project settings
   - Click "Environment Variables"
   - Add your variables

### Step 5: Automatic Deployments

Once connected to Git:
- Every push to `main` branch triggers automatic deployment
- Pull requests create preview deployments
- You can configure deployment branches in settings

## Project Structure for Vercel

Your project is already configured with:
- ✅ `vercel.json` - Deployment configuration
- ✅ `package.json` - Project metadata and scripts
- ✅ `.gitignore` - Files to exclude from deployment
- ✅ Static HTML, CSS, and JavaScript files

## Troubleshooting

### Common Issues:

1. **404 Errors on Page Refresh**:
   - The `vercel.json` configuration handles this with proper routing

2. **Large File Sizes**:
   - Vercel has a 100MB limit per file
   - Use the included image/video optimizers to reduce file sizes

3. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are listed in `package.json`

### Performance Optimization:

1. **Run Image Optimization** (before deployment):
   ```bash
   npm run optimize
   npm run optimize-videos
   ```

2. **Enable Vercel Analytics** (optional):
   - Go to project settings
   - Enable "Analytics"

## Post-Deployment Checklist

- [ ] Test all pages and functionality
- [ ] Verify mobile responsiveness
- [ ] Check loading speeds
- [ ] Test contact forms and interactive features
- [ ] Verify SEO meta tags are working
- [ ] Test service worker functionality

## Useful Commands

```bash
# Local development
npm run dev

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View deployment logs
vercel logs
```

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

Your Prosoft Digital Space website is now ready for deployment! 🚀