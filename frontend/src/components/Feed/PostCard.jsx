import React, { useRef, useState } from "react";
import { createComment } from "../../services/Api.jsx";
import LikeBtn from "./LikeBtn.jsx";
import PostContent from "./PostContent.jsx";
import "./Feed.css";

const PostCard = ({ post, currentUser }) => {
  const [comments, setComments] = useState(post.comment || []);
  const commentRef = useRef("");

  const handleOnClick = async (e) => {
    e.preventDefault();

    const commentContent = commentRef.current.value;
    if (commentContent === "") return;

    const newComment = { content: commentContent };

    try {
      await createComment(post._id, newComment);
      setComments((prevComments) => [...prevComments, newComment]);
      commentRef.current.value = "";
      console.log("Comment added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="postCard-container">
      <h3>{post.user.username}</h3>

      {/* Rendering post content */}
      <PostContent content={post.content} />

      {/* like Logic */}
      <span>
        <LikeBtn post={post} currentUser={currentUser} />
      </span>

      {/* Comment Logic */}
      <div className="postCard-comment-section">
        <h4>Comments:</h4>
        {comments.length > 0 ? (
          comments.map((comment, idx) => (
            <div key={idx} className="post-comment">
              <h5>
                {comment.user?.username || "User"}: <span>{comment.content}</span>
              </h5>
            </div>
          ))
        ) : (
          <h6>No commnt added yet...</h6>
        )}
      </div>
      {/* Comment Logic */}
      <div className="postCard-comment">
        <form onSubmit={handleOnClick}>
          <input type="text" placeholder="Comment here..." ref={commentRef} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
