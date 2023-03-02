import axios from "axios";
import qs from "qs";
import {
    INIT_PATH_DATA,
    INIT_EMAIL_DATA,
    INIT_SETTING_DATA,
} from "./actionTypes";
import { APP_API_URL } from "../constants";

export const getPathData = () => async (dispatch) => {
    const result = await axios.get(APP_API_URL + 'api.php?class=Path&fn=get');

    dispatch({
        type: INIT_PATH_DATA,
        data: result.data
    });
}

export const setPathData = (rows = {}) => async (dispatch) => {
    const result = await axios.post(APP_API_URL + 'api.php?class=Path&fn=update', qs.stringify({
        rows
    }));

    dispatch({
        type: INIT_PATH_DATA,
        data: result.data
    });
}

export const getEmailData = () => async (dispatch) => {
    const result = await axios.get(APP_API_URL + 'api.php?class=EmailConfig&fn=get');

    dispatch({
        type: INIT_EMAIL_DATA,
        data: result.data
    });
}

export const setEmailData = (rows = {}) => async (dispatch) => {
    const result = await axios.post(APP_API_URL + 'api.php?class=EmailConfig&fn=update', qs.stringify({
        rows
    }));

    dispatch({
        type: INIT_EMAIL_DATA,
        data: result.data
    });
}

export const getSettingData = () => async (dispatch) => {
    const result = await axios.get(APP_API_URL + 'api.php?class=EmailSetting&fn=get');

    dispatch({
        type: INIT_SETTING_DATA,
        data: result.data
    });
}

export const setSettingDataByMail = (name = 'shai1', callback = function() {}) => async (dispatch) => {
    let fn = '';

    if (name === 'shai1') {fn = 'set_shai1_setting';}
    if (name === 'shai2') {fn = 'set_shai2_setting';}
    if (name === 'palm1') {fn = 'set_palm1_setting';}

    axios.post(APP_API_URL + 'api.php?class=Mail&fn=' + fn).then(function(resp) {
        callback(resp);
    })
}

export const sendEmail = (name = 'shai1', rows = {}, callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'api.php?class=Mail&fn=send', qs.stringify({
        name,
        rows,
    })).then(function(resp) {
        callback(resp);
    })
}

export const setSettingData = (key = 'shai1', rows = {}, callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'api.php?class=EmailSetting&fn=update', qs.stringify({
        key,
        rows
    })).then(function(resp) {
        callback(resp);
    })
}

export const downloadCSV = (index, data, callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'controllers/DownloadCSV.php', qs.stringify({
        index,
        data
    }))
        .then(function(resp) {
            callback(resp);
        })
}

export const downloadXLSTab = (index, data, callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'controllers/DownloadXLS.php', qs.stringify({
        index,
        data
    }))
        .then(function(resp) {
            callback(resp);
        })
}

export const uploadStatus = (data, callback = function() {}) => async (dispatch) => {
    axios.post(APP_API_URL + 'api.php?class=Schedule&fn=upload', qs.stringify({
        data
    }))
        .then(function(resp) {
            callback(resp);
        })
}
