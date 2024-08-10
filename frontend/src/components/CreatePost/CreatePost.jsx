import React, { useState } from "react";
import { createPost } from "../../services/Api";

const CreatePost = () => {
  const [content, setContent] = useState({ content: "" });

  const handleOnChange = (e) => {
    try {
      setContent({ [e.target.name]: e.target.value });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(content);
      console.log("Post created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form method="post" onSubmit={handleOnSubmit}>
          <div>
            <textarea
              placeholder="What's on your mind"
              rows={10}
              cols={60}
              name="content"
              onChange={handleOnChange}
            ></textarea>
          </div>
          <button type="submit">Post</button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
