import React, { Component } from 'react';
import './App.css';
import {HeaderLink, HeaderLinkBar} from './headerlink.js';
import {AppBody} from './appbody.js';
import {Model} from './model.js';

class App extends Component {
	constructor () {
		super();
		this.state = {
			"view" : "articles"
		};
		this.switchView = this.switchView.bind(this);
		this.model = new Model();
		this.refreshArticlesCallback = this.refreshArticlesCallback.bind(this);
		this.refreshArticles();
	}

	refreshArticles () {
		this.model.refreshArticles(this.refreshArticlesCallback);
	}

	refreshArticlesCallback (data) {
		if ("articles" == this.state.view) {
			this.body.setArticleList(data);
		}
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div className="App-title">
						NOOM Take-home Project
					</div>
					<HeaderLinkBar>
						<HeaderLink title="articles" onClick={this.switchView}/>
						<HeaderLink title="users" onClick={this.switchView}/>
					</HeaderLinkBar>
				</header>
				<AppBody ref={(e) => this.body = e} view={this.state.view} />
			</div>
		);
	}

	switchView (event, target_props) {
		this.body.setView(target_props.title);
	}
}

export default App;
