# GitHub Pages Deployment Guide

## Quick Deploy (3 Steps)

### 1. Create GitHub Repository
```bash
# Go to github.com and create new repository
# Name it: gaganaqua.github.io (or any name)
# Make it Public
# Don't initialize with README
```

### 2. Push Your Code
```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
```bash
# Go to your repository on GitHub
# Click Settings → Pages
# Source: GitHub Actions
# Save
```

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## Custom Domain Setup

### Option A: GitHub Subdomain
1. Go to repository Settings → Pages
2. Under "Custom domain", enter: `www.gaganaqua.com`
3. Save

### Option B: Full Domain
1. Buy domain from Namecheap/GoDaddy
2. Add CNAME record:
   - Name: `@` or `www`
   - Value: `YOUR_USERNAME.github.io`
3. Add A records for apex domain:
   ```
   @ → 185.199.108.153
   @ → 185.199.109.153
   @ → 185.199.110.153
   @ → 185.199.111.153
   ```
4. In GitHub repo Settings → Pages, enter your domain

---

## Commands Reference

```bash
# Initialize repo
git init
git add .
git commit -m "Initial commit - Gagan Aqua Industries website"

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main

# Update website
git add .
git commit -m "Update: description of changes"
git push

# Check status
git status
git log --oneline
```

---

## After Deployment

### Update WhatsApp Number
Search and replace in all files:
- Find: `919876543210`
- Replace with: `91YOUR_ACTUAL_NUMBER`

### Update Contact Info
Edit `index.html` and search for:
- Phone numbers
- Email addresses
- Address
- Google Maps URL

### Add Real Images
1. Replace `images/logo.png` with your logo
2. Replace product images in `images/products/`
3. Replace `images/about/factory.png`
4. Run `python3 generate-placeholders.py` to regenerate if needed

---

## Troubleshooting

### Site not loading?
1. Check GitHub Pages is enabled in Settings → Pages
2. Ensure source is set to "GitHub Actions"
3. Wait 2-3 minutes for first deployment

### Images not showing?
1. Check file paths in HTML match actual file locations
2. Ensure files are committed and pushed

### Custom domain not working?
1. DNS propagation takes 24-48 hours
2. Verify DNS records with: `dig YOUR_DOMAIN`
3. Ensure CNAME file exists in repo root