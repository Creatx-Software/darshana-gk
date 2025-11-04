import { GalleryItem } from '@/types';

export interface PortfolioSubcategory {
  slug: string;
  name: string;
  sinhalaName?: string;
  description: string;
  gallery: GalleryItem[];
}

export interface PortfolioCategory {
  slug: string;
  name: string;
  description: string;
  tagline: string;
  image: string;
  subcategories: PortfolioSubcategory[];
}

// Sacred Forms Category
export const sacredFormsCategory: PortfolioCategory = {
  slug: 'sacred-forms',
  name: 'Sacred Forms',
  description: 'These carefully crafted pieces hold deep spiritual and cultural significance. From Buddha and other deity statues to moonstones, guardstones, pun kalas, and lion statues, each form is designed to honor tradition, provide protection, and inspire reverence.',
  tagline: 'Carvings that embody devotion, heritage, and spirit',
  image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80&auto=format&fit=crop',
  subcategories: [
    {
      slug: 'buddha-statues',
      name: 'Buddha Statues',
      description: 'Gracefully crafted Buddha statues that embody serenity, compassion, and timeless artistry.',
      gallery: [
        {
          id: 0,
          title: 'Buddha Samadhi Statue',
          description: "Inspired by Anuradhapura's ancient sculpture",
          image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80&auto=format&fit=crop',
        },
        {
          id: 1,
          title: 'Standing Buddha',
          description: 'Traditional standing posture with blessing mudra',
          image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80&auto=format&fit=crop',
        },
        {
          id: 2,
          title: 'Reclining Buddha',
          description: 'Depicting the final moments of enlightenment',
          image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80&auto=format&fit=crop',
        },
        {
          id: 3,
          title: 'Teaching Buddha',
          description: 'Buddha in dharmachakra mudra position',
          image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80&auto=format&fit=crop',
        },
        {
          id: 4,
          title: 'Meditation Buddha',
          description: 'Seated in deep meditation posture',
          image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80&auto=format&fit=crop',
        },
        {
          id: 5,
          title: 'Abhaya Buddha',
          description: 'Fearlessness and protection mudra',
          image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&q=80&auto=format&fit=crop',
        },
      ],
    },
    {
      slug: 'sacred-footprint',
      name: 'Sacred Footprint',
      sinhalaName: 'Siri Pathula',
      description: 'A revered symbol representing the presence and blessings of the Buddha, the Sacred Footprint is a finely crafted stone carving embodying faith, devotion, and spiritual continuity.',
      gallery: [
        {
          id: 0,
          title: 'Traditional Siri Pathula',
          description: 'Classic sacred footprint with traditional symbols',
          image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80&auto=format&fit=crop',
        },
      ],
    },
    {
      slug: 'moonstone',
      name: 'Moonstone',
      sinhalaName: 'Sandakada pahana',
      description: 'An integral part of traditional temple architecture',
      gallery: [
        {
          id: 0,
          title: 'Carved Moonstone',
          description: 'Intricate semicircular stone carving',
          image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80&auto=format&fit=crop',
        },
      ],
    },
    {
      slug: 'guardstones',
      name: 'Guardstones',
      sinhalaName: 'Mura Gal',
      description: 'Guardian deities marking sacred transitions',
      gallery: [
        {
          id: 0,
          title: 'Temple Guardstones',
          description: 'Protective figures flanking entrance',
          image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80&auto=format&fit=crop',
        },
      ],
    },
    {
      slug: 'balustrade',
      name: 'Balustrade Stone',
      sinhalaName: 'Korawak Gal',
      description: 'Ornate railings with spiritual symbolism',
      gallery: [
        {
          id: 0,
          title: 'Carved Balustrade',
          description: 'Decorative stone railing',
          image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80&auto=format&fit=crop',
        },
      ],
    },
    {
      slug: 'statues-figures',
      name: 'Statues & Iconic Figures',
      description: 'From deities to custom-designed figures, these statues combine artistry, symbolism, and cultural significance. Perfect for temples, memorials, or decorative spaces.',
      gallery: [
        {
          id: 0,
          title: 'Deity Statue',
          description: 'Custom carved religious figure',
          image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80&auto=format&fit=crop',
        },
      ],
    },
    {
      slug: 'pot-plenty',
      name: 'Pot of Plenty',
      sinhalaName: 'Pun kalasa',
      description: 'Symbol of abundance and prosperity',
      gallery: [
        {
          id: 0,
          title: 'Pun Kalasa',
          description: 'Traditional pot of plenty carving',
          image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&q=80&auto=format&fit=crop',
        },
      ],
    },
    {
      slug: 'oil-lamp',
      name: 'Oil Lamp',
      sinhalaName: 'Dolos Mahe Pahana',
      description: 'Traditional ceremonial lighting elements',
      gallery: [
        {
          id: 0,
          title: 'Stone Oil Lamp',
          description: 'Ceremonial lighting fixture',
          image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&q=80&auto=format&fit=crop',
        },
      ],
    },
  ],
};

// Crafts & Ornamentation Category
export const craftsOrnamentationCategory: PortfolioCategory = {
  slug: 'crafts-ornamentation',
  name: 'Crafts & Ornamentation',
  description: 'This category features decorative and functional pieces designed to enhance memorials, sacred spaces, and gardens. Each piece combines artistry with craftsmanship, offering a perfect balance of beauty, cultural significance, and utility.',
  tagline: 'The artistry of detail, from quiet motifs to timeless design',
  image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80&auto=format&fit=crop',
  subcategories: [
    {
      slug: 'altars-offering-stands',
      name: 'Altars & Offering Stands',
      sinhalaName: 'Mal asanaya or altharaya',
      description: 'Functional and ornamental elements for offerings or decoration',
      gallery: [],
    },
    {
      slug: 'statue-base-columns',
      name: 'Statue Base / Columns',
      description: 'Bases for statues or sculptural elements',
      gallery: [],
    },
    {
      slug: 'functional-traditional-tools',
      name: 'Functional Traditional Tools',
      description: 'Traditional items crafted for practical use in cultural, ritual, or wellness practices. Examples include Beheth Oru (Ayurvedic baths), Van Gedi (mortar & pestle), and Miris Gal',
      gallery: [],
    },
    {
      slug: 'address-markers',
      name: 'Address Markers',
      description: 'Beautifully engraved granite markers that bring style and permanence to your home\'s entrance',
      gallery: [],
    },
    {
      slug: 'lettering',
      name: 'Lettering',
      description: 'Custom-designed stone or granite letters that can stand independently or be mounted on a slab to create nameboards',
      gallery: [],
    },
    {
      slug: 'decorative-carvings-motif',
      name: 'Decorative Carvings & Motif',
      description: 'Subtle artistic details, such as lotus motifs or other shallow relief designs, that enrich the overall aesthetic',
      gallery: [],
    },
  ],
};

// Living Spaces Category
export const livingSpacesCategory: PortfolioCategory = {
  slug: 'living-spaces',
  name: 'Living Spaces',
  description: 'Elevate your surroundings with architectural and functional elements such as seating, sinks, vases, baths, and fountains. These pieces combine utility and elegance, creating spaces that are both practical and visually appealing.',
  tagline: 'Stone that shapes how we dwell, gather, and belong',
  image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80&auto=format&fit=crop',
  subcategories: [
    {
      slug: 'sinks',
      name: 'Sinks',
      description: 'Functional and elegantly designed sinks for outdoor or memorial spaces, available in free-standing or wall-mounted styles',
      gallery: [],
    },
    {
      slug: 'columns-bases-lintels',
      name: 'Columns, Bases & Lintels',
      description: 'Architectural elements designed to provide structural support and visual elegance',
      gallery: [],
    },
    {
      slug: 'seating-benches',
      name: 'Seating & Benches',
      description: 'Elegant and durable stone or architectural benches designed to provide comfortable seating while enhancing outdoor or memorial spaces',
      gallery: [],
    },
    {
      slug: 'bird-baths-water-fountains',
      name: 'Bird Baths & Water Fountains',
      description: 'Architectural and decorative water features that bring tranquility, beauty, and life to outdoor spaces',
      gallery: [],
    },
    {
      slug: 'other-elements',
      name: 'Other Elements',
      description: 'Elegantly crafted granite or stone vases and other decorative elements',
      gallery: [],
    },
  ],
};

// Openings & Dedications Category
export const openingsDedicationsCategory: PortfolioCategory = {
  slug: 'openings-dedications',
  name: 'Openings & Dedications',
  description: 'Celebrate milestones, inaugurations, and special occasions with elegant plaques and nameboards. From institutional dedication boards to personalized recognition plaques, each piece is custom-designed to honor achievements with style, permanence, and distinction.',
  tagline: 'Elegant plaques and nameboards for milestones and inaugurations',
  image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&q=80&auto=format&fit=crop',
  subcategories: [
    {
      slug: 'surface-mounted',
      name: 'Surface Mounted',
      description: 'Designed to be securely affixed to walls or flat surfaces, wall mount plaques offer a timeless and space-saving way to honor individuals, groups, or events',
      gallery: [],
    },
    {
      slug: 'free-standing',
      name: 'Free Standing',
      description: 'Free standing plaques provide a prominent and flexible option for memorials or dedications',
      gallery: [],
    },
    {
      slug: 'customized',
      name: 'Customized',
      description: 'For a truly unique expression, our custom plaques can be mounted on natural boulders or fully designed monuments',
      gallery: [],
    },
    {
      slug: 'special-projects',
      name: 'Special Projects',
      description: 'Some dedications call for a more innovative approach. Special Projects include large-scale, collaborative, or highly customized installations',
      gallery: [],
    },
    {
      slug: 'commemorative-souvenirs-recognition-plaques',
      name: 'Commemorative Souvenirs / Recognition Plaques',
      description: 'Commemorative plaques and keepsakes to honor achievements, milestones, or dedicated service',
      gallery: [],
    },
    {
      slug: 'name-boards',
      name: 'Name Boards',
      description: 'Elegant, enduring plaques crafted to identify institutions, buildings, and establishments with distinction',
      gallery: [],
    },
  ],
};

// Memorials & Remembrance Category
export const memorialsRemembranceCategory: PortfolioCategory = {
  slug: 'memorials-remembrance',
  name: 'Memorials & Remembrance',
  description: 'Honor the memory of loved ones with thoughtfully crafted memorials. From individual and companion monuments to fully customized designs, each piece is created with care, artistry, and lasting quality.',
  tagline: 'Marking memory in stone, where time and tribute endure',
  image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80&auto=format&fit=crop',
  subcategories: [
    {
      slug: 'individual',
      name: 'Individual',
      description: 'Individual monuments can be flat, bevel, slant or upright and allow for a single name and dates',
      gallery: [],
    },
    {
      slug: 'companion',
      name: 'Companion',
      description: 'Companion monuments are larger than the individual monuments and allow placement of a surname along with two names and dates',
      gallery: [],
    },
    {
      slug: 'customized',
      name: 'Customized',
      description: 'Custom monuments are not commonly seen in cemeteries, and they come in a variety of sizes and shapes. These monuments allow for creativity and imagination',
      gallery: [],
    },
    {
      slug: 'heartfelt-projects',
      name: 'Heartfelt Projects',
      description: 'A selection of memorials and projects that have inspired us and left a lasting impression',
      gallery: [],
    },
  ],
};

// All categories array
export const portfolioCategories: PortfolioCategory[] = [
  sacredFormsCategory,
  craftsOrnamentationCategory,
  livingSpacesCategory,
  openingsDedicationsCategory,
  memorialsRemembranceCategory,
];

// Helper functions
export function getCategoryBySlug(slug: string): PortfolioCategory | undefined {
  return portfolioCategories.find((cat) => cat.slug === slug);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): PortfolioSubcategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.subcategories.find((sub) => sub.slug === subcategorySlug);
}

export function getAllCategorySlugs(): string[] {
  return portfolioCategories.map((cat) => cat.slug);
}

export function getAllSubcategorySlugs(categorySlug: string): string[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  return category.subcategories.map((sub) => sub.slug);
}
