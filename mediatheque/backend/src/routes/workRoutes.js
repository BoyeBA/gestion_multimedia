const express = require('express');
const router = express.Router();

// Exemple de route GET
router.get('/', (req, res) => {
  res.json({ message: 'Liste des œuvres' });
});

// Exemple de route POST
router.post('/', (req, res) => {
  const newWork = req.body;
  // Tu pourras insérer le travail dans la base ici
  res.status(201).json({ message: 'Œuvre créée', data: newWork });
});

module.exports = router;
