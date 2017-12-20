import React, {Component} from 'react';
import ContentWrapper from './ContentWrapper';
import axios from 'axios';
const cheerio = require('cheerio');

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackerNews: [],
      reddit: [],
      techCrunch: [],
      gitHub: [],
      slashdot: [],
      lifehacker: [],
      designerNews: []
    }
  }


  async componentDidMount() {

    // HACKERNEWS
    const hackerNews = [];
    const hackerNewsStories = "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty";
    axios.get(hackerNewsStories).then(res => {
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

    // SLASHDOT

    const slashdot = [];
    await axios.get('https://cors-anywhere.herokuapp.com/https://slashdot.org/').then(res => {
      var $ = cheerio.load(res.data);
      $('article.article').each(function(i, element) {
        var title = $(this).children('header').children('h2').children('span.story-title').children('a').text();
        var comments = $(this).children('header').children('h2').children('span.comment-bubble').children('a').text();
        var url = $(this).children('header').children('h2').children('span.story-title').children('a').attr('href');
        const slashMeta = {
          title: title,
          comments: comments,
          url: url
        }
        slashdot.push(slashMeta);
      });
    }).then(() => this.setState({slashdot: slashdot}));

    // REDDIT

    const redditStories = 'https://www.reddit.com/r/popular/top.json';
    const reddit = [];
    await axios.get(redditStories).then(res => {
      res.data.data.children.map(val => {
        reddit.push(val.data);
        return val;
      });
    }).then(() => this.setState({reddit: reddit}));

    // TECHCRUNCH

    const techCrunch = [];
    await axios.get('https://cors-anywhere.herokuapp.com/https://techcrunch.com/').then(res => {
      var $ = cheerio.load(res.data);
      $('div.block-content').each(function(i, element) {
        var title = $(this).children('h2.post-title').children('a').text();
        var url = $(this).children('h2.post-title').children('a').attr('href');
        var author = $(this).children('div.byline').children('a').text();
        const techMeta = {
          title: title,
          url: url,
          author: author
        }
        techCrunch.push(techMeta);
      });
    }).then(() => {
      techCrunch.splice(0,4);
      this.setState({techCrunch: techCrunch});
    });

    // GITHUB

    const gitHubStories = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars';
    const gitHub = [];
    await axios.get(gitHubStories).then(res => {
      res.data.items.map(val => {
        gitHub.push(val);
        return val;
      });
    }).then(() => this.setState({gitHub: gitHub}));

    // LIFEHACKER

    const lifehacker = [];
    await axios.get('https://cors-anywhere.herokuapp.com/https://www.lifehacker.com.au/it-pro/').then(res => {
      var $ = cheerio.load(res.data);
      var element = 'div.posts__post-item-header';
      $(element).each(function(i, element) {
        var title = $(this).children('div.posts__post-item-header-left').children('h1.headline').children('a').children('span').text();
        var url = $(this).children('div.posts__post-item-header-left').children('h1.headline').children('a').attr('href');
        var author = $(this).children('div.posts__post-item-header-left').children('div.meta').children('div.meta__byline').children('a').text();
        var comments = $(this).children('div.posts__post-item-header-right').children('span.comment-count-wrapper').children('a').text().replace(/\s+/g, '');
        const lifeMeta = {
          title: title,
          url: url,
          author: author,
          comments: comments
        }
        lifehacker.push(lifeMeta);
      });
    }).then(() => this.setState({lifehacker: lifehacker}));

    // DESIGNER NEWS

    const designerNews = [];
    await axios.get('https://www.designernews.co/').then(res => {
      var $ = cheerio.load(res.data);
      $('div.list-story-main-grouper').each(function(i, element) {
        var title = $(this).children('a').attr('story_title');
        var url = $(this).children('a').attr('href');
        var comments = $(this).children('div').children('a').text().charAt(0);
        var author = $(this).children('div').children('span').children('a').text();
        var designerMeta = {
          title: title,
          url: url,
          comments: comments,
          author: author
        }
        designerNews.push(designerMeta);
      });
    }).then(() => this.setState({designerNews: designerNews}));

  }

  render() {
    const {hackerNews, reddit, techCrunch, gitHub, slashdot, lifehacker, designerNews} = this.state;
    return (
      <div>
        <ContentWrapper hackerNews={hackerNews} reddit={reddit} techCrunch={techCrunch} gitHub={gitHub} currentSource={this.props.currentSource} slashdot={slashdot} lifehacker={lifehacker} designerNews={designerNews} />
      </div>
    )
  }
}

export default Requests;
