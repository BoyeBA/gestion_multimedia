const mongoose = require('mongoose');
const db = require('./db');

// Import des modèles
const Author = require('../models/author');
const Theme = require('../models/theme');
const Work = require('../models/work');
const Influence = require('../models/influence');

// Fonction d’initialisation
const seedDatabase = async () => {
  try {
    await db(); // Connexion à la base

    // Nettoyage des anciennes données
    await Author.deleteMany();
    await Theme.deleteMany();
    await Work.deleteMany();
    await Influence.deleteMany();

    // Insertion des auteurs
    const authors = await Author.insertMany([
      { name: 'Mamoudou Boye BA', birthDate: '1912-06-23', nationality: 'Senegalese' },
      { name: 'Ndiamé Laye Guèye', birthDate: '1815-12-10', nationality: 'French' },
      { name: 'Mouhamed Amina Diouf ', birthDate: '1916-04-30', nationality: 'American' },
      { name: 'Ibrahima Diallo', birthDate: '1944-10-05', nationality: 'American' },
      { name: 'Die Mbaye', birthDate: '1945-10-02', nationality: 'French' },
      { name: 'Makhtar Seck', birthDate: '1947-05-06', nationality: 'French' },
      { name: 'Diogo BA', birthDate: '1958-08-01', nationality: '' },
      { name: 'Sagaleyni Aidara', birthDate: '1954-10-13', nationality: 'Italian' },
      { name: 'Mariam Sow', birthDate: '1954-02-12', nationality: 'Senegalese' },
      { name: 'Rokhyatou Sarr Fall', birthDate: '1963-01-15', nationality: 'Senegalese' },
    ]);

    // Insertion des thèmes
    const themes = await Theme.insertMany([
      { title: 'Cryptographie asymétrique', description: 'Chiffrement avec clés publiques et privées' },
      { title: 'Cryptographie symétrique', description: 'Chiffrement avec une seule clé partagée' },
      { title: 'Sécurité des réseaux', description: 'Protection des données en transit' },
      { title: 'Confidentialité numérique', description: 'Protection de la vie privée en ligne' },
      { title: 'Hachage cryptographique', description: 'Fonctions de hachage sécurisées' },
      { title: 'Sécurité des protocoles', description: 'Analyse des protocoles de communication sécurisés' },
      { title: 'Cryptanalyse', description: 'Étude des failles dans les algorithmes cryptographiques' },
      { title: 'Authentification', description: 'Vérification de l’identité des utilisateurs' },
      { title: 'Blockchain', description: 'Technologie de registre distribué' },
      { title: 'Chiffrement homomorphe', description: 'Calculs sur données chiffrées' },
    ]);

    // Insertion des travaux
    const works = await Work.insertMany([
      { title: 'RSA Algorithm', year: 1977, author: authors[5]._id },
      { title: 'Diffie-Hellman Key Exchange', year: 1976, author: authors[3]._id },
      { title: 'Pretty Good Privacy (PGP)', year: 1991, author: authors[8]._id },
      { title: 'A Mathematical Theory of Communication', year: 1948, author: authors[2]._id },
      { title: 'The Design of Rijndael (AES)', year: 2002, author: authors[0]._id },
      { title: 'Secure Hash Algorithm (SHA)', year: 1995, author: authors[9]._id },
      { title: 'Zero-Knowledge Proofs', year: 1985, author: authors[6]._id },
      { title: 'Merkle Trees', year: 1979, author: authors[1]._id },
      { title: 'Homomorphic Encryption', year: 2009, author: authors[7]._id },
      { title: 'Twofish Algorithm', year: 1998, author: authors[9]._id },
    ]);

    // Insertion des influences
    await Influence.insertMany([
      { influencer: authors[1]._id, influenced: authors[0]._id, description: 'Précurseure de la programmation influençant Turing' },
      { influencer: authors[2]._id, influenced: authors[3]._id, description: 'Concepts d’information utiles à la cryptographie' },
      { influencer: authors[3]._id, influenced: authors[5]._id, description: 'Clé publique inspirant RSA' },
      { influencer: authors[5]._id, influenced: authors[6]._id, description: 'Travaux sur RSA influençant la recherche moderne' },
      { influencer: authors[4]._id, influenced: authors[5]._id, description: 'Travail commun avec Diffie' },
      { influencer: authors[6]._id, influenced: authors[7]._id, description: 'Travaux en cryptographie théorique' },
      { influencer: authors[8]._id, influenced: authors[9]._id, description: 'PGP a popularisé la cryptographie personnelle' },
      { influencer: authors[0]._id, influenced: authors[2]._id, description: 'Contributions à la machine de Turing' },
      { influencer: authors[7]._id, influenced: authors[9]._id, description: 'Recherche sur chiffrement avancé' },
      { influencer: authors[2]._id, influenced: authors[6]._id, description: 'Base mathématique pour preuve à divulgation nulle de connaissance' },
    ]);

    console.log('✅ Base de données initialisée avec succès.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed de la base :', error);
    process.exit(1);
  }
};

seedDatabase();
