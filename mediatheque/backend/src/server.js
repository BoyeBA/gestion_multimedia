import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { initCollections, verifyCredentials, findUserByEmail, createUser } from './arangoConfig.js';
import bcrypt from 'bcryptjs';


const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
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

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Utilisateur déjà enregistré' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      createdAt: new Date().toISOString()
    };

    const savedUser = await createUser(newUser);

    const token = jwt.sign(
      { userId: savedUser._key, email: savedUser.email },
      'votre_secret_jwt',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        _key: savedUser._key,
        email: savedUser.email,
        name: savedUser.name,
        role: savedUser.role
      }
    });
  } catch (err) {
    console.error('Erreur register:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});