import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorks } from '../context/WorksContext';

const AuthorsPage: React.FC = () => {
  const navigate = useNavigate();
  const { authors, setActiveFilter, setActiveFilterId } = useWorks();
  
  useEffect(() => {
    // Update document title
    document.title = "Auteurs | Médiathèque";
  }, []);

  const handleAuthorClick = (authorId: string) => {
    setActiveFilter('author');
    setActiveFilterId(authorId);
    navigate('/');
  };

  return (
    <div className="pt-24 pb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-200 mb-8">
          Nos Auteurs
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map(author => (
            <div 
              key={author.id}
              onClick={() => handleAuthorClick(author.id)}
              className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-1/3 bg-gray-200 dark:bg-gray-700">
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-4">
                <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {author.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {author.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;