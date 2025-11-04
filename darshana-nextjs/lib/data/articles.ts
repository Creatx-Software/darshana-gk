import { Article, ArticleListItem } from '@/types';

// Full article content for individual article pages
export const articlesData: Record<string, Article> = {
  'the-ancient-art-of-sri-lankan-stone-carving': {
    title: 'The Ancient Art of Sri Lankan Stone Carving',
    category: 'Tradition',
    date: 'January 15, 2024',
    headerImage: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=80&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1200&q=80&auto=format&fit=crop',
    content: {
      leadText: 'Stone carving in Sri Lanka represents more than a craft—it embodies centuries of cultural heritage, spiritual devotion, and artistic excellence that has been passed down through generations of master craftsmen.',
      sections: [
        {
          heading: 'A Legacy Rooted in Tradition',
          paragraphs: [
            'The art of stone carving in Sri Lanka dates back over two millennia, with some of the finest examples found in ancient temples and archaeological sites throughout the island. From the intricate carvings of Anuradhapura to the magnificent stone sculptures of Polonnaruwa, Sri Lankan stone artisans have demonstrated exceptional skill and dedication to their craft.',
            'Our family\'s involvement in this ancient tradition began in 1911, when our great-grandfather first picked up the chisel and mallet. Over four generations, we have maintained the same commitment to excellence and cultural preservation that defined those early master craftsmen.',
          ],
        },
        {
          heading: 'Traditional Techniques Meet Modern Tools',
          paragraphs: [
            'While we honor traditional hand-carving methods, we\'ve also embraced modern technology to enhance precision and efficiency. This combination allows us to create works that respect the past while meeting contemporary needs.',
            'The traditional process begins with selecting the perfect granite stone—a decision that considers color, grain, and structural integrity. Each piece of stone tells its own story, and understanding these characteristics is crucial to successful carving.',
          ],
        },
        {
          heading: 'The Spiritual Dimension',
          paragraphs: [
            'Stone carving in Sri Lanka has always been deeply connected to Buddhist spirituality. Many of our projects involve creating Buddha statues, temple guardians, and sacred architectural elements. This work requires not just technical skill, but also an understanding of religious symbolism and cultural significance.',
            'When crafting a Buddha statue, for example, we follow specific iconographic guidelines that have been standardized over centuries. The proportions, hand gestures (mudras), and facial expressions all carry deep spiritual meaning that must be honored in every detail.',
          ],
        },
        {
          heading: 'Preserving Skills for Future Generations',
          paragraphs: [
            'One of our greatest responsibilities is ensuring this ancient art form survives for future generations. We actively train young apprentices, teaching them both traditional techniques and modern applications of stone carving.',
            'The learning process is lengthy—a master stone carver requires years of practice to develop the necessary skills and understanding. From learning to read the stone\'s natural grain to mastering intricate detail work, every aspect demands patience and dedication.',
          ],
        },
        {
          heading: 'Contemporary Applications',
          paragraphs: [
            'Today, stone carving extends beyond religious contexts. We work on memorial stones, architectural features for modern buildings, decorative elements for homes, and conservation projects for historic sites. Each application presents unique challenges and opportunities to showcase the versatility of this ancient craft.',
            'Modern architects increasingly appreciate the timeless beauty and durability of carved stone. By incorporating traditional elements into contemporary designs, we help bridge the gap between Sri Lanka\'s rich heritage and its modern identity.',
          ],
        },
        {
          heading: 'Conclusion',
          paragraphs: [
            'The ancient art of Sri Lankan stone carving continues to thrive because it represents something fundamental—the human desire to create lasting beauty and meaning. As we continue this tradition into the 21st century, we remain committed to honoring the masters who came before us while adapting to serve the needs of today\'s world.',
            'Whether creating a sacred Buddha statue or a contemporary architectural element, every piece we craft carries forward a tradition that began centuries ago, ensuring that this remarkable art form continues to inspire and endure.',
          ],
        },
      ],
    },
  },
};

// Article list for articles listing page
export const articlesList: ArticleListItem[] = [
  {
    id: 1,
    slug: 'the-ancient-art-of-sri-lankan-stone-carving',
    title: 'The Ancient Art of Sri Lankan Stone Carving',
    excerpt: "Exploring the centuries-old techniques passed down through generations of master craftsmen in Sri Lanka's rich carving heritage.",
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80&auto=format&fit=crop',
    date: 'January 15, 2024',
    category: 'Tradition',
    delay: 0,
  },
  {
    id: 2,
    slug: 'choosing-the-right-granite-for-your-memorial',
    title: 'Choosing the Right Granite for Your Memorial',
    excerpt: 'A comprehensive guide to selecting the perfect stone type, color, and finish for lasting memorials and monuments.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80&auto=format&fit=crop',
    date: 'January 10, 2024',
    category: 'Guide',
    delay: 100,
  },
  {
    id: 3,
    slug: 'restoring-sri-lankas-ancient-temple-carvings',
    title: "Restoring Sri Lanka's Ancient Temple Carvings",
    excerpt: 'Behind the scenes of our recent temple restoration project, preserving cultural heritage for future generations.',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80&auto=format&fit=crop',
    date: 'January 5, 2024',
    category: 'Projects',
    delay: 200,
  },
  {
    id: 4,
    slug: 'modern-architecture-meets-traditional-stone',
    title: 'Modern Architecture Meets Traditional Stone',
    excerpt: 'How contemporary architects are incorporating traditional stone carving techniques into modern building designs.',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80&auto=format&fit=crop',
    date: 'December 28, 2023',
    category: 'Design',
    delay: 0,
  },
  {
    id: 5,
    slug: 'caring-for-your-stone-monument',
    title: 'Caring for Your Stone Monument',
    excerpt: 'Expert tips and best practices for maintaining and preserving your granite monuments for generations to come.',
    image: 'https://images.unsplash.com/photo-1604112469112-e14782a36279?w=800&q=80&auto=format&fit=crop',
    date: 'December 20, 2023',
    category: 'Maintenance',
    delay: 100,
  },
  {
    id: 6,
    slug: 'four-generations-a-family-legacy-in-stone',
    title: 'Four Generations: A Family Legacy in Stone',
    excerpt: 'The story of how our family has kept the ancient art of stone carving alive since 1911, through four generations.',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80&auto=format&fit=crop',
    date: 'December 15, 2023',
    category: 'Heritage',
    delay: 200,
  },
];
