import { GET_ERRORS, CLEAR_ERRORS } from "./constants";

// RETURN ERRORS
export const returnErrors = (message, status = null) => {
  return {
    type: GET_ERRORS,
    payload: { message, status },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
