import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import {createStore} from "redux";
import authReducer from "./store/reducers/auth";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

const rootReducer = combineReducer({
  auth: authReducer
});

const store = createStore(reducer);

ReactDOM.render(<Provide store = {store}><App/></Provide>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
