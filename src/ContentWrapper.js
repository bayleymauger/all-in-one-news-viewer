import React, {Component} from 'react';
import axios from 'axios';
import Post from './Post';

class ContentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    const source = this.props.currentSource;
    if(source === 'Hacker News'){
      const topStories = "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty";
      axios.get(topStories).then(res => {
        const posts = [];
        const newAmount = res.data.splice(0, Math.floor(res.data.length / 8));
        const requests = newAmount.map(val => {
          const url = `https://hacker-news.firebaseio.com/v0/item/${val}.json?print=pretty`;
          return axios.get(url).then(res => {
            posts.push(res.data);
          });
        });

        // Wait for all requests, and then setState
        Promise.all(requests).then(() => {
          this.setState({posts: posts});
        });
      });
    }
  }


  async componentDidUpdate(){
    const source = this.props.currentSource;
    if(source === 'Reddit'){
      const stories = 'https://www.reddit.com/r/popular/top.json';
      const posts = [];
      await axios.get(stories).then(res => {
        res.data.data.children.map(val => {
          posts.push(val.data);
        });
      }).then(() => this.setState({posts: posts}));
    }
  }

  render() {
    let views = <div className="loading">Loading...</div>
    const {posts} = this.state;
    const source = this.props.currentSource;
    if(source === 'Hacker News'){
      if(posts && posts.length > 0){
        views = posts.map((val, i) => {
          return <Post key={i} title={val.title} author={val.by} currentSource={source} points={val.score} url={val.url} comments={val.descendants} />
        });
      }
    } else if(source === 'Reddit'){
      if(posts && posts.length > 0){
        views = posts.map((val, i) => {
          let url = `https://www.reddit.com/${val.permalink}`;
          return <Post key={i} title={val.title} author={val.author} currentSource={source} points={val.score} url={url} comments={val.num_comments} />
        });
      }
    }
    return (<div className="content-wrapper">
      <h2>{this.props.currentSource}</h2>
      {views}
    </div>)
  }
}

export default ContentWrapper;
