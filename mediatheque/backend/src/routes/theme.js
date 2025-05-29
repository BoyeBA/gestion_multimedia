const express = require('express');
const router = express.Router();
const themeController = require('../controllers/theme');

router.post('/', themeController.createTheme);
router.get('/', themeController.listThemes);
router.get('/:id', themeController.getTheme);
router.delete('/:id', themeController.deleteTheme);

module.exports = router;
