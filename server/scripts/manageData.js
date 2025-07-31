#!/usr/bin/env node

import DataManager from '../utils/dataManager.js';
import { execSync } from 'child_process';

const dataManager = new DataManager();

/**
 * Display help information
 */
function showHelp() {
  console.log(`
📊 Portfolio Data Management CLI
================================

Usage: node server/scripts/manageData.js [command] [options]

Commands:
  list                    List all data files and their status
  backup                  Create a backup of all data files
  validate               Validate all data files
  seed                   Seed the database with current JSON data
  add-project            Add a new project (interactive)
  update-project <id>    Update an existing project (interactive)
  delete-project <id>    Delete a project by ID
  export                 Export all data to a single JSON file
  
Examples:
  node server/scripts/manageData.js list
  node server/scripts/manageData.js backup
  node server/scripts/manageData.js add-project
  node server/scripts/manageData.js update-project 12
  node server/scripts/manageData.js delete-project 12
  `);
}

/**
 * Interactive project creation
 */
async function addProjectInteractive() {
  console.log('\n🚀 Add New Project');
  console.log('==================');
  
  // This is a simplified version - in a real implementation you might use a library like 'inquirer'
  console.log('Please edit server/data/projectsData.json manually to add a new project.');
  console.log('Use the following template:');
  console.log(`
{
  "id": 13,
  "title": "Your Project Title",
  "Company": "Company Name (optional)",
  "description": "Project description",
  "technologies": ["React", "Node.js", "etc"],
  "demoLink": "https://demo-link.com (optional)",
  "githubLink": "https://github.com/your-repo (optional)",
  "type": "professional" // or "personal"
}`);
}

/**
 * Validate all data files
 */
function validateData() {
  console.log('\n🔍 Validating Data Files');
  console.log('========================');
  
  let allValid = true;
  const validationResults = {};

  try {
    // Validate projects
    const projects = dataManager.readData('projects');
    const projectValidation = dataManager.validateProjects(projects);
    validationResults.projects = projectValidation;
    
    if (projectValidation.isValid) {
      console.log('✅ Projects data is valid');
    } else {
      console.log('❌ Projects data has errors:');
      projectValidation.errors.forEach(error => console.log(`   - ${error}`));
      allValid = false;
    }

    // Validate skills
    const skills = dataManager.readData('skills');
    const skillsValidation = dataManager.validateSkills(skills);
    validationResults.skills = skillsValidation;
    
    if (skillsValidation.isValid) {
      console.log('✅ Skills data is valid');
    } else {
      console.log('❌ Skills data has errors:');
      skillsValidation.errors.forEach(error => console.log(`   - ${error}`));
      allValid = false;
    }

    // Check other data files exist and are valid JSON
    ['profile', 'home', 'workExperience', 'education', 'certifications'].forEach(dataType => {
      try {
        dataManager.readData(dataType);
        console.log(`✅ ${dataType} data is valid JSON`);
      } catch (error) {
        console.log(`❌ ${dataType} data error: ${error.message}`);
        allValid = false;
      }
    });

  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    allValid = false;
  }

  console.log(`\n${allValid ? '✅' : '❌'} Overall validation: ${allValid ? 'PASSED' : 'FAILED'}`);
  return allValid;
}

/**
 * Export all data to a single file
 */
function exportData() {
  try {
    const allData = dataManager.getAllData();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const exportPath = `./server/data/export-${timestamp}.json`;
    
    require('fs').writeFileSync(exportPath, JSON.stringify(allData, null, 2));
    console.log(`✅ All data exported to: ${exportPath}`);
  } catch (error) {
    console.error('❌ Export failed:', error.message);
  }
}

/**
 * Seed database using the seed script
 */
function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');
    execSync('npm run seed', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  }
}

/**
 * Main function to handle command line arguments
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'list':
      dataManager.listDataFiles();
      break;
      
    case 'backup':
      dataManager.backupData();
      break;
      
    case 'validate':
      validateData();
      break;
      
    case 'seed':
      seedDatabase();
      break;
      
    case 'add-project':
      addProjectInteractive();
      break;
      
    case 'update-project':
      const updateId = parseInt(args[1]);
      if (!updateId) {
        console.error('❌ Please provide a project ID to update');
        process.exit(1);
      }
      console.log(`Updating project ${updateId} - please edit server/data/projectsData.json manually`);
      break;
      
    case 'delete-project':
      const deleteId = parseInt(args[1]);
      if (!deleteId) {
        console.error('❌ Please provide a project ID to delete');
        process.exit(1);
      }
      try {
        dataManager.deleteProject(deleteId);
      } catch (error) {
        console.error('❌ Delete failed:', error.message);
      }
      break;
      
    case 'export':
      exportData();
      break;
      
    case 'help':
    case '--help':
    case '-h':
    default:
      showHelp();
      break;
  }
}

// Run the main function
main();
