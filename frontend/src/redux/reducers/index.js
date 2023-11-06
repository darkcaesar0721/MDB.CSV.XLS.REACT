import { combineReducers } from "redux";
import path from "./path";
import lastphone from "./lastphone";
import email from "./email";
import settings from "./settings";
import whatsapp from "./whatsapp";

export default combineReducers({ path, lastphone, email, settings, whatsapp });
