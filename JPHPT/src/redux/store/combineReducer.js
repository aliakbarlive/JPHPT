import { combineReducers } from "redux";
import { UserReducers } from "../reducer/userReducer";

const rootReducer = combineReducers({
  UserReducers,
});

export default rootReducer;

