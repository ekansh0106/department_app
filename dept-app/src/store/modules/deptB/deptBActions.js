import {
  BEFORE_DEPTB_STATE,
  FETCH_DEPTB,
  FETCH_DEPTB_ERROR,
  FORWARD_DEPTB,
  FORWARD_DEPTB_ERROR,
} from "./constants";
import axios from "axios";
import API_ROUTE from "../../../ApiRoute";

export const fetchDEPTB = (content) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_DEPTB_STATE });

    try {
      const res = await axios.post(
        `${API_ROUTE}/devices-B/`,
        { content },
        {
          auth: {
            username: "deptA",
            password: "deptA",
          },
        }
      );
      setTimeout(() => {
        dispatch({ type: FETCH_DEPTB, payload: res.data.success });
      }, 1000);
    } catch (err) {
      dispatch({ type: FETCH_DEPTB_ERROR, payload: err });
    }
  };
};

// FORWARD DEPTB
export const forwardDEPTB = (content) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_DEPTB_STATE });
    try {
      const res = await axios.post(
        `${API_ROUTE}/forward-devices/`,
        { content },
        {
          auth: {
            username: "deptA",
            password: "deptA",
          },
        }
      );
      setTimeout(() => {
        dispatch({
          type: FORWARD_DEPTB,
          payload: res.data.success,
        });
      }, 1000);
    } catch (err) {
      dispatch({ type: FORWARD_DEPTB_ERROR, payload: err.response });
    }
  };
};
