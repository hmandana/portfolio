import React from 'react';
import { Link } from 'react-router-dom';
import { skillImages } from '../assets/skills';

// Example JSON data (in a real app, import or fetch this)
const homeData = {
  name: "Haritha Mandanapu",
  intro: [
    "I’m a passionate and results-driven software engineer building full-stack web applications that scale from crafting elegant frontends to architecting resilient backends I'm all about turning ideas into fast, secure, and impactful digital solutions.",
    "I thrive in environments where innovation meets execution. Whether it’s streamlining CI/CD pipelines, optimizing cloud infrastructure on AWS, or integrating AI to supercharge developer workflows, I love pushing the boundaries of what’s possible. I take pride in clean code, strong systems, and building tools that make life easier for users and developers alike.",
    "Curious by nature and always up for a challenge—I’m constantly learning, mentoring, and collaborating with teams to create products that matter. Let’s build something amazing."
  ],
  skills: [
    { name: 'JavaScript', image: skillImages.javascript },
    { name: 'TypeScript', image: skillImages.typescript },
    { name: 'ReactJS', image: skillImages.react },
    { name: 'Angular', image: skillImages.angular },
    { name: 'Redux', image: skillImages.redux },
    { name: 'Node.js', image: skillImages.nodejs },
    { name: 'GraphQL', image: skillImages.graphql },
    { name: 'Next.js', image: skillImages.nextjs },
    { name: 'Tailwind CSS', image: skillImages.tailwind },
    { name: 'Bootstrap', image: skillImages.bootstrap },
    { name: 'Material UI', image: skillImages['material-ui'] },
    { name: 'MongoDB', image: skillImages.mongodb },
    { name: 'MySQL', image: skillImages.mysql },
    { name: 'PostCSS', image: skillImages.postcss },
    { name: 'Jest', image: skillImages.jest },
    { name: 'LESS', image: skillImages.less },
    { name: 'Sass', image: skillImages.sass },
    { name: 'Webpack', image: skillImages.webpack },
    { name: 'Babel', image: skillImages.babel },
    { name: 'Git', image: skillImages.git },
    { name: 'Storybook', image: skillImages.storybook },
    { name: 'React Testing Library', image: skillImages['react-testing-library'] },
    { name: 'Selenium', image: skillImages.selenium },
    { name: 'Cypress', image: skillImages.cypress },
    { name: 'Playwright', image: skillImages.playwright },
    { name: 'Python', image: skillImages.python },
    { name: 'Java', image: skillImages.java },
    { name: 'Kotlin', image: skillImages.kotlin },
    { name: 'Spring Boot', image: skillImages['spring-boot'] },
    { name: 'Docker', image: skillImages.docker },
    { name: 'Kubernetes', image: skillImages.kubernetes },
    { name: 'AWS', image: skillImages.aws },
    { name: 'Jenkins', image: skillImages.jenkins }
  ],
  companies: [
    { name: 'Expedia', years: '2022-2024' },
    { name: 'JP Morgan Chase', years: '2020-2022' },
    { name: 'USAA', years: '2019' },
  ]
};


const Home: React.FC = () => {

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
            {homeData.name}
          </span>
        </h1>

        {/* Brief Introduction */}
        <div className="max-w-2xl mb-10 px-4">
          {homeData.intro.map((line, idx) => (
            <p key={idx} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {line}
            </p>
          ))}
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
      {/* Spacer for sticky section */}
      <div className="h-8"></div>
      {/* Skills Rolling Carousel Section - Sticky */}
      <section className="sticky bottom-0 z-10 bg-gray-50 dark:bg-gray-900 py-6 md:py-8 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 min-h-[300px]">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-8  border-b border-gray-200 dark:border-gray-700">

            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white ">
              Skills & Technologies
            </h2>
          </div>
          <div className="overflow-hidden w-full relative">
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-20 pointer-events-none"></div>
            <div
              className="flex items-center gap-4 skills-carousel-track"
              style={{
                width: 'max-content',
                animation: `scrollSkills ${homeData.skills.length * 4}s linear infinite`
              }}
            >
              {/* Triple the skills for perfect seamless loop */}
              {[...Array(3)].map((_, setIndex) =>
                homeData.skills.map((skill, idx) => (
                  <div
                    key={`${skill.name}-${setIndex}-${idx}`}
                    className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-sm transition-all duration-200 hover:scale-110 hover:shadow-md hover:z-30 relative group cursor-pointer skills-card"
                    style={{ width: '100px', height: '100px', flex: '0 0 auto' }}
                    title={skill.name}
                    role="img"
                    aria-label={skill.name}
                  >
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="w-8 h-8 mb-2 object-contain transition-transform duration-200 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://via.placeholder.com/32?text=NA";
                      }}
                    />
                    <span className="text-gray-800 dark:text-gray-200 font-medium text-xs text-center px-1 leading-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
                      {skill.name}
                    </span>
                    {/* Enhanced tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-40 shadow-lg">
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                      {skill.name}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Add keyframes for rolling animation */}
        <style>
          {`
            @keyframes scrollSkills {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            
            /* Pause animation on hover */
            .skills-carousel:hover .flex {
              animation-play-state: paused;
            }
          `}
        </style>
      </section>




    </div>
  );
};

export default Home;

