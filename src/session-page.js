import React from 'react'

const SessionPage = (props) => {

	function handleSubmit() {

	}

	return (
		<div>
			<button>Create New Session</button>
			<br /><br />
			<h3>OR</h3>
			<br />
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Type the URL to connect..." />
				<input type="submit" value="Connect" />
			</form>
		</div>
	)
}

export default SessionPage