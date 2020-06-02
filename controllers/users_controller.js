
//User Controller


/**
 * hämta alla användare
 *
 * GET /
 */
const index = async (req, res) => {
	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}
	res.send({
		status: 'success',
		data: { //hämta data i den här ordningen
			user: {
				id: req.user.attributes.id,
				email: req.user.attributes.email,
				first_name: req.user.attributes.first_name,
				last_name: req.user.attributes.last_name,
			},
		}
	});
}

/**
 * Get a specific resource
 *
 * GET /:userId
 */
const show = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

/**
 * Store a new resource
 *
 * POST /
 */
const store = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

/**
 * Update a specific resource
 *
 * POST /:userId
 */
const update = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

/**
 * Destroy a specific resource
 *
 * DELETE /:userId
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