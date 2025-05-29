import React from 'react';
import { useWorks } from '../context/WorksContext';
import WorkCard from './WorkCard';

const WorksGrid: React.FC = () => {
  const { filteredWorks, activeFilter, activeFilterId, searchQuery } = useWorks();
  
  if (filteredWorks.length === 0) {
    return (
      <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Aucun résultat trouvé</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          {searchQuery ? (
            <>
              Aucun projet ne correspond à votre recherche <strong>"{searchQuery}"</strong>
            </>
          ) : activeFilter !== 'all' && activeFilterId ? (
            <>Aucun projet ne correspond au filtre sélectionné</>
          ) : (
            <>Essayez de modifier vos critères de recherche</>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {filteredWorks.map(work => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  );
};

export default WorksGrid;