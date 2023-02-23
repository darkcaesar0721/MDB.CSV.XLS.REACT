import {INIT_EMAIL_DATA} from "../actionTypes";

const initialState = {};

function email(state = initialState, action) {
    switch (action.type) {
        case INIT_EMAIL_DATA: {
            return Object.assign({...state}, {...action.data})
        }
        default: {
            return state;
        }
    }
}

export default email;
