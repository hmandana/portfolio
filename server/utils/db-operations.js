import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project, Profile, HomeData } from '../models/index.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return false;
  }
};

// Close MongoDB connection
const closeDB = async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed');
};

// Database operations
export const dbOperations = {
  // Get all collections status
  async getStatus() {
    const connected = await connectDB();
    if (!connected) return;

    try {
      const projectsCount = await Project.countDocuments();
      const profileExists = await Profile.findOne() !== null;
      const homeDataExists = await HomeData.findOne() !== null;

      console.log('📊 Database Status:');
      console.log(`  Projects: ${projectsCount}`);
      console.log(`  Profile: ${profileExists ? 'EXISTS' : 'MISSING'}`);
      console.log(`  Home Data: ${homeDataExists ? 'EXISTS' : 'MISSING'}`);
      
      if (projectsCount > 0) {
        const projects = await Project.find().limit(3);
        console.log(`  Sample Projects:`);
        projects.forEach(p => console.log(`    - ${p.title} (${p.type})`));
      }
    } catch (error) {
      console.error('❌ Error fetching status:', error.message);
    } finally {
      await closeDB();
    }
  },

  // Clear all data (use with caution!)
  async clearAll() {
    const connected = await connectDB();
    if (!connected) return;

    try {
      await Project.deleteMany({});
      await Profile.deleteMany({});
      await HomeData.deleteMany({});
      console.log('🗑️ All data cleared from database');
    } catch (error) {
      console.error('❌ Error clearing data:', error.message);
    } finally {
      await closeDB();
    }
  },

  // Create initial profile if it doesn't exist
  async createInitialProfile() {
    const connected = await connectDB();
    if (!connected) return;

    try {
      const existingProfile = await Profile.findOne();
      if (existingProfile) {
        console.log('ℹ️ Profile already exists');
        return;
      }

      const profile = new Profile({
        name: 'Your Name',
        summary: ['Add your professional summary here.'],
        skills: [
          { name: 'JavaScript', image: '/assets/skills/javascript.png' },
          { name: 'React', image: '/assets/skills/react.png' },
          { name: 'Node.js', image: '/assets/skills/nodejs.png' }
        ],
        workExperience: [{
          title: 'Software Engineer',
          company: 'Your Company',
          years: '2020-Present',
          details: ['Add your work experience details here.']
        }],
        education: [{
          degree: 'Bachelor of Computer Science',
          school: 'Your University',
          year: '2020',
          details: 'Add education details here.'
        }],
        certifications: [],
        interests: ['Programming', 'Technology', 'Innovation'],
        contact: [
          { type: 'email', value: 'your.email@example.com', icon: 'email' },
          { type: 'linkedin', value: 'https://linkedin.com/in/yourprofile', icon: 'linkedin' }
        ]
      });

      await profile.save();
      console.log('✅ Initial profile created');
    } catch (error) {
      console.error('❌ Error creating profile:', error.message);
    } finally {
      await closeDB();
    }
  },

  // Create initial home data if it doesn't exist
  async createInitialHomeData() {
    const connected = await connectDB();
    if (!connected) return;

    try {
      const existingHomeData = await HomeData.findOne();
      if (existingHomeData) {
        console.log('ℹ️ Home data already exists');
        return;
      }

      const homeData = new HomeData({
        name: 'Your Name',
        roles: [
          'Full-Stack Developer',
          'Software Engineer',
          'Tech Enthusiast'
        ],
        intro: [
          'Welcome to my portfolio! I\'m a passionate developer creating amazing digital experiences.',
          'I love building scalable applications and learning new technologies.',
          'Let\'s connect and build something great together!'
        ],
        stats: {
          yearsExperience: 5,
          technologiesCount: 20,
          projectsDelivered: 10
        }
      });

      await homeData.save();
      console.log('✅ Initial home data created');
    } catch (error) {
      console.error('❌ Error creating home data:', error.message);
    } finally {
      await closeDB();
    }
  },

  // Initialize basic data structure
  async initialize() {
    console.log('🚀 Initializing database with basic structure...');
    await this.createInitialProfile();
    await this.createInitialHomeData();
    console.log('✅ Database initialization complete');
  }
};

// Command line interface
if (process.argv.length > 2) {
  const command = process.argv[2];
  
  switch (command) {
    case 'status':
      dbOperations.getStatus();
      break;
    case 'init':
      dbOperations.initialize();
      break;
    case 'clear':
      console.log('⚠️ This will delete ALL data from your database!');
      console.log('Type "yes" to confirm or Ctrl+C to cancel...');
      process.stdin.once('data', (data) => {
        if (data.toString().trim().toLowerCase() === 'yes') {
          dbOperations.clearAll();
        } else {
          console.log('❌ Operation cancelled');
        }
        process.exit();
      });
      break;
    default:
      console.log(`
📋 Available commands:
  node server/utils/db-operations.js status    - Check database status
  node server/utils/db-operations.js init      - Initialize basic data structure
  node server/utils/db-operations.js clear     - Clear all data (use with caution!)
      `);
  }
}
