import {
  CHECK_IF_AUTHENTICATED,
  PARSE_JWT,
  LOGIN,
  LOGOUT,
  REGISTER,
  ERROR,
  CHECK_IF_ADMIN,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case CHECK_IF_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token,
        user: {
          ...action.payload.user,
        },
      };
    case CHECK_IF_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    case PARSE_JWT:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    case LOGIN: {
      return {
        ...state,
        token: action.payload.token,
        user: {
          username: action.payload.username,
          email: action.payload.email,
        },
      };
    }
    case LOGOUT: {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: {
          username: undefined,
          email: undefined,
          token: null,
        },
      };
    }
    case REGISTER: {
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: {
          ...action.payload.user,
        },
      };
    }
    case ERROR: {
      return {
        ...state,
        error: {
          ...action.payload,
          active: true,
          message: action.payload.response.data.user.non_field_errors,
          email: action.payload.response.data.user.email,
        },
      };
    }
  }
};
