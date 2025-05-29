import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-gray-800 dark:text-gray-200">Médiathèque</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Un espace de découverte et d'archivage des œuvres des étudiants de l'école de design.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/authors" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Auteurs
                </a>
              </li>
              <li>
                <a href="/themes" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Thèmes
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  À propos
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Contact</h3>
            <address className="not-italic text-gray-600 dark:text-gray-400">
              <p>École de Design</p>
              <p>123 Rue de la Création</p>
              <p>25200 Dakar, SENEGAl</p>
              <p className="mt-2">Email: contact@ecoledesign.fr</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; {currentYear} École de Design. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;