// backend/scripts/generateHash.js
const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = "votreMotDePasse"; // Remplacez par le mot de passe souhaité
  const hash = await bcrypt.hash(password, 10);
  console.log('Hash à copier dans ArangoDB :', hash);
  
  // Pour vérification (optionnel)
  const isValid = await bcrypt.compare(password, hash);
  console.log('Validation du hash :', isValid);
}

generateHash().catch(console.error);