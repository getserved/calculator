import React from 'react';
import {BrowserRouter as Router,Route,NavLink as Link} from 'react-router-dom';
import '../Style/route.css'

import CalcUI from '../Redux/Containers/calculator';

//import ErrorBoundary from '../Error/errorboundary';

const RouteConfig = (
    <Router>
        <div>
            <ul className='calc-menu'>
                <li><Link to="/calculator" >My Calculator</Link></li>
            </ul>

            <Route path="/calculator" component={CalcUI} exact/>

        </div>
    </Router>
);
export default RouteConfig;
