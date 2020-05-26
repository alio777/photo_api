// Setting up the database connection
const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'photos',
	}
});

const bookshelf = require('bookshelf')(knex);

const models = {};
models.albums = require('./albums')(bookshelf);
models.photos = require('./photos')(bookshelf);
models.users = require('./users')(bookshelf);

module.exports = {
	bookshelf,
	...models,
};
