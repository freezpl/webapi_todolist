import React, {Component} from 'react';
import './login.css'

class Login extends Component{
    
    state = {
        email: 'eeee',
        password: ''
    }


    submitHandler = event =>{
        console.log(event);
        event.preventDefault();
    }

    emailChange = (event)=>{
        let name = event.target.value;
        this.setState((state)=>{
           return {email: name}
        });
    }

    render(){
        return(
            <div className="login">
                <form onSubmit={this.submitHandler}>
                   <input type="text" value={this.state.email} onChange={this.emailChange}/>
                   <button type="button" className="btn btn-primary">ddddd</button>
                </form>
            </div>
        );
    }
}

export default Login;