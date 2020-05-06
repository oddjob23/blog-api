import React, { useReducer } from "react";
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import axios from "axios";
import {
  CHECK_IF_AUTHENTICATED,
  PARSE_JWT,
  LOGOUT,
  LOGIN,
  AUTH_LOADING,
  REGISTER,
  ERROR,
} from "../types";
const AuthState = (props) => {
  const { children } = props;
  const initialState = {
    isAuthenticated: false,
    isLoading: false,
    token: null,
    user: {
      username: undefined,
      email: undefined,
    },
    error: {
      message: undefined,
      email: undefined,
    },
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const checkIfAuthenticated = () => {
    const token = localStorage.getItem("token");
    console.log(token, typeof token);
    if (token !== null && token !== undefined && token !== "") {
      console.log("herherherhe");
      return dispatch({
        type: CHECK_IF_AUTHENTICATED,
        payload: { isAuthenticated: true, token },
      });
    } else {
      return dispatch({
        type: CHECK_IF_AUTHENTICATED,
        payload: { isAuthenticated: false, token },
      });
    }
  };
  const setAuthLoading = (bool) =>
    dispatch({ type: AUTH_LOADING, payload: bool });
  const parseJWT = (token) => {
    if (token !== "" && token !== undefined && token !== null) {
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
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  };

  // login  /api/auth/login/   data=user
  const login = (credentials) => {
    setAuthLoading(true);
    const res = axios
      .post("/api/auth/login/", {
        headers: {
          "Content-Type": "application/json",
        },
        user: {
          email: credentials.username,
          password: credentials.password,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          const token = result.data.user.token;
          if (token !== undefined && token !== null && token !== "") {
            localStorage.setItem("token", token);
            const user = JSON.stringify(result.data.user);
            localStorage.setItem("user", user);
            const data = {
              username: result.data.user.username,
              email: result.data.user.email,
              token,
            };
            dispatch({ type: LOGIN, payload: data });
          }
        }
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
  };
  const register = (creds) => {
    axios
      .post("/api/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        creds,
      })
      .then((result) => {
        if (result.status === 201) {
          dispatch({ type: REGISTER });
        } else {
          dispatch({ type: COLLECT_ERRORS, payload: result.status });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: ERROR, payload: err });
      });
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        token: state.token,
        user: state.user,
        error: state.error,
        checkIfAuthenticated,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
