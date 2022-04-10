import React, {useCallback, useRef, useState} from 'react';
import ShippingTable from "./ShippingTable/ShippingTable";
import Map from "./ShippingMap/Map";
import {Col, Row} from "antd";
import {useSelector} from "react-redux";

import s from './shipping.module.css'

const Shipping = () => {
    const selectedOrder = useSelector(state => state.shippingReducer.selectedOrder);

    const [isResizing, setIsResizing] = useState(false);

    const sizeTableRef = useRef();
    const sizeMapRef = useRef();
    const formRef = useRef();

    let maxWidth = 50;
    const mouseDown = useCallback(() => {
        function onMouseMove(e) {
            e.preventDefault();
            setIsResizing(true);
            maxWidth += e.movementX / 20;
            if (maxWidth <= 90 && maxWidth >= 10) {
                sizeTableRef.current.style.maxWidth = maxWidth + '%';
                sizeTableRef.current.style.flex = `0 0 ${maxWidth}%`;

                sizeMapRef.current.style.maxWidth = `${100 - maxWidth}%`;
                sizeMapRef.current.style.flex = `0 0 ${100 - maxWidth}%`;
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
        <Row ref={formRef}>
            <Col span={12} ref={sizeTableRef}>
                <ShippingTable/>
                <div onMouseDown={mouseDown} className={s.resize}/>
            </Col>
            <Col span={12} ref={sizeMapRef}>
                <Map isResizing={isResizing} setIsResizing={setIsResizing} selectedOrder={selectedOrder}/>
            </Col>
        </Row>
    );
};

export default Shipping;
