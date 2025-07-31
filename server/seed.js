import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project, Profile, HomeData } from './models/index.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required');
  process.exit(1);
}

// Sample project data
import fs from 'fs';
const projectsData = JSON.parse(fs.readFileSync('./server/data/projectsData.json'));
const profileData = JSON.parse(fs.readFileSync('./server/data/profileData.json'));
const homeData = JSON.parse(fs.readFileSync('./server/data/homeData.json'));
const skillsData = JSON.parse(fs.readFileSync('./server/data/skillsData.json'));
const workExperienceData = JSON.parse(fs.readFileSync('./server/data/workExperienceData.json'));
const educationData = JSON.parse(fs.readFileSync('./server/data/educationData.json'));
const certificationsData = JSON.parse(fs.readFileSync('./server/data/certificationsData.json'));

// Combine profile data from JSON files
const combinedProfileData = {
  ...profileData,
  skills: skillsData,
  workExperience: workExperienceData,
  education: educationData,
  certifications: certificationsData
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Profile.deleteMany({});
    await HomeData.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed projects
    const projects = await Project.insertMany(projectsData);
    console.log(`✅ Seeded ${projects.length} projects`);

    // Seed profile
    const profile = await Profile.create(combinedProfileData);
    console.log('✅ Seeded profile data');

    // Calculate and seed home data
    homeData.stats.projectsDelivered = projects.length;
    homeData.stats.technologiesCount = new Set(
      projects.flatMap(p => p.technologies)
    ).size;
    
    const home = await HomeData.create(homeData);
    console.log('✅ Seeded home data');

    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the seeding function
seedDatabase();
