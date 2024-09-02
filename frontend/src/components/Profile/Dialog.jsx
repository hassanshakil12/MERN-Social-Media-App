import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { uploadProfileImages } from "../../services/Api.jsx";
import "./Profile.css";

const Dialog = ({ isOpen, onClose, dialogType }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");
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
    if (!imageFile) return;

    const formData = new FormData();

    if (dialogType == "profileImage" && imageFile) {
      formData.append("profileImage", imageFile);
    }

    if (dialogType == "coverImage" && imageFile) {
      formData.append("coverImage", imageFile);
    }

    try {
      await uploadProfileImages(formData);
      setImageFile(null);
      setImagePreview(null);
      setImageName("");
      onClose();
      console.log(formData);

      console.log("Image uploaded successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="profile-dialog-overlay">
      <div className="profile-dialog-container">
        <form
          method="post"
          className="dialog-form"
          onSubmit={handleOnSubmit}
          onDragOver={handleOnDragOver}
          onDrop={handleOnDrop}
        >
          <div
            className="dialog-dropzone"
            onDragOver={handleOnDragOver}
            onDrop={handleOnDrop}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Image Preview" />
            ) : (
              <div className="dropZone">
                <p>Drag and drop an image here...</p>
                {dialogType === "profileImage" ? (
                  <input
                    type="file"
                    name="profileImage"
                    title=" "
                    onChange={handleOnChange}
                  />
                ) : (
                  <input
                    type="file"
                    name="coverImage"
                    title=" "
                    onChange={handleOnChange}
                  />
                )}
              </div>
            )}
          </div>

          <h3 className="dialog-fileName">
            File Name: {imageName || "No File Selected"}
          </h3>

          <div className="dialog-button-container">
            <Link to={"/profile"} onClick={onClose}>
              Cancel
            </Link>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
