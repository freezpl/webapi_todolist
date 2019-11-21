import React, {Component} from 'react'
import { Switch, Redirect} from 'react-router'
import AppRoute from './AppRoute'

import AuthLayout from '../layouts/AuthLayout/AuthLayout'
import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import Login from '../components/auth/Login/Login'
import Tasks from '../components/dashboard/tasks/tasks'
import Test from '../components/dashboard/test/test'


export default class AppRoutes extends Component{

  render(){
    return (
      <Switch>
        <AppRoute path="/" exact component={Login} layout={AuthLayout}/>
        <AppRoute path="/tasks" component={Tasks} layout={AdminLayout}/>
        <AppRoute path="/test" component={Test} layout={AdminLayout}/>
         <Redirect to="/404" /> 
      </Switch>
    );
  }
}