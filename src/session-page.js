import React from 'react'
import { SERVER_URL } from './config/config'
import axios from 'axios';

class SessionPage extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.createSession = this.createSession.bind(this)
	}

	componentDidMount() {
		// Making sure that user is not able to go forward again to the editor page once session is destroyed. 
		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener('popstate', function (event) {
			window.history.pushState(null, document.title, window.location.href);
		});
	}

	handleSubmit(event) {
		event.preventDefault()
		const url = event.target[0].value
		if (url.length === 0)
			alert('This cannot be empty. Either create new session or paste the URL here.')
		else {
			// Check whether the socket namespace exists or not. 
			axios.get(`${SERVER_URL}/checkSocketExists?url=${url}`)
				.then(response => {
					if (response.data.isSocketPresent) {
						this.props.history.push({
							pathname: '/editor-page',
							state: { url }
						})
					}
					else {
						if (window.confirm('This URL does not exist. Do you want to create a new session?')) {
							this.createSession()
						}
					}
				})
		}
	}

	createSession() {
		axios.get(`${SERVER_URL}/getSessionURL`)
			.then(response => {
				var url = response.data.url
				this.props.history.push({
					pathname: '/editor-page',
					state: { url }
				})
			})
			.catch(err => console.log(JSON.stringify(err)))
	}

	render() {
		return (
			<div>
				<h3 className="text-center">Start Coding</h3>
				<p className="text-muted mb-40">
					Choose one of the options below to start live pair coding.
				</p>
				<button className="btn btn-info" onClick={this.createSession}>Create New Session</button>
				<br /> <br />
				<h5>OR</h5>
				<br />
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input type="text" className="form-control form-control-lg" placeholder="Type the URL to connect..." />
					</div>
					<input className="btn btn-info" type="submit" value="Connect" />
				</form>
			</div >
		)
	}
}

export default SessionPage