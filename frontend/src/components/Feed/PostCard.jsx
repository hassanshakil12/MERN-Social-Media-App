import React, { useRef, useState } from "react";
import { createComment } from "../../services/Api.jsx";
import LikeBtn from "./LikeBtn.jsx";
import PostContent from "./PostContent.jsx";

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
    <div>
      <h3>{post.user.username}</h3>

      {/* Rendering post content */}
      <PostContent content={post.content}/>

      {/* Comment Logic */}
      <form onSubmit={handleOnClick}>
        <input type="text" placeholder="Comment here..." ref={commentRef} />
        <button type="submit">Send</button>
      </form>

      {/* like Logic */}
      <span>
        <LikeBtn post={post} currentUser={currentUser} />
      </span>
      <div>
        <h4>Comments:</h4>
        {comments.length > 0 ? (
          comments.map((comment, idx) => (
            <div key={idx}>
              <h5>{comment.user?.username.split(" ")[1] || "User"}</h5>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <h5>No commnt added yet...</h5>
        )}
      </div>
    </div>
  );
};

export default PostCard;
