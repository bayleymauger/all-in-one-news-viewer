import React from 'react';
import Post from './Post';

const ContentWrapper = (props) => {
  let views = <div className="loading">Loading...</div>
  const {hackerNews, reddit} = props;
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
  }
  return (
    <div className="content-wrapper">
      <h2>{source}</h2>
      {views}
    </div>
  );
}

export default ContentWrapper;
