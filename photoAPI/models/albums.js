/**
 * albums model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('albums', {
		tableName: 'albums',
        photos() {
            return this.hasMany('photos');
        },
        users() {
            return this.belongsTo('users');
        },
	});
}
