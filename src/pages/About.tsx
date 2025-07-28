import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex">
      {/* Left Navigation */}
      <nav className="w-1/4 hidden md:block sticky top-0 h-screen bg-gray-100 dark:bg-gray-800 p-4">
        <ul className="space-y-4">
          <li>
            <a href="#about" className="text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400">
              About Me
            </a>
          </li>
          <li>
            <a href="#work-experience" className="text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400">
              Work Experience
            </a>
          </li>
          <li>
            <a href="#education" className="text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400">
              Education
            </a>
          </li>
          <li>
            <a href="#certifications" className="text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400">
              Certifications
            </a>
          </li>
          <li>
            <a href="#interests" className="text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400">
              Interests
            </a>
          </li>
          <li>
            <a href="#contact" className="text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400">
              Contact Me
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-6">
        <section id="about" className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            About Me
          </h1>
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start mb-12 gap-8">
            {/* Profile Photo */}
            <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 flex-shrink-0 mb-6 md:mb-0">
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {/* Summary */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Professional Summary</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I'm a Full Stack Software Engineer with over 10 years of experience in building web applications using modern technologies.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Throughout my career, I've led projects, guided junior developers, and effectively communicated with stakeholders.
              </p>
            </div>
          </div>
        </section>

        <section id="work-experience" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Work Experience
          </h2>
          {/* Work Experience Content */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white">Software Development Engineer</h3>
              <p className="text-blue-600 dark:text-cyan-400 mb-2">Expedia Group • 2022 - 2024</p>
              <p className="text-gray-600 dark:text-gray-300">
                Led critical internal platform features and sub-applications, directly enhancing operational efficiency. 
                Successfully delivered three key projects, including two high-impact initiatives. Migrated CI/CD workflows 
                to Github Actions accelerating deployments. Optimized site rendering via CMS, improving performance. 
                Demonstrated effective leadership by implementing unified login across all Expedia brands.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white">Sr. Associate Software Engineer</h3>
              <p className="text-blue-600 dark:text-cyan-400 mb-2">JP Morgan Chase & Co. • 2020 - 2022</p>
              <p className="text-gray-600 dark:text-gray-300">
                Mentored team in UI/UX, directly improving user satisfaction. Streamlined collaboration across global teams, 
                accelerating project delivery timelines. Championed ADA compliance, expanding application accessibility. 
                Enhanced application security with Identity Services orchestration. Standardized deployment reliability 
                using release orchestration tools.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white">UI Consultant</h3>
              <p className="text-blue-600 dark:text-cyan-400 mb-2">USAA • 2019</p>
              <p className="text-gray-600 dark:text-gray-300">
                Improved user engagement by rebuilding UI screens based on user flow analysis. Expanded user reach 
                by creating ADA-compliant client screens. Accelerated development with automated unit and functional tests.
                Streamlined onboarding with clear technical documentation.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white">Software Engineer</h3>
              <p className="text-blue-600 dark:text-cyan-400 mb-2">West Corporation • 2016 - 2019</p>
              <p className="text-gray-600 dark:text-gray-300">
                Enhanced application functionality by building UI screens and integrating external apps. Ensured ADA-compliant 
                design. Maintained application stability through effective production support. Enabled data-driven features 
                through collaboration with data engineering teams. Accelerated application delivery by implementing a 
                cloud-based CI/CD process.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white">Consultant</h3>
              <p className="text-blue-600 dark:text-cyan-400 mb-2">Target Corporation • 2015 - 2016</p>
              <p className="text-gray-600 dark:text-gray-300">
                Designed intuitive UI/UX wireframes, shaping positive user experience. Enabled efficient deployments by coordinating server setup with DevOps. Accelerated and standardized infrastructure setup with cloud automation scripts. Streamlined software delivery by establishing CI/CD pipelines.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white">Consultant</h3>
              <p className="text-blue-600 dark:text-cyan-400 mb-2">Bestbuy Corporation • 2015</p>
              <p className="text-gray-600 dark:text-gray-300">
                Accelerated responsive UI development using reusable directives. Enabled dynamic and efficient data presentation in the UI by developing and consuming RESTful web services. Streamlined data retrieval and improved application performance by implementing robust data access and service layers for the Jackrabbit content repository.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white">Consultant</h3>
              <p className="text-blue-600 dark:text-cyan-400 mb-2">Genband • 2014</p>
              <p className="text-gray-600 dark:text-gray-300">
                Enhanced user experience by developing dynamic UI components. Improved application performance by optimizing data retrieval processes. Streamlined development workflows with automated testing and deployment pipelines.
              </p>
            </div>
          </div>
        </section>

        <section id="education" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Education
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 mt-1">
                <svg className="w-6 h-6 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-white">ADKD</h3>
                <p className="text-blue-600 dark:text-cyan-400 mb-2">University of North Carolina at Charlotte • 2013</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced Database and Knowledge Discovery
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Certifications
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 mt-1">
                <svg className="w-6 h-6 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Certified ScrumMaster (CSM)</h3>
                <p className="text-blue-600 dark:text-cyan-400 mb-2">Scrum Alliance • June 2018</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Certification in Scrum methodology and agile project management.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="interests" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Interests
          </h2>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Exploring New Technology
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Arts and Crafts
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Cooking
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Traveling
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Reading
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Music
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Sports
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Movies
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Gardening
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Fitness
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Meditation
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Hiking
            </span>
            <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
              Cooking
            </span>
          </div>
        </section>

        <section id="contact" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Contact Me
          </h2>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">haritham491@gmail.com</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">(214) 799-1839</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Dallas, TX</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

