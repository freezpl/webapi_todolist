import React from 'react';
import {Route} from 'react-router';

const AppRoute = ({component:Component, layout:Layout, ...rest}) => {
    return (
        <Route {...rest}
        render={props => (
            <Layout>
                <Component {...props}/>
            </Layout>
        )}
        />
    );
}

export default AppRoute;