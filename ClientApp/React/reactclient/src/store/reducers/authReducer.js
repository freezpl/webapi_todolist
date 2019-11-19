import {LOGIN} from '../actions/actionTypes'

const initState = {
    isLogged: false,
};

export default function authReducer(storeState= initState, action){
    switch (action.type) {
        case LOGIN:
            console.log(action.value);
            return storeState;
    
        default:
            return storeState;
    }
}
