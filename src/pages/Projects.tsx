import React, { useState } from 'react';

// Sample project data
const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
    image: 'https://via.placeholder.com/800x600/3182ce/FFFFFF?text=E-commerce+Platform',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    demoLink: 'https://example.com/demo1',
    githubLink: 'https://github.com/yourusername/ecommerce-platform',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A Kanban-style task management application with drag and drop functionality and team collaboration features.',
    image: 'https://via.placeholder.com/800x600/4299e1/FFFFFF?text=Task+Management+App',
    technologies: ['React', 'TypeScript', 'Firebase'],
    demoLink: 'https://example.com/demo2',
    githubLink: 'https://github.com/yourusername/task-management',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather application using weather API with location services and 5-day forecasts.',
    image: 'https://via.placeholder.com/800x600/63b3ed/FFFFFF?text=Weather+Dashboard',
    technologies: ['JavaScript', 'HTML/CSS', 'API Integration'],
    demoLink: 'https://example.com/demo3',
    githubLink: 'https://github.com/yourusername/weather-app',
  },
  {
    id: 4,
    title: 'Social Media Dashboard',
    description: 'An analytics dashboard for social media accounts showing engagement metrics and growth statistics.',
    image: 'https://via.placeholder.com/800x600/90cdf4/FFFFFF?text=Social+Media+Dashboard',
    technologies: ['React', 'Chart.js', 'Node.js'],
    demoLink: 'https://example.com/demo4',
    githubLink: 'https://github.com/yourusername/social-dashboard',
  },
  {
    id: 5,
    title: 'Blog Platform',
    description: 'A content management system with Markdown support, categories, and user authentication.',
    image: 'https://via.placeholder.com/800x600/bee3f8/FFFFFF?text=Blog+Platform',
    technologies: ['Next.js', 'MongoDB', 'Tailwind CSS'],
    demoLink: 'https://example.com/demo5',
    githubLink: 'https://github.com/yourusername/blog-platform',
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    description: 'A mobile-first application for tracking workouts, progress, and fitness goals with data visualization.',
    image: 'https://via.placeholder.com/800x600/ebf8ff/000000?text=Fitness+Tracker',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    demoLink: 'https://example.com/demo6',
    githubLink: 'https://github.com/yourusername/fitness-tracker',
  }
];

// Get unique technologies for filter
const allTechnologies = Array.from(
  new Set(projectsData.flatMap(project => project.technologies))
).sort();

const Projects: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('');
  
  // Filter projects based on selected technology
  const filteredProjects = selectedTech
    ? projectsData.filter(project => project.technologies.includes(selectedTech))
    : projectsData;
  
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        My Projects
      </h1>
      
      {/* Filter Section */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTech('')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
              selectedTech === ''
                ? 'bg-blue-600 dark:bg-cyan-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          
          {allTechnologies.map(tech => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                selectedTech === tech
                  ? 'bg-blue-600 dark:bg-cyan-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Project Image */}
            <div className="h-48 overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            
            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {project.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 h-20 overflow-hidden">
                {project.description}
              </p>
              
              {/* Technologies */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Links */}
              <div className="flex justify-between">
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white text-sm font-medium rounded-md transition-colors duration-300"
                >
                  Live Demo
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm font-medium rounded-md transition-colors duration-300"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No projects found with the selected technology.
          </p>
          <button
            onClick={() => setSelectedTech('')}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-medium rounded-md transition-colors duration-300"
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;

