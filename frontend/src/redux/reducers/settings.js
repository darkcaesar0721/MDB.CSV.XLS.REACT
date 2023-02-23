import {INIT_SETTING_DATA} from "../actionTypes";

const initialState = {
};

function settings(state = initialState, action) {
    switch (action.type) {
        case INIT_SETTING_DATA: {
            return Object.assign({...state}, {...action.data})
        }
        default: {
            return state;
        }
    }
}

export default settings;
