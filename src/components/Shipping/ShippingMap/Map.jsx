import React, {useEffect, useRef} from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import {useSelector} from "react-redux";

import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import s from './map.module.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const L = require('leaflet');
require('leaflet-routing-machine');

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const TILE_LAYER_ATTRIBUTION = "Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL";
const TILE_LAYER_URL = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

const Map = ({isResizing, selectedOrder}) => {
    const btnRef = useRef();

    const routingControl = L.Routing.control({
        fitSelectedRoutes: true,
        routeWhileDragging: false,
        draggableWaypoints: false,
        lineOptions : {
            addWaypoints: false
        },
        createMarker: function(i, wp, nWps) {
            if (selectedOrder !== null) {
                let cityStart = selectedOrder.cityStart.country + ', ' + selectedOrder.cityStart.city + ', ' + selectedOrder.cityStart.address;
                let cityEnd = selectedOrder.cityEnd.country + ', ' + selectedOrder.cityEnd.city + ', ' + selectedOrder.cityEnd.address;
                return L.marker(wp.latLng)
                    .bindPopup(i === 0 ? cityStart : cityEnd);
            }
        }
    });

    const MapComponent = () => {
        let map = useMap();
        if (selectedOrder !== null) {
            btnRef.current.click();
            routingControl.addTo(map);
            console.log(routingControl.getWaypoints().length)
            routingControl.setWaypoints([
                L.latLng(selectedOrder.cityStart.lat, selectedOrder.cityStart.long),
                L.latLng(selectedOrder.cityEnd.lat, selectedOrder.cityEnd.long)
            ]);
            routingControl.route(map);
            map.invalidateSize();
        }

        useEffect(() => {
            setTimeout(function (){
                map.invalidateSize();
            }, 100);
        }, []);

        useEffect(() => {
            setTimeout(function (){
                map.invalidateSize();
            }, 100);
        }, [isResizing]);

        return null;
    }

    const clear = () => {
        routingControl.spliceWaypoints(0,2)
        console.log(routingControl.getWaypoints().length)
    }


    return (
        <>
            <button ref={btnRef} hidden onClick={clear}></button>
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

export default Map;
