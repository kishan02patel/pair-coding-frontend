import React, { Component } from 'react';
import io from "socket.io-client";
import Editor from './editor'
import { SERVER_URL } from './config/config'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class EditorPage extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.componentWillMount = this.componentWillMount.bind(this)
		this.socket = null
	}

	// Connect to a socket namespace and pass in the user details.
	connectSocket() {
		const { user } = this.props.auth
		this.socket = io(`${SERVER_URL}/${this.props.location.state.url}`, {
			query: {
				userId: user.id,
				name: user.name
			}
		})
	}

	componentWillMount() {
		// Check whether this page is opened via the previous session page and the state(and url) is passed or not. If it is passed then create socket to listen on the passed URL.
		this.props.location.state ? this.connectSocket() : console.log('Session not estiblished')
	}

	handleChange(data) {
		this.socket.emit('SEND_MESSAGE', data)
	}

	componentWillUnmount() {
		// Check whether the session is created via previous page or not.
		if (this.props.location.state) {
			// Before navigating to another page send a msg to server for disconnection.
			this.socket.emit('LEAVE_SESSION')
			this.socket.close()
		}
	}

	render() {
		return (
			// Check whether the session is created via previous page or not. If session is not created then redirect the user to session page else display this component
			!this.props.location.state ? <div>{< Redirect to='/' />}</div> :
				<div>
					<p>
						{/* Create a span tag that will show the socket namespace which can be shared with others to connect to same socket namespace and work together. The onclick function is set up to copy this reference when user clicks on this.  */}
						Share <span className="shareLink" onClick={
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

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(EditorPage);
