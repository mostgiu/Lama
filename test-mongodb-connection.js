import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env file manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const envContent = readFileSync(join(__dirname, '.env'), 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
} catch (error) {
  console.error('Warning: Could not read .env file');
}

async function testConnection() {
  console.log('Testing MongoDB Connection...\n');
  
  const mongodbUri = process.env.MONGODB_URI;
  
  // Check if MONGODB_URI is configured
  if (!mongodbUri || mongodbUri === 'your_mongodb_connection_string_here') {
    console.error('❌ FAILED: MONGODB_URI is not configured!');
    console.log('\nCurrent value:', mongodbUri);
    console.log('\nPlease update your .env file with a valid MongoDB connection string.');
    console.log('See MONGODB_SETUP.md for instructions on how to set up MongoDB Atlas.');
    process.exit(1);
  }
  
  // Hide credentials in output
  const maskedUri = mongodbUri.replace(/\/\/.*@/, '//***@');
  console.log('MONGODB_URI found:', maskedUri);
  
  try {
    console.log('\nAttempting to connect...');
    const conn = await mongoose.connect(mongodbUri);
    console.log('✅ SUCCESS: Connected to MongoDB!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    
    // Test with a simple operation
    console.log('\nTesting database operations...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections found:', collections.length > 0 ? collections.map(c => c.name).join(', ') : 'None (database is empty)');
    
    // Close connection
    await mongoose.disconnect();
    console.log('\n✅ Connection test completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ FAILED: Could not connect to MongoDB');
    console.error('Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. MongoDB Atlas cluster not created');
    console.error('2. Network access not configured (IP whitelist)');
    console.error('3. Database user credentials incorrect');
    console.error('4. Connection string format is incorrect');
    console.error('\nSee MONGODB_SETUP.md for troubleshooting steps.');
    process.exit(1);
  }
}

testConnection();