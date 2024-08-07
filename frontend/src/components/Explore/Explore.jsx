import React, { useState, useEffect } from "react";
import { fetchAllUsers } from "../../services/Api";
import UserCard from "./UserCard.jsx"

const Explore = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetchAllUsers();
      setUsers(response.data);
    };
    fetchUsers();
  }, []);
  // console.log(users);

  return (
    <div>
      <UserCard users={users}/>
    </div>
  );
};

export default Explore;