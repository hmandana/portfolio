import React, { useState, useEffect } from 'react';
import { type Project } from '../../services/staticDataService';

interface PersonalProject extends Project {
  demoLink: string;
  githubLink: string;
}

interface ProjectCardProps {
  project: PersonalProject | Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); // Staggered animation

    return () => clearTimeout(timer);
  }, [index]);

  const isPersonalProject = (proj: PersonalProject | Project): proj is PersonalProject => {
    return proj.type === 'personal' && proj.demoLink != null && proj.githubLink != null;
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-purple-500 to-pink-600',
    ];
    return gradients[index % gradients.length];
  };

  const getTechIcon = (tech: string) => {
    const techIcons: { [key: string]: string } = {
      'React': '⚛️',
      'ReactJS': '⚛️',
      'TypeScript': '🔷',
      'JavaScript': '🟨',
      'Node.js': '🟢',
      'Python': '🐍',
      'JAVA': '☕',
      'AWS': '☁️',
      'Docker': '🐳',
      'Kubernetes': '⚓',
      'MongoDB': '🍃',
      'PostgreSQL': '🐘',
      'GraphQL': '🔗',
      'Next.js': '▲',
      'Vue.js': '💚',
      'Angular': '🅰️',
      'Angular JS': '🅰️',
      'Go Lang': '🐹',
      'Figma': '🎨',
    };
    return techIcons[tech] || '🔧';
  };

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Gradient Header */}
      <div className={`h-2 bg-gradient-to-r ${getGradientClass(index)}`} />
      
      {/* Card Content */}
      <div className="p-6">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
              {project.title}
            </h3>
            {project.Company && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span className="mr-1">🏢</span>
                <span className="font-medium">{project.Company}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <span>#{project.id}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 max-h-20 overflow-hidden">
            {project.technologies.slice(0, 6).map((tech, idx) => (
              <span
                key={`${project.id}-${tech}-${idx}`}
                className="inline-flex items-center px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
                title={tech}
              >
                <span className="mr-1 text-xs">{getTechIcon(tech)}</span>
                {tech}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="inline-flex items-center px-2.5 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                +{project.technologies.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          {isPersonalProject(project) && (
            <>
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <span className="mr-2">🚀</span>
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-2">📁</span>
                  GitHub
                </a>
              )}
            </>
          )}
          {!isPersonalProject(project) && (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>💼</span>
                <span>Professional Project</span>
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                <span>Production</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Corner Decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-transparent to-blue-500/20 dark:to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ProjectCard;
