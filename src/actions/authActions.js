import axios from 'axios'
import setAuthToken from '../helpers/setAuthToken'
import jwt_decode from 'jwt-decode'

// Register User
export const registerUser = (userData, history) => dispatch => {
	axios.post('/users/register', userData)
		// If success then redirect user to login page
		.then(response => {
			window.alert('User Registered Successfully. Please login to continue')
			history.push('/login')
		})
		// If server validation fails then show errors to the user. 
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			}))
}

// Login and get user token
export const loginUser = userData => dispatch => {
	axios.post('/users/login', userData)
		.then(response => {
			const { token } = response.data
			// Save the token to localstorage
			localStorage.setItem('jwtToken', token)

			// Set token to Auth header for every request made so that everytime we don't need to manually set it.
			setAuthToken(token)

			// Decode the token to get user data
			const decoded = jwt_decode(token)

			// Set current user
			dispatch(setCurrentUser(decoded))
		})
		// If server validation fails then show errors to the user. 
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		)
}

// Set the state to the current user who logged in.
export const setCurrentUser = decoded => {
	return {
		type: 'SET_CURRENT_USER',
		payload: decoded
	}
}

// Logout the user
export const logoutUser = () => dispatch => {
	// Remove the token from localstorage
	localStorage.removeItem('jwtToken')

	// Remove the auth header for future requests.
	setAuthToken(false)

	// Set state (current user) to {} which will set isAuthenticated to false.
	dispatch(setCurrentUser({}))
}