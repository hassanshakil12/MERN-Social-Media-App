import React from "react";
import "./Feed.css";

const PostContent = ({ content }) => {
  return (
    <div className="postContent-container">
      {content.map((item, idx) => (
        <div key={idx}>
          {item.image && (
            <div className="postContent-Image">
              <img
                src={`http://localhost:5000/uploads/postImages/${item.image}`}
                alt="Post Img"
              />
            </div>
          )}
          {item.caption && <p>{item.caption}</p>}
        </div>
      ))}
    </div>
  );
};

export default PostContent;
