import {put, takeEvery, call} from "redux-saga/effects"
import {
    ASYNC_GET_ADDRESS,
    ASYNC_GET_ORDERS,
    SELECT_ORDER,
    selectOrder,
    setAddress,
    setOrders
} from "../redux/shipping-reducer";
import {shippingAPI} from '../api/api';

const fetchOrdersFromApi = () => shippingAPI.getOrders();
const fetchAddressFromApi = () => shippingAPI.getAddress();

function* ordersWorker() {
    const data = yield call(fetchOrdersFromApi);
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setOrders(json));
}

function* addressWorker() {
    const data = yield call(fetchAddressFromApi);
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setAddress(json));
}

export function* ordersWatcher() {
    yield takeEvery(ASYNC_GET_ORDERS, ordersWorker);
    yield takeEvery(SELECT_ORDER, selectOrder);
    yield takeEvery(ASYNC_GET_ADDRESS, addressWorker);
}