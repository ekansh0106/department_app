import { GET_ERRORS, CLEAR_ERRORS } from "./constants";

const initState = {
  message: null,
  status: null,
};

const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
      };
    case CLEAR_ERRORS:
      return {
        message: null,
        status: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
