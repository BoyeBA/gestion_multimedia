import React from 'react';
import { useWorks } from '../context/WorksContext';
import WorkCard from './WorkCard';

const FeaturedWorks: React.FC = () => {
  const { works } = useWorks();
  
  // Get featured works
  const featuredWorks = works.filter(work => work.featured).slice(0, 3);
  
  if (featuredWorks.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-serif font-medium text-gray-800 dark:text-gray-200">À la une</h2>
        <div className="ml-4 h-px bg-gradient-to-r from-indigo-500 to-purple-500 flex-grow" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredWorks.map((work, index) => (
          <WorkCard 
            key={work.id} 
            work={work}
            featured={index === 0} // Make the first one larger
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedWorks;