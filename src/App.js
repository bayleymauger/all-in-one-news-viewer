import React, { Component } from 'react';
import Requests from './Requests';
import Sidebar from './Sidebar';
import './ContentWrapper.css';
import './Sidebar.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentSource: 'Hacker News'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.setState({currentSource: e.target.id});
    document.querySelector('.active').removeAttribute("class");
    e.target.setAttribute("class", "active");
  }

  render() {
    return (
      <div className="App">
        <Sidebar currentSource={this.state.currentSource} handleClick={this.handleClick} />
        <Requests currentSource={this.state.currentSource} />
      </div>
    );
  }
}

export default App;
