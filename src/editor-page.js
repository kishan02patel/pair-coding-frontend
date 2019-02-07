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
	}

	handleChange(data) {
		this.socket.emit('SEND_MESSAGE', data)
	}

	componentWillUnmount() {
		console.log('component unmounted')
		this.socket.emit('LEAVE_SESSION')
		this.socket.close()
	}

	render() {
		return (
			<div>
				<p>
					Share <span onClick={
						function (event) {
							navigator.clipboard.writeText(event.target.innerHTML);
							document.execCommand("copy")
						}
					} title="Click to copy"><u><b>{this.props.location.state.url}</b></u></span> with your peers to work together.
				</p>
				<Editor handleChange={this.handleChange} socket={this.socket} />
			</div >
		);
	}
}

export default EditorPage;
