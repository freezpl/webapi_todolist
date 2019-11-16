import React, {Component} from 'react';
import './App.css';
//import {Route, Switch, Redirect} from 'react-router'
//import Tasks from './components/dashboard/tasks/tasks'
import AppRoutes from './router/Routes';

class App extends Component{

render(){
    return (
          <div className="App">
            <AppRoutes />
          </div>
        );
    }
}

export default App;
