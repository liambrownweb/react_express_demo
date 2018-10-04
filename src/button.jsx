import React, { Component } from 'react';
import './button.css';

class Button extends Component {
	constructor () {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick (event) {
		if (this.props.hasOwnProperty("onClick")) {
			this.props.onClick(event);
		}
	}

	render () {
		return (
			<div className="ui_button" onClick={this.handleClick} data-id={this.props.dataId}>
				{this.props.text}
			</div>
		);
	}
}

export {Button};
