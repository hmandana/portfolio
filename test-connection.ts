import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔍 Testing MongoDB Atlas Connection...');
console.log('Connection URI (password hidden):', MONGODB_URI?.replace(/:([^@]+)@/, ':***@'));

async function testConnection(): Promise<void> {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not set');
    return;
  }

  if (MONGODB_URI.includes('YOUR_ACTUAL_PASSWORD')) {
    console.error('❌ Please replace YOUR_ACTUAL_PASSWORD with your real password in .env file');
    return;
  }

  try {
    console.log('🔄 Attempting to connect...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('📊 Connection details:');
    console.log('  - Database:', mongoose.connection.db.databaseName);
    console.log('  - Host:', mongoose.connection.host);
    console.log('  - Port:', mongoose.connection.port);
    
  } catch (error) {
    console.error('❌ Connection failed:');
    
    if (error instanceof Error) {
      if (error.message.includes('authentication failed')) {
        console.error('🚫 Authentication Error - Possible causes:');
        console.error('   1. Wrong username or password');
        console.error('   2. User does not exist in MongoDB Atlas');
        console.error('   3. User does not have proper permissions');
        console.error('   4. Password contains special characters that need encoding');
      } else if (error.message.includes('Could not connect')) {
        console.error('🌐 Network Error - Possible causes:');
        console.error('   1. Wrong cluster name or region');
        console.error('   2. IP address not whitelisted in MongoDB Atlas');
        console.error('   3. Network connectivity issues');
      } else {
        console.error('💥 Other error:', error.message);
      }
    } else {
      console.error('💥 Unknown error:', error);
    }
    
    console.error('\n📋 Please check:');
    console.error('   1. MongoDB Atlas Dashboard > Database Access');
    console.error('   2. Verify user "portfolio" exists');
    console.error('   3. Check user permissions (readWrite on portfolio database)');
    console.error('   4. MongoDB Atlas Dashboard > Network Access');
    console.error('   5. Add 0.0.0.0/0 to IP Access List (for development)');
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
  }
}

testConnection();
