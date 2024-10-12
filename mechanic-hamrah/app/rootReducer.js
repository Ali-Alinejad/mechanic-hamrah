import { combineReducers } from "redux";
import authReducer from "./reducers/Authslice"; // مسیر درست به authSlice

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
