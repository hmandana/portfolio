import { Project, Profile, HomeData, ContactMessage } from '../models/index.js';

const resolvers = {
  Query: {
    // Project resolvers
    projects: async () => {
      try {
        return await Project.find().sort({ id: 1 });
      } catch (error) {
        throw new Error(`Failed to fetch projects: ${error.message}`);
      }
    },

    project: async (_, { id }) => {
      try {
        return await Project.findOne({ id });
      } catch (error) {
        throw new Error(`Failed to fetch project: ${error.message}`);
      }
    },

    projectsByType: async (_, { type }) => {
      try {
        return await Project.find({ type }).sort({ id: 1 });
      } catch (error) {
        throw new Error(`Failed to fetch projects by type: ${error.message}`);
      }
    },

    // Profile resolver
    profile: async () => {
      try {
        return await Profile.findOne();
      } catch (error) {
        throw new Error(`Failed to fetch profile: ${error.message}`);
      }
    },

    // Home data resolver
    homeData: async () => {
      try {
        const homeData = await HomeData.findOne();
        const projectsCount = await Project.countDocuments();
        const allProjects = await Project.find();
        const technologiesCount = new Set(
          allProjects.flatMap(project => project.technologies)
        ).size;

        if (homeData) {
          homeData.stats.projectsDelivered = projectsCount;
          homeData.stats.technologiesCount = technologiesCount;
        }

        return homeData;
      } catch (error) {
        throw new Error(`Failed to fetch home data: ${error.message}`);
      }
    },

    // Contact message resolvers
    contactMessages: async () => {
      try {
        return await ContactMessage.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error(`Failed to fetch contact messages: ${error.message}`);
      }
    },

    contactMessage: async (_, { id }) => {
      try {
        return await ContactMessage.findById(id);
      } catch (error) {
        throw new Error(`Failed to fetch contact message: ${error.message}`);
      }
    },

    unreadContactMessages: async () => {
      try {
        return await ContactMessage.find({ isRead: false }).sort({ createdAt: -1 });
      } catch (error) {
        throw new Error(`Failed to fetch unread contact messages: ${error.message}`);
      }
    },

    // Utility resolvers
    allTechnologies: async () => {
      try {
        const projects = await Project.find();
        const technologies = new Set();
        projects.forEach(project => {
          project.technologies.forEach(tech => technologies.add(tech));
        });
        return Array.from(technologies).sort();
      } catch (error) {
        throw new Error(`Failed to fetch technologies: ${error.message}`);
      }
    }
  },

  Mutation: {
    // Project mutations
    createProject: async (_, { input }) => {
      try {
        const lastProject = await Project.findOne().sort({ id: -1 });
        const newId = lastProject ? lastProject.id + 1 : 1;
        
        const project = new Project({
          ...input,
          id: newId
        });
        
        return await project.save();
      } catch (error) {
        throw new Error(`Failed to create project: ${error.message}`);
      }
    },

    updateProject: async (_, { id, input }) => {
      try {
        return await Project.findOneAndUpdate(
          { id },
          input,
          { new: true, runValidators: true }
        );
      } catch (error) {
        throw new Error(`Failed to update project: ${error.message}`);
      }
    },

    deleteProject: async (_, { id }) => {
      try {
        const result = await Project.deleteOne({ id });
        return result.deletedCount > 0;
      } catch (error) {
        throw new Error(`Failed to delete project: ${error.message}`);
      }
    },

    // Profile mutations
    updateProfile: async (_, { input }) => {
      try {
        const profile = await Profile.findOne();
        if (profile) {
          Object.assign(profile, input);
          return await profile.save();
        } else {
          const newProfile = new Profile(input);
          return await newProfile.save();
        }
      } catch (error) {
        throw new Error(`Failed to update profile: ${error.message}`);
      }
    },

    sendContactMessage: async (_, { input }) => {
      try {
        // Save message to database
        const contactMessage = new ContactMessage(input);
        await contactMessage.save();
        
        console.log('Contact message saved to database:', {
          name: input.name,
          email: input.email,
          phone: input.phone || 'Not provided',
          message: input.message,
          timestamp: new Date().toISOString()
        });

        return { 
          success: true, 
          message: 'Message sent successfully! We will get back to you soon.' 
        };
      } catch (error) {
        console.error('Error saving contact message:', error);
        return { 
          success: false, 
          message: 'Failed to send message. Please try again later.' 
        };
      }
    },

    markMessageAsRead: async (_, { id }) => {
      try {
        return await ContactMessage.findByIdAndUpdate(
          id,
          { 
            isRead: true, 
            readAt: new Date() 
          },
          { new: true }
        );
      } catch (error) {
        throw new Error(`Failed to mark message as read: ${error.message}`);
      }
    },

    deleteContactMessage: async (_, { id }) => {
      try {
        const result = await ContactMessage.findByIdAndDelete(id);
        return !!result;
      } catch (error) {
        throw new Error(`Failed to delete contact message: ${error.message}`);
      }
    }
  }
};

export default resolvers;
