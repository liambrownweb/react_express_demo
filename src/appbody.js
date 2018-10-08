import React, { Component } from 'react';
import './appbody.css';
import {Button} from './button.jsx';
import {Edit} from './edit.jsx';

class UserView extends Component {
	render () {
		return (<div className="body_view">Users</div>);
	}
}

class ArticleView extends Component {
	constructor () {
		super();
		this.state = {};
		this.parseArticleList = this.parseArticleList.bind(this);
		this.handleRowClick = this.handleRowClick.bind(this);
		this.editArticle = this.editArticle.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
		this.shareArticle = this.shareArticle.bind(this);
		this.duplicateArticle = this.duplicateArticle.bind(this);
		this.updateArticle = this.updateArticle.bind(this);
		this.subscribeViewToModel = this.subscribeViewToModel.bind(this);
		this.refresh = this.refresh.bind(this);
	}

	deleteArticle (event) {
		event.preventDefault();
		event.stopPropagation();
		this.model.deleteArticle(event.currentTarget.getAttribute('data-id'), this.refresh);
	}

	duplicateArticle (event) {
		event.preventDefault();
		event.stopPropagation();
		this.model.duplicateArticle(event.currentTarget.getAttribute('data-id'), this.refresh);
	}

	editArticle (event) {
		event.preventDefault();
		event.stopPropagation();
		let id = event.currentTarget.getAttribute('data-id');
		this.setState({'editing': id});
	}

	shareArticle (event) {
		event.preventDefault();
		event.stopPropagation();
		console.log("share!");
	}

	updateArticle (event) {
		event.preventDefault();
		event.stopPropagation();
		
	}

	handleRowClick (event) {
		event.preventDefault();
		event.stopPropagation();
		console.log("Row Clicked!");
	}

	parseArticleList () {
		if (!this.model) return;
		let articles = this.model.getArticle();
		if (Array.isArray(articles)) {
			let list = articles.map((article) => (
			<tr className="list_row" onClick={this.handleRowClick}>
				<td>{article.title}</td>
				<td className="snippet">{article.body}</td>
				<td><Button text="edit" dataId={article.id} onClick={this.editArticle}/></td>
				<td><Button text="duplicate" dataId={article.id} onClick={this.duplicateArticle}/></td>
				<td><Button text="delete" dataId={article.id} onClick={this.deleteArticle}/></td>
				<td><Button text="share" dataId={article.id} onClick={this.shareArticle}/></td>
			</tr>));
			return list;
		} else {
			return null;
		}
	}

	render () {
		return (
			<div className="body_view">
				<table>
				{this.parseArticleList()}
				</table>
				<Button text="Add"/>
			</div>);
	}

	refresh () {
		this.setState({"view_version": this.state.view_version + 1});
	}

	subscribeViewToModel () {
		this.model.subscribe(this);
	}
}

class AppBody extends Component {

	constructor () {
		super();
		this.state = {
			'view': (this.props) ? this.props.view : 'articles'
		};
		this.views = {
			"articles": ArticleView,
			"users": UserView
		};
		this.setArticleList = this.setArticleList.bind(this);
	}

	setArticleList (data) {
		this.setState({"articles": data});
	}

	setModel (model) {
		this.view.model = model;
		this.view.subscribeViewToModel();
	}

	setView (view_name) {
		if (this.views.hasOwnProperty(view_name)) {
			this.setState({"view": view_name});
		}
	}

	render () {
		let current_view = null;
		if ("articles" === this.state.view) {
			current_view = <ArticleView ref={(e) => this.view = e}/>;
		} else if ("users" === this.state.view) {
			current_view = <UserView/>;
		}
		return (
			<div className="app_body">
				{current_view}
			</div>
		);
	}
}

export {AppBody};
