import {combineReducers} from 'redux';
import authReducer from './authReducer';
import tasksReducer from './tasksReducer';


export default combineReducers({
    auth: authReducer, 
    tasks: tasksReducer,
});