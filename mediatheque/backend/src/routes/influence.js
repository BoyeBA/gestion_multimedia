const express = require('express');
const router = express.Router();
const influenceController = require('../controllers/influence');

router.post('/', influenceController.createInfluence);
router.get('/', influenceController.listInfluences);
router.get('/:id', influenceController.getInfluence);
router.delete('/:id', influenceController.deleteInfluence);

module.exports = router;
