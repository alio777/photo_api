const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums_controller');
const albumValidationRules = require('../validation_rules/albums');

// GET / 
router.get('/', albumsController.index);

// GET /:albumId 
router.get('/:albumId', albumsController.show);

// POST /
router.post('/', albumValidationRules.createRules, albumsController.store);

// POST /:albumId/photos
router.post('/:albumId/photos', albumValidationRules.addSpecificPhotoToSpecificAlbumRules, albumsController.addSpecificPhotoToSpecificAlbum);

// POST /:albumId 
router.put('/:albumId', albumsController.update);

// POST /:albumId 
router.put('/:albumId', albumsController.destroy);

module.exports = router;