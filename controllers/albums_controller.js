
//Albums Controller
 
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * hämta alla album som finns tillgängligt för just den user man är inloggad i
 *
 * GET /
 */
const index = async (req, res) => {
		let user = null;
		try {
			user = await models.User.fetchById(req.user.data.id, { withRelated: ['albums'] });
		} catch (error) {
			console.error(error);
			res.sendStatus(404);
			return;
		}
	
		const albums = user.related('albums');
	
		res.send({
			status: 'success',
			data: {
				albums,
			},
		});
}

/**
 * hämta ett specifikt album bara
 * 
 * GET /:albumId
 */
const show = async (req, res) => {
	const album = await new models.Album({ id: req.params.albumId })
		.fetch({ withRelated: ['photos'] });
		if(req.user.id === album.attributes.user_id){ // kollar om albumet ägs av user
			res.send({
				status: 'success',
				data: {
					album,
				}
			});
		} else {
			res.status(401).send({
				status: "fail",
				data: "This user doesn't have access to this album"
			})
		}
}

/**
 * här skapar vi ett nytt album
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
		const album = await new models.Album(validData).save({user_id: req.user.attributes.id});
		res.send({
			status: 'success',
			data: {
				album,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Creating an album: Not working',
		});
		throw error;
	}
}

/**
 * Här lägger vi till ett specifikt foto till ett specifikt album
 *
 * POST /:albumId/photos
 */
const addSpecificPhotoToSpecificAlbum = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(422).send({
            status: 'fail',
            data: error.array()
        });
        return;
    }
    try {
        const photo = await models.Photos.fetchById(req.body.photo_id);
        const album = await models.Album.fetchById(req.params.albumId);
		
		if(photo.attributes.user_id === album.attributes.user_id){
			const result = await album.photos().attach([photo]);
		
			res.status(201).send({
				status: 'success',
				data: result,
			})
		} else {
			res.status(401).send({
				status: "fail",
				data: "This user doesn't have access to this album"
			})
		}
    } catch (error) {
        res.sendStatus(404);
        throw error;
    }
}

/**
 * Update a specific resource
 *
 * POST /:albumId
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
 * DELETE /:albumId
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
	addSpecificPhotoToSpecificAlbum,
	update,
	destroy,
}