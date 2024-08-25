import React from "react";
import "./Explore.css";

const FollowBtn = ({ handleOnClick, isFollowing, user }) => {
  return (
    <div className="userCard-container-button">
      {isFollowing ? (
        <button
          className="unfollow-btn"
          onClick={() => handleOnClick(user._id)}
        >
          UnFollow
        </button>
      ) : (
        <button
          className="follow-btn"
          onClick={() => handleOnClick(user._id)}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowBtn;
