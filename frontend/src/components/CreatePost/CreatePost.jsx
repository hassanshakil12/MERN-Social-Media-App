import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPost } from "../../services/Api";
import "./CreatePost.css";

const CreatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");
  const captionRef = useRef("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    try {
      if (e.target.type === "file") {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setImageName(file.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageName(file.name);
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
          onDragOver={handleOnDragOver}
          onDrop={handleOnDrop}
        >
          <div
            className="createPost-dropzone"
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="preview" className="image-preview" />
            ) : (
              <div className="dropZone">
                <p>Drag and drop an image here...</p>
                <input
                  type="file"
                  name="image"
                  title=" "
                  onChange={handleOnChange}
                />
              </div>
            )}
          </div>
          <h3 className="createPost-fileName">
            {" "}
            File Name: {imageName || "No File Selected"}
          </h3>
          <div>
            <textarea
              placeholder="What's on your mind"
              rows={5}
              name="caption"
              ref={captionRef}
            ></textarea>
          </div>
          <div className="createPost-button-container">
            <Link to={"/"}>Cancel</Link>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
