/**
 * photos model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('photos', {
		tableName: 'photos',
		albums() {
			return this.belongsToMany('albums');   // books.author_id = 3   ->   authors.id = 3 (single author)
		},
		users() {
			return this.belongsTo('users');
		}
	});
}
