import React, { useRef, useState } from "react";
import { createComment } from "../../services/Api";

const PostCard = ({ post }) => {
  const [comments, setComments] = useState(post.comment);
  const commentRef = useRef("");

  const handleOnClick = async (e) => {
    e.preventDefault();

    const commentContent = commentRef.current.value;
    if (commentContent == "") return;

    const newComment = { content: commentContent };

    try {
      await createComment(post._id, newComment);
      setComments([...comments, newComment]);
      commentRef.current.value = "";
      console.log("Comment added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>{post.user.username}</h3>
      <p>{post.content}</p>
      <form method="post" onSubmit={handleOnClick}>
        <input type="text" placeholder="Comment here..." ref={commentRef} />
        <button type="submit">Send</button>
      </form>
      <span>
        <button>Like</button>
      </span>
      <div>
        <h4>Comments:</h4>
        {comments.map((comment, idx) => (
          <p key={idx}>{comment.content}</p>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
