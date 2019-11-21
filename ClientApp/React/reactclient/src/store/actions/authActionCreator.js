import {LOGIN} from './actionTypes'
import axios from '../../global/axios'
import history from './../../global/history'

export class AuthActionCreator {
    static login(email, password){
        return (dispatch) =>{
            axios.post('api/auth', {email, password}).then((data)=>{
                localStorage.setItem('token', data.data.access_token);
                dispatch({type:LOGIN, value: true});
                history.push('/tasks');
            }).catch((e)=>{
                console.error(e);
            });
        }          
    }
}