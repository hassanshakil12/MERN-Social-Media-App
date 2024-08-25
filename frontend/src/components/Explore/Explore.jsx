import React, { useState, useEffect } from "react";
import { fetchAllUsers, currentUserProfile } from "../../services/Api";
import UserCard from "./UserCard.jsx";
import "./Explore.css";

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await currentUserProfile();
        setCurrentUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetchAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
    fetchCurrentUser();

    setLoading(true);
    Promise.all([fetchUsers(), fetchCurrentUser()]).then(() =>
      setLoading(false)
    );
  }, []);

  if (loading) {
    return (
      <div className="explore-spinner-container">
        <div className="explore-spinner"></div>
      </div>
    );
  }

  console.log(users);

  return (
    <div className="explore-container">
      {users.map((user) => (
        <UserCard key={user._id} user={user} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default Explore;
