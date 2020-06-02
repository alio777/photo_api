// Authentication middleware

const models = require('../../models')

const basic = async (req, res, next) => {

	if (!req.headers.authorization) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization required',
		});
		return;
	}

	const [authSchema, base64Payload] = req.headers.authorization.split(' ');

	if (authSchema.toLowerCase() !== "basic") {
		
		next();
	}

	const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');

	const [username, password] = decodedPayload.split(':');

	const user = await models.User.login(username, password);
	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
		return;
	}
	
	req.user = user;
	req.user.data = { id: user.get('id') }

	next();
};

module.exports = {
    basic,
}