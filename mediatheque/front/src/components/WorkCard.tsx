import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Work } from '../types';
import { useWorks } from '../context/WorksContext';

interface WorkCardProps {
  work: Work;
  featured?: boolean;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, featured = false }) => {
  const navigate = useNavigate();
  const { getAuthorById } = useWorks();
  const author = getAuthorById(work.authorId);

  const handleClick = () => {
    navigate(`/work/${work.id}`);
  };

  // Format date
  const formattedDate = new Date(work.createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div 
      className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      onClick={handleClick}
    >
      {/* Image with gradient overlay */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img 
          src={work.imageUrl} 
          alt={work.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-300">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {author && (
              <>
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="w-6 h-6 rounded-full border border-white/30"
                />
                <span className="text-sm font-medium opacity-90">{author.name}</span>
              </>
            )}
          </div>
          <div className="flex items-center space-x-1 text-xs opacity-80">
            <Eye className="w-3 h-3" />
            <span>{work.views}</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-1 group-hover:text-indigo-300 transition-colors">
          {work.title}
        </h3>
        
        {featured && (
          <p className="text-sm opacity-85 line-clamp-2 mb-2">
            {work.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mt-2">
          {work.featured && (
            <span className="px-2 py-0.5 bg-indigo-600/70 text-white text-xs rounded-full">
              À la une
            </span>
          )}
          <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;