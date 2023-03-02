import { combineReducers } from "redux";
import path from "./path";
import email from "./email";
import settings from "./settings";
import whatsapp from "./whatsapp";

export default combineReducers({ path, email, settings, whatsapp });
