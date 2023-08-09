import {
  BEFORE_DEPTC_STATE,
  FETCH_DEPTC,
  FETCH_DEPTC_ERROR,
  FORWARD_DEPTC,
  FORWARD_DEPTC_ERROR,
} from "./constants";
import axios from "axios";
import API_ROUTE from "../../../ApiRoute";

export const fetchDEPTC = (content) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_DEPTC_STATE });

    try {
      const res = await axios.post(
        `${API_ROUTE}/devices-C/`,
        { content },
        {
          auth: {
            username: "deptA",
            password: "deptA",
          },
        }
      );
      setTimeout(() => {
        dispatch({ type: FETCH_DEPTC, payload: res.data.success });
      }, 1000);
    } catch (err) {
      dispatch({ type: FETCH_DEPTC_ERROR, payload: err });
    }
  };
};

// FORWARD DEPTC
export const forwardDEPTC = (content) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_DEPTC_STATE });
    try {
      const res = await axios.post(
        `${API_ROUTE}/clear-devices/`,
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
          type: FORWARD_DEPTC,
          payload: res.data.success,
        });
      }, 1000);
    } catch (err) {
      dispatch({ type: FORWARD_DEPTC_ERROR, payload: err.response });
    }
  };
};
