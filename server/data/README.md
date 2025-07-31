# Portfolio Data Management

This directory contains all the JSON data files that power the portfolio website. The data is structured in separate files for maintainability and ease of updates.

## Data Structure

### 📁 Files Overview

| File | Description | Type |
|------|-------------|------|
| `projectsData.json` | All professional and personal projects | Array |
| `profileData.json` | Basic profile information and contact details | Object |
| `skillsData.json` | Technical skills with image paths | Array |
| `workExperienceData.json` | Work history with detailed descriptions | Array |
| `educationData.json` | Educational background | Array |
| `certificationsData.json` | Professional certifications | Array |
| `homeData.json` | Home page content and stats | Object |

## Data Schema

### Projects (`projectsData.json`)
```json
{
  "id": 1,
  "title": "Project Name",
  "Company": "Company Name (optional)",
  "description": "Detailed project description",
  "technologies": ["React", "Node.js", "etc"],
  "demoLink": "https://demo-url.com (optional)",
  "githubLink": "https://github.com/repo-url (optional)",
  "type": "professional" // or "personal"
}
```

### Skills (`skillsData.json`)
```json
{
  "name": "Technology Name",
  "image": "/assets/skills/tech-icon.png"
}
```

### Work Experience (`workExperienceData.json`)
```json
{
  "title": "Job Title",
  "company": "Company Name",
  "years": "2022 - 2024",
  "details": [
    "Achievement or responsibility 1",
    "Achievement or responsibility 2"
  ]
}
```

### Education (`educationData.json`)
```json
{
  "degree": "Degree Name",
  "school": "Institution Name",
  "year": "2013",
  "details": "Additional details about the education"
}
```

### Certifications (`certificationsData.json`)
```json
{
  "name": "Certification Name",
  "org": "Issuing Organization",
  "year": "2021",
  "details": "Description of the certification"
}
```

## Management Commands

### Available NPM Scripts

```bash
# List all data files and their status
npm run data:list

# Create a backup of all data files
npm run data:backup

# Validate data structure and format
npm run data:validate

# Export all data to a single JSON file
npm run data:export

# Show help for data management
npm run data:help

# Seed the database with current JSON data
npm run seed
```

### Direct Script Usage

```bash
# Using the management script directly
node server/scripts/manageData.js [command]

# Examples:
node server/scripts/manageData.js list
node server/scripts/manageData.js backup
node server/scripts/manageData.js validate
node server/scripts/manageData.js delete-project 12
```

## Data Management Workflow

### Adding New Projects

1. **Option 1: Direct Edit**
   - Edit `projectsData.json` manually
   - Add new project object with incremented ID
   - Validate with `npm run data:validate`
   - Seed database with `npm run seed`

2. **Option 2: Using CLI**
   ```bash
   node server/scripts/manageData.js add-project
   # Follow the interactive prompts
   ```

### Updating Existing Data

1. **Backup First**
   ```bash
   npm run data:backup
   ```

2. **Edit JSON Files**
   - Modify the appropriate JSON file
   - Ensure proper JSON formatting
   - Validate your changes

3. **Validate Changes**
   ```bash
   npm run data:validate
   ```

4. **Re-seed Database**
   ```bash
   npm run seed
   ```

### Adding New Skills

1. Add the skill image to `src/assets/skills/`
2. Update `skillsData.json` with the new skill:
   ```json
   {
     "name": "New Technology",
     "image": "/assets/skills/new-tech.png"
   }
   ```
3. Update the imports in `src/assets/skills/index.ts` if needed
4. Re-seed the database

## Data Backup and Recovery

### Automatic Backups
- Backups are created with timestamps in `server/data/backups/`
- Each backup includes all JSON files
- Use `npm run data:backup` to create manual backups

### Recovery
1. Locate the backup in `server/data/backups/[timestamp]/`
2. Copy the desired files back to `server/data/`
3. Validate and re-seed the database

## Validation Rules

### Projects
- Required fields: `id`, `title`, `description`, `technologies`, `type`
- `technologies` must be an array
- `type` must be either "professional" or "personal"
- `id` must be unique

### Skills
- Required fields: `name`, `image`
- `image` should point to existing asset file

### General
- All files must be valid JSON
- Arrays should not be empty
- String fields should not be empty or null

## Best Practices

1. **Always backup before making changes**
2. **Validate data after modifications**
3. **Use consistent formatting and naming**
4. **Keep descriptions concise but informative**
5. **Update skill images when adding new technologies**
6. **Maintain chronological order in work experience**
7. **Use semantic versioning for major data changes**

## Troubleshooting

### Common Issues

1. **JSON Syntax Errors**
   - Use a JSON validator or `npm run data:validate`
   - Check for missing commas, brackets, or quotes

2. **Missing Skills Images**
   - Ensure image files exist in `src/assets/skills/`
   - Update the skills index file if needed

3. **Seeding Failures**
   - Check MongoDB connection
   - Verify all required fields are present
   - Look for data validation errors

### Error Messages

- `SyntaxError: Unexpected token`: JSON formatting issue
- `Project X missing required field Y`: Required field missing
- `MONGODB_URI environment variable is required`: Database connection issue

## Contributing

When contributing to the data:
1. Follow the established schema
2. Test your changes locally
3. Create backups before major updates
4. Document any schema changes
5. Update this README if adding new data types
