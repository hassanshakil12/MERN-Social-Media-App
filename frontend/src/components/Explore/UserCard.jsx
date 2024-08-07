import React from "react";

const UserCard = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <div key={user._id}>
          {console.log(user.followers.length())}
          <h3>{user.username}</h3>
          <h5>{user.email}</h5>
        </div>
      ))}
    </>
  );
};

export default UserCard;
