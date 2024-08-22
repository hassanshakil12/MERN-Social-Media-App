import React from "react";

const PostContent = ({ content }) => {
  return (
    <>
      {content.map((item, idx) => (
        <div key={idx}>
          {item.image && (
            <img
              src={`http://localhost:5000/uploads/postImages/${item.image}`}
              alt="Post Img"
              style={{ maxWidth: "25%", height: "auto" }}
            />
          )}
          {item.caption && <p>{item.caption}</p>}
        </div>
      ))}
    </>
  );
};

export default PostContent;