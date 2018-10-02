import React, { Component } from 'react';
import './button.css';

class Button extends Component {
	render () {
		return (
			<div className="ui_button">
				{this.props.text}
			</div>
		);
	}
}

export {Button};
