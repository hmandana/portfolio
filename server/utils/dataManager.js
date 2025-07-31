import fs from 'fs';
import path from 'path';

const DATA_DIR = './server/data/';

/**
 * Data Manager utility for handling JSON data files
 */
class DataManager {
  constructor() {
    this.dataFiles = {
      projects: 'projectsData.json',
      profile: 'profileData.json',
      home: 'homeData.json',
      skills: 'skillsData.json',
      workExperience: 'workExperienceData.json',
      education: 'educationData.json',
      certifications: 'certificationsData.json'
    };
  }

  /**
   * Read data from a specific JSON file
   * @param {string} dataType - Type of data (projects, profile, etc.)
   * @returns {Object|Array} Parsed JSON data
   */
  readData(dataType) {
    try {
      const fileName = this.dataFiles[dataType];
      if (!fileName) {
        throw new Error(`Unknown data type: ${dataType}`);
      }
      
      const filePath = path.join(DATA_DIR, fileName);
      const rawData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error(`Error reading ${dataType} data:`, error.message);
      throw error;
    }
  }

  /**
   * Write data to a specific JSON file
   * @param {string} dataType - Type of data (projects, profile, etc.)
   * @param {Object|Array} data - Data to write
   */
  writeData(dataType, data) {
    try {
      const fileName = this.dataFiles[dataType];
      if (!fileName) {
        throw new Error(`Unknown data type: ${dataType}`);
      }
      
      const filePath = path.join(DATA_DIR, fileName);
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(filePath, jsonData, 'utf8');
      console.log(`✅ Successfully updated ${dataType} data`);
    } catch (error) {
      console.error(`Error writing ${dataType} data:`, error.message);
      throw error;
    }
  }

  /**
   * Validate project data structure
   * @param {Array} projects - Array of project objects
   * @returns {boolean} Whether the data is valid
   */
  validateProjects(projects) {
    const requiredFields = ['id', 'title', 'description', 'technologies', 'type'];
    const errors = [];

    if (!Array.isArray(projects)) {
      errors.push('Projects data must be an array');
      return { isValid: false, errors };
    }

    projects.forEach((project, index) => {
      requiredFields.forEach(field => {
        if (!project.hasOwnProperty(field)) {
          errors.push(`Project ${index + 1} missing required field: ${field}`);
        }
      });

      if (project.technologies && !Array.isArray(project.technologies)) {
        errors.push(`Project ${index + 1} technologies must be an array`);
      }

      if (project.type && !['professional', 'personal'].includes(project.type)) {
        errors.push(`Project ${index + 1} type must be 'professional' or 'personal'`);
      }
    });

    return { isValid: errors.length === 0, errors };
  }

  /**
   * Validate skills data structure
   * @param {Array} skills - Array of skill objects
   * @returns {boolean} Whether the data is valid
   */
  validateSkills(skills) {
    const requiredFields = ['name', 'image'];
    const errors = [];

    if (!Array.isArray(skills)) {
      errors.push('Skills data must be an array');
      return { isValid: false, errors };
    }

    skills.forEach((skill, index) => {
      requiredFields.forEach(field => {
        if (!skill.hasOwnProperty(field)) {
          errors.push(`Skill ${index + 1} missing required field: ${field}`);
        }
      });
    });

    return { isValid: errors.length === 0, errors };
  }

  /**
   * Get all data combined for seeding
   * @returns {Object} Combined data object
   */
  getAllData() {
    return {
      projects: this.readData('projects'),
      profile: this.readData('profile'),
      home: this.readData('home'),
      skills: this.readData('skills'),
      workExperience: this.readData('workExperience'),
      education: this.readData('education'),
      certifications: this.readData('certifications')
    };
  }

  /**
   * Backup all data files with timestamp
   */
  backupData() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = `./server/data/backups/${timestamp}/`;
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    Object.entries(this.dataFiles).forEach(([dataType, fileName]) => {
      try {
        const sourcePath = path.join(DATA_DIR, fileName);
        const backupPath = path.join(backupDir, fileName);
        fs.copyFileSync(sourcePath, backupPath);
      } catch (error) {
        console.warn(`Warning: Could not backup ${fileName}:`, error.message);
      }
    });

    console.log(`✅ Data backed up to: ${backupDir}`);
    return backupDir;
  }

  /**
   * Add a new project to the projects data
   * @param {Object} project - New project object
   */
  addProject(project) {
    const projects = this.readData('projects');
    
    // Auto-generate ID if not provided
    if (!project.id) {
      const maxId = Math.max(...projects.map(p => p.id), 0);
      project.id = maxId + 1;
    }

    // Set default type if not provided
    if (!project.type) {
      project.type = 'personal';
    }

    projects.push(project);
    this.writeData('projects', projects);
    
    console.log(`✅ Added new project: ${project.title}`);
    return project;
  }

  /**
   * Update an existing project
   * @param {number} id - Project ID
   * @param {Object} updates - Object with fields to update
   */
  updateProject(id, updates) {
    const projects = this.readData('projects');
    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }

    projects[projectIndex] = { ...projects[projectIndex], ...updates };
    this.writeData('projects', projects);
    
    console.log(`✅ Updated project: ${projects[projectIndex].title}`);
    return projects[projectIndex];
  }

  /**
   * Delete a project by ID
   * @param {number} id - Project ID
   */
  deleteProject(id) {
    const projects = this.readData('projects');
    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }

    const deletedProject = projects[projectIndex];
    projects.splice(projectIndex, 1);
    this.writeData('projects', projects);
    
    console.log(`✅ Deleted project: ${deletedProject.title}`);
    return deletedProject;
  }

  /**
   * List all available data files and their status
   */
  listDataFiles() {
    console.log('\n📊 Data Files Status:');
    console.log('====================');
    
    Object.entries(this.dataFiles).forEach(([dataType, fileName]) => {
      const filePath = path.join(DATA_DIR, fileName);
      try {
        const stats = fs.statSync(filePath);
        const data = this.readData(dataType);
        const count = Array.isArray(data) ? data.length : 'N/A';
        
        console.log(`${dataType.padEnd(15)} | ${fileName.padEnd(25)} | ${count.toString().padStart(5)} items | ${stats.size} bytes`);
      } catch (error) {
        console.log(`${dataType.padEnd(15)} | ${fileName.padEnd(25)} | ❌ ERROR: ${error.message}`);
      }
    });
  }
}

export default DataManager;
