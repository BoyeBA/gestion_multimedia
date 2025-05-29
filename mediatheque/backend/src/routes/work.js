const express = require('express');
const router = express.Router();
const workController = require('../controllers/work');

router.post('/', workController.createWork);
router.get('/', workController.listWorks);
router.get('/:id', workController.getWork);
router.put('/:id', workController.updateWork);
router.delete('/:id', workController.deleteWork);
router.post('/:id/views', workController.incrementViews);

module.exports = router;