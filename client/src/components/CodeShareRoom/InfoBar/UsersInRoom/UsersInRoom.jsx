import React, { useState, useEffect } from "react";

function UsersInRoom({ roomData }) {
  const [users, setUsers] = useState([]);

  // TODO: Need to use caching here. The function is very expensive.
  // TODO: Need to add a Tooltip to see fullname
  const renderActiveUsers = () => {
    if (users.length) {
      return users.map((user, i) => {
        return (
          <div className="users" key={i}>
            {user.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .toUpperCase()}
          </div>
        );
      });
    }
  };

  useEffect(() => {
    setUsers((roomData && roomData.users) || []);
  }, [roomData]);

  return <div className="users-in-room">{renderActiveUsers()}</div>;
}

export default UsersInRoom;
