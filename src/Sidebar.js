import React, {Component} from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class Sidebar extends Component {

  render(){
    const news = ['Reddit', 'Slashdot', 'Designer News', 'Github Trending', 'Medium', 'Lifehacker'].map((val, i) => {
      return <li key={i} onClick={this.props.handleClick} id={val}>{val}</li>
    });
    return (
      <div className="sidebar">
        <i className="fa fa-bookmark-o"></i>
        <ul>
          <li>All In One</li>
          <li className="divider"></li>
          <li className="active" onClick={this.props.handleClick} id="Hacker News">Hacker News</li>
          {news}
          <li className="divider"></li>
        </ul>
      </div>
    )
  }
}

export default Sidebar;
