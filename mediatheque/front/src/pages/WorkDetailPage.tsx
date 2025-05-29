import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Eye } from 'lucide-react';
import { useWorks } from '../context/WorksContext';
import RelationshipIndicator from '../components/RelationshipIndicator';
import WorkCard from '../components/WorkCard';

const WorkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { works, getAuthorById, getRelatedWorks } = useWorks();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Find the work with the matching ID
  const work = works.find(work => work.id === id);
  const author = work ? getAuthorById(work.authorId) : undefined;
  const relatedWorks = work ? getRelatedWorks(work) : [];
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    if (work) {
      document.title = `${work.title} | Médiathèque`;
    } else {
      document.title = "Œuvre non trouvée | Médiathèque";
    }
  }, [work]);
  
  if (!work) {
    return (
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Œuvre non trouvée
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              L'œuvre que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format date
  const formattedDate = new Date(work.createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image section */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3] mb-4 shadow-lg">
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <img
                src={work.imageUrl}
                alt={work.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
          </div>
          
          {/* Work details */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-200 mb-4">
              {work.title}
            </h1>
            
            {/* Work metadata */}
            <div className="flex flex-wrap gap-4 mb-6">
              {author && (
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <User className="w-4 h-4 mr-2" />
                  <div className="flex items-center">
                    <img 
                      src={author.avatar} 
                      alt={author.name} 
                      className="w-5 h-5 rounded-full mr-2"
                    />
                    <span>{author.name}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Eye className="w-4 h-4 mr-2" />
                <span>{work.views} vues</span>
              </div>
            </div>
            
            {/* Work description */}
            <div className="prose dark:prose-invert mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                {work.description}
              </p>
            </div>
            
            {/* Relationships */}
            <div className="mb-8">
              <RelationshipIndicator work={work} />
            </div>
            
            {/* Author info */}
            {author && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
                  À propos de l'auteur
                </h3>
                <div className="flex items-center mb-3">
                  <img 
                    src={author.avatar} 
                    alt={author.name} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{author.name}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{author.bio}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Related works */}
        {relatedWorks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-medium text-gray-800 dark:text-gray-200 mb-6">
              Œuvres similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedWorks.map(relatedWork => (
                <WorkCard key={relatedWork.id} work={relatedWork} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkDetailPage;