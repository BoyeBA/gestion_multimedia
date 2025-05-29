import React, { createContext, useContext, useState, useMemo } from 'react';
import { Work, Author, Theme, Influence, FilterType } from '../types';
import { works as initialWorks, authors as initialAuthors, themes as initialThemes, influences as initialInfluences } from '../data/mockData';

interface WorksContextType {
  works: Work[];
  authors: Author[];
  themes: Theme[];
  influences: Influence[];
  filteredWorks: Work[];
  activeFilter: FilterType;
  activeFilterId: string | null;
  searchQuery: string;
  setActiveFilter: (filter: FilterType) => void;
  setActiveFilterId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  getAuthorById: (id: string) => Author | undefined;
  getThemeById: (id: string) => Theme | undefined;
  getInfluenceById: (id: string) => Influence | undefined;
  getRelatedWorks: (work: Work) => Work[];
}

const WorksContext = createContext<WorksContextType | undefined>(undefined);

export const WorksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [works] = useState<Work[]>(initialWorks);
  const [authors] = useState<Author[]>(initialAuthors);
  const [themes] = useState<Theme[]>(initialThemes);
  const [influences] = useState<Influence[]>(initialInfluences);
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Memoize filtered works to prevent unnecessary recalculations
  const filteredWorks = useMemo(() => {
    let filtered = works;
    
    // Apply active filter
    if (activeFilter !== 'all' && activeFilterId) {
      filtered = filtered.filter(work => {
        if (activeFilter === 'author') return work.authorId === activeFilterId;
        if (activeFilter === 'theme') return work.themeIds.includes(activeFilterId);
        if (activeFilter === 'influence') return work.influenceIds.includes(activeFilterId);
        return true;
      });
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(work => 
        work.title.toLowerCase().includes(query) || 
        work.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [works, activeFilter, activeFilterId, searchQuery]);

  const getAuthorById = (id: string) => authors.find(author => author.id === id);
  const getThemeById = (id: string) => themes.find(theme => theme.id === id);
  const getInfluenceById = (id: string) => influences.find(influence => influence.id === id);

  const getRelatedWorks = (work: Work) => {
    // Find works by the same author, themes, or influences
    return works.filter(w => 
      w.id !== work.id && (
        w.authorId === work.authorId ||
        w.themeIds.some(id => work.themeIds.includes(id)) ||
        w.influenceIds.some(id => work.influenceIds.includes(id))
      )
    ).slice(0, 4); // Limit to 4 related works
  };

  return (
    <WorksContext.Provider value={{
      works,
      authors,
      themes,
      influences,
      filteredWorks,
      activeFilter,
      activeFilterId,
      searchQuery,
      setActiveFilter,
      setActiveFilterId,
      setSearchQuery,
      getAuthorById,
      getThemeById,
      getInfluenceById,
      getRelatedWorks
    }}>
      {children}
    </WorksContext.Provider>
  );
};

export const useWorks = (): WorksContextType => {
  const context = useContext(WorksContext);
  if (context === undefined) {
    throw new Error('useWorks must be used within a WorksProvider');
  }
  return context;
};