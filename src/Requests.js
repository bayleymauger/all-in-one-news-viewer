import React, {Component} from 'react';
import ContentWrapper from './ContentWrapper';
import axios from 'axios';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackerNews: [],
      reddit: [],
      techCrunch: [],
    }
  }

  async componentDidMount() {
    const hackerNewsStories = "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty";
    axios.get(hackerNewsStories).then(res => {
      const hackerNews = [];
      const newAmount = res.data.splice(0, Math.floor(res.data.length / 8));
      const requests = newAmount.map(val => {
        const url = `https://hacker-news.firebaseio.com/v0/item/${val}.json?print=pretty`;
        return axios.get(url).then(res => {
          hackerNews.push(res.data);
        });
      });

      // Wait for all requests, and then setState
      Promise.all(requests).then(() => {
        this.setState({hackerNews: hackerNews});
      });
    });

    const redditStories = 'https://www.reddit.com/r/popular/top.json';
    const reddit = [];
    await axios.get(redditStories).then(res => {
      res.data.data.children.map(val => {
        reddit.push(val.data);
        return val;
      });
    }).then(() => this.setState({reddit: reddit}));

    const techCrunchStories = 'https://newsapi.org/v2/top-headlines?sources=engadget&apiKey=94d4df4aa6f64c6aaf367aa821ccde0c';
    const techCrunch = [];
    await axios.get(techCrunchStories).then(res => {
      console.log(res.data.articles);
      res.data.articles.map(val => {
        techCrunch.push(val);
        return val;
      });
    }).then(() => this.setState({techCrunch: techCrunch}));
  }

  render() {
    const {hackerNews, reddit, techCrunch} = this.state;
    return (
      <div>
        <ContentWrapper hackerNews={hackerNews} reddit={reddit} techCrunch={techCrunch} currentSource={this.props.currentSource} />
      </div>
    )
  }
}

export default Requests;
