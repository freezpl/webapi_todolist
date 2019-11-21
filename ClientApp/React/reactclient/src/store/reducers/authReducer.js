import {LOGIN} from '../actions/actionTypes'

const initState = {
    isLogged: false,
};

export default function authReducer(storeState = initState, action){
    switch (action.type) {
        case LOGIN:
            return {...storeState, isLogged: action.value};
    
        default:
            return storeState;
    }
}
