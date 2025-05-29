import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorks } from '../context/WorksContext';

const ThemesPage: React.FC = () => {
  const navigate = useNavigate();
  const { themes, influences, setActiveFilter, setActiveFilterId } = useWorks();
  
  useEffect(() => {
    // Update document title
    document.title = "Thèmes & Influences | Médiathèque";
  }, []);

  const handleThemeClick = (themeId: string) => {
    setActiveFilter('theme');
    setActiveFilterId(themeId);
    navigate('/');
  };

  const handleInfluenceClick = (influenceId: string) => {
    setActiveFilter('influence');
    setActiveFilterId(influenceId);
    navigate('/');
  };

  return (
    <div className="pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Themes section */}
        <section className="mb-12">
          <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-200 mb-8">
            Thèmes
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themes.map(theme => (
              <div 
                key={theme.id}
                onClick={() => handleThemeClick(theme.id)}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-indigo-500"
              >
                <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {theme.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Influences section */}
        <section>
          <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-200 mb-8">
            Influences
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {influences.map(influence => (
              <div 
                key={influence.id}
                onClick={() => handleInfluenceClick(influence.id)}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500"
              >
                <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {influence.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {influence.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThemesPage;