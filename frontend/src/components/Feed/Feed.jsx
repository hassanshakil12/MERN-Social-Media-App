import React, { useEffect, useState } from "react";
import { fetchPost } from "../../services/Api";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetchPost();
      setPosts(response.data);
    };
    getPosts();
  }, []);

  console.log(posts);

  return (
    <>
      <div>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Feed;
