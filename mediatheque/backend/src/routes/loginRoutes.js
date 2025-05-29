// backend/routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const { findUserByEmail } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Vérifier si l'utilisateur existe
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // 2. Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // 3. Générer un token JWT
    const token = jwt.sign(
      { userId: user._key },
      process.env.JWT_SECRET || 'votre_secret_securise',
      { expiresIn: '24h' }
    );

    // 4. Retourner la réponse sans le mot de passe
    const userResponse = {
      _key: user._key,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    res.json({
      token,
      user: userResponse,
      message: 'Connexion réussie'
    });

  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;