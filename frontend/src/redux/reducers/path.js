import {INIT_PATH_DATA} from "../actionTypes";

const initialState = {};

function path(state = initialState, action) {
    switch (action.type) {
        case INIT_PATH_DATA: {
            return Object.assign({...state}, {...action.data})
        }
        default: {
            return state;
        }
    }
}

export default path;
