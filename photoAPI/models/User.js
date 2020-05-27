/**
 * users model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		photos() {
			return this.hasMany('Photo');
        },
        albums() {
			return this.hasMany('Album');
		}
	}, {
		hashSaltRounds: 10,
	});
};

// {
// 	"email": "oskar.jonsson13@gmail.com",
// 	"password": "jonsson",
// 	"first_name": "Oskar",
// 	"last_name": "Jönsson"
// }