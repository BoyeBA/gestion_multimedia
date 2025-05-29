import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { initCollections, verifyCredentials } from './arangoConfig.js';

const app = express();
app.use(cors());
app.use(express.json());

// Initialisation
initCollections().then(() => {
  console.log('📦 Collections prêtes');
});

// Authentification
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { valid, user } = await verifyCredentials(email, password);
    
    if (!valid) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { userId: user._key, email: user.email },
      'votre_secret_jwt',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        _key: user._key,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});