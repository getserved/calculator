import {createStore, combineReducers} from 'redux';
import * as reducer from '../Reducer/reducer';

let store = createStore(
    combineReducers(reducer)
);

export default store;
