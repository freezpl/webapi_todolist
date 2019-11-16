import React from 'react'
import './AuthLayout.css'

const AppLayout = ({children}) => {
    return(
        <div className="auth">
            {children}
        </div>
    );
} 

export default AppLayout;
