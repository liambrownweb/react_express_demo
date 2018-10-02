import axios from 'axios';

class Model {
	constructor () {
		this.server = 'localhost';
		this.port = '4000';
		this.scheme = 'http';
	}

	post (path, action, params, callback) {
		axios.post(this.scheme + "://"
				+ this.server + ":"
				+ this.port + "/api/"
				+ path + "/"
				+ action,
				params)
			.then((response) => callback(response));
	}

	refreshArticles (callback) {
		this.post('articles', 'list', {}, callback);
	}
}

export {Model}
