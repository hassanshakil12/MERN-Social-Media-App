import React, { useEffect, useState } from "react";
import { currentUserProfile } from "../../services/Api.jsx";

const Profile = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    try {
      const fetchCurrentUser = async () => {
        const response = await currentUserProfile();
        setUser(response.data);
      };
      fetchCurrentUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log(user);
  return (
    <div>
      <h1>{user.username}</h1>
      <h2>{user.email}</h2>
      <h4>Following: {user.following?.length}</h4>
      <h4>Followers: {user.followers?.length}</h4>
    </div>
  );
};

export default Profile;
