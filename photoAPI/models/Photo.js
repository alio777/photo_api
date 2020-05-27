/**
 * photos model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		albums() {
			return this.belongsTo('Album', req.params.albumId);   // books.author_id = 3   ->   authors.id = 3 (single author)
		},
		users() {
			return this.belongsTo('User', req.params.userId);
		}
	});
}
