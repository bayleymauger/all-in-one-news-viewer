import React from 'react';

const Post = (props) => {

  var end;
  if (props.comments) {
    end = <span>{props.comments} comments</span>
  } else if(props.forks) {
    end = <span>{props.forks} forks</span>
  }

  var start;
  if (props.points) {
    start = <span>{props.points} pts</span>
  } else if(props.stars) {
    start = <span>{props.stars} stars</span>
  }

  var author;
  if(props.author) {
    author = <span>by {props.author}</span>
  } else {
    author = null;
  }

  return (<a href={props.url} target="_blank">
    <div className="post">
      <h6>{props.title}</h6>
      <span>{props.currentSource}</span>
      {start}
      {author}
      {end}
    </div>
  </a>);
}

export default Post;
