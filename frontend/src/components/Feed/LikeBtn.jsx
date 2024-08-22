import React, { useEffect, useState } from "react";
import { likePost, unlikePost } from "../../services/Api.jsx";

const LikeBtn = ({ post, currentUser }) => {
  const [isLiked, setIsLiked] = useState(null);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    if (likes.includes(currentUser._id)) {
      setIsLiked(true);
      console.log(isLiked);
    } else {
      setIsLiked(false);
      console.log(isLiked);
    }
  }, []);

  const handleOnClick = async (postId) => {
    try {
      if (isLiked) {
        try {
          await unlikePost(postId);
          setLikes(likes.filter((id) => id !== currentUser._id));
          setIsLiked(false);
          console.log(`${currentUser.username} unliked the post...`);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await likePost(postId);
          setLikes([...likes, currentUser._id]);
          setIsLiked(true);
          console.log(`${currentUser.username} liked the post...`);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {isLiked ? (
        <button onClick={() => handleOnClick(post._id)}>Unlike</button>
      ) : (
        <button onClick={() => handleOnClick(post._id)}>like</button>
      )}
      <span> Likes: {likes.length}</span>
    </>
  );
};

export default LikeBtn;
