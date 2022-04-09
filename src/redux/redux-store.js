import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import shippingReducer from "./shipping-reducer";
import {rootWatcher} from "../saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    shippingReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);