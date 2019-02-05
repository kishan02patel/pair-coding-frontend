import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import Editor from './editor'
import SessionPage from './session-page';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h3>Live Coding Platform</h3>

          <Switch>
            <Route path='/' component={SessionPage} />
            <Route path='/editor' component={Editor} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
