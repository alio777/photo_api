// Album validation rules
const { body } = require('express-validator');
const models = require('../models')

const createRules = [
    body('title').isLength({ min: 3 }).custom(async value => {
        const album = await new models.Album({ title: value }).fetch({ require: false});
        if(album) {
            return Promise.reject('Album already exists.')
        }
        return Promise.resolve();
    }),
];

const addSpecificPhotoToSpecificAlbumRules = [
    body('photo_id').custom(value => {
        return models.Photos.fetchById(value);
    })
];

module.exports = {
    createRules,
    addSpecificPhotoToSpecificAlbumRules,
}