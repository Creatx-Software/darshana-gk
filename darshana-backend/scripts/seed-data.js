const strapi = require('@strapi/strapi');

// Portfolio data from frontend
const portfolioData = {
  categories: [
    {
      slug: 'sacred-forms',
      name: 'Sacred Forms',
      description: 'These carefully crafted pieces hold deep spiritual and cultural significance. From Buddha and other deity statues to moonstones, guardstones, pun kalas, and lion statues, each form is designed to honor tradition, provide protection, and inspire reverence.',
      tagline: 'Carvings that embody devotion, heritage, and spirit',
      displayOrder: 1,
      isActive: true,
      subcategories: [
        {
          slug: 'buddha-statues',
          name: 'Buddha Statues',
          description: 'Gracefully crafted Buddha statues that embody serenity, compassion, and timeless artistry.',
          displayOrder: 1,
          galleryItems: [
            { title: 'Buddha Samadhi Statue', description: "Inspired by Anuradhapura's ancient sculpture", displayOrder: 1 },
            { title: 'Standing Buddha', description: 'Traditional standing posture with blessing mudra', displayOrder: 2 },
            { title: 'Reclining Buddha', description: 'Depicting the final moments of enlightenment', displayOrder: 3 },
            { title: 'Teaching Buddha', description: 'Buddha in dharmachakra mudra position', displayOrder: 4 },
            { title: 'Meditation Buddha', description: 'Seated in deep meditation posture', displayOrder: 5 },
            { title: 'Abhaya Buddha', description: 'Fearlessness and protection mudra', displayOrder: 6 }
          ]
        },
        {
          slug: 'sacred-footprint',
          name: 'Sacred Footprint',
          sinhalaName: 'Siri Pathula',
          description: 'A revered symbol representing the presence and blessings of the Buddha, the Sacred Footprint is a finely crafted stone carving embodying faith, devotion, and spiritual continuity.',
          displayOrder: 2
        },
        {
          slug: 'moonstone',
          name: 'Moonstone',
          sinhalaName: 'Sandakada pahana',
          description: 'An integral part of traditional temple architecture',
          displayOrder: 3
        },
        {
          slug: 'guardstones',
          name: 'Guardstones',
          sinhalaName: 'Mura Gal',
          description: 'Guardian deities marking sacred transitions',
          displayOrder: 4
        },
        {
          slug: 'balustrade',
          name: 'Balustrade Stone',
          sinhalaName: 'Korawak Gal',
          description: 'Ornate railings with spiritual symbolism',
          displayOrder: 5
        },
        {
          slug: 'statues-figures',
          name: 'Statues & Iconic Figures',
          description: 'From deities to custom-designed figures, these statues combine artistry, symbolism, and cultural significance. Perfect for temples, memorials, or decorative spaces.',
          displayOrder: 6
        },
        {
          slug: 'pot-plenty',
          name: 'Pot of Plenty',
          sinhalaName: 'Pun kalasa',
          description: 'Symbol of abundance and prosperity',
          displayOrder: 7
        },
        {
          slug: 'oil-lamp',
          name: 'Oil Lamp',
          sinhalaName: 'Dolos Mahe Pahana',
          description: 'Traditional ceremonial lighting elements',
          displayOrder: 8
        }
      ]
    },
    {
      slug: 'crafts-ornamentation',
      name: 'Crafts & Ornamentation',
      description: 'This category features decorative and functional pieces designed to enhance memorials, sacred spaces, and gardens. Each piece combines artistry with craftsmanship, offering a perfect balance of beauty, cultural significance, and utility.',
      tagline: 'The artistry of detail, from quiet motifs to timeless design',
      displayOrder: 2,
      isActive: true,
      subcategories: [
        { slug: 'altars-offering-stands', name: 'Altars & Offering Stands', sinhalaName: 'Mal asanaya or altharaya', description: 'Functional and ornamental elements for offerings or decoration', displayOrder: 1 },
        { slug: 'statue-base-columns', name: 'Statue Base / Columns', description: 'Bases for statues or sculptural elements', displayOrder: 2 },
        { slug: 'functional-traditional-tools', name: 'Functional Traditional Tools', description: 'Traditional items crafted for practical use in cultural, ritual, or wellness practices. Examples include Beheth Oru (Ayurvedic baths), Van Gedi (mortar & pestle), and Miris Gal', displayOrder: 3 },
        { slug: 'address-markers', name: 'Address Markers', description: "Beautifully engraved granite markers that bring style and permanence to your home's entrance", displayOrder: 4 },
        { slug: 'lettering', name: 'Lettering', description: 'Custom-designed stone or granite letters that can stand independently or be mounted on a slab to create nameboards', displayOrder: 5 },
        { slug: 'decorative-carvings-motif', name: 'Decorative Carvings & Motif', description: 'Subtle artistic details, such as lotus motifs or other shallow relief designs, that enrich the overall aesthetic', displayOrder: 6 }
      ]
    },
    {
      slug: 'living-spaces',
      name: 'Living Spaces',
      description: 'Elevate your surroundings with architectural and functional elements such as seating, sinks, vases, baths, and fountains. These pieces combine utility and elegance, creating spaces that are both practical and visually appealing.',
      tagline: 'Stone that shapes how we dwell, gather, and belong',
      displayOrder: 3,
      isActive: true,
      subcategories: [
        { slug: 'sinks', name: 'Sinks', description: 'Functional and elegantly designed sinks for outdoor or memorial spaces, available in free-standing or wall-mounted styles', displayOrder: 1 },
        { slug: 'columns-bases-lintels', name: 'Columns, Bases & Lintels', description: 'Architectural elements designed to provide structural support and visual elegance', displayOrder: 2 },
        { slug: 'seating-benches', name: 'Seating & Benches', description: 'Elegant and durable stone or architectural benches designed to provide comfortable seating while enhancing outdoor or memorial spaces', displayOrder: 3 },
        { slug: 'bird-baths-water-fountains', name: 'Bird Baths & Water Fountains', description: 'Architectural and decorative water features that bring tranquility, beauty, and life to outdoor spaces', displayOrder: 4 },
        { slug: 'other-elements', name: 'Other Elements', description: 'Elegantly crafted granite or stone vases and other decorative elements', displayOrder: 5 }
      ]
    },
    {
      slug: 'openings-dedications',
      name: 'Openings & Dedications',
      description: 'Celebrate milestones, inaugurations, and special occasions with elegant plaques and nameboards. From institutional dedication boards to personalized recognition plaques, each piece is custom-designed to honor achievements with style, permanence, and distinction.',
      tagline: 'Elegant plaques and nameboards for milestones and inaugurations',
      displayOrder: 4,
      isActive: true,
      subcategories: [
        { slug: 'surface-mounted', name: 'Surface Mounted', description: 'Designed to be securely affixed to walls or flat surfaces, wall mount plaques offer a timeless and space-saving way to honor individuals, groups, or events', displayOrder: 1 },
        { slug: 'free-standing', name: 'Free Standing', description: 'Free standing plaques provide a prominent and flexible option for memorials or dedications', displayOrder: 2 },
        { slug: 'customized', name: 'Customized', description: 'For a truly unique expression, our custom plaques can be mounted on natural boulders or fully designed monuments', displayOrder: 3 },
        { slug: 'special-projects', name: 'Special Projects', description: 'Some dedications call for a more innovative approach. Special Projects include large-scale, collaborative, or highly customized installations', displayOrder: 4 },
        { slug: 'commemorative-souvenirs-recognition-plaques', name: 'Commemorative Souvenirs / Recognition Plaques', description: 'Commemorative plaques and keepsakes to honor achievements, milestones, or dedicated service', displayOrder: 5 },
        { slug: 'name-boards', name: 'Name Boards', description: 'Elegant, enduring plaques crafted to identify institutions, buildings, and establishments with distinction', displayOrder: 6 }
      ]
    },
    {
      slug: 'memorials-remembrance',
      name: 'Memorials & Remembrance',
      description: 'Honor the memory of loved ones with thoughtfully crafted memorials. From individual and companion monuments to fully customized designs, each piece is created with care, artistry, and lasting quality.',
      tagline: 'Marking memory in stone, where time and tribute endure',
      displayOrder: 5,
      isActive: true,
      subcategories: [
        { slug: 'individual', name: 'Individual', description: 'Individual monuments can be flat, bevel, slant or upright and allow for a single name and dates', displayOrder: 1 },
        { slug: 'companion', name: 'Companion', description: 'Companion monuments are larger than the individual monuments and allow placement of a surname along with two names and dates', displayOrder: 2 },
        { slug: 'customized', name: 'Customized', description: 'Custom monuments are not commonly seen in cemeteries, and they come in a variety of sizes and shapes. These monuments allow for creativity and imagination', displayOrder: 3 },
        { slug: 'heartfelt-projects', name: 'Heartfelt Projects', description: 'A selection of memorials and projects that have inspired us and left a lasting impression', displayOrder: 4 }
      ]
    }
  ]
};

const servicesData = [
  { title: 'Sacred Forms', description: 'Buddha statues, temple guardians, and religious sculptures crafted with spiritual reverence.', icon: '🙏', displayOrder: 1, isActive: true },
  { title: 'Crafts & Ornamentation', description: 'Intricate decorative elements, architectural features, and artistic stone carvings.', icon: '🎨', displayOrder: 2, isActive: true },
  { title: 'Living Spaces', description: 'Custom stone elements for homes, gardens, and commercial spaces.', icon: '🏠', displayOrder: 3, isActive: true },
  { title: 'Openings & Dedications', description: 'Ceremonial stones and commemorative pieces for special occasions.', icon: '🎋', displayOrder: 4, isActive: true },
  { title: 'Memorials & Remembrance', description: 'Dignified memorial stones and monuments honoring loved ones.', icon: '💎', displayOrder: 5, isActive: true }
];

const testimonialsData = [
  { quote: 'The Buddha statue created by Darshana Gal Ketayam for our temple is a masterpiece. Their understanding of sacred proportions and spiritual significance is unmatched.', authorName: 'Rev. Sumanasiri', authorTitle: 'Chief Monk, Gangaramaya Temple', displayOrder: 1, isActive: true },
  { quote: 'They created a beautiful memorial stone for my late husband. The craftsmanship and attention to detail brought comfort during a difficult time.', authorName: 'Mrs. Perera', authorTitle: 'Colombo', displayOrder: 2, isActive: true },
  { quote: 'Working with Darshana Gal Ketayam on our heritage restoration project was exceptional. Their traditional techniques combined with modern precision delivered outstanding results.', authorName: 'Mr. Fernando', authorTitle: 'Architect', displayOrder: 3, isActive: true }
];

const heroSlidesData = [
  { title: 'Four Generations of Stone Carving Excellence', subtitle: 'Preserving Sri Lankan Heritage Since 1911', displayOrder: 1, isActive: true },
  { title: 'Sacred Buddha Statues', subtitle: 'Crafted with Reverence and Precision', displayOrder: 2, isActive: true },
  { title: 'Timeless Memorial Stones', subtitle: 'Honoring Memories in Granite', displayOrder: 3, isActive: true }
];

const siteSettingsData = {
  siteName: 'Darshana Gal Ketayam',
  siteTagline: 'Sri Lankan Stone Carving & Memorial Craftsmanship Since 1911',
  siteDescription: 'Crafting Timeless Stonework With Passion And Precision, Bringing Strength And Beauty To Every Space.',
  founderYear: 1911,
  email: 'darshandgk@gmail.com',
  phonePrimary: '+94 33 222 3714',
  phoneSecondary: '+94 77 388 2531',
  phoneTertiary: '+94 77 741 1942',
  address: 'No. 263/1, Kandy Road, Miriswatta, Mudungoda, Gampaha, Sri Lanka',
  businessHours: 'Monday - Sunday: 8 AM - 5 PM',
  facebookUrl: 'https://www.facebook.com/DGK.SL',
  instagramUrl: 'https://instagram.com/dgk.sl'
};

async function seedData() {
  const app = await strapi().load();
  await app.start();

  console.log('🌱 Starting data seeding...\n');

  try {
    // Seed Site Settings
    console.log('📝 Creating Site Settings...');
    await strapi.documents('api::site-setting.site-setting').create({
      data: siteSettingsData
    });
    console.log('✅ Site Settings created\n');

    // Seed Services
    console.log('🛠️  Creating Services...');
    for (const service of servicesData) {
      await strapi.documents('api::service.service').create({ data: service });
    }
    console.log(`✅ Created ${servicesData.length} services\n`);

    // Seed Testimonials
    console.log('💬 Creating Testimonials...');
    for (const testimonial of testimonialsData) {
      await strapi.documents('api::testimonial.testimonial').create({ data: testimonial });
    }
    console.log(`✅ Created ${testimonialsData.length} testimonials\n`);

    // Seed Hero Slides
    console.log('🎭 Creating Hero Slides...');
    for (const slide of heroSlidesData) {
      await strapi.documents('api::hero-slide.hero-slide').create({ data: slide });
    }
    console.log(`✅ Created ${heroSlidesData.length} hero slides\n`);

    // Seed Portfolio Categories and Subcategories
    console.log('📁 Creating Portfolio Structure...');
    for (const category of portfolioData.categories) {
      const { subcategories, ...categoryData } = category;

      // Create category
      const createdCategory = await strapi.documents('api::portfolio-category.portfolio-category').create({
        data: categoryData
      });
      console.log(`  ✅ Created category: ${category.name}`);

      // Create subcategories
      for (const subcategory of subcategories) {
        const { galleryItems, ...subcategoryData } = subcategory;

        const createdSubcategory = await strapi.documents('api::portfolio-subcategory.portfolio-subcategory').create({
          data: {
            ...subcategoryData,
            category: createdCategory.documentId,
            isActive: true
          }
        });
        console.log(`    ✅ Created subcategory: ${subcategory.name}`);

        // Create gallery items if they exist
        if (galleryItems && galleryItems.length > 0) {
          for (const item of galleryItems) {
            await strapi.documents('api::gallery-item.gallery-item').create({
              data: {
                ...item,
                subcategory: createdSubcategory.documentId,
                isActive: true,
                isFeatured: false
              }
            });
          }
          console.log(`      ✅ Created ${galleryItems.length} gallery items`);
        }
      }
    }

    console.log('\n🎉 Data seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - Site Settings: 1`);
    console.log(`  - Portfolio Categories: ${portfolioData.categories.length}`);
    console.log(`  - Portfolio Subcategories: ${portfolioData.categories.reduce((sum, cat) => sum + cat.subcategories.length, 0)}`);
    console.log(`  - Gallery Items: 6`);
    console.log(`  - Services: ${servicesData.length}`);
    console.log(`  - Testimonials: ${testimonialsData.length}`);
    console.log(`  - Hero Slides: ${heroSlidesData.length}`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    console.error(error.stack);
  }

  await app.destroy();
  process.exit(0);
}

seedData();
