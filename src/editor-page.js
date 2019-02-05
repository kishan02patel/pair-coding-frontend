import React, { Component } from 'react';
import io from "socket.io-client";
import Editor from './editor'
import { SERVER_URL } from './config/config'

class EditorPage extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		console.log(props.location.state.url)
		this.socket = io(`${SERVER_URL}/${props.location.state.url}`)
		this.socket.on('RECEIVE_MESSAGE', (data) => {
			console.log(data)
		})
	}

	handleChange(data) {
		this.socket.emit('SEND_MESSAGE', data)
	}

	render() {
		return (
			<div>
				<p><b>You are connected to {SERVER_URL}/{this.props.location.state.url}</b>
					<br />
					Share this URL with your peers to work together.</p>
				<Editor handleChange={this.handleChange} />
			</div>
		);
	}
}

export default EditorPage;
