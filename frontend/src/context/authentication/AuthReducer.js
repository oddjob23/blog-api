import {
  CHECK_IF_AUTHENTICATED,
  PARSE_JWT,
  LOGIN,
  LOGOUT,
  REGISTER,
  ERROR,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case CHECK_IF_AUTHENTICATED:
      console.log(`payload received: ${action.payload}`);
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token,
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
        user: null,
      };
    }
    case REGISTER: {
      return {
        ...state,
      };
    }
    case ERROR: {
      return {
        ...state,
        error: {
          ...action.payload,
          message: action.payload.response.data.user.non_field_errors,
          email: action.payload.response.data.user.email,
        },
      };
    }
  }
};
