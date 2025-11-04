// Site Configuration Constants

export const SITE_CONFIG = {
  name: 'Darshana Gal Ketayam',
  description: 'Sri Lankan Stone Carving & Memorial Craftsmanship Since 1911',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  founder: 'Since 1911 - Four Generations of Excellence',
} as const;

export const CONTACT_INFO = {
  email: 'darshandgk@gmail.com',
  phones: [
    '+94 33 222 3714',
    '+94 77 388 2531',
    '+94 77 741 1942',
  ],
  address: 'No. 263/1, Kandy Road, Miriswatta, Mudungoda, Gampaha, Sri Lanka',
  businessHours: 'Monday - Sunday: 8 AM - 5 PM',
  businessHoursNote: '(Hours may vary on public holidays)',
} as const;

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/DGK.SL',
  instagram: 'https://instagram.com/dgk.sl',
} as const;

export const NAVIGATION_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Services', href: '/#services' },
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const SERVICES = [
  {
    icon: '🙏',
    title: 'Sacred Forms',
    description: 'Buddha statues, temple guardians, and religious sculptures crafted with spiritual reverence.',
  },
  {
    icon: '🎨',
    title: 'Crafts & Ornamentation',
    description: 'Intricate decorative elements, architectural features, and artistic stone carvings.',
  },
  {
    icon: '🏠',
    title: 'Living Spaces',
    description: 'Custom stone elements for homes, gardens, and commercial spaces.',
  },
  {
    icon: '🎋',
    title: 'Openings & Dedications',
    description: 'Ceremonial stones and commemorative pieces for special occasions.',
  },
  {
    icon: '💎',
    title: 'Memorials & Remembrance',
    description: 'Dignified memorial stones and monuments honoring loved ones.',
  },
] as const;

export const PORTFOLIO_CATEGORIES = [
  {
    id: 1,
    name: 'Sacred Forms',
    slug: 'sacred-forms',
    description: 'Buddha statues and religious sculptures',
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Crafts & Ornamentation',
    slug: 'crafts-ornamentation',
    description: 'Decorative stone artistry',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Living Spaces',
    slug: 'living-spaces',
    description: 'Residential and commercial stonework',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Openings & Dedications',
    slug: 'openings-dedications',
    description: 'Ceremonial commemorative stones',
    image: 'https://images.unsplash.com/photo-1604112469112-e14782a36279?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Memorials & Remembrance',
    slug: 'memorials-remembrance',
    description: 'Memorial stones and monuments',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80&auto=format&fit=crop',
  },
] as const;

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=80&auto=format&fit=crop',
    title: 'Four Generations of Stone Carving Excellence',
    subtitle: 'Preserving Sri Lankan Heritage Since 1911',
    cta: 'Explore Our Work',
    ctaLink: '/#portfolio',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1920&q=80&auto=format&fit=crop',
    title: 'Sacred Buddha Statues',
    subtitle: 'Crafted with Reverence and Precision',
    cta: 'View Collection',
    ctaLink: '/sacred-forms/buddha-statues',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80&auto=format&fit=crop',
    title: 'Timeless Memorial Stones',
    subtitle: 'Honoring Memories in Granite',
    cta: 'Learn More',
    ctaLink: '/#services',
  },
] as const;

export const GRANITE_COLORS = [
  {
    name: 'Absolute Black',
    description: 'Premium deep black granite',
    image: 'https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=400&q=80&auto=format&fit=crop',
  },
  {
    name: 'Vizag Blue',
    description: 'Elegant blue-toned granite',
    image: 'https://images.unsplash.com/photo-1615799998497-3a2c1e8c4cf5?w=400&q=80&auto=format&fit=crop',
  },
  {
    name: 'Kashmir White',
    description: 'Classic white with grey patterns',
    image: 'https://images.unsplash.com/photo-1615800001234-8b9e7c5f7d8e?w=400&q=80&auto=format&fit=crop',
  },
  {
    name: 'Red Granite',
    description: 'Rich red tones',
    image: 'https://images.unsplash.com/photo-1615800001111-1b2c8d9f8e8e?w=400&q=80&auto=format&fit=crop',
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rev. Sumanasiri',
    role: 'Chief Monk, Gangaramaya Temple',
    content: 'The Buddha statue created by Darshana Gal Ketayam for our temple is a masterpiece. Their understanding of sacred proportions and spiritual significance is unmatched.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mrs. Perera',
    role: 'Colombo',
    content: 'They created a beautiful memorial stone for my late husband. The craftsmanship and attention to detail brought comfort during a difficult time.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mr. Fernando',
    role: 'Architect',
    content: 'Working with Darshana Gal Ketayam on our heritage restoration project was exceptional. Their traditional techniques combined with modern precision delivered outstanding results.',
    rating: 5,
  },
] as const;
