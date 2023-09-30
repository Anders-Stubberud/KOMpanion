import React, { useEffect, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import '../sheets/MapBox.css';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import { getCenter } from 'ol/extent'; // Import getCenter from ol/extent
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import decodePolyline from '../utils/decode_polyline';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

interface SearchProps {
    darkmode: boolean;
    data: any;
}

function Mapbox({ darkmode, data }: SearchProps) {
    const [render, updateRender] = useState(true);
    const setRender = () => {
        updateRender(false);
    }
    const dark = darkmode ? 'darkmode_mapbox' : '';

    useEffect(() => {
          if (! render) {
          console.log('IKKE render, med vektorer etc');

          const decoded = decodePolyline(data[0][0].map.polyline);

          const lineString = new LineString(decoded.map(coord => fromLonLat(coord)));

          console.log(lineString);

          const feature = new Feature({
              geometry: lineString,
          });

          const lineStyle = new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 5,      
            }),
          });
      
          feature.setStyle(lineStyle);

          const vectorSource = new VectorSource({
            features: [feature]
          });

          const vectorLayer = new VectorLayer({
            source: vectorSource
          });

          const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer
            ],
            view: new View({
                zoomFactor: 500,
                center: [2500000, 7500000],
                zoom: 0.3825
            }),
          });
          return () => map.dispose();
        }
    }, [data]);

    useEffect(() => {
      console.log('render, uten vector');
      const map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        view: new View({
            zoomFactor: 500,
            center: [2500000, 7500000],
            zoom: 0.3825
        }),
      });
      setRender();
      return () => map.dispose();
    }, [])

    return (
        <div className={`mapbox transition_mapbox ${dark}`}>
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
}

export default Mapbox;
