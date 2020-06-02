// User model
const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
    return bookshelf.model('User', {
        tableName: 'users',
        photos() {
            return this.hasMany('Photos');
		},
		albums() {
			return this.hasMany('Album')
		}
    }, {
		hashSaltRounds: 10,

		fetchById(id, fetchOptions = {}) {
			return new this({ id }).fetch(fetchOptions);
		},
		
        async login(email, password) {
			const user = await new this({ email }).fetch({ require: false });
			if (!user) {
				return false;
			}
			const hash = user.get('password');

			return (await bcrypt.compare(password, hash))
				? user
				: false;
		},
	});
};