import React, { useEffect, useState } from "react";
import { followUser, unFollowUser } from "../../services/Api.jsx";
import FollowBtn from "./FollowBtn.jsx";
import "./Explore.css";

const UserCard = ({ user, currentUser }) => {
  const [followers, setFollowers] = useState(user.followers);
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    if (followers.includes(currentUser._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  });

  const handleOnClick = async (userId) => {
    try {
      if (isFollowing) {
        try {
          await unFollowUser(userId);
          setFollowers(
            followers.filter((followerId) => followerId !== currentUser._id)
          );
          console.log(`${user.username} unfollowed successfully`);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await followUser(userId);
          setFollowers([...followers, currentUser._id]);
          console.log(`you started following ${user.username}`);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="userCard-container">
        {/*  */}
        <div className="userCard-container-top">
          {/*  */}
          <div className="userCard-container-left">
            <div className="userCard-image">
              <img
                src={`http://localhost:5000/uploads/${user.profileImage}`}
                alt="Profile Picture"
              />
            </div>
            <h3>{user.username}</h3>
            <h5>{user.email}</h5>
          </div>
          {/*  */}
          <div className="userCard-container-right">
            <div className="userCard-container-info">
              <p>Posts</p>
              <p>{user.following.length}</p>
            </div>
            <div className="userCard-container-info">
              <p>Followers</p>
              <p>{followers.length}</p>
            </div>
            <div className="userCard-container-info">
              <p>Following</p>
              <p>{user.following.length}</p>
            </div>
          </div>
        </div>

        <FollowBtn
          handleOnClick={handleOnClick}
          isFollowing={isFollowing}
          user={user}
        />
      </div>
    </>
  );
};

export default UserCard;
