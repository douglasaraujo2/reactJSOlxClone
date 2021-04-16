import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import modalReducer from "./reducers/modalReducer";

export default combineReducers({
  user: userReducer,
  modal: modalReducer
});
