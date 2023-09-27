import React, { useEffect } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import '../sheets/MapBox.css';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';

interface SearchProps {
    darkmode: boolean;
}

function Mapbox({darkmode}: SearchProps) 
{

    const dark = darkmode ? 'darkmode_mapbox' : '';

    useEffect(() => {
        // Initialize the map
        const map = new Map({
          target: 'map', // ID of the HTML element to render the map
          layers: [
            new TileLayer({
              source: new OSM(), // OpenStreetMap as the base layer
            }),
          ],
          view: new View({
            zoomFactor: 500,
            center: [2500000, 7500000], // Initial map center coordinates
            zoom: 0.3825 // Initial zoom level
          }),
        });
    
        // Clean up when the component unmounts
        return () => map.dispose();
    }, []);

    return (
        <div className={`mapbox transition_mapbox ${dark}`}>
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
}

export default Mapbox;