import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import errorReducer from './reducers/errorReducer'

// This is used for redux chrome extension.
let devTools
// Check if the redux entension is installed and the environment is not production then use those developer tools
if (window.__REDUX_DEVTOOLS_EXTENSION__ && (process.env.NODE_ENV !== 'prod' || process.env.NODE_ENV !== 'production')) {
	devTools = window.__REDUX_DEVTOOLS_EXTENSION__()
}
else
	// Have a function that does nothing
	devTools = x => x

// CreateStore(Reducer, initial state, enhancer)
const store = createStore(
	combineReducers({
		auth: authReducer,
		errors: errorReducer
	}),
	{},
	compose(
		applyMiddleware(thunk),
		devTools
	)
)

export default store