import React, { useState, useEffect } from "react";
import { fetchAllUsers, currentUserProfile } from "../../services/Api";
import UserCard from "./UserCard.jsx";

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setcurrentUser] = useState({});

  useEffect(() => {
    try {
      const fetchCurrentUser = async () => {
        const response = await currentUserProfile();
        setcurrentUser(response.data);
      };
      const fetchUsers = async () => {
        const response = await fetchAllUsers();
        setUsers(response.data);
      };
      fetchUsers();
      fetchCurrentUser();
    } catch (error) {
      console.error(error);
    }
  }, []);
  // console.log(users);
  return (
    <>
      {users.map((user) => (
        <UserCard key={user._id} user={user} currentUser={currentUser} />
      ))}
    </>
  );
};

export default Explore;
