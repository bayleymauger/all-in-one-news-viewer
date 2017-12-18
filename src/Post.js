import React from 'react';

const Post = (props) => {

  var comments;
  if (props.comments) {
    comments = <span>{props.comments} comments</span>
  }

  var points;
  if (props.points) {
    points = <span>{props.points} pts</span>
  }

  return (<a href={props.url} target="_blank">
    <div className="post">
      <h6>{props.title}</h6>
      <span>{props.currentSource}</span>
      {points}
      <span>by {props.author}</span>
      {comments}
    </div>
  </a>);
}

export default Post;
