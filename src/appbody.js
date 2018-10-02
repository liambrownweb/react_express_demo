import React, { Component } from 'react';
import './appbody.css';
import {Button} from './button.jsx';

class UserView extends Component {
	render () {
		return (<div className="body_view">Users</div>);
	}
}

class ArticleView extends Component {
	parseArticleList () {
		let list = (
		<div className="list_row">
			<div>Title</div>
			<div>Short text</div>
			<div><Button text="edit"/></div>
			<div><Button text="delete"/></div>
			<div><Button text="share"/></div>
		</div>);
		return list;
	}
	render () {
		return (
			<div className="body_view">
				Articles
				{this.parseArticleList()}
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
	}

	setView (view_name) {
		if (this.views.hasOwnProperty(view_name)) {
			this.setState({"view": view_name});
		}
	}

	render () {
		let current_view = null;
		if ("articles" === this.state.view) {
			current_view = <ArticleView/>;
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
