/**
 * users model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('users', {
		tableName: 'users',
		photos() {
			return this.hasMany('photos');
        },
        albums() {
			return this.hasMany('albums');
		}
	}, {
		hashSaltRounds: 10,
	});
};
