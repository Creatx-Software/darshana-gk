const mysql = require('mysql2/promise');

async function migrateGalleryImages() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hacker119',
    database: 'darshana_gk'
  });

  try {
    console.log('Starting gallery images migration...\n');

    // Step 1: Create new table for gallery item images
    console.log('Creating gallery_item_images table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS gallery_item_images (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        gallery_item_id INT UNSIGNED NOT NULL,
        file_id INT UNSIGNED,
        display_order INT DEFAULT 0,
        is_main BOOLEAN DEFAULT FALSE,
        created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        FOREIGN KEY (gallery_item_id) REFERENCES gallery_items(id) ON DELETE CASCADE,
        INDEX idx_gallery_item (gallery_item_id),
        INDEX idx_display_order (display_order)
      )
    `);
    console.log('✓ Table created successfully\n');

    // Step 2: Migrate existing single images to the new structure
    console.log('Migrating existing images...');

    // Get all gallery items with their current image from files_related_mph
    const [galleryItems] = await connection.execute(`
      SELECT gi.id, gi.document_id, gi.title, frm.file_id
      FROM gallery_items gi
      LEFT JOIN files_related_mph frm ON gi.id = frm.related_id
        AND frm.related_type = 'api::gallery-item.gallery-item'
        AND frm.field = 'image'
      WHERE frm.file_id IS NOT NULL
    `);

    console.log(`Found ${galleryItems.length} gallery items with images`);

    // Insert each existing image as the main image in the new table
    for (const item of galleryItems) {
      await connection.execute(`
        INSERT INTO gallery_item_images (gallery_item_id, file_id, display_order, is_main)
        VALUES (?, ?, 0, TRUE)
      `, [item.id, item.file_id]);

      console.log(`  ✓ Migrated image for: ${item.title}`);
    }

    console.log(`\n✓ Successfully migrated ${galleryItems.length} images\n`);

    // Step 3: Show summary
    const [summary] = await connection.execute(`
      SELECT
        COUNT(DISTINCT gallery_item_id) as items_with_images,
        COUNT(*) as total_images
      FROM gallery_item_images
    `);

    console.log('Migration Summary:');
    console.log(`  - Gallery items with images: ${summary[0].items_with_images}`);
    console.log(`  - Total images in new structure: ${summary[0].total_images}`);
    console.log('\nMigration completed successfully! ✓');
    console.log('\nNext steps:');
    console.log('1. You can now add multiple images to gallery items via Strapi admin');
    console.log('2. The first image (is_main=TRUE) will be used as the main card image');
    console.log('3. When viewing an item, all images will be shown in the lightbox');

  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Run migration
migrateGalleryImages()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
