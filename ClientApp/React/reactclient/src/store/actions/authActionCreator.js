import {LOGIN} from './actionTypes'

export class AuthActionCreator {
    static login(login, password){
        console.login(login);
        return({type:LOGIN, value: {login, password}});
    }
}