import React from 'react';
import { useWorks } from '../context/WorksContext';
import { FilterType } from '../types';

const FilterBar: React.FC = () => {
  const { 
    activeFilter, 
    setActiveFilter, 
    setActiveFilterId,
    authors,
    themes,
    influences
  } = useWorks();

  const handleFilterChange = (filterType: FilterType) => {
    if (activeFilter === filterType) {
      // If clicking the same filter, reset to all
      setActiveFilter('all');
      setActiveFilterId(null);
    } else {
      setActiveFilter(filterType);
      // Reset the filter ID when changing filter type
      setActiveFilterId(null);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif font-medium text-gray-800 dark:text-gray-200">Explorer la collection</h2>
      </div>
      
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
        {/* Main filter types */}
        <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => {
              setActiveFilter('all');
              setActiveFilterId(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Tous les projets
          </button>
          
          <button
            onClick={() => handleFilterChange('author')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === 'author'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Par auteur
          </button>
          
          <button
            onClick={() => handleFilterChange('theme')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === 'theme'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Par thème
          </button>
          
          <button
            onClick={() => handleFilterChange('influence')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === 'influence'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Par influence
          </button>
        </div>
      </div>

      {/* Secondary filters based on primary selection */}
      {activeFilter !== 'all' && (
        <div className="mt-3 flex flex-wrap gap-2">
          {activeFilter === 'author' && authors.map(author => (
            <FilterItem
              key={author.id}
              id={author.id}
              label={author.name}
              filterType="author"
            />
          ))}
          
          {activeFilter === 'theme' && themes.map(theme => (
            <FilterItem
              key={theme.id}
              id={theme.id}
              label={theme.name}
              filterType="theme"
            />
          ))}
          
          {activeFilter === 'influence' && influences.map(influence => (
            <FilterItem
              key={influence.id}
              id={influence.id}
              label={influence.name}
              filterType="influence"
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface FilterItemProps {
  id: string;
  label: string;
  filterType: FilterType;
}

const FilterItem: React.FC<FilterItemProps> = ({ id, label, filterType }) => {
  const { activeFilterId, setActiveFilterId } = useWorks();
  
  const handleClick = () => {
    if (activeFilterId === id) {
      setActiveFilterId(null);
    } else {
      setActiveFilterId(id);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`px-3 py-1 rounded-full text-sm transition-colors ${
        activeFilterId === id
          ? 'bg-purple-500 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );
};

export default FilterBar;