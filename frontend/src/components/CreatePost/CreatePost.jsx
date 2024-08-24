import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/Api";
import "./CreatePost.css";

const CreatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const captionRef = useRef("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    try {
      if (e.target.type === "file") {
        setImageFile(e.target.files[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const caption = captionRef.current.value;
    if (caption === "" && !imageFile) return;

    const formData = new FormData();

    if (caption) {
      formData.append("caption", caption);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      await createPost(formData);
      console.log(formData);

      console.log("Post created successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="createPost-container">
        <form
          method="post"
          onSubmit={handleOnSubmit}
          className="createPost-form"
        >
          <div>
            <input type="file" name="image" onChange={handleOnChange} />
          </div>
          <div>
            <textarea
              placeholder="What's on your mind"
              rows={5}
              name="caption"
              ref={captionRef}
            ></textarea>
          </div>
          <div className="createPost-button-container">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
