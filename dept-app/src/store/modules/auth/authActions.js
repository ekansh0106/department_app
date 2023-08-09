import axios from "axios";
import {
  BEFORE_USER_STATE,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
} from "./constants";

import { clearErrors, returnErrors } from "./errorActions";
import API_ROUTE from "../../../ApiRoute";

// ** LOGIN USER **
export const login = (values) => {
  const body = JSON.stringify(values);
  return async (dispatch) => {
    dispatch({ type: BEFORE_USER_STATE });
    try {
      const header = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${API_ROUTE}/login/`, body, header);
      // localStorage.setItem("isAuthenticated", true);
      if (res.data.error) {
        throw res.data.error;
      } else {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        dispatch(clearErrors());
      }
    } catch (err) {
      dispatch(returnErrors(err, "LOGIN_ERROR"));
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
};

// ** LOGOUT USER **
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch(clearErrors());
  window.sessionStorage.clear();
  window.localStorage.clear();
};
