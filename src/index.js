import React from 'react';
import ReactDOM from 'react-dom/client';

import {Provider} from "react-redux";
import axios from "axios";

import {store} from "./redux/store"

import App from './App';


axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
