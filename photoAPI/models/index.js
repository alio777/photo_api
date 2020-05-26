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
models.album = require('./album')(bookshelf);
models.photo = require('./Photo')(bookshelf);
models.user = require('./User')(bookshelf);

module.exports = {
	bookshelf,
	...models,
};
