import React, { Component } from 'react';
import io from "socket.io-client";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.socket = io('localhost:3001')
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
    this.socket.emit('SEND_MESSAGE', event.target.value)
  }

  render() {
    return (
      <div className="App">
        <textarea value={this.state.value} onChange={this.handleChange}></textarea>
      </div>
    );
  }
}

export default App;
