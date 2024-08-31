import React, { useEffect, useState } from "react";
import { currentUserProfile } from "../../services/Api.jsx";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await currentUserProfile();
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();

    setLoading(true);
    Promise.all([fetchCurrentUser()]).then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="profile-spinner-container">
        <div className="profile-spinner"></div>
      </div>
    );
  }

  console.log(user);
  return (
    <div className="profile-container">
      <div className="profile-coverImage-container">
        <img
          src={`http://localhost:5000/uploads/${user.coverImage}`}
          alt="Cover Picture"
          style={{ width: "100%" }}
        />
      </div>
      <div className="profile-profileImage-container">
        <img
          src={`http://localhost:5000/uploads/${user.profileImage}`}
          alt="Profile Picture"
        />
      </div>
      <div className="profile-info-container">
        <h1>{user.username}</h1>
        <h2>{user.email}</h2>
        <div className="info-follow-container">
          <h4>Posts: {user.followers?.length}</h4>
          <h4>Following: {user.following?.length}</h4>
          <h4>Followers: {user.followers?.length}</h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;
