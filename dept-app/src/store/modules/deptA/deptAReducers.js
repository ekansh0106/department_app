import {
  BEFORE_DEPTA_STATE,
  FETCH_DEPTA,
  FETCH_DEPTA_ERROR,
  DELETE_DEPTA_ERROR,
  DELETE_DEPTA_SUCCESS,
} from "./constants";

export const initState = {
  devices: [],
  authDevices: [],
  device: [],
  devicesError: null,
  isLoading: false,
};

export const deptAReducer = (state = initState, action) => {
  const { payload, type } = action;

  switch (type) {
    case BEFORE_DEPTA_STATE:
      return {
        ...state,
        devicesError: null,
        isLoading: true,
      };

    case DELETE_DEPTA_ERROR:
      return {
        ...state,
        devicesError: payload,
        isLoading: false,
      };

    case FETCH_DEPTA:
      return {
        ...state,
        devices: payload,
        devicesError: null,
        isLoading: false,
      };

    case FETCH_DEPTA_ERROR:
      return {
        ...state,
        devicesError: payload,
        isLoading: false,
      };

    case DELETE_DEPTA_SUCCESS:
      return {
        ...state,
        devices: payload,
        devicesError: null,
        isLoading: false,
      };

    default:
      return state;
  }
};
