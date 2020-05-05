import React, { useReducer } from "react";
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import { CHECK_IF_AUTHENTICATED, PARSE_JWT, LOGOUT } from "../types";
const AuthState = (props) => {
  const { children } = props;
  const initialState = {
    isAuthenticated: false,
    user: {
      access_token: "",
      exp_date: null,
      user_id: null,
      username: null,
    },
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const checkIfAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token !== null || token !== undefined || token !== "") {
      return dispatch({ type: CHECK_IF_AUTHENTICATED, payload: true });
    } else {
      return dispatch({ type: CHECK_IF_AUTHENTICATED, payload: false });
    }
  };
  const parseJWT = (token) => {
    const base64url = token.split(".")[1];
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return dispatch({ type: PARSE_JWT, payload: JSON.parse(jsonPayload) });
  };
  const logout = () => {
    localStorage.removeItem("token");
    checkIfAuthenticated();
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        checkIfAuthenticated,
        parseJWT,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
