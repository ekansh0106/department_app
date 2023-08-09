import {
  BEFORE_DEPTB_STATE,
  FETCH_DEPTB,
  FETCH_DEPTB_ERROR,
  FORWARD_DEPTB,
  FORWARD_DEPTB_ERROR,
} from "./constants";

export const initState = {
  devices: [],
  deptbError: null,
  isLoading: false,
};

export const deptBReducer = (state = initState, action) => {
  const { payload, type } = action;

  switch (type) {
    case BEFORE_DEPTB_STATE:
      return {
        ...state,
        deptBError: null,
        isLoading: true,
      };
    case FETCH_DEPTB:
      return {
        ...state,
        devices: payload,
        isLoading: false,
      };
    case FETCH_DEPTB_ERROR:
      return {
        ...state,
        deptBError: payload,
        isLoading: false,
      };
    case FORWARD_DEPTB:
      return {
        ...state,
        devices: payload,
        isLoading: false,
      };

    case FORWARD_DEPTB_ERROR:
      return {
        ...state,
        deptBError: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
