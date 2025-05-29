import { verifyCredentials } from './arangoConfig.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { valid, user } = await verifyCredentials(email, password);
    
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._key, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const verifyToken = async (req, res) => {
  try {
    // La vérification réelle se fait via le middleware JWT
    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
};