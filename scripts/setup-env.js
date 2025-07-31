#!/usr/bin/env node

/**
 * Environment Configuration Helper
 * This script helps set up environment variables for different deployment environments
 */

import fs from 'fs';
import path from 'path';

const environments = {
  development: {
    VITE_GRAPHQL_ENDPOINT: 'http://localhost:4000/graphql',
    NODE_ENV: 'development'
  },
  production: {
    VITE_GRAPHQL_ENDPOINT: 'https://portfolio-graphql-server.onrender.com/graphql',
    NODE_ENV: 'production'
  },
};

function createEnvFile(env) {
  const config = environments[env];
  if (!config) {
    console.error(`❌ Unknown environment: ${env}`);
    console.log('Available environments:', Object.keys(environments).join(', '));
    process.exit(1);
  }

  const envFile = env === 'development' ? '.env' : `.env.${env}`;
  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n') + '\n';

  fs.writeFileSync(envFile, envContent);
  console.log(`✅ Created ${envFile} with ${env} configuration`);
  
  if (env === 'production') {
    console.log('\n🔧 Next steps:');
    console.log('1. Update the VITE_GRAPHQL_ENDPOINT with your actual Render service URL');
    console.log('2. Add environment variables to your Render service dashboard');
    console.log('3. Add VITE_GRAPHQL_ENDPOINT as a GitHub secret for CI/CD');
  }
}

function displayCurrentConfig() {
  console.log('📋 Current Environment Configuration:\n');
  
  ['development', 'production', 'staging'].forEach(env => {
    const envFile = env === 'development' ? '.env' : `.env.${env}`;
    const envPath = path.join(process.cwd(), envFile);
    
    if (fs.existsSync(envPath)) {
      console.log(`✅ ${envFile}:`);
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n')
        .filter(line => line.trim() && !line.startsWith('#'))
        .forEach(line => console.log(`   ${line}`));
    } else {
      console.log(`❌ ${envFile}: Not found`);
    }
    console.log('');
  });
}

function validateConfig() {
  console.log('🔍 Validating Environment Configuration:\n');
  
  const requiredVars = ['VITE_GRAPHQL_ENDPOINT'];
  let allValid = true;
  
  ['development', 'production'].forEach(env => {
    const envFile = env === 'development' ? '.env' : `.env.${env}`;
    const envPath = path.join(process.cwd(), envFile);
    
    console.log(`Checking ${envFile}:`);
    
    if (!fs.existsSync(envPath)) {
      console.log(`  ❌ File not found`);
      allValid = false;
      return;
    }
    
    const content = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    content.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          envVars[key.trim()] = value.trim();
        }
      }
    });
    
    requiredVars.forEach(varName => {
      if (envVars[varName]) {
        console.log(`  ✅ ${varName}: ${envVars[varName]}`);
      } else {
        console.log(`  ❌ ${varName}: Missing`);
        allValid = false;
      }
    });
    
    // Check for localhost in production
    if (env === 'production' && envVars.VITE_GRAPHQL_ENDPOINT?.includes('localhost')) {
      console.log(`  ⚠️  Production environment pointing to localhost!`);
      allValid = false;
    }
    
    console.log('');
  });
  
  if (allValid) {
    console.log('✅ All environment configurations are valid!');
  } else {
    console.log('❌ Some environment configurations need attention.');
    process.exit(1);
  }
}

// Main script logic
const command = process.argv[2];
const environment = process.argv[3];

switch (command) {
  case 'create':
    if (!environment) {
      console.error('Usage: node setup-env.js create <development|production|staging>');
      process.exit(1);
    }
    createEnvFile(environment);
    break;
    
  case 'list':
    displayCurrentConfig();
    break;
    
  case 'validate':
    validateConfig();
    break;
    
  default:
    console.log('Environment Configuration Helper\n');
    console.log('Usage:');
    console.log('  node setup-env.js create <environment>  - Create environment file');
    console.log('  node setup-env.js list                  - Show current configuration');
    console.log('  node setup-env.js validate              - Validate all configurations');
    console.log('\nEnvironments: development, production, staging');
    break;
}
