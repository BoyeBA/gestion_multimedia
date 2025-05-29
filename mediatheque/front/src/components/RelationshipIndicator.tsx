import React from 'react';
import { useWorks } from '../context/WorksContext';
import { Work } from '../types';

interface RelationshipIndicatorProps {
  work: Work;
  compact?: boolean;
}

const RelationshipIndicator: React.FC<RelationshipIndicatorProps> = ({ work, compact = false }) => {
  const { themes, influences, getThemeById, getInfluenceById } = useWorks();
  
  // Get theme and influence objects
  const workThemes = work.themeIds.map(id => getThemeById(id)).filter(Boolean);
  const workInfluences = work.influenceIds.map(id => getInfluenceById(id)).filter(Boolean);
  
  return (
    <div className={`${compact ? 'space-y-2' : 'space-y-3'}`}>
      {workThemes.length > 0 && (
        <div>
          <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-500 dark:text-gray-400 mb-1`}>
            Thèmes
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {workThemes.map(theme => theme && (
              <span 
                key={theme.id}
                className={`
                  inline-flex items-center rounded-full
                  ${compact 
                    ? 'px-2 py-0.5 text-xs' 
                    : 'px-3 py-1 text-sm'
                  }
                  bg-indigo-100 dark:bg-indigo-900/60 
                  text-indigo-700 dark:text-indigo-300
                `}
              >
                {theme.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {workInfluences.length > 0 && (
        <div>
          <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-500 dark:text-gray-400 mb-1`}>
            Influences
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {workInfluences.map(influence => influence && (
              <span 
                key={influence.id}
                className={`
                  inline-flex items-center rounded-full 
                  ${compact 
                    ? 'px-2 py-0.5 text-xs' 
                    : 'px-3 py-1 text-sm'
                  }
                  bg-purple-100 dark:bg-purple-900/60 
                  text-purple-700 dark:text-purple-300
                `}
              >
                {influence.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationshipIndicator;