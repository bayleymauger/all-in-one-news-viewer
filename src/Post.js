import React from 'react';

const Post = (props) => {
  return (
    <a href={props.url} target="_blank">
      <div className="post">
        <h6>{props.title}</h6>
        <span>{props.currentSource}</span>
        <span>{props.points} pts</span>
        <span>by {props.author}</span>
        <span>{props.comments} comments</span>
      </div>
    </a>
  );
}

export default Post;
