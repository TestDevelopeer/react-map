import React, {useCallback, useRef, useState} from 'react';
import ShippingTable from "./ShippingTable/ShippingTable";
import Map from "./ShippingMap/Map";
import s from './shipping.module.css'
import {Col, Row} from "antd";
import L from "leaflet";
import {useSelector} from "react-redux";

const Shipping = ({orders}) => {
    const [isResizing, setIsResizing] = useState(false);

    const sizeTableRef = useRef();
    const sizeMapRef = useRef();
    const formRef = useRef();

    const selectedOrder = useSelector(state => state.shippingReducer.selectedOrder);

    let maxWidth = 50;

    const handler = useCallback(() => {
        function onMouseMove(e) {
            e.preventDefault();
            setIsResizing(true);
            maxWidth += e.movementX / 20;
            if (maxWidth <= 90 && maxWidth >= 10) {
                sizeTableRef.current.style.maxWidth = maxWidth + '%';
                sizeTableRef.current.style.flex = '0 ' + '0 ' +  maxWidth + '%';
                sizeMapRef.current.style.maxWidth = (100 - maxWidth) + '%';
                sizeMapRef.current.style.flex = '0 ' + '0 ' + (100 - maxWidth) + '%';
            }
        }
        function onMouseUp() {
            setIsResizing(false);
            formRef.current.removeEventListener("mousemove", onMouseMove);
            formRef.current.removeEventListener("mouseup", onMouseUp);
        }
        formRef.current.addEventListener("mousemove", onMouseMove);
        formRef.current.addEventListener("mouseup", onMouseUp);
    }, []);

    return (
        <Row ref={formRef} className={s.shippingContainer}>
            <Col span={12} ref={sizeTableRef} className={s.sizeBlock}>
                <ShippingTable orders={orders}/>
                <div onMouseDown={handler} className={s.resize}/>
            </Col>
            <Col span={12} ref={sizeMapRef} className={s.sizeBlock}>
                <Map isResizing={isResizing} setIsResizing={setIsResizing} selectedOrder={selectedOrder}/>
            </Col>
        </Row>
    );
};

export default Shipping;
