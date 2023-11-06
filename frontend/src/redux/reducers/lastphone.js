import {INIT_LAST_PHONE_DATA} from "../actionTypes";

const initialState = {};

function lastphone(state = initialState, action) {
    switch (action.type) {
        case INIT_LAST_PHONE_DATA: {
            return Object.assign({...state}, {...action.data})
        }
        default: {
            return state;
        }
    }
}

export default lastphone;
