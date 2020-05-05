import { CHECK_IF_AUTHENTICATED, PARSE_JWT } from "../types";
export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case CHECK_IF_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case PARSE_JWT:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
  }
};
