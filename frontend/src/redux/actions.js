import axios from "axios";
import qs from "qs";
import {
    INIT_PATH_DATA,
    INIT_EMAIL_DATA,
    INIT_SETTING_DATA,
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

export const setEmailData = (rows = {}) => async (dispatch) => {
    const result = await axios.post(APP_API_URL + 'controllers/json.php?action=set_email_data', qs.stringify({
        rows
    }));

    dispatch({
        type: INIT_EMAIL_DATA,
        data: result.data
    });
}

export const getSettingData = () => async (dispatch) => {
    const result = await axios.get(APP_API_URL + 'controllers/json.php?action=get_setting_data');

    dispatch({
        type: INIT_SETTING_DATA,
        data: result.data
    });
}

export const setSettingDataByMail = (name = 'shai1', callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'controllers/mail.php?action=set_setting_data', qs.stringify({
        name,
    })).then(function(resp) {
        callback(resp);
    })
}

export const sendEmail = (name = 'shai1', rows = {}, callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'controllers/mail.php?action=send_mail', qs.stringify({
        name,
        rows,
    })).then(function(resp) {
        callback(resp);
    })
}

export const setSettingData = (key = 'shai1', rows = {}, callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'controllers/json.php?action=set_setting_data', qs.stringify({
        key,
        rows
    })).then(function(resp) {
        callback(resp);
    })
}

export const downloadCSV = (index, data, callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'controllers/download_csv.php', qs.stringify({
        index,
        data
    }))
        .then(function(resp) {
            callback(resp);
        })
}

export const downloadXLSTab = (index, data, callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'controllers/download_xls.php', qs.stringify({
        index,
        data
    }))
        .then(function(resp) {
            callback(resp);
        })
}