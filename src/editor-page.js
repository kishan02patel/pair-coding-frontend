import React, { Component } from 'react';
import io from "socket.io-client";
import Editor from './editor'
import { SERVER_URL } from './config/config'

class EditorPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.socket = io(SERVER_URL)
		console.log(props.location.state.url)
	}

	handleChange(event) {
		this.setState({ value: event.target.value })
		this.socket.emit('SEND_MESSAGE', event.target.value)
	}

	render() {
		return (
			<div>
				<Editor />
			</div>
		);
	}
}

export default EditorPage;
