import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import FeaturedWorks from '../components/FeaturedWorks';
import FilterBar from '../components/FilterBar';
import WorksGrid from '../components/WorksGrid';

const HomePage: React.FC = () => {
  // const navigate = useNavigate();
  
  useEffect(() => {
    // Update the document title
    document.title = "Médiathèque | École de Design";
  }, []);

  return (
    <div className="pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Médiathèque de l'École de Design
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Explorez notre collection d'œuvres des étudiants, reliées par auteur, thème et influence
            </p>
          </div>
        </section>

        {/* Featured works */}
        <FeaturedWorks />
        
        {/* Filter bar */}
        <FilterBar />
        
        {/* Works grid */}
        <WorksGrid />
      </div>
    </div>
  );
};

export default HomePage;