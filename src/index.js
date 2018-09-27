import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './Style/index.css'
import store from './Redux/Store/store';
import route from './Router/router';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    //  <App/>,
    <Provider store={store}>
        {route}
    </Provider>,
    document.getElementById('root')
);


registerServiceWorker();
