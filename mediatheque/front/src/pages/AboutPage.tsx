import React, { useEffect } from 'react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = "À propos | Médiathèque";
  }, []);

  return (
    <div className="pt-24 pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-200 mb-8">
          À propos de la Médiathèque
        </h1>
        
        <div className="prose dark:prose-invert lg:prose-lg mb-12">
          <p>
            La Médiathèque de l'École de Design est un espace numérique dédié à la conservation, 
            à la mise en valeur et au partage des œuvres réalisées par nos étudiants. Cette 
            plateforme offre une vitrine unique pour découvrir la diversité et la qualité des 
            projets issus de notre établissement.
          </p>
          
          <p>
            Notre médiathèque ne se contente pas de présenter les œuvres de manière isolée, 
            mais met en évidence les relations qui existent entre elles. Les projets sont 
            organisés selon trois axes principaux :
          </p>
          
          <ul>
            <li>
              <strong>Par auteur</strong> - Découvrez le portfolio de chaque étudiant et suivez 
              leur évolution créative à travers leurs différents projets.
            </li>
            <li>
              <strong>Par thème</strong> - Explorez les œuvres regroupées autour de thématiques 
              communes, révélant les préoccupations et centres d'intérêt de notre communauté 
              étudiante.
            </li>
            <li>
              <strong>Par influence</strong> - Identifiez les courants artistiques et les 
              mouvements de design qui inspirent nos étudiants et façonnent leur approche 
              créative.
            </li>
          </ul>
          
          <p>
            Cette approche relationnelle permet de tisser des liens entre les différentes 
            créations, offrant une lecture plus riche et contextuelle du travail de nos 
            étudiants. Elle encourage également le dialogue et l'émulation au sein de notre 
            communauté, tout en servant de source d'inspiration pour les futures générations 
            de designers.
          </p>
          
          <h2>Notre Mission</h2>
          
          <p>
            La Médiathèque a pour mission de :
          </p>
          
          <ul>
            <li>Préserver et archiver les travaux des étudiants dans un format accessible et pérenne</li>
            <li>Valoriser l'excellence créative et l'innovation au sein de notre école</li>
            <li>Favoriser l'échange et le partage des connaissances entre étudiants, enseignants et professionnels</li>
            <li>Constituer une ressource éducative pour l'ensemble de la communauté du design</li>
            <li>Promouvoir le talent de nos étudiants auprès du public et des acteurs du monde professionnel</li>
          </ul>
          
          <p>
            Nous vous invitons à explorer notre collection, à découvrir les talents émergents 
            et à vous laisser inspirer par la créativité et l'innovation qui caractérisent 
            l'École de Design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;