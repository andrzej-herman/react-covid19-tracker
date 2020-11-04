import React from 'react';
import { Map, TileLayer } from "react-leaflet";
import './WorldMap.css';


function WorldMap ({countries, center, zoom}) {

        return (
            <div className="map">
            <Map center={center} zoom={zoom}>
                <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                 />
            </Map>
            </div>
        )

}

export default WorldMap
