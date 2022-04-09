export const ASYNC_GET_ORDERS = "ASYNC_GET_ORDERS";
export const SET_ORDERS = "SET_ORDERS";
export const SELECT_ORDER = "SELECT_ORDER";
export const ASYNC_GET_ADDRESS = "ASYNC_GET_ADDRESS";
export const SET_ADDRESS = "SET_ADDRESS";
export const CHANGE_ADDRESS_FROM = "CHANGE_ADDRESS_FROM";
export const CHANGE_ADDRESS_TO = "CHANGE_ADDRESS_TO";


const initialState = {
    orders: [],
    selectedOrder: null,
    address: []
}

export default function shippingReducer(state = initialState, action) {
    switch(action.type) {
        case SET_ORDERS: {
            return {...state, orders: action.orders}
        }
        case SELECT_ORDER: {
            return {...state, selectedOrder: action.order}
        }
        case SET_ADDRESS: {
            return {...state, address: action.address}
        }
        case CHANGE_ADDRESS_FROM: {
            return {...state, selectedOrder: {...state.selectedOrder, cityStart: action.cityStart}}
        }
        case CHANGE_ADDRESS_TO: {
            return {...state, selectedOrder: {...state.selectedOrder, cityEnd: action.cityEnd}}
        }
        default: {
            return state;
        }
    }
}

export const setOrders = (orders) => ({type: SET_ORDERS, orders});
export const getOrders = () => ({type: ASYNC_GET_ORDERS});
export const selectOrder = (order) => ({type: SELECT_ORDER, order});
export const setAddress = (address) => ({type: SET_ADDRESS, address});
export const getAddress = () => ({type: ASYNC_GET_ADDRESS});
export const changeAddressFrom = (cityStart) => ({type: CHANGE_ADDRESS_FROM, cityStart});
export const changeAddressTo = (cityEnd) => ({type: CHANGE_ADDRESS_TO, cityEnd});