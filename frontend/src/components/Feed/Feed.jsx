import React, { useEffect, useState } from "react";
import { fetchPost, currentUserProfile } from "../../services/Api.jsx";
import PostCard from "./PostCard.jsx";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await currentUserProfile();
        setCurrentUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getPosts = async () => {
      try {
        const response = await fetchPost();
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
    getCurrentUser();

    setLoading(true);
    Promise.all([getPosts(), getCurrentUser()]).then(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="feed-spinner-container">
        <div className="feed-spinner"></div>
      </div>
    );

  console.log(posts);

  return (
    <div className="feed-container">
      {posts
        ? posts.map((post) => (
            <PostCard key={post._id} post={post} currentUser={currentUser} />
          ))
        : loading}
    </div>
  );
};

export default Feed;
