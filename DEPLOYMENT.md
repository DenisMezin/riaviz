# Deployment Instructions for RIAVIZ Motorsport

## 🚀 Phase 1: Vercel Deployment (Client Review)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for client review - i18n implementation complete"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/riaviz.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in** with GitHub
3. **Click "Add New Project"**
4. **Import** your `riaviz` repository
5. **Configure Project:**
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: Leave default
6. **Click "Deploy"**

Vercel will:
- ✅ Install dependencies
- ✅ Build the project
- ✅ Deploy automatically
- ✅ Provide a live URL (e.g., `riaviz.vercel.app`)

### Step 3: Share with Client

Send the Vercel URL to the client for review. They can test:
- ✅ Language switching (🇮🇹🇬🇧🇸🇮)
- ✅ All sections and content
- ✅ Mobile responsiveness
- ✅ Animations and interactions

---

## 📦 Phase 2: Aruba Migration (After Client Approval)

**Once the client approves the Vercel deployment**, follow the comprehensive guide:

👉 **[guida-migrazione-aruba.md](./guida-migrazione-aruba.md)**

The guide covers:
1. ✅ Configuring Next.js for static export
2. ✅ Building static files (`npm run build`)
3. ✅ Creating `.htaccess` for Apache
4. ✅ FTP upload to Aruba
5. ✅ SSL configuration
6. ✅ Troubleshooting common issues

---

## ⚡ Quick Reference

### Environment Check
```bash
# Check Node version (should be 18+)
node -v

# Check dependencies
npm install

# Test development mode
npm run dev

# Build for production
npm run build

# Test build locally
npx serve out
```

### Vercel Commands
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from CLI
vercel

# Deploy to production
vercel --prod
```

---

## 🔄 Future Updates

### After Deployment on Aruba

To update the live site:

1. **Make changes locally**
2. **Test with `npm run dev`**
3. **Build: `npm run build`**
4. **Upload `out/` folder to Aruba via FTP**
5. **Verify changes live**

---

## 📞 Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **Aruba Support**: See `guida-migrazione-aruba.md`
