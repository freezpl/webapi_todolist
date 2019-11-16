import React, {Component} from 'react'
import { Switch, Redirect} from 'react-router'
import AppRoute from './AppRoute'
import AuthLayout from '../layouts/AuthLayout/AuthLayout'

import Login from '../components/auth/Login/Login'
//import Tasks from '../components/dashboard/tasks/tasks'

export default class AppRoutes extends Component{

  render(){
    return (
      <Switch>
        <AppRoute path="/" component={Login} layout={AuthLayout}/>
        <Redirect to="/" />
      </Switch>
    );
  }
}