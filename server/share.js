const md5 = require('md5');

class Share {
	constructor (db) {
		this.db = db;
		this.table = 'shares';
		this.createConnection();
	}
	
	async createConnection () {
		this.db.all(`CREATE TABLE IF NOT EXISTS '${this.table}' (id INTEGER PRIMARY KEY AUTOINCREMENT, hash TEXT, article_id INTEGER, recip_email INTEGER, date_read TEXT)`);
	}

	async create (article_id, recip_email, callback) {
		let date = new Date(),
			date_str = date.toString(),
			hash_src = article_id + recip_email + date_str,
			hash = md5(hash_src);
		this.db.all(`INSERT INTO '${this.table}' ('hash', 'article_id', 'recip_email') ('${hash}', '${article_id}', '${recip_email}'`);
	}

	async erase (params, callback) {
		let result = await this.db.all(`DELETE FROM ${this.table} WHERE id = ${params.id}`);
		callback({"success": true, "deleted": params.id});
	}

	async read (hash, article_obj, callback) {
		let share_record = this.db.all(`SELECT * FROM '${this.table}' WHERE hash = '${hash}' LIMIT 1`);
		if (share_record) {
			let date_read = new Date();
			this.db.all(`UPDATE '${this.table}' SET date_read = '${date_read.toString()}'`);
			article_obj.retrieve({'id': share_record.article_id}, callback);
		}
	}
}

module.exports = {
	'Share': Share
}
