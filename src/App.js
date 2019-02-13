import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './helpers/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import store from './store'
import SessionPage from './session-page';
import EditorPage from './editor-page'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css'
import Footer from './components/layout/Footer';
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PrivateRoute from './components/common/privateRoute'

// Check if the token is present in the localstorage
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken)

  // Decode token and et user info and expiration time.
  const decoded = jwt_decode(localStorage.jwtToken)

  // Set the user object and isAuthenticated to true
  store.dispatch(setCurrentUser(decoded))

  // Check whether the token has expired or not
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Token is expired
    // Logout the user
    store.dispatch(logoutUser())

    // Redirect to login page
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className="container">
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute path='/dashboard' component={SessionPage} exact />
                <PrivateRoute path='/editor-page' component={EditorPage} exact />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
