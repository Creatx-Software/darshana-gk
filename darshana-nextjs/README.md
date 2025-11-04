# Darshana Gal Ketayam

> **Sri Lankan Stone Carving & Memorial Craftsmanship Since 1911**

A modern, professionally-structured Next.js website showcasing four generations of stone carving excellence in Sri Lanka.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://react.dev/)

## 🎯 Overview

This is a production-ready Next.js application built with modern web development best practices, featuring:

- **Enterprise-grade architecture** with feature-based organization
- **Full TypeScript** implementation for type safety
- **Server & Client Components** for optimal performance
- **Responsive design** with mobile-first approach
- **SEO optimized** with Next.js metadata API
- **Professional code structure** following industry standards

---

## 📁 Project Structure

```
darshana-gal-ketayam/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with fonts & metadata
│   ├── page.tsx                  # Homepage
│   ├── articles/                 # Articles section
│   │   ├── page.tsx              # Articles listing
│   │   └── [slug]/               # Dynamic article routes
│   │       └── page.tsx          # Individual article page
│   └── sacred-forms/             # Portfolio categories
│       ├── page.tsx              # Category overview
│       └── buddha-statues/       # Subcategory galleries
│           └── page.tsx          # Gallery with lightbox
│
├── components/                   # React Components
│   ├── layout/                   # Layout components
│   │   ├── Navigation.tsx        # Sticky header navigation
│   │   ├── Footer.tsx            # Site footer
│   │   ├── LoadingScreen.tsx     # 8-second loading animation
│   │   ├── ScrollAnimations.tsx  # AOS scroll animations
│   │   └── index.ts              # Barrel export
│   │
│   ├── sections/                 # Page sections (HomePage)
│   │   ├── HeroCarousel.tsx      # Auto-rotating hero
│   │   ├── AboutSection.tsx      # Company introduction
│   │   ├── PortfolioSection.tsx  # 5 portfolio categories
│   │   ├── GraniteColorsSection.tsx  # Granite showcase
│   │   ├── ServicesSection.tsx   # Services overview
│   │   ├── FoundersStorySection.tsx  # Heritage story
│   │   ├── TestimonialsSection.tsx   # Client reviews
│   │   ├── ContactSection.tsx    # Contact form
│   │   └── index.ts              # Barrel export
│   │
│   ├── ui/                       # Reusable UI components (future)
│   └── features/                 # Feature-specific components (future)
│
├── lib/                          # Utilities & Configuration
│   ├── constants/                # Site-wide constants
│   │   ├── site.ts               # Config, links, content
│   │   └── index.ts              # Barrel export
│   │
│   ├── data/                     # Static data & content
│   │   ├── articles.ts           # Article content
│   │   ├── gallery.ts            # Gallery images
│   │   └── index.ts              # Barrel export
│   │
│   ├── utils/                    # Helper functions (future)
│   └── hooks/                    # Custom React hooks (future)
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Global types & interfaces
│
├── public/                       # Static assets
│   ├── fonts/                    # Custom fonts
│   ├── images/                   # Images & photos
│   ├── logo-animated.svg         # Animated loading logo
│   ├── darshana-gal-katayam-light.svg
│   └── darshana-gal-katayam-dark.svg
│
├── styles/                       # Global styles
│   └── globals.css               # All CSS (from original)
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies

```

---

## 🚀 Features

### Core Functionality
- ✅ **Dynamic Article System** - Slug-based routing with full article content
- ✅ **Gallery Lightbox** - Full-screen image viewer with keyboard navigation
- ✅ **Interactive Forms** - Contact form with validation
- ✅ **Hero Carousel** - Auto-rotating slides with manual controls
- ✅ **Smooth Animations** - Scroll-triggered animations (AOS)
- ✅ **Loading Screen** - 8-second SVG stroke animation

### Technical Features
- ✅ **TypeScript Everywhere** - Full type safety across the project
- ✅ **Barrel Exports** - Clean, organized imports
- ✅ **Centralized Data** - All content in `lib/data/`
- ✅ **Constants Management** - Site config in `lib/constants/`
- ✅ **Image Optimization** - Next.js Image component
- ✅ **Font Optimization** - Google Fonts with `next/font`
- ✅ **SEO Ready** - Metadata API implementation

### Code Quality
- ✅ **Component Organization** - Feature-based structure
- ✅ **Separation of Concerns** - Layout, sections, UI, features
- ✅ **Type Definitions** - Centralized in `types/`
- ✅ **Clean Imports** - Using barrel exports (index.ts)
- ✅ **Professional Naming** - Consistent conventions

---

## 🛠 Installation & Setup

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Quick Start

1. **Clone or navigate to the project**
   ```bash
   cd darshana-gal-ketayam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |

---

## 🏗 Architecture & Best Practices

### Component Organization

#### **Layout Components** (`components/layout/`)
Core layout elements that appear across all pages:
- Navigation, Footer, LoadingScreen, ScrollAnimations

#### **Section Components** (`components/sections/`)
Full-width page sections (primarily for homepage):
- HeroCarousel, AboutSection, PortfolioSection, etc.

#### **UI Components** (`components/ui/`)
Reusable, atomic UI elements (future use):
- Buttons, Cards, Modals, etc.

#### **Feature Components** (`components/features/`)
Feature-specific, complex components (future use):
- ArticleCard, GalleryViewer, etc.

### Data Management

All static content is centralized in `lib/data/`:
```typescript
// Import data
import { articlesList, articlesData } from '@/lib/data';
import { buddhaStatuesGallery } from '@/lib/data';
```

All constants in `lib/constants/`:
```typescript
// Import constants
import { SITE_CONFIG, CONTACT_INFO, SERVICES } from '@/lib/constants';
```

### Type Definitions

All types centralized in `types/index.ts`:
```typescript
import type { Article, GalleryItem, Service } from '@/types';
```

### Clean Imports

Using barrel exports (index.ts files):
```typescript
// Instead of:
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

// You can use:
import { Navigation, Footer } from '@/components/layout';
```

---

## 🎨 Key Components

### LoadingScreen
- 8-second initial display
- SVG stroke animation for logo
- Text reveal animation
- Smooth fade-out transition
- Auto-removes from DOM after animation

### Navigation
- Sticky header with scroll detection
- Mobile-responsive hamburger menu
- Smooth scroll to sections
- Active link highlighting

### HeroCarousel
- 3 auto-rotating slides (5s interval)
- Manual prev/next navigation
- Dot indicators
- Next.js Image optimization
- Configurable via constants

### Portfolio Galleries
- Lightbox functionality
- Keyboard navigation (←, →, ESC)
- Click-outside to close
- Smooth transitions

### Contact Form
- Client-side validation
- Service selection dropdown
- Ready for backend integration
- Form reset on success

---

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with all sections |
| `/articles` | Articles listing page |
| `/articles/[slug]` | Individual article (slug-based) |
| `/sacred-forms` | Portfolio category overview |
| `/sacred-forms/buddha-statues` | Buddha statues gallery |

---

## ⚙️ Configuration

### Next.js Config (`next.config.js`)
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' }
  ]
}
```

### TypeScript Config (`tsconfig.json`)
- Strict mode enabled
- Path aliases configured (`@/*`)
- JSX set to `react-jsx` (automatic runtime)

### Environment Variables (`.env.example`)
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Darshana Gal Ketayam"
NEXT_PUBLIC_COMPANY_EMAIL=darshandgk@gmail.com
# ...more variables
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Hamburger navigation menu
- Optimized image sizes
- Touch-friendly buttons
- Reduced font sizes
- Stacked layouts

---

## 🎯 Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deployment Platforms

#### **Vercel** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### **Other Platforms**
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

### Pre-Deployment Checklist
- [ ] Replace all placeholder images with real photos
- [ ] Set up environment variables on hosting platform
- [ ] Configure custom domain
- [ ] Test all pages and forms
- [ ] Run `npm run build` locally to catch errors
- [ ] Enable analytics (Google Analytics, Vercel Analytics, etc.)
- [ ] Set up sitemap and robots.txt
- [ ] Configure SSL certificate

---

## 🔄 Future Enhancements

### Immediate Next Steps
1. **Backend Integration**
   - Contact form API endpoint
   - Email service integration (SendGrid, Resend, etc.)

2. **CMS Integration**
   - Sanity.io / Contentful for articles
   - Easy content management
   - Media library

3. **Complete Portfolio**
   - Add remaining category pages
   - More gallery items
   - Project case studies

4. **SEO Improvements**
   - Sitemap generation
   - robots.txt
   - Structured data (JSON-LD)
   - Open Graph tags

5. **Performance**
   - Convert images to WebP
   - Implement lazy loading
   - Add caching strategies

### Long-term Roadmap
- [ ] Multi-language support (Sinhala/Tamil)
- [ ] Online inquiry/quote system
- [ ] Admin dashboard for content management
- [ ] Blog with categories and tags
- [ ] Customer portal for project tracking
- [ ] Integration with social media feeds

---

## 📞 Contact & Support

**Company Information:**
- **Email**: darshandgk@gmail.com
- **Phone**: +94 33 222 3714 / +94 77 388 2531 / +94 77 741 1942
- **Address**: No. 263/1, Kandy Road, Miriswatta, Mudungoda, Gampaha, Sri Lanka

**Social Media:**
- **Facebook**: [facebook.com/DGK.SL](https://www.facebook.com/DGK.SL)
- **Instagram**: [@dgk.sl](https://instagram.com/dgk.sl)

---

## 📄 License

Copyright © 2024 Darshana Gal Ketayam. All rights reserved.

This project is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

---

## 🙏 Acknowledgments

- **Design**: Based on original Darshana Gal Ketayam website
- **Development**: Converted to Next.js 16 with modern architecture
- **Images**: Placeholder images from [Unsplash](https://unsplash.com)
- **Fonts**: Google Fonts (Cormorant Garamond, Inter)

---

**Built with ❤️ using Next.js 16, TypeScript, and React 19**

*Four Generations of Excellence Since 1911*
