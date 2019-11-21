import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import mainReducer from './store/reducers/mainReducer';
import reduxThunk from 'redux-thunk';
import history from './global/history';

const store = createStore(mainReducer, applyMiddleware(reduxThunk));

const app = (
    <Provider store={store}>
        <Router history = {history}>
            <App />
        </Router>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
