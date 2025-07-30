import React from 'react';
import type { Project } from '../pages/Projects';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-xl relative animate-fade-in">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-red-500 text-2xl font-bold focus:outline-none"
          aria-label="Close modal"
          onClick={onClose}
        >×</button>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h2>
        {'Company' in project && project.Company && (
          <div className="text-blue-600 dark:text-cyan-400 mb-2 font-semibold">{project.Company}</div>
        )}
        <p className="mb-3 text-gray-700 dark:text-gray-200">{project.description}</p>
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Technologies Used:</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-cyan-900 dark:text-cyan-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
        {'demoLink' in project || 'githubLink' in project ? (
          <div className="flex gap-4 mt-4">
            {'demoLink' in project && project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                Live Demo
              </a>
            )}
            {'githubLink' in project && project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-200 hover:underline font-semibold">
                View Code
              </a>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectDetailsModal;

