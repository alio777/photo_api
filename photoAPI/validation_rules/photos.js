// Photo validation rules
const { body } = require('express-validator');
const models = require('../models')

const createRules = [
    body('title').isLength({ min: 3 }).custom(async value => {
        const photo = await new models.Photos({ title: value }).fetch({ require: false});
        if(photo) {
            return Promise.reject('Title already exists.')
        }
        return Promise.resolve();
    }),
    body('url').isLength({ min: 3 }),
    body('comment').optional().isLength({ min: 2 }),
];

module.exports = {
    createRules,
}