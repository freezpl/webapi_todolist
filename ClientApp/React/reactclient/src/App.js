import React, {Component} from 'react';
import './App.css';

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