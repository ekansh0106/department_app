import {
  BEFORE_STATE,
  BEFORE_USER_STATE,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  SET_CURRENT_USER,
} from "./constants";

import isEmpty from "lodash/isEmpty";

export const initState = {
  isAuthenticated: false,
  user: {},
  authSuccess: null,
  authError: null,
  isLoading: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    // USER AUTHENTICATION
    case BEFORE_STATE:
      return {
        ...state,
        authError: null,
        isLoading: true,
      };
    case BEFORE_USER_STATE:
      return {
        ...state,
        authError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isLoading: false,
      };
    case LOGIN_ERROR:
      return {
        isAuthenticated: false,
        user: {},
        authSuccess: null,
        authError: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
