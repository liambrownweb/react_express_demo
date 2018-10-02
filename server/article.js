const sqlite = require('sqlite');
class Article {
	constructor () {
		this.createConnection();
		this.table = 'articles';
	}
	async createConnection () {
		this.db = await sqlite.open('./database.sqlite');
		this.db.all(`CREATE TABLE IF NOT EXISTS '${this.table}' (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)`);
	}
	async list (params, callback) {
		let query_string = `SELECT * FROM ${this.table}`;
		if (params.hasOwnProperty("limit")) {
			query_string += ` LIMIT ${params.limit}`;
		}
		let data = await this.db.all(query_string);
		callback(data);
	}
	async create (article_data, callback) {
		let query_string = `INSERT INTO ${this.table} ('title', 'body') VALUES ('${article_data.title}', '${article_data.body}')`;
		let result = await this.db.all(query_string);
		callback(result);
	}
	async retrieve (params, callback) {
		let data = await this.db.all(`SELECT * FROM ${this.table} WHERE id = ${params.id}`);
		callback(data);
	}
	async update (params, callback) {
		let set_string = '',
			set_array = [];
		for (let name in params) {
			if (name !== 'id') {
				set_array.push(`'${name}' = '${params[name]}'`);
			}
		}
		set_string = set_array.join(', ')
		let data = await this.db.all(`UPDATE ${this.table} SET ${set_string} WHERE id = ${params.id}`);
		callback(data);
	}
	async duplicate (params, callback) {
		this.retrieve(params, (data) => {
			let article = data[0];
			article['title'] += " (duplicate)";
			this.create(article, callback);
		});
	}
	async erase (params, callback) {
		let result = await this.db.all(`DELETE FROM ${this.table} WHERE id = ${params.id}`);
		callback(result);
	}
	async share (params, callback) {
		this.retrieve(params, (data) => {
			callback(data);
		});
	}
}
module.exports = {
	"Article": Article
};
