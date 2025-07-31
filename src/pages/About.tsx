import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/projects-animations.css';

// Example JSON data (in a real app, import or fetch this)
const aboutData = {
  profile: {
    summary: [
      "Experienced full-stack engineer with 10+ years building scalable, secure web applications using React, Node.js, Java, and AWS. Passionate about clean code, performance optimization, and AI-driven development.",
      "Proven track record in platform engineering, SRE practices, and cross-functional collaboration. Enthusiastic problem-solver, mentor, and lifelong learner focused on delivering impactful digital solutions."
    ]
  },
workExperience: [
  {
    title: "Software Development Engineer",
    company: "Expedia Group",
    years: "2022 - 2024"
  },
  {
    title: "Sr. Associate Software Engineer",
    company: "JP Morgan Chase & Co.",
    years: "2020 - 2022"
  },
  {
    title: "UI Consultant",
    company: "USAA",
    years: "2019"
    },
  {
    title: "Software Engineer",
    company: "West Corporation",
    years: "2016 - 2019"
  },
  {
    title: "Consultant",
    company: "Target Corporation",
    years: "2015 - 2016"
  },
  {
    title: "Consultant",
    company: "Bestbuy Corporation",
    years: "2015"
   },
  {
    title: "Consultant",
    company: "Genband",
    years: "2014" 
  }
],
  education: [
    {
      degree: "Masters of Science in Computer Science",
      school: "University of North Carolina at Charlotte",
      year: "2013",
      details: "Specialized in Software Engineering and Data Mining, focusing on advanced algorithms and data structures."
    }
  ],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      org: "Amazon Web Services",
      year: "2021",
      details: "Showcase foundational knowledge of AWS cloud services and cloud computing concepts."
    },
     {
      name: "AWS Certified Developer Associate",
      org: "Amazon Web Services",
      year: "2021",
      details: "Demonstrate proficiency in developing, deploying, and debugging cloud-based applications using AWS."
    },

    {
      name: "ADKD",
      org: "University of North Carolina at Charlotte",
      year: "2013",
      details: "Advanced Database and Knowledge Discovery"
    }

  ],
  interests: [
    "Exploring New Technology",
    "Arts and Crafts",
    "Cooking",
    "Traveling",
    "Reading",
    "Music",
    "Sports",
    "Movies",
    "Gardening",
    "Fitness",
    "Meditation",
    "Hiking",
    "Cooking"
  ]
};

/**
 * The About component renders the About page, which displays information about the author,
 * including work experience, education, certifications, and interests.
 * It also includes a progress indicator that shows how much of the page has been scrolled.
 * The component uses Intersection Observers to track which sections are in view and
 * conditionally render the sections and their corresponding navigation items.
 * The component also uses a custom hook to track the active section and scroll to it on click.
 */
const About: React.FC = () => {
  const [activeJob, setActiveJob] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolling, setIsScrolling] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Intersection Observer for section visibility
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sections = ['about', 'work-experience', 'education', 'certifications', 'interests'];

    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, section]));
            if (!isScrolling) {
              setActiveSection(section);
            }
          } else {
            setVisibleSections(prev => {
              const newSet = new Set(prev);
              newSet.delete(section);
              return newSet;
            });
          }
        },
        { threshold: 0.3 }
      );

      const element = sectionRefs.current[section];
      if (element) {
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, [isScrolling]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    setIsScrolling(true);
    setActiveSection(sectionId);
    
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    setTimeout(() => setIsScrolling(false), 1000);
  }, []);


  return (
    <div className="flex relative animate-fadeIn">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-blue-400 dark:bg-cyan-400 rounded-full opacity-10 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Left Navigation */}
      <nav className="w-1/4 hidden md:block sticky top-0 h-screen bg-gray-100/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 border-r border-gray-200 dark:border-gray-700">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Navigation</h3>
        </div>
        <ul className="space-y-3">
          {[
            { id: 'about', label: 'About Me', icon: '👋' },
            { id: 'work-experience', label: 'Experience', icon: '💼' },
            { id: 'education', label: 'Education', icon: '🎓' },
            { id: 'certifications', label: 'Certifications', icon: '🏆' },
            { id: 'interests', label: 'Interests', icon: '❤️' }
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-300 group hover:transform hover:scale-105 ${
                  activeSection === item.id
                    ? 'bg-blue-600 dark:bg-cyan-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3 text-lg group-hover:animate-bounce">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {visibleSections.has(item.id) && (
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                )}
              </button>
            </li>
          ))}
        </ul>
        
        {/* Progress Indicator */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Page Progress</h4>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 dark:bg-cyan-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(visibleSections.size / 5) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {visibleSections.size} of 5 sections viewed
          </p>
        </div>
      </nav>
      {/* Main Content */}
      <div className="w-full md:w-3/4 p-6">
        <section id="about" className="mb-12" ref={el => { sectionRefs.current['about'] = el; }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">About Me</h1>
          <div className="flex flex-col md:flex-row items-center md:items-start mb-12 gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 flex-shrink-0 mb-6 md:mb-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            </div>
            {/* Summary */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Professional Summary</h2>
              {aboutData.profile.summary.map((line, idx) => (
                <p key={idx} className="text-gray-600 dark:text-gray-300 mb-4">{line}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="work-experience" className="mb-12" ref={el => { sectionRefs.current['work-experience'] = el; }}>
          <h2 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 text-center">
            Work Experience
          </h2>
          <div className="relative pl-12">
            {/* Timeline vertical bar */}
            <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-200 to-cyan-400 dark:from-cyan-600 dark:via-cyan-900 dark:to-blue-800 rounded"></div>
            {aboutData.workExperience.map((job, idx) => (
              <div
                key={idx}
                className={`relative mb-12 flex items-start group cursor-pointer ${activeJob === idx ? 'bg-blue-50 dark:bg-cyan-950' : ''}`}
                onClick={() => setActiveJob(activeJob === idx ? null : idx)}
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') setActiveJob(activeJob === idx ? null : idx); }}
                aria-expanded={activeJob === idx}
              >
                {/* Timeline dot */}
                <div className={`absolute left-2 top-6 w-6 h-6 rounded-full border-4 shadow flex items-center justify-center transition-transform duration-300 group-hover:scale-110
                  ${activeJob === idx
                    ? 'bg-blue-500 dark:bg-cyan-400 border-blue-700 dark:border-cyan-300'
                    : 'bg-white dark:bg-gray-900 border-blue-500 dark:border-cyan-400'
                  }`}>
                  <span className={`block w-3 h-3 rounded-full
                    ${activeJob === idx
                      ? 'bg-blue-700 dark:bg-cyan-300'
                      : 'bg-blue-500 dark:bg-cyan-400'
                    }`}></span>
                </div>
                <div className={`ml-16 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 w-full transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-xl
                  ${activeJob === idx ? 'border-blue-400 shadow-xl' : ''}`}>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1 flex items-center">
                    {job.title}
                    {activeJob === idx && (
                      <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 dark:bg-cyan-900 text-blue-700 dark:text-cyan-300 font-semibold">Active</span>
                    )}
                  </h3>
                  <p className="text-blue-600 dark:text-cyan-400 font-medium mb-2">
                    {job.company} <span className="text-gray-500 dark:text-gray-400">• {job.years}</span>
                  </p>
                  {/* Expandable Details */}
                  {/* {activeJob === idx && job.details && (
                    <div className="text-gray-600 dark:text-gray-300 mt-2">
                      <ul className="list-disc pl-5 space-y-1">
                        {job.details.map((detail, detailIdx) => (
                          <li key={detailIdx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="mb-12" ref={el => { sectionRefs.current['education'] = el; }}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Education</h2>
          {aboutData.education.map((edu, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <svg className="w-6 h-6 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 dark:text-white">{edu.degree}</h3>
                  <p className="text-blue-600 dark:text-cyan-400 mb-2">{edu.school} • {edu.year}</p>
                  <p className="text-gray-600 dark:text-gray-300">{edu.details}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section id="certifications" className="mb-12" ref={el => { sectionRefs.current['certifications'] = el; }}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Certifications</h2>
          {aboutData.certifications.map((cert, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <svg className="w-6 h-6 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 dark:text-white">{cert.name}</h3>
                  <p className="text-blue-600 dark:text-cyan-400 mb-2">{cert.org} • {cert.year}</p>
                  <p className="text-gray-600 dark:text-gray-300">{cert.details}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section id="interests" className="mb-12" ref={el => { sectionRefs.current['interests'] = el; }}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Interests</h2>
          <div className="flex flex-wrap gap-4">
            {aboutData.interests.map((interest, idx) => (
              <span key={idx} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full cursor-pointer transition-transform transform hover:scale-105">
                {interest}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;

