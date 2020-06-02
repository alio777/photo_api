// Photos model
module.exports = (bookshelf) => {
    return bookshelf.model('Photos', {
        tableName: 'photos',
                albums() {
                    return this.belongsToMany('Albums');
                },
                users(){
                    return this.belongsTo('User')
                }
            }, {
                fetchById(id, fetchOptions = {}) {
                    return new this({ id }).fetch(fetchOptions);
                },
            })
        };
   