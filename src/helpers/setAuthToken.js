import axios from 'axios'

// Set the token to auth header so that every request made from axios contains token.
const setAuthToken = token => {
	// If token is present then set it to header.
	if (token)
		axios.defaults.headers.common['Authorization'] = token
	// If token not present then delete it from header.
	else
		delete axios.defaults.headers.common['Authorization']
}

export default setAuthToken