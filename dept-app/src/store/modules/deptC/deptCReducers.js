import {
  BEFORE_DEPTC_STATE,
  FETCH_DEPTC,
  FETCH_DEPTC_ERROR,
  FORWARD_DEPTC,
  FORWARD_DEPTC_ERROR,
} from "./constants";

export const initState = {
  devices: [],
  deptbError: null,
  isLoading: false,
};

export const deptCReducer = (state = initState, action) => {
  const { payload, type } = action;

  switch (type) {
    case BEFORE_DEPTC_STATE:
      return {
        ...state,
        deptCError: null,
        isLoading: true,
      };
    case FETCH_DEPTC:
      return {
        ...state,
        devices: payload,
        isLoading: false,
      };
    case FETCH_DEPTC_ERROR:
      return {
        ...state,
        deptCError: payload,
        isLoading: false,
      };
    case FORWARD_DEPTC:
      return {
        ...state,
        devices: payload,
        isLoading: false,
      };

    case FORWARD_DEPTC_ERROR:
      return {
        ...state,
        deptCError: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
