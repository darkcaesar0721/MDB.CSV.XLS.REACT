import axios from "axios";
import qs from "qs";
import {
    INIT_PATH_DATA,
    INIT_EMAIL_DATA,
} from "./actionTypes";
import { APP_API_URL } from "../constants";

export const getPathData = () => async (dispatch) => {
    const result = await axios.get(APP_API_URL + 'controllers/json.php?action=get_path_data');

    dispatch({
        type: INIT_PATH_DATA,
        data: result.data
    });
}

export const setPathData = (rows = {}) => async (dispatch) => {
    const result = await axios.post(APP_API_URL + 'controllers/json.php?action=set_path_data', qs.stringify({
        rows
    }));

    dispatch({
        type: INIT_PATH_DATA,
        data: result.data
    });
}

export const getEmailData = () => async (dispatch) => {
    const result = await axios.get(APP_API_URL + 'controllers/json.php?action=get_email_data');

    dispatch({
        type: INIT_EMAIL_DATA,
        data: result.data
    });
}

export const setEmailData = (rows = []) => async (dispatch) => {
    const result = await axios.post(APP_API_URL + 'controllers/json.php?action=set_email_data', qs.stringify({
        rows
    }));

    dispatch({
        type: INIT_EMAIL_DATA,
        data: result.data
    });
}

export const download = (callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'controllers/download.php')
        .then(function(resp) {
            callback(resp);
        })
}