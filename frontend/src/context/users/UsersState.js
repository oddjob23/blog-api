import React, { useReducer } from "react";
import UsersReducer from "./UsersReducer";
import UsersContext from "./UsersContext";
import axios from "axios";

import {} from "../types";

const UsersState = (props) => {
  const { children } = props;
  const initialState = {
    users: [],
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

  const getUsers = (token) => {
    console.log(token);
    return axios
      .get("/api/users/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <UsersContext.Provider
      value={{
        users: state.users,
        getUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersState;
