import React, {useEffect, useState} from 'react';
import {Table, Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {changeAddressFrom, changeAddressTo, getAddress, getOrders, selectOrder} from "../../../redux/shipping-reducer";

const {Option} = Select;

const ShippingTable = () => {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const orders = useSelector(state => state.shippingReducer.orders);
    const address = useSelector(state => state.shippingReducer.address);
    const selectedOrder = useSelector(state => state.shippingReducer.selectedOrder);

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getAddress());
    }, []);

    useEffect(() => {
        if (orders.length > 0) {
            setIsLoading(false);
        }
    }, [orders]);

    const handleChangeFrom = (value) => {
        dispatch(changeAddressFrom(address[value]));
    }

    const handleChangeTo = (value) => {
        dispatch(changeAddressTo(address[value]));
    }

    const columns = [
        {
            title: 'Address from',
            dataIndex: 'cityStart',
            render: (from) => {
                return (
                    <Select
                        disabled={!selectedOrder || selectedOrder.key !== from.key}
                        defaultValue={`${from.country}, ${from.city}, ${from.address}`}
                        onChange={handleChangeFrom}
                    >
                        {
                            address.length > 1 && address.map((addr, index) => {
                                return (
                                    <Option
                                        key={`${from.key}_from_${addr.key}`}
                                        value={index}
                                    >
                                        {`${addr.country}, ${addr.city}, ${addr.address}`}
                                    </Option>
                                );
                            })
                        }
                    </Select>
                );
            },
            width: 200,
            minWidth: 100
        }, {
            title: 'Address to',
            dataIndex: 'cityEnd',
            render: (to) => {
                return (
                    <Select
                        disabled={!selectedOrder || selectedOrder.key !== to.key}
                        defaultValue={`${to.country}, ${to.city}, ${to.address}`}
                        onChange={handleChangeTo}
                    >
                        {
                            address.length > 1 && address.map((addr, index) => {
                                return (
                                    <Option key={`${to.key}_to_${addr.key}`}
                                            value={index}
                                    >
                                        {`${addr.country}, ${addr.city}, ${addr.address}`}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                );
            },
            width: 200,
            minWidth: 120
        }, {
            title: 'Email',
            dataIndex: 'email',
            width: 200,
            minWidth: 120
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            width: 200,
            minWidth: 120
        }, {
            title: 'Full Name',
            dataIndex: 'fullName',
            width: 200,
            minWidth: 120
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            dispatch(selectOrder(selectedRows[0]));
        }
    };

    return (
        <Table
            size={"small"}
            scroll={{x: '1500px'}}
            loading={isLoading}
            bordered={true}
            rowSelection={{
                type: 'radio',
                ...rowSelection,
            }}
            columns={columns}
            dataSource={orders}
            pagination={false}
        />
    );
};

export default ShippingTable;
