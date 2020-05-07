import React, { useContext, useEffect } from "react";
import UsersContext from "../../../context/users/UsersContext";
import AuthContext from "../../../context/authentication/AuthContext";
const Users = () => {
  const usersContext = useContext(UsersContext);
  const authContext = useContext(AuthContext);
  const { getUsers } = usersContext;
  const { token } = authContext;
  useEffect(() => {
    getUsers(token);
  }, []);
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
};

export default Users;
