import axios from 'axios';

class Model {
	constructor () {
		this.server = 'localhost';
		this.port = '4000';
		this.scheme = 'http';
		this.refreshArticles = this.refreshArticles.bind(this);
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
		this.post('articles', 'list', {}, (response) => {
			this.storeResponse('articles', response.data);
			callback(response.data);
		});
	}

	storeResponse (category, data) {
		this[category] = data;
	}

	getArticle (id) {
		let result = null;
		if (null == id) {
			result = this.articles;
		} else {
			result = this.articles.find((article) => id == article.id);
		}
		return result;
	}
}

export {Model}
