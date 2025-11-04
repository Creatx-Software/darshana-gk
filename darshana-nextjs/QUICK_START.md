# Quick Start Guide - Darshana Gal Ketayam Next.js

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd darshana-nextjs
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
```
http://localhost:3000
```

---

## 📂 Project Overview

```
darshana-nextjs/
├── 📄 app/                    # Next.js App Router pages
│   ├── layout.tsx            # Root layout (Navigation + Footer)
│   ├── page.tsx              # Home page
│   ├── sacred-forms/         # Portfolio pages
│   └── articles/             # Articles pages
├── 🧩 components/            # Reusable React components
├── 🎨 styles/                # Global CSS
├── 🖼️  public/                # Static assets (SVGs, images)
└── ⚙️  Configuration files
```

---

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🌐 Routes

| URL | Page | Description |
|-----|------|-------------|
| `/` | Home | Full homepage with all sections |
| `/sacred-forms` | Sacred Forms | Portfolio categories |
| `/sacred-forms/buddha-statues` | Buddha Statues | Gallery with lightbox |
| `/articles` | Articles | Blog/articles listing |

---

## ✏️ Making Changes

### Update Homepage Content
Edit files in `components/HomePage/`:
- `AboutSection.tsx` - Our Heritage section
- `PortfolioSection.tsx` - Portfolio items
- `ServicesSection.tsx` - Services grid
- `ContactSection.tsx` - Contact form

### Update Navigation
Edit `components/Navigation.tsx`

### Update Footer
Edit `components/Footer.tsx`

### Update Global Styles
Edit `styles/globals.css`

---

## 🖼️ Replace Images

1. Add your images to `public/images/`
2. Update image sources in components:
   ```tsx
   // Before
   src="https://images.unsplash.com/..."

   // After
   src="/images/your-image.jpg"
   ```

---

## 📝 Add New Pages

1. Create new folder in `app/`
2. Add `page.tsx` file
3. Export default component

Example:
```tsx
// app/new-page/page.tsx
export default function NewPage() {
  return <h1>New Page</h1>;
}
```

Access at: `http://localhost:3000/new-page`

---

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🆘 Troubleshooting

### Server won't start
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### Images not loading
Check `next.config.js` for allowed domains

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

## 🚀 Deploy to Production

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Deploy automatically!

### Manual Build
```bash
npm run build
npm start
```

---

## 📞 Support

Questions? Check the [README.md](README.md) or [CONVERSION_SUMMARY.md](CONVERSION_SUMMARY.md) for detailed information.

---

**Happy Coding! 🎉**
