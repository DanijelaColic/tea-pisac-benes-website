# 🚀 Deployment Guide - Tea Pisac Beneš Website

## Quick Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Create GitHub Repository:**
   ```bash
   git init
   git add .
   git commit -m "Tea Pisac Beneš SEO website - initial commit"
   ```

2. **Push to GitHub:**
   - Create new repository on GitHub
   - Copy the repository URL
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/tea-pisac-benes-website.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Astro
   - Click "Deploy"

### Option 2: Direct Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login and Deploy:**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Follow prompts:**
   - Project name: `tea-pisac-benes-seo`
   - Framework: Astro (auto-detected)
   - Build command: `astro build`
   - Output directory: `dist`

## 🔧 Pre-Deployment Checklist

- ✅ Astro build works (`npx astro build`)
- ✅ All components render correctly
- ✅ SEO meta tags configured
- ✅ Sitemap and robots.txt in place
- ✅ Performance optimized
- ✅ Mobile responsive

## 🌐 Post-Deployment Steps

1. **Test Live Site:**
   - Check all pages load correctly
   - Test responsive design
   - Verify SEO meta tags
   - Test contact forms

2. **Setup Analytics:**
   - Replace `GA_MEASUREMENT_ID` with real Google Analytics ID
   - Update Google Search Console verification code

3. **Custom Domain (Optional):**
   - Add custom domain in Vercel dashboard
   - Update DNS records
   - Configure SSL certificate

## 📊 Performance Monitoring

After deployment, monitor:
- **Core Web Vitals** - LCP, FID, CLS
- **Page Speed** - Google PageSpeed Insights
- **SEO Score** - Google Search Console
- **Uptime** - Vercel analytics

## 🔍 SEO Configuration

Update these after deployment:
- `canonical` URLs in Layout.astro
- `og:url` meta tags
- Sitemap URLs in sitemap.xml
- Google Analytics tracking ID
- Search Console verification

## 🚨 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .astro
npm install
npx astro build
```

### 404 Errors
- Check `vercel.json` routing configuration
- Verify all files are in correct directories
- Ensure `index.astro` exists in `src/pages/`

### Performance Issues
- Check image optimization
- Verify CSS/JS minification
- Test Core Web Vitals

## 📞 Support

For deployment issues:
- Check Vercel documentation
- Review build logs in Vercel dashboard
- Test locally with `npx astro preview`

---

**Live Site:** Will be available at `https://your-project.vercel.app`

**Custom Domain:** Configure in Vercel dashboard after deployment
