import { combineReducers } from "redux";
import authReducer from "./auth/authReducers";
import errorReducer from "./auth/errorReducers";
import { deptAReducer } from "./deptA/deptAReducers";
import { deptBReducer } from "./deptB/deptBReducers";
import { deptCReducer } from "./deptC/deptCReducers";

const reducer = combineReducers({
  Error: errorReducer,
  Auth: authReducer,
  DeptA: deptAReducer,
  DeptB: deptBReducer,
  DeptC: deptCReducer,
});

export default reducer;
