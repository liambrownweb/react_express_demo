
class DB {
	constructor () {
		this.createConnection();
	}

	async createConnection () {
		this.db = await sqlite.open('./database.sqlite');
	}
}

module.exports = {
	'DB': DB
};
