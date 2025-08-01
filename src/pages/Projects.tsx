import React, { useState, useMemo, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../graphql/queries';
import ProjectDetailsModal from '../components/ProjectDetailsModal';
import '../styles/projects-animations.css';

// Enhanced type definitions
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  Company?: string;
  demoLink?: string;
  githubLink?: string;
  type: 'professional' | 'personal';
}

interface PersonalProject extends Project {
  demoLink: string;
  githubLink: string;
}


// Dynamically load project card component
const ProjectCard = lazy(() => import('./components/ProjectCard'));

// Custom hooks for optimization
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * React hook that returns a boolean indicating whether the element
 * referred to by the given ref is currently intersecting with the
 * viewport.
 *
 * @param ref The ref to the element to observe.
 * @param options Options for the IntersectionObserver.
 * @returns A boolean indicating whether the element is currently
 * intersecting with the viewport.
 */
const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement | null>, options: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

const Projects: React.FC = () => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'professional' | 'personal'>('professional');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAll, setShowAll] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const observerOptions = useMemo(() => ({ threshold: 0.1 }), []);
  const isVisible = useIntersectionObserver(containerRef, observerOptions);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const VISIBLE_COUNT = 5;
  const LOAD_MORE_COUNT = 6;

  // GraphQL query
  const { data, loading, error } = useQuery<{ projects: Project[] }>(GET_PROJECTS);

  // Use GraphQL data
  const allProjects = data?.projects || [];
  const professionalProjects = allProjects.filter(p => p.type === 'professional');
  const personalProjects = allProjects.filter(p => p.type === 'personal');

  // Memoized computations for better performance - MUST be before conditional returns
  const allTechnologies = useMemo(() =>
    Array.from(
      new Set([...professionalProjects, ...personalProjects].flatMap(project => project.technologies))
    ).sort(),
    [professionalProjects, personalProjects]
  );

  const visibleTech = useMemo(() =>
    showAll ? allTechnologies : allTechnologies.slice(0, VISIBLE_COUNT),
    [showAll, allTechnologies]
  );

  // Enhanced filtering with search and technology filter
  const filteredProfessionalProjects = useMemo(() => {
    let filtered = professionalProjects;

    if (selectedTechs.length > 0) {
      filtered = filtered.filter(project => 
        selectedTechs.some(tech => project.technologies.includes(tech))
      );
    }

    if (debouncedSearchQuery) {
      // Support multi-keyword search: split on comma or space
      const keywords = debouncedSearchQuery.split(/[\s,]+/).map(q => q.toLowerCase()).filter(Boolean);
      if (keywords.length > 0) {
        filtered = filtered.filter(project =>
          keywords.every(query =>
            project.title.toLowerCase().includes(query)
            || project.description.toLowerCase().includes(query)
            || project.Company?.toLowerCase().includes(query)
            || project.technologies.some(tech => tech.toLowerCase().includes(query))
          )
        );
      }
    }

    return filtered;
  }, [selectedTechs, debouncedSearchQuery, professionalProjects]);

  const filteredPersonalProjects = useMemo(() => {
    let filtered = personalProjects;

    if (selectedTechs.length > 0) {
      filtered = filtered.filter(project => 
        selectedTechs.some(tech => project.technologies.includes(tech))
      );
    }

    if (debouncedSearchQuery) {
      const keywords = debouncedSearchQuery.split(/[\s,]+/).map(q => q.toLowerCase()).filter(Boolean);
      if (keywords.length > 0) {
        filtered = filtered.filter(project =>
          keywords.every(query =>
            project.title.toLowerCase().includes(query)
            || project.description.toLowerCase().includes(query)
            || project.technologies.some(tech => tech.toLowerCase().includes(query))
          )
        );
      }
    }

    return filtered;
  }, [selectedTechs, debouncedSearchQuery, personalProjects]);

  // Optimized handlers with useCallback
  const handleTechFilter = useCallback((tech: string) => {
    setIsAnimating(true);
    if (tech === '') {
      // Clear all selected technologies
      setSelectedTechs([]);
    } else {
      // Toggle technology selection
      setSelectedTechs(prev => 
        prev.includes(tech) 
          ? prev.filter(t => t !== tech)
          : [...prev, tech]
      );
    }
    setDisplayCount(LOAD_MORE_COUNT);
    setTimeout(() => setIsAnimating(false), 300);
  }, [LOAD_MORE_COUNT]);

  const handleTabChange = useCallback((tab: 'professional' | 'personal') => {
    setIsAnimating(true);
    setActiveTab(tab);
    setDisplayCount(LOAD_MORE_COUNT);
    setTimeout(() => setIsAnimating(false), 300);
  }, [LOAD_MORE_COUNT]);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + LOAD_MORE_COUNT);
      setIsLoading(false);
    }, 500);
  }, [LOAD_MORE_COUNT]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setDisplayCount(LOAD_MORE_COUNT);
  }, [LOAD_MORE_COUNT]);

  const clearFilters = useCallback(() => {
    setSelectedTechs([]);
    setSearchQuery('');
    setDisplayCount(LOAD_MORE_COUNT);
  }, [LOAD_MORE_COUNT]);

  // Get current filtered projects and counts
  const currentProjects = activeTab === 'professional' ? filteredProfessionalProjects : filteredPersonalProjects;
  const displayedProjects = currentProjects.slice(0, displayCount);

  const [selectedProject, setSelectedProject] = useState<Project | PersonalProject | null>(null);
  const handleProjectClick = useCallback((project: Project | PersonalProject) => {
    setSelectedProject(project);
  }, []);
  const handleCloseModal = useCallback(() => setSelectedProject(null), []);
  const hasMoreProjects = currentProjects.length > displayCount;
  const professionalCount = filteredProfessionalProjects.length;
  const personalCount = filteredPersonalProjects.length;

  // Effect for smooth scrolling on filter changes
  useEffect(() => {
    if (isVisible && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedTechs, activeTab, isVisible]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-cyan-400"></div>
      </div>
    );
  }

  // Error state with retry functionality
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Unable to Load Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We encountered an error while fetching the project data.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-700 dark:text-red-300 font-mono">
                {error.message}
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state (no projects but no error)
  if (!loading && !error && allProjects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-gray-400 text-6xl mb-4">📂</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            No Projects Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            It looks like there are no projects available at the moment.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6" ref={containerRef}>
      {/* Page Title with Stats */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2 animate-fade-in">
          My Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Explore my professional and personal work
        </p>
        <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>📊 {allProjects.length} Total Projects</span>
          <span>🛠️ {allTechnologies.length} Technologies</span>
          <span>🏢 {Array.from(new Set(allProjects.filter(p => p.Company).map(p => p.Company))).length} Companies</span>
        </div>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search projects by title, description, company, or technology..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 pr-16 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {(searchQuery || selectedTechs.length > 0) && (
              <button
                type="button"
                title="clear filters"
                onClick={clearFilters}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Technology Filter Pills */}
        <section id="filters" className="mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
              Filter by Technology
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => handleTechFilter('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${selectedTechs.length === 0
                  ? 'bg-blue-600 dark:bg-cyan-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}>
                All Technologies
              </button>

              {visibleTech.map(tech => (
                <button
                  type="button"
                  key={tech}
                  onClick={() => handleTechFilter(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${selectedTechs.includes(tech)
                    ? 'bg-blue-600 dark:bg-cyan-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}>
                  {tech}
                </button>
              ))}
            </div>

            {allTechnologies.length > VISIBLE_COUNT && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm text-blue-600 dark:text-cyan-400 hover:underline transition-colors duration-300">
                  {showAll ? '▲ Show Less Technologies' : '▼ Show More Technologies'}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Tab Navigation & Project Grid */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Toggle Switch Container */}
        <div className="flex justify-center mb-8 px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">

            {/* Professional Label */}
            <button
              type="button"
              onClick={() => handleTabChange('professional')}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${activeTab === 'professional'
                  ? 'text-blue-600 dark:text-cyan-400 scale-105'
                  : 'text-gray-500 dark:text-gray-500 scale-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <div
                className={`p-2 rounded-lg transition-all duration-300 ${activeTab === 'professional'
                    ? 'bg-blue-100 dark:bg-cyan-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                  }`}
              >
                <span role="img" aria-label="briefcase" className="text-xl">💼</span>
              </div>
              <div className="text-left">
                <span className="font-semibold text-sm">Professional</span>
                <span className="block text-xs opacity-75">{professionalCount} projects</span>
              </div>
            </button>

            {/* Toggle */}
            <div className="flex justify-center items-center flex-shrink-0">
              <label className="relative inline-block w-14 h-8 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeTab === 'personal'}
                  onChange={() =>
                    handleTabChange(activeTab === 'professional' ? 'personal' : 'professional')
                  }
                  className="sr-only peer"
                  role="switch"
                  aria-checked={activeTab === 'personal'}
                  aria-label="Toggle between professional and personal projects"
                />
                <div className="w-14 h-8 bg-blue-600 dark:bg-cyan-500 rounded-full peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-blue-400 dark:peer-focus:ring-cyan-400 transition-colors"></div>
                <div className="absolute top-[2px] left-[2px] w-7 h-7 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-6 shadow-md flex items-center justify-center text-sm text-blue-600 dark:text-cyan-600">
                  {activeTab === 'professional' ? '💼' : '🚀'}
                </div>
              </label>
            </div>

            {/* Personal Label */}
            <button
              type="button"
              onClick={() => handleTabChange('personal')}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${activeTab === 'personal'
                  ? 'text-blue-600 dark:text-cyan-400 scale-105'
                  : 'text-gray-500 dark:text-gray-500 scale-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <div
                className={`p-2 rounded-lg transition-all duration-300 ${activeTab === 'personal'
                    ? 'bg-blue-100 dark:bg-cyan-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                  }`}
              >
                <span role="img" aria-label="rocket" className="text-xl">🚀</span>
              </div>
              <div className="text-left">
                <span className="font-semibold text-sm">Personal</span>
                <span className="block text-xs opacity-75">{personalCount} projects</span>
              </div>
            </button>
          </div>
        </div>



        {/* Animated Project Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>{displayedProjects.map((project, index) => (
            <Suspense key={`${project.id}-${activeTab}`} fallback={<div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-64 rounded-lg"></div>}>
              <div onClick={() => handleProjectClick(project)} className="cursor-pointer">
                <ProjectCard
                  project={project as PersonalProject | Project}
                  index={index}
                />
              </div>
            </Suspense>
          ))}
        </div>
        <ProjectDetailsModal project={selectedProject} onClose={handleCloseModal} />
      </div>

      {/* Load More Button and Empty State */}
        <div className="text-center mt-12">
          {hasMoreProjects ? (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                '▼ Load More Projects'
              )}
            </button>
          ) : (
            currentProjects.length > 0 && (
              <p className="text-gray-500 dark:text-gray-400">You've reached the end!</p>
            )
          )}
        </div>

        {/* Empty State */}
        {currentProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4 text-5xl">🤷‍♂️</div>
            <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">
              No projects found matching your criteria.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 px-5 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors duration-300 transform hover:scale-105">
              Clear Filters and Show All
            </button>
          </div>
        )}
      </div>
  );
};

export default Projects;
