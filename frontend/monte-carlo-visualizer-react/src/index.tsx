import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/app/App';
import reducers from './store/reducers/application-state';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={createStore(reducers)}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
