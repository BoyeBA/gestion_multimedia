// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Vérifiez ce chemin

// Assurez-vous que authController.register existe bien
//router.post('/register', authController.register); 
//router.post('/login', authController.login);
module.exports = router;