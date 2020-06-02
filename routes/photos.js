const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos_controller');
const photoValidationRules = require('../validation_rules/photos')

// GET /
router.get('/', photosController.index);

// GET /:photoId 
router.get('/:photoId', photosController.show);

// POST /:photoId 
router.post('/', photoValidationRules.createRules, photosController.store);

// POST /:photoId
router.put('/:photoId', photosController.update);

// POST /:photoId
router.delete('/:photoId', photosController.destroy);

module.exports = router;