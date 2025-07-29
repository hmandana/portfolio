import React, { useState } from 'react';

// Sample project data
type selfProjectsData = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  demoLink: string;
  githubLink: string;
}[]
const projectsData = [
  {
    id: 1,
    title: 'EG Console',
    Company: 'Expedia Group',
    description: 'The Expedia Group (EG) Console is a unified developer platform that provides partners, developers, and internal teams with access to tools, APIs, and resources to build, manage, and optimize travel-related integrations with Expedia Group.',
    technologies: ['ReactJS', 'TypeScript', 'Kotlin JAVA', 'Apollo GraphQL', 'Qiankun', 'HapiJS', 'Cypress', 'Playwright', 'React testing library', 'NX/yarn monorepo workspace', 'Catchpoint', 'Datadog', 'Python', 'Github Actions', 'Docker', 'Kubernetes', 'AWS', 'Spinnaker', 'Jenkins', 'Figma', 'Miro'],
  },
  {
    id: 2,
    title: 'Lodging Connectivity',
    Company: 'Expedia Group',
    description: 'A Kanban-style task management application with drag and drop functionality and team collaboration features.',
    technologies: ['React', 'TypeScript', 'Apollo GraphQL', 'Playwright', 'Datadog', 'Github Actions', 'Docker', 'Kubernetes', 'AWS', 'Spinnaker', 'Figma', 'Miro'],
  },
  {
    id: 3,
    title: 'Unified Login',
    Company: 'Expedia Group',
    description: 'Real-time weather application using weather API with location services and 5-day forecasts.',
    technologies: ['React', 'TypeScript', 'JAVA', 'Spring Boot', 'Kotlin JAVA', 'Apollo GraphQL', 'OAuth2', 'JWT', 'Playwright', 'Datadog', 'Github Actions', 'Docker', 'Kubernetes', 'AWS', 'Spinnaker', 'Figma', 'Miro'],
  },
  {
    id: 4,
    title: 'CIB Identity Services',
    Company: 'JP Morgan Chase',
    description: 'A unified solution for authentication into multiple JP Morgan portals with modernized user experience using latest tools and technologies',
    technologies: ['ReactJS', 'TypeScript', 'Redux', 'Cypress.IO', 'React testing library', 'IAM', 'JWT', 'AWS', 'Transmit Security', 'Material UI', 'Spring boot', 'JAVA', 'Linux', 'Jenkins', 'WCAG', 'JAWS', 'NVDA', 'Black Duck', 'SonarQube'],
  },
  {
    id: 5,
    title: 'Trading Operations',
    Company: 'JP Morgan Chase',
    description: 'A content management system with Markdown support, categories, and user authentication.',
    technologies: ['ReactJS', 'TypeScript', 'ContextAPI', 'Ag-Grid', 'React testing library', 'AWS', 'Material UI', 'Spring boot', 'JAVA', 'Jenkins', 'Black Duck', 'SonarQube', 'Grafana'],
  },
  {
    id: 6,
    title: 'Government Shutdown Loan',
    Company: 'USAA',
    description: 'Consumer lending Origination Experience (CLOE) is a leading-edge dual facing (Member and Internal) automated web application for secure and insecure loans',
    technologies: [
      "React",
      "Node.js",
      "Redux",
      "Sass",
      "JAVA",
      "JAWS",
      "Jenkins",
      "CSS",
      "ES6",
      "Bootstrap CSS",
      "Puppeteer",
      "Babel",
      "Webpack 4",
      "Jest",
      "Cucumber",
      "Selenium",
      "WCAG"
    ]
    ,
  },
  {
    id: 7,
    title: 'Consumer Portal',
    Company: 'West Interactive Services',
    description: 'The West Customer portal is a leading provider of cloud-based customer experience and communication solutions, strategically attract, engage, and serve customers on their own terms and consultatively integrating technology to improve interaction, enhance productivity, increase profitability and exceed customer expectations, with clients in healthcare, education, utilities and diverse commercial industries.',
    technologies: [
      "React",
      "Node.js",
      "Hapi.js",
      "Jasmine karma",
      "Jest",
      "Redux",
      "ES6",
      "Less",
      "Jenkins",
      "Bootstrap CSS",
      "Webpack 2/3",
      "PCF - Pivotal cloud foundry"
    ]
    ,
  },
  {
    id: 8,
    title: 'WISDOM',
    Company: 'West Interactive Services',
    description: 'The WISDOM is to create the preface IVR call flows with test case initialization. Test numbers are configured to land on these special apps, prompt the caller for test scenario data, then launch the application within the already established phone call.  This can taint the IVR session and mask potential application issues until they reach production',
    technologies: [
      "React",
      "Node.js",
      "Hapi.js",
      "Jasmine karma",
      "Jest",
      "Redux",
      "ES6",
      "Less",
      "Jenkins",
      "Bootstrap CSS",
      "Webpack 2/3",
      "PCF - Pivotal cloud foundry"
    ]
    ,
  },
  {
    id: 9,
    title: 'Image Asset Search Engine',
    Company: 'Target Corporation',
    description: 'The project is to create one stop for teams to retrieve assets that exist across Target that have been created by various teams and channels and stored within different systems.',
    technologies: ['Handlebars', 'Ember JS', 'Node JS', 'Bootstrap CSS', 'Ember Qunit', 'Go Lang', 'drone', 'OpenStack CLI', 'MongoDB', 'Heat', 'Terraform', 'Ansible', 'YAML', 'Shell', 'Python', 'Adobe InDesign'],
  },
  {
    id: 10,
    title: 'CORAL',
    Company: 'BestBuy Corporation',
    description: 'CORAL is a Content Management Platform designed to empower business users by enhancing and supporting the content creation process via a platform that works consistently and efficiently across multiple enterprise teams. The objective is to enable one content object to support multiple entry points into an event (sales and non-sales) in keeping with the concept of COPE (Create Once Publish Everywhere).',
    technologies: ['JAVA', 'J2EE', 'Spring MVC', 'HTML5', 'JavaScript', 'Bootstrap CSS', 'Angular JS', 'RESTful', 'JSON', 'Jackrabbit API', 'Linux', 'Bamboo', 'Groovy', 'Karma Jasmine', 'GGTS', 'LDAP', 'MongoDB', 'Oracle 11g', 'Tomcat Server', 'JIRA'],
  },
  {
    id: 11,
    title: 'GENBAND Software Center (GSC)',
    Company: 'GENBAND',
    description: 'GENBAND Software Center (GSC) is a web-based application to provide customers with a valid support contract means to find and download software from GENBAND for their hardware that are supplied by the vendors to meet the CTQ specifications',
    technologies: ['JAVA', 'J2EE', 'XHTML', 'CSS', 'JSF', 'PRIMEFACES', 'JPA', 'Spring MVC', 'EJB', 'Oracle JDBC', 'LDAP', 'Glassfish'],
  },

];

const selfProjectsData: selfProjectsData = [
  {
    id: 1,
    title: 'My Portfolio',
    description: 'A portfolio website to showcase my projects and skills',
    technologies: ['React', 'Node.js', 'Next.js', 'Vite', 'Tailwind CSS', 'TypeScript', 'Github Pages', 'Github Actions'],
    demoLink: 'https://hmandana.github.io/portfolio-next-react/',
    githubLink: 'https://github.com/hmandana/portfolio-next-react',
  },
]
// Get unique technologies for filter
const allTechnologies = Array.from(
  new Set([...projectsData, ...selfProjectsData].flatMap(project => project.technologies))
).sort();

const Projects: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('');

  // Filter projects based on selected technology
  const filteredProfessionalProjects = selectedTech
    ? projectsData.filter(project => project.technologies.includes(selectedTech))
    : projectsData;

  const filteredPersonallProjects = selectedTech
    ? selfProjectsData.filter(project => project.technologies.includes(selectedTech))
    : selfProjectsData;

  return (
    <div>


      {/* Filter Section */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTech('')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${selectedTech === ''
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
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${selectedTech === tech
                ? 'bg-blue-600 dark:bg-cyan-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
      {filteredProfessionalProjects.length > 0 && (
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          My Professional Projects
        </h1>
      )}
      {/* Professional rojects Grid */}
      <div className="flex flex-wrap justify-center gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionalProjects.map(project => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
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
              </div>
            </div>
          ))}
        </div>
      </div>




      {/* Personal Projects Grid */}
      {filteredPersonallProjects.length > 0 && (
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          My Personal Projects
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredPersonallProjects.map(project => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >

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
      {filteredProfessionalProjects.length === 0 && filteredPersonallProjects.length === 0 && (
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

