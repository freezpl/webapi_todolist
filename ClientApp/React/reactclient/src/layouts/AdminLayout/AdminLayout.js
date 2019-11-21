import React from 'react'
import './AdminLayout.css'
import {Link} from 'react-router-dom'

const AppLayout = ({children}) => {
    return(
        <div className="admin">
            <div className="container">
            <div className="row">  
            <h3>Admin Layout</h3>
            </div>

            <div className="row">  
            <ul>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/test">Test link 2</Link>
          </li>
        </ul>
            </div>
            
            {children}
            </div>
        </div>
    );
} 

export default AppLayout;