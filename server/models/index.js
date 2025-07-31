import mongoose from 'mongoose';

// Project Schema
const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  Company: { type: String },
  demoLink: { type: String },
  githubLink: { type: String },
  type: { type: String, enum: ['professional', 'personal'], default: 'professional' }
}, { timestamps: true });

// About/Profile Schema
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: [{ type: String }],
  skills: [{
    name: { type: String, required: true },
    image: { type: String, required: true }
  }],
  workExperience: [{
    title: { type: String, required: true },
    company: { type: String, required: true },
    years: { type: String, required: true },
    details: [{ type: String }]
  }],
  education: [{
    degree: { type: String, required: true },
    school: { type: String, required: true },
    year: { type: String, required: true },
    details: { type: String }
  }],
  certifications: [{
    name: { type: String, required: true },
    org: { type: String, required: true },
    year: { type: String, required: true },
    details: { type: String }
  }],
  interests: [{ type: String }]
}, { timestamps: true });

// Home Page Data Schema
const homeDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roles: [{ type: String }],
  intro: [{ type: String }],
  stats: {
    yearsExperience: { type: Number, default: 10 },
    technologiesCount: { type: Number, default: 0 },
    projectsDelivered: { type: Number, default: 0 }
  }
}, { timestamps: true });

// Contact Message Schema
const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  readAt: { type: Date }
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);
export const Profile = mongoose.model('Profile', profileSchema);
export const HomeData = mongoose.model('HomeData', homeDataSchema);
export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
