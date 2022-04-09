import {all} from "redux-saga/effects"
import {ordersWatcher} from "./ordersSaga";

export function* rootWatcher() {
    yield all([ordersWatcher()])
}