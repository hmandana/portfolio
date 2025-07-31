import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import typeDefs from './schema/typeDefs.js';
import resolvers from './resolvers/index.js';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required');
  process.exit(1);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: false, // Required for standalone server with CORS
  formatError: (err) => {
    console.error('GraphQL Error:', { 
      message: err.message, 
      locations: err.locations, 
      path: err.path 
    });
    return err;
  }
});

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    
    const port = process.env.PORT || 4000;
    const { url } = await startStandaloneServer(server, {
      listen: { 
        port: port,
        host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'
      },
      context: async ({ req }) => {
        // You can add context for auth, etc. here
        return {}; 
      },
    });
    
    console.log(`🚀 Server ready at: ${url}`);
    console.log(`📊 GraphQL endpoint: ${url}`);

  } catch (err) {
    console.error(`❌ Server startup error: ${err.message}`);
    process.exit(1);
  }
};

// Handle graceful shutdown
const shutdown = async () => {
  console.log('Shutting down gracefully...');
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error(`Error during shutdown: ${err.message}`);
    process.exit(1);
  }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();
