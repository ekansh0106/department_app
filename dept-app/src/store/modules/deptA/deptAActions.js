import axios from "axios";
import {
  BEFORE_DEPTA_STATE,
  FETCH_DEPTA,
  FETCH_DEPTA_ERROR,
  DELETE_DEPTA_SUCCESS,
  DELETE_DEPTA_ERROR,
} from "./constants";
import API_ROUTE from "../../../ApiRoute";

// Upload DEPTA
// export const createDEPTA = ({ content }) => {
//   const body = JSON.stringify({ content });
//   return async (dispatch) => {
//     dispatch({ type: BEFORE_DEPTA_STATE });

//     try {
//       const res = await axios.post(`${API_ROUTE}/upload-network-DEPTA`, body);
//       if (res.data.message) {
//         dispatch({
//           type: CREATE_DEPTA_SUCCESS,
//           payload: res.data.message,
//         });
//       } else if (res.data.error) {
//         throw res.data.error;
//       }
//     } catch (err) {
//       dispatch({ type: CREATE_DEPTA_ERROR, payload: err });
//     }
//   };
// };

// FETCH DEPTA
export const fetchDEPTA = (content) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_DEPTA_STATE });

    try {
      const res = await axios.post(
        `${API_ROUTE}/devices/`,
        { content },
        {
          auth: {
            username: "deptA",
            password: "deptA",
          },
        }
      );
      if (res.data.success) {
        setTimeout(() => {
          dispatch({ type: FETCH_DEPTA, payload: res.data.success });
        }, 1000);
      } else if (res.data.error) {
        throw res.data.error;
      }
    } catch (err) {
      dispatch({ type: FETCH_DEPTA_ERROR, payload: err });
    }
  };
};

// Delete DEPTA
export const deleteDEPTA = (content) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_DEPTA_STATE });

    try {
      const res = await axios.post(
        `${API_ROUTE}/del-devices/`,
        { content },
        {
          auth: {
            username: "deptA",
            password: "deptA",
          },
        }
      );
      setTimeout(() => {
        dispatch({ type: DELETE_DEPTA_SUCCESS, payload: res.data.success });
      }, 1000);
    } catch (err) {
      dispatch({ type: DELETE_DEPTA_ERROR, payload: err.response });
    }
  };
};
