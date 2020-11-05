import React from 'react';
import { Map, TileLayer } from "react-leaflet";
import { showDataOnMap } from '../../../util';
import './WorldMap.css';


function WorldMap ({data, type, center, zoom}) {

        return (
            <div className="map">
            <Map center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                 />
                 {showDataOnMap(data, type)}
            </Map>
            </div>
        )

}

export default WorldMap
