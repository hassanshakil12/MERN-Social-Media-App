import React from "react";

const PostCard = ({ post }) => {
  return (
    <div>
      <h3>{post.user.username}</h3>
      <span>
        <input type="text" placeholder="Comment here..." />
        <button>Send</button>
      </span>
      <span>
        <button>Like</button>
      </span>
    </div>
  );
};

export default PostCard;
