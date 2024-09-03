import React, { useRef, useState } from "react";
import { createComment } from "../../services/Api.jsx";
import { Link } from "react-router-dom";
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
      <div className="postCard-info-container">
        <Link to={"/profile"} className="postCard-info-image">
          <img
            src={`http://localhost:5000/uploads/${post.user.profileImage}`}
            alt="Profile Image"
          />
        </Link>
        <h3>
          <Link to={"/profile"}>{post.user.username}</Link>
        </h3>
      </div>

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
              <div className="post-comment-image">
                <img
                  src={`http://localhost:5000/uploads/${comment.user?.profileImage}`}
                  alt="Profile Image"
                />
              </div>
              <h5>
                {comment.user?.username || "User"}:{" "}
                <span>{comment.content}</span>
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
