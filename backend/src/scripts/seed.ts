import migrateData from './migrate';
import fullMigrateData from './fullMigrate';

async function seedDatabase(): Promise<void> {
  console.log('🌱 Starting complete database seeding...');
  
  try {
    // Run basic migration first
    await migrateData();
    
    // Then run comprehensive migration
    await fullMigrateData();
    
    console.log('🎉 Complete database seeding finished successfully!');
  } catch (error) {
    console.error('💥 Database seeding failed:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Database seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database seeding process failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;
