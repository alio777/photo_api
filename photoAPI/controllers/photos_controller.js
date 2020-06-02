
//Photos Controller
 
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Hämta all foton för just en användare
 *
 * GET /
 */
const index = async (req, res) => {
		let user = null;
		try {
			user = await models.User.fetchById(req.user.data.id, { withRelated: ['photos'] });
		} catch (error) {
			console.error(error);
			res.sendStatus(404);
			return;
		}
	
		const photos = user.related('photos');
	
		res.send({
			status: 'success',
			data: {
				photos,
			},
		});
}

/**
 * hämta ett specifikt foto för just den användaren
 *
 * GET /:photoId
 */
const show = async (req, res) => {
	const photo = await new models.Photos({ id: req.params.photoId })
		.fetch();

	if(req.user.id === photo.attributes.user_id){
		res.send({
			status: 'success',
			data: {
				photo,
			}
		});
	} else {
		res.status(401).send({
			status: "fail",
			data: "This user doesn't have access to this photo"
		})
	}
}

/**
 * skapa nytt foto
 *
 * POST /
 */
const store = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}
	const validData = matchedData(req);
	try {
		const photo = await new models.Photos(validData).save({user_id: req.user.attributes.id});
		res.send({
			status: 'success',
			data: {
				photo,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Creating a photo: Not working',
		});
		throw error;
	}
}

/**
 * Update a specific resource
 *
 * POST /:photoId
 */
const update = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

/**
 * Destroy a specific resource
 *
 * DELETE /:photoId
 */
const destroy = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}