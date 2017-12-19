import React from 'react';
import Post from './Post';

const ContentWrapper = (props) => {
  let views = <div className="loading">Loading...</div>
  const {hackerNews, reddit, techCrunch, gitHub, slashdot, lifehacker, designerNews} = props;
  const source = props.currentSource;
  if(source === 'Hacker News') {
    if(hackerNews && hackerNews.length > 0) {
      views = hackerNews.map((val, i ) => {
        return <Post key={i} currentSource={source} title={val.title} author={val.by} points={val.score} comments={val.descendants} url={val.url} />
      });
    }
  } else if(source === 'Reddit') {
    if(reddit && reddit.length > 0) {
      views = reddit.map((val, i) => {
        var url = `https://www.reddit.com/${val.permalink}`
        return <Post key={i} currentSource={source} title={val.title} author={val.author} points={val.score} comments={val.num_comments} url={url} />
      });
    }
  } else if(source === 'Tech Crunch') {
    if(techCrunch && techCrunch.length > 0) {
      views = techCrunch.map((val, i) => {
        return <Post key={i} currentSource={source} title={val.title} author={val.author} url={val.url} />
      });
    }
  } else if(source === 'Github Trending') {
    if(gitHub && gitHub.length > 0) {
      views = gitHub.map((val, i) => {
        return <Post key={i} currentSource={source} title={val.description} author={val.owner.login} url={val.html_url} stars={val.stargazers_count} forks={val.forks} />
      });
    }
  } else if(source === 'Slashdot') {
    if(slashdot && slashdot.length > 0) {
      views = slashdot.map((val, i) => {
        return <Post key={i} currentSource={source} title={val.title} comments={val.comments} url={val.url} />
      });
    }
  } else if(source === 'Lifehacker') {
    if(lifehacker && lifehacker.length > 0) {
      views = lifehacker.map((val, i) => {
        return <Post key={i} currentSource={source} title={val.title} comments={val.comments} url={val.url} author={val.author} />
      });
    }
  }
  else if(source === 'Designer News') {
    if(designerNews && designerNews.length > 0) {
      views = designerNews.map((val, i) => {
        return <Post key={i} currentSource={source} title={val.title} comments={val.comments} url={val.url} author={val.author} />
      });
    }
  }

  return (
    <div className="content-wrapper">
      <h2>{source}</h2>
      {views}
    </div>
  );
}

export default ContentWrapper;
