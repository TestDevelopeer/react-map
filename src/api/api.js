export const shippingAPI = {
    getOrders() {
        return fetch('orders.json');
    },
    getAddress() {
        return fetch('address.json');
    }
}