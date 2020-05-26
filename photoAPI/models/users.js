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
        
        async login(username, password) {
            // check if user exists
            const user = await new this({ username }).fetch({ require: false });
            if (!user) {
                return false;
            }
 
            // get hashed password from db
            const hash = user.get('password');
 
            // generate hash of cleartext password
            // compare new hash with hash from db
            // return user if hashes match, otherwise false
            return (await bcrypt.compare(password, hash))
                ? user
                : false;
        },
	});
};
