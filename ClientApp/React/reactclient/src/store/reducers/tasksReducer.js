import {FETCH_TASKS} from '../actions/actionTypes'

const initState = {
    tasks: [],
};

export default function tasksReducer(state = initState, action){
    switch (action.type) {
        case FETCH_TASKS:
            return {...state, tasks: action.value};
            
        default:
            return state;
    }
}
