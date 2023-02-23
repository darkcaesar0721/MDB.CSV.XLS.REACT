import { combineReducers } from "redux";
import path from "./path";
import email from "./email";
import settings from "./settings";

export default combineReducers({ path, email, settings });
