import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Navbar extends React.Component {

	onLogoutClick(event) {
		event.preventDefault()
		this.props.logoutUser()
	}

	render() {
		const { isAuthenticated, user } = this.props.auth

		// Links to show to logged in users
		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<span className="nav-link">
						Hello {user.name}
					</span>
				</li>
				<li className="nav-item">
					<a href="#fakeLink" onClick={this.onLogoutClick.bind(this)} className="nav-link">
						Logout
					</a>
				</li>
			</ul>
		)

		// Links to show to guest users
		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">Sign Up</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
			</ul>
		)

		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">Pair Coding</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</nav>
		)
	}
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, { logoutUser })(Navbar)