import L from "leaflet";
import {createControlComponent} from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({selectedOrder}) => {
    if (selectedOrder.length > 0) {
        return L.Routing.control({
            waypoints: [
                L.latLng(selectedOrder[0].cityStart.lat, selectedOrder[0].cityStart.long),
                L.latLng(33.50546582848033, 36.29547681726967)
            ]
        });
    }
    return L.Routing.control({
        waypoints: []
    });
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;