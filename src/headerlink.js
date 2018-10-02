import React, { Component } from 'react';
import './headerlink.css';

class HeaderLinkBar extends Component {
	render () {
		return (
			<div className="header_link_bar">
				{this.props.children}
			</div>
		);
	}
}

class HeaderLink extends Component {
	constructor () {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick (event) {
		event.preventDefault();
		if (this.props.hasOwnProperty('onClick')) {
			this.props.onClick(event, this.props);
		}
	}
	render () {
		return (
			<div className="header_link" onClick={this.handleClick}>
				{this.props.title}
			</div>
			);
	}
}
export {HeaderLink, HeaderLinkBar};
