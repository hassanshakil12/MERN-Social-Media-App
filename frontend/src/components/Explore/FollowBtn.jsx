import React from "react";

const FollowBtn = ({ handleOnClick, isFollowing, user }) => {
  return (
    <>
      {isFollowing ? (
        <button onClick={() => handleOnClick(user._id)}>UnFollow</button>
      ) : (
        <button onClick={() => handleOnClick(user._id)}>Follow</button>
      )}
    </>
  );
};

export default FollowBtn;
