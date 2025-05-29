import { Author, Theme, Influence, Work } from '../types';
import AminaImage from './images/Amina.jpg';
import NdiameImage from './images/Ndiame.jpg';
import MamoudouImage from './images/mamoudou.jpg';
import IbrahimaImage from './images/ibrahima.jpg';
export const authors: Author[] = [
  {
    id: '1',
    name: 'Ndiamé Laye Guèye',
     avatar: NdiameImage,
    bio: 'Multimedia artist specializing in interactive digital experiences that blend technology and traditional art forms.'
  },
  {
    id: '2',
    name: 'Mouhamed Amina Diouf',
    avatar: AminaImage, // 🔁 Référence à l'image importée

    bio: 'Graphic designer focused on typography and branding with a minimalist approach inspired by Swiss design principles.'
  },
  {
    id: '3',
    name: 'Mamoudou Boye BA',
    avatar: MamoudouImage,
    bio: 'Conceptual artist exploring themes of identity and memory through mixed media installations and photography.'
  },
  {
    id: '4',
    name: 'Ibrahima Diallo',
    avatar: IbrahimaImage,
    bio: 'Industrial designer creating sustainable products with a focus on innovative materials and manufacturing processes.'
  }
];

export const themes: Theme[] = [
  {
    id: '1',
    name: 'Sustainability',
    description: 'Works exploring environmental themes and sustainable design solutions.'
  },
  {
    id: '2',
    name: 'Digital Identity',
    description: 'Explorations of self and identity in the digital age.'
  },
  {
    id: '3',
    name: 'Urban Experience',
    description: 'Works reflecting on urban life, architecture, and city dynamics.'
  },
  {
    id: '4',
    name: 'Cultural Heritage',
    description: 'Projects examining traditions, cultural memory, and heritage preservation.'
  }
];

export const influences: Influence[] = [
  {
    id: '1',
    name: 'Bauhaus',
    description: 'Influenced by the functional aesthetics and principles of the Bauhaus movement.'
  },
  {
    id: '2',
    name: 'Contemporary Digital Art',
    description: 'Inspired by current trends in digital and new media art.'
  },
  {
    id: '3',
    name: 'Japanese Minimalism',
    description: 'Drawing on Japanese aesthetic principles of simplicity, asymmetry, and restraint.'
  },
  {
    id: '4',
    name: 'Post-modernism',
    description: 'Incorporating postmodern approaches to mixing styles, references, and challenging conventions.'
  }
];

export const works: Work[] = [
  {
    id: '1',
    title: 'Gestionnaire de Bibliothèque en ligne',
    description: 'Une application web qui permet aux utilisateurs d’enregistrer, rechercher et emprunter des livres via une interface intuitive avec une base de données MySQL.',
    imageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-04-15',
    authorId: '1',
    themeIds: ['1', '3'],
    influenceIds: ['3'],
    featured: true,
    views: 349
  },
  {
    id: '2',
    title: 'Application Mobile de Suivi de Dépenses',
     description: 'Une app Android/iOS simple pour enregistrer les dépenses quotidiennes, afficher des graphiques, et fixer des objectifs financiers.',
    imageUrl: 'https://images.pexels.com/photos/4386326/pexels-photo-4386326.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-05-02',
    authorId: '3',
    themeIds: ['3'],
    influenceIds: ['4'],
    featured: true,
    views: 214
  },
  {
    id: '3',
    title: 'Site Web Portfolio Développeur',
    description: 'Création d’un site web personnel responsive en HTML, CSS et JavaScript pour présenter ses projets, compétences et expériences.',
    imageUrl: 'https://images.pexels.com/photos/11035393/pexels-photo-11035393.jpeg?auto=compress&cs=tinysrgb&w=800',

    createdAt: '2024-03-28',
    authorId: '1',
    themeIds: ['2'],
    influenceIds: ['2', '4'],
    featured: false,
    views: 185
  },
  {
    id: '4',
    title: 'Détection de Faille XSS',
    description: 'Un mini-projet de cybersécurité pour détecter et protéger une application web contre les failles de type Cross-Site Scripting.',
    imageUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-06-10',
    authorId: '2',
    themeIds: ['4'],
    influenceIds: ['1'],
    featured: true,
    views: 298
  },
  {
    id: '5',
     title: 'Mini Blockchain en Python',
    description: 'Implémentation d’une blockchain simple en Python pour comprendre les bases du hachage, des blocs, et du proof-of-work.',
      imageUrl: 'https://images.pexels.com/photos/6696159/pexels-photo-6696159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2024-05-17',
    authorId: '4',
    themeIds: ['1'],
    influenceIds: ['1', '3'],
    featured: false,
    views: 156
  },
  {
    id: '6',
    title: 'Authentification Sécurisée avec JWT',
  description: 'Implémentation d’un système d’authentification avec tokens JWT dans une API REST pour comprendre la gestion des sessions et la sécurité backend.',
  imageUrl: 'https://images.pexels.com/photos/5380659/pexels-photo-5380659.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-04-05',
    authorId: '3',
    themeIds: ['2', '4'],
    influenceIds: ['4'],
    featured: false,
    views: 178
  },
  {
    id: '7',
     title: 'Dashboard de Statistiques Étudiant',
  description: 'Un tableau de bord interactif en React affichant les moyennes, absences, et progrès d’un étudiant, avec des graphiques dynamiques.',
  imageUrl: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-06-22',
    authorId: '4',
    themeIds: ['1', '3'],
    influenceIds: ['1'],
    featured: true,
    views: 247
  },
  {
    id: '8',
    title: 'Générateur de Mots de Passe Forts',
  description: 'Une petite app web ou mobile qui génère des mots de passe aléatoires et sécurisés avec des options de complexité (majuscules, symboles...).',
  imageUrl: 'https://images.pexels.com/photos/5380643/pexels-photo-5380643.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-05-30',
    authorId: '1',
    themeIds: ['2'],
    influenceIds: ['2', '4'],
    featured: false,
    views: 209
  }
];