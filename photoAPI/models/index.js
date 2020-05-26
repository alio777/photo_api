// Setting up the database connection
const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 8889,
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || 'root',
		database: process.env.DB_NAME || 'photos',
	}
});

const bookshelf = require('bookshelf')(knex);

const models = {};
models.Album = require('./Album')(bookshelf);
models.Photo = require('./Photo')(bookshelf);
models.User = require('./User')(bookshelf);

module.exports = {
	bookshelf,
	...models,
};
