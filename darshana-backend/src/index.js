module.exports = {
  async bootstrap({ strapi }) {
    console.log('🔍 Checking if data needs seeding...');

    // Check if data already exists
    const existingCategories = await strapi.documents('api::portfolio-category.portfolio-category').findMany();

    if (existingCategories.length > 0) {
      console.log('✅ Data already seeded, skipping...');
      return;
    }

    console.log('🌱 Seeding initial data...\n');

    // Site Settings
    await strapi.documents('api::site-setting.site-setting').create({
      data: {
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
      }
    });

    // Services
    const services = [
      { title: 'Sacred Forms', description: 'Buddha statues, temple guardians, and religious sculptures crafted with spiritual reverence.', icon: '🙏', displayOrder: 1 },
      { title: 'Crafts & Ornamentation', description: 'Intricate decorative elements, architectural features, and artistic stone carvings.', icon: '🎨', displayOrder: 2 },
      { title: 'Living Spaces', description: 'Custom stone elements for homes, gardens, and commercial spaces.', icon: '🏠', displayOrder: 3 },
      { title: 'Openings & Dedications', description: 'Ceremonial stones and commemorative pieces for special occasions.', icon: '🎋', displayOrder: 4 },
      { title: 'Memorials & Remembrance', description: 'Dignified memorial stones and monuments honoring loved ones.', icon: '💎', displayOrder: 5 }
    ];

    for (const service of services) {
      await strapi.documents('api::service.service').create({ data: { ...service, isActive: true } });
    }

    // Testimonials
    const testimonials = [
      { quote: 'The Buddha statue created by Darshana Gal Ketayam for our temple is a masterpiece. Their understanding of sacred proportions and spiritual significance is unmatched.', authorName: 'Rev. Sumanasiri', authorTitle: 'Chief Monk, Gangaramaya Temple', displayOrder: 1 },
      { quote: 'They created a beautiful memorial stone for my late husband. The craftsmanship and attention to detail brought comfort during a difficult time.', authorName: 'Mrs. Perera', authorTitle: 'Colombo', displayOrder: 2 },
      { quote: 'Working with Darshana Gal Ketayam on our heritage restoration project was exceptional. Their traditional techniques combined with modern precision delivered outstanding results.', authorName: 'Mr. Fernando', authorTitle: 'Architect', displayOrder: 3 }
    ];

    for (const testimonial of testimonials) {
      await strapi.documents('api::testimonial.testimonial').create({ data: { ...testimonial, isActive: true } });
    }

    // Hero Slides
    const heroSlides = [
      { title: 'Four Generations of Stone Carving Excellence', subtitle: 'Preserving Sri Lankan Heritage Since 1911', displayOrder: 1 },
      { title: 'Sacred Buddha Statues', subtitle: 'Crafted with Reverence and Precision', displayOrder: 2 },
      { title: 'Timeless Memorial Stones', subtitle: 'Honoring Memories in Granite', displayOrder: 3 }
    ];

    for (const slide of heroSlides) {
      await strapi.documents('api::hero-slide.hero-slide').create({ data: { ...slide, isActive: true } });
    }

    // Portfolio Categories with Subcategories
    const portfolioData = [
      {
        name: 'Sacred Forms',
        slug: 'sacred-forms',
        description: 'These carefully crafted pieces hold deep spiritual and cultural significance. From Buddha and other deity statues to moonstones, guardstones, pun kalas, and lion statues, each form is designed to honor tradition, provide protection, and inspire reverence.',
        tagline: 'Carvings that embody devotion, heritage, and spirit',
        displayOrder: 1,
        subcategories: [
          { name: 'Buddha Statues', slug: 'buddha-statues', description: 'Gracefully crafted Buddha statues that embody serenity, compassion, and timeless artistry.', displayOrder: 1, hasGallery: true },
          { name: 'Sacred Footprint', slug: 'sacred-footprint', sinhalaName: 'Siri Pathula', description: 'A revered symbol representing the presence and blessings of the Buddha', displayOrder: 2 },
          { name: 'Moonstone', slug: 'moonstone', sinhalaName: 'Sandakada pahana', description: 'An integral part of traditional temple architecture', displayOrder: 3 },
          { name: 'Guardstones', slug: 'guardstones', sinhalaName: 'Mura Gal', description: 'Guardian deities marking sacred transitions', displayOrder: 4 },
          { name: 'Balustrade Stone', slug: 'balustrade', sinhalaName: 'Korawak Gal', description: 'Ornate railings with spiritual symbolism', displayOrder: 5 },
          { name: 'Statues & Iconic Figures', slug: 'statues-figures', description: 'From deities to custom-designed figures, these statues combine artistry, symbolism, and cultural significance.', displayOrder: 6 },
          { name: 'Pot of Plenty', slug: 'pot-plenty', sinhalaName: 'Pun kalasa', description: 'Symbol of abundance and prosperity', displayOrder: 7 },
          { name: 'Oil Lamp', slug: 'oil-lamp', sinhalaName: 'Dolos Mahe Pahana', description: 'Traditional ceremonial lighting elements', displayOrder: 8 }
        ]
      },
      {
        name: 'Crafts & Ornamentation',
        slug: 'crafts-ornamentation',
        description: 'This category features decorative and functional pieces designed to enhance memorials, sacred spaces, and gardens.',
        tagline: 'The artistry of detail, from quiet motifs to timeless design',
        displayOrder: 2,
        subcategories: [
          { name: 'Altars & Offering Stands', slug: 'altars-offering-stands', sinhalaName: 'Mal asanaya or altharaya', description: 'Functional and ornamental elements for offerings or decoration', displayOrder: 1 },
          { name: 'Statue Base / Columns', slug: 'statue-base-columns', description: 'Bases for statues or sculptural elements', displayOrder: 2 },
          { name: 'Functional Traditional Tools', slug: 'functional-traditional-tools', description: 'Traditional items crafted for practical use in cultural, ritual, or wellness practices.', displayOrder: 3 },
          { name: 'Address Markers', slug: 'address-markers', description: "Beautifully engraved granite markers", displayOrder: 4 },
          { name: 'Lettering', slug: 'lettering', description: 'Custom-designed stone or granite letters', displayOrder: 5 },
          { name: 'Decorative Carvings & Motif', slug: 'decorative-carvings-motif', description: 'Subtle artistic details, such as lotus motifs', displayOrder: 6 }
        ]
      },
      {
        name: 'Living Spaces',
        slug: 'living-spaces',
        description: 'Elevate your surroundings with architectural and functional elements such as seating, sinks, vases, baths, and fountains.',
        tagline: 'Stone that shapes how we dwell, gather, and belong',
        displayOrder: 3,
        subcategories: [
          { name: 'Sinks', slug: 'sinks', description: 'Functional and elegantly designed sinks for outdoor or memorial spaces', displayOrder: 1 },
          { name: 'Columns, Bases & Lintels', slug: 'columns-bases-lintels', description: 'Architectural elements designed to provide structural support', displayOrder: 2 },
          { name: 'Seating & Benches', slug: 'seating-benches', description: 'Elegant and durable stone or architectural benches', displayOrder: 3 },
          { name: 'Bird Baths & Water Fountains', slug: 'bird-baths-water-fountains', description: 'Architectural and decorative water features', displayOrder: 4 },
          { name: 'Other Elements', slug: 'other-elements', description: 'Elegantly crafted granite or stone vases and other decorative elements', displayOrder: 5 }
        ]
      },
      {
        name: 'Openings & Dedications',
        slug: 'openings-dedications',
        description: 'Celebrate milestones, inaugurations, and special occasions with elegant plaques and nameboards.',
        tagline: 'Elegant plaques and nameboards for milestones and inaugurations',
        displayOrder: 4,
        subcategories: [
          { name: 'Surface Mounted', slug: 'surface-mounted', description: 'Designed to be securely affixed to walls or flat surfaces', displayOrder: 1 },
          { name: 'Free Standing', slug: 'free-standing', description: 'Free standing plaques provide a prominent and flexible option', displayOrder: 2 },
          { name: 'Customized', slug: 'customized', description: 'For a truly unique expression, our custom plaques', displayOrder: 3 },
          { name: 'Special Projects', slug: 'special-projects', description: 'Some dedications call for a more innovative approach', displayOrder: 4 },
          { name: 'Commemorative Souvenirs / Recognition Plaques', slug: 'commemorative-souvenirs-recognition-plaques', description: 'Commemorative plaques and keepsakes', displayOrder: 5 },
          { name: 'Name Boards', slug: 'name-boards', description: 'Elegant, enduring plaques crafted to identify institutions', displayOrder: 6 }
        ]
      },
      {
        name: 'Memorials & Remembrance',
        slug: 'memorials-remembrance',
        description: 'Honor the memory of loved ones with thoughtfully crafted memorials.',
        tagline: 'Marking memory in stone, where time and tribute endure',
        displayOrder: 5,
        subcategories: [
          { name: 'Individual', slug: 'individual', description: 'Individual monuments can be flat, bevel, slant or upright', displayOrder: 1 },
          { name: 'Companion', slug: 'companion', description: 'Companion monuments are larger than the individual monuments', displayOrder: 2 },
          { name: 'Customized', slug: 'customized', description: 'Custom monuments are not commonly seen in cemeteries', displayOrder: 3 },
          { name: 'Heartfelt Projects', slug: 'heartfelt-projects', description: 'A selection of memorials and projects that have inspired us', displayOrder: 4 }
        ]
      }
    ];

    for (const cat of portfolioData) {
      const { subcategories, ...categoryData } = cat;
      const category = await strapi.documents('api::portfolio-category.portfolio-category').create({
        data: { ...categoryData, isActive: true }
      });

      for (const sub of subcategories) {
        const { hasGallery, ...subcategoryData } = sub;
        const subcategory = await strapi.documents('api::portfolio-subcategory.portfolio-subcategory').create({
          data: { ...subcategoryData, category: category.documentId, isActive: true }
        });

        // Add gallery items for Buddha Statues
        if (hasGallery) {
          const galleryItems = [
            { title: 'Buddha Samadhi Statue', description: "Inspired by Anuradhapura's ancient sculpture", displayOrder: 1 },
            { title: 'Standing Buddha', description: 'Traditional standing posture with blessing mudra', displayOrder: 2 },
            { title: 'Reclining Buddha', description: 'Depicting the final moments of enlightenment', displayOrder: 3 },
            { title: 'Teaching Buddha', description: 'Buddha in dharmachakra mudra position', displayOrder: 4 },
            { title: 'Meditation Buddha', description: 'Seated in deep meditation posture', displayOrder: 5 },
            { title: 'Abhaya Buddha', description: 'Fearlessness and protection mudra', displayOrder: 6 }
          ];

          for (const item of galleryItems) {
            await strapi.documents('api::gallery-item.gallery-item').create({
              data: { ...item, subcategory: subcategory.documentId, isActive: true, isFeatured: false }
            });
          }
        }
      }
    }

    console.log('✅ Data seeding completed!\n');
  }
};
