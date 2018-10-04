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

	deleteArticle (id, callback) {
		let article = this.getArticle(id);
		if (article == null) {
			return;
		}
		this.post('articles', 'erase', {'id': id}, (response) => {
			this.articles.splice(this.articles.indexOf(article), 1);
			this.view.refresh();
			callback(response.data);
		});
	}

	duplicateArticle (id, callback) {
		let article = this.getArticle(id);
		if (article == null) {
			return;
		}
		this.post('articles', 'duplicate', {'id': id}, (response) => {
			this.refreshArticles(callback);
		});
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

	subscribe (view) {
		this.view = view;
	}

	updateArticle (data, callback) {
		this.post('articles', 'update', {
			'id': data.id,
			'title': data.title,
			'body': data.body
		}, callback);
	}
}

export {Model}
