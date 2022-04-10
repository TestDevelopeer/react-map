import React, {useEffect, useRef, useState} from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import {Button, Modal, Result} from 'antd';
import {selectOrder} from "../../../redux/shipping-reducer";
import {useDispatch, useSelector} from "react-redux";

import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import s from './map.module.css';

const L = require('leaflet');
require('leaflet-routing-machine');

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const TILE_LAYER_ATTRIBUTION = "ShippingMap tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL";
const TILE_LAYER_URL = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

const ShippingMap = ({isResizing}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const selectedOrder = useSelector(state => state.shippingReducer.selectedOrder);
    const btnRef = useRef();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const routingControl = L.Routing.control({
        fitSelectedRoutes: true,
        routeWhileDragging: false,
        draggableWaypoints: false,
        lineOptions: {
            addWaypoints: false
        },
        createMarker: function (i, wp) {
            if (selectedOrder !== null) {
                let cityStart = `${selectedOrder.cityStart.country}, ${selectedOrder.cityStart.city}, ${selectedOrder.cityStart.address}`;
                let cityEnd = `${selectedOrder.cityEnd.country}, ${selectedOrder.cityEnd.city}, ${selectedOrder.cityEnd.address}`;
                return L.marker(wp.latLng).bindPopup(i === 0 ? cityStart : cityEnd);
            }
        }
    });

    const MapComponent = () => {
        btnRef.current.click();
        const map = useMap();
        map.invalidateSize();
        const dispatch = useDispatch();

        routingControl.addTo(map).on('routingerror', function (e) {
            showModal();
            dispatch(selectOrder(null));
        });

        useEffect(() => {
            if (selectedOrder !== null) {
                routingControl.setWaypoints([
                    L.latLng(selectedOrder.cityStart.lat, selectedOrder.cityStart.long),
                    L.latLng(selectedOrder.cityEnd.lat, selectedOrder.cityEnd.long)
                ]);
                routingControl.route(map);
                map.invalidateSize();
            }
        }, [selectedOrder]);

        useEffect(() => {
            map.invalidateSize();
        }, [isResizing]);

        return null;
    }

    const clear = () => {
        routingControl.spliceWaypoints(0, 2);
    }

    return (
        <>
            <button ref={btnRef} hidden onClick={clear}/>
            <Modal
                title="Error"
                visible={isModalVisible}
                onOk={handleOk}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        OK
                    </Button>
                ]}
            >
                <Result
                    status="error"
                    title="Route error"
                    subTitle="An error occurred while building the route, try another route."
                />
            </Modal>
            <MapContainer center={[51.505, -0.09]} zoom={8} className={s.map}>
                <TileLayer
                    attribution={TILE_LAYER_ATTRIBUTION}
                    url={TILE_LAYER_URL}
                />
                <MapComponent/>
            </MapContainer>
        </>
    );
};

export default ShippingMap;
