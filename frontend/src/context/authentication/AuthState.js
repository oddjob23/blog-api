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
  CHECK_IF_ADMIN,
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
      active: false,
      message: undefined,
      email: undefined,
    },
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const checkIfAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (
      token !== null &&
      token !== undefined &&
      token !== "" &&
      state.token !== null
    ) {
      const user = parseJWT(token);
      return dispatch({
        type: CHECK_IF_AUTHENTICATED,
        payload: { isAuthenticated: true, token, user },
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
      const data = JSON.parse(jsonPayload);
      return data;
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
      .post("/api/auth/register/", {
        headers: {
          "Content-Type": "application/json",
        },
        user: {
          username: creds.username,
          email: creds.email,
          password: creds.password,
        },
      })
      .then((result) => {
        if (result.status === 201) {
          localStorage.setItem("token", result.data.user.token);
          const user = JSON.stringify(result.data.user);
          localStorage.setItem("user", user);
          dispatch({
            type: REGISTER,
            payload: { user: result.data.user, token: result.data.user.token },
          });
        } else {
          dispatch({ type: COLLECT_ERRORS, payload: result.status });
        }
      })
      .catch((err) => {
        console.log(err);
        const data = {
          ...err,
          username: err.response.data.user.username,
          email: err.response.data.user.email,
          password: err.response.data.user.password,
        };
        dispatch({ type: ERROR, payload: data });
      });
  };
  const checkIfAdmin = (user) => {
    if (user.admin) {
      dispatch({ type: CHECK_IF_ADMIN, payload: true });
    } else {
      dispatch({ type: CHECK_IF_ADMIN, payload: false });
    }
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
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
