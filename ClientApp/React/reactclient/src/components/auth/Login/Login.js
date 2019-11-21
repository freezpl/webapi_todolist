import React, {Component} from 'react';
import './login.css';
import {connect} from 'react-redux';
import {AuthActionCreator} from '../../../store/actions/authActionCreator'

class Login extends Component{
    
    // constructor(props){
    //     super(props);
    //     this.form = React.createRef();
    // }
    
    state = {
        email: 'a@a.ua',
        password: '123456'
    }

    submitHandler = event =>{
        event.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    emailChange = (event)=>{
        this.setState({email: event.target.value});
    }

    passChange = (event)=>{
        this.setState({password: event.target.value});
    }

    render(){
        return(
            <div className="login">
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                   <input id="email" className="form-control" type="text" value={this.state.email} onChange={this.emailChange}/>
                   </div>
                   <div className="form-group">
                   <label htmlFor="pass">Password</label>
                   <input id="pass" className="form-control" type="password" value={this.state.password} onChange={this.passChange}/>
                   </div>
                   <button type="button" className="btn btn-primary" onClick={this.submitHandler}>ddddd</button>
                </form>
            </div>
        );
    }
}

function mapDispatchtoProps(dispatch){
    return {
        login: (email, password) => dispatch(AuthActionCreator.login(email, password))
    }
}

export default connect(null, mapDispatchtoProps)(Login);