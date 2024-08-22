import React, { useEffect, useState } from "react";
import { fetchPost, currentUserProfile } from "../../services/Api.jsx";
import PostCard from "./PostCard.jsx";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    try {
      const getCurrentUser = async () => {
        const response = await currentUserProfile();
        setCurrentUser(response.data);
      };
      const getPosts = async () => {
        const response = await fetchPost();
        setPosts(response.data);
      };
      getPosts();
      getCurrentUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log(posts);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} currentUser={currentUser} />
      ))}
    </>
  );
};

export default Feed;
