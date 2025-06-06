import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
            Haritha Mandanapu
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl mb-6 text-gray-600 dark:text-gray-300">
          Software Engineer
        </h2>
        
        {/* Brief Introduction */}
        <div className="max-w-2xl mb-10 px-4">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Software Engineer with 10+ years of experience and a proven track record in end-to-end development, 
            including CI/CD implementation and optimization, with a focus on building scalable applications.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            I possess strong technical skills coupled with excellent communication, collaboration, and mentorship 
            abilities. Adept at leading projects, guiding junior developers, and effectively communicating with 
            stakeholders. Dedicated to delivering high-quality, user-centric solutions.
          </p>
        </div>
        
        {/* Call-to-action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/projects"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors duration-300 transform hover:scale-105"
          >
            View Projects
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-300 transform hover:scale-105"
          >
            About Me
          </Link>
        </div>
      </section>
      
      {/* Skills Overview Section */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            'JavaScript', 'TypeScript', 'ReactJS', 'Angular', 
            'Redux', 'NgRx', 'Node.js', 'GraphQL',
            'Python', 'Java', 'Kotlin', 'Spring Boot',
            'Cypress', 'Playwright', 'Docker', 'Kubernetes',
            'AWS', 'CI/CD', 'GitHub Actions', 'Jenkins'
          ].map((skill) => (
            <div 
              key={skill}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg dark:shadow-gray-700/30"
            >
              <p className="text-gray-700 dark:text-gray-300">{skill}</p>
            </div>
          ))}
        </div>
        
        {/* Companies Worked For */}
        <section className="py-12 md:py-16 animate-fadeIn">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Professional Experience
          </h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Expedia', years: '2022-2024' },
              { name: 'JP Morgan Chase', years: '2020-2022' },
              { name: 'USAA', years: '2019' },
              { name: 'West Corporation', years: '2016-2019' },
              { name: 'Target', years: '2015-2016' },
              { name: 'Best Buy', years: '2015' },
              { name: 'Genband', years: '2014' }
            ].map((company) => (
              <div 
                key={company.name}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg dark:shadow-gray-700/30 w-36"
              >
                <p className="text-gray-800 dark:text-white font-semibold">{company.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{company.years}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;

