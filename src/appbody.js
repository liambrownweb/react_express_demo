import React, { Component } from 'react';
import './appbody.css';
import {Button} from './button.jsx';

class UserView extends Component {
	render () {
		return (<div className="body_view">Users</div>);
	}
}

class ArticleView extends Component {
	constructor () {
		super();
		this.parseArticleList = this.parseArticleList.bind(this);
		this.handleRowClick = this.handleRowClick.bind(this);
		this.editArticle = this.editArticle.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
		this.shareArticle = this.shareArticle.bind(this);
	}

	deleteArticle (event) {
		event.preventDefault();
		event.stopPropagation();
		console.log("delete!");
	}

	editArticle (event) {
		event.preventDefault();
		event.stopPropagation();
		console.log("edit!");
	}

	shareArticle (event) {
		event.preventDefault();
		event.stopPropagation();
		console.log("share!");
	}

	handleRowClick (event) {
		event.preventDefault();
		event.stopPropagation();
		console.log("Row Clicked!");
	}

	parseArticleList () {
		if (Array.isArray(this.props.articles)) {
			let list = this.props.articles.map((article) => (
			<tr className="list_row" onClick={this.handleRowClick}>
				<td>{article.title}</td>
				<td className="snippet">{article.body}</td>
				<td><Button text="edit" dataId={article.id} onClick={this.editArticle}/></td>
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

	setView (view_name) {
		if (this.views.hasOwnProperty(view_name)) {
			this.setState({"view": view_name});
		}
	}

	render () {
		let current_view = null;
		if ("articles" === this.state.view) {
			current_view = <ArticleView articles={this.state.articles || []}/>;
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
