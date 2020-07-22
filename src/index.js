import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';

import store from 'store';
import history from 'router';

import 'semantic-ui-css/semantic.min.css';
import 'styles/index.scss';

import * as serviceWorker from './serviceWorker';

import App from './App';

render(
    <Router history={history}>
    <Provider store={store}>
        <App/>
    </Provider>
    </Router>,
    document.getElementById('root'),
);

serviceWorker.unregister();

