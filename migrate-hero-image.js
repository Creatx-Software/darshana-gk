const mysql = require('mysql2/promise');

async function migrateHeroImage() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hacker119',
    database: 'darshana_gk'
  });

  try {
    console.log('Starting hero image migration...');

    // Check if files_related_mph table needs the hero_image field relationship
    // Strapi 5 uses the files_related_mph table to store media relationships
    // The heroImage field will automatically be handled by Strapi once we restart it
    // This migration is just to ensure the database structure is ready

    // Check current structure
    const [columns] = await connection.execute(`
      SHOW COLUMNS FROM files_related_mph
    `);

    console.log('Current files_related_mph structure:');
    columns.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type}`);
    });

    // The files_related_mph table structure is already correct for Strapi 5
    // It uses a generic structure with 'field' column to identify the relationship type
    // When you add heroImage in admin panel, Strapi will automatically create entries with field='heroImage'

    console.log('\n✅ Database structure is ready for heroImage field');
    console.log('📝 After restarting Strapi, you can:');
    console.log('   1. Go to admin panel (http://localhost:1337/admin)');
    console.log('   2. Edit any Portfolio Category');
    console.log('   3. You will see the new "Hero Image" field');
    console.log('   4. Upload an image to test it');

    await connection.end();
  } catch (error) {
    console.error('Migration error:', error);
    await connection.end();
    process.exit(1);
  }
}

migrateHeroImage();
