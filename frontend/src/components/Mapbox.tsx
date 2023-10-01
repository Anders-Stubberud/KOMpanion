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
import { getCenter } from 'ol/extent';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import decodePolyline from '../utils/decode_polyline';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { wait } from '@testing-library/user-event/dist/utils';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import { Point } from 'ol/geom';

interface SearchProps {
    darkmode: boolean;
    data: any [];
    chosenSegment: number;
    setChosenSegment: (n:number) => void;
    coord: number[]|string;
}

function Mapbox({darkmode, data, chosenSegment, coord, setChosenSegment}: SearchProps) {

    const [render, updateRender] = useState(true);
    const [previousData, setPreviousData] = useState<any>([null]);
    const dark = darkmode ? 'darkmode_mapbox' : '';

    useEffect(() => {
          if (previousData != data) {
            setChosenSegment(0);
            setPreviousData(data);
          }
          let lineString = undefined;
          let lineExtent = [-122518, 5683416, 3300212, 8528073];;
          let coords_render = [2500000, 7500000];

          const startMarkerStyle = new Style({
            image: new Circle({
              radius: 7.5,
              fill: new Fill({ color: 'lime' }),
            }),
          });
          
          const finishMarkerStyle = new Style({
            image: new Circle({
              radius: 7.5,
              fill: new Fill({ color: 'red' }),
            }),
          });
          let decoded: number[][] = [];
          if (! render && data.length!=0) {
            decoded = decodePolyline(data[chosenSegment][0].map.polyline);
            lineString = new LineString(decoded.map(coord => fromLonLat(coord)));
            lineExtent = lineString.getExtent();
            coords_render = lineString['flatCoordinates'].slice(0, 2); 
          }
          else {
            updateRender(false);
          }

          const feature = new Feature({geometry: lineString,});

          const lineStyle = new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 5,      
            }),
          });
      
          feature.setStyle(lineStyle);

          const vectorSource = new VectorSource({features: [feature]});

          const vectorLayer = new VectorLayer({source: vectorSource});

          const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer
            ],
            view: new View({
                zoomFactor: 5,
                center: coords_render,
                zoom: 5
            }),
          });

          const view = map.getView();
          if (!(! render && data.length!=0)) {
            view.fit(lineExtent, { padding: [10, 10, 10, 10] });
            view.setZoom(1.5);
          }
          else {
            const expansionAmount = 2000; 
            lineExtent[0] -= expansionAmount; 
            lineExtent[1] -= expansionAmount; 
            lineExtent[2] += expansionAmount; 
            lineExtent[3] += expansionAmount;
            view.fit(lineExtent, { padding: [10, 10, 10, 10] });
            const startFeature = new Feature({geometry: new Point(fromLonLat(decoded[0])),});
            startFeature.setStyle(startMarkerStyle);
            const finishFeature = new Feature({geometry: new Point(fromLonLat(decoded[decoded.length - 1])),});
            finishFeature.setStyle(finishMarkerStyle);
            const markersSource = new VectorSource({features: [startFeature, finishFeature],});
            const markersLayer = new VectorLayer({source: markersSource});
            map.addLayer(markersLayer);
          }

          return () => map.dispose();
    }, [data, chosenSegment]);

    return (
        <div className={`mapbox transition_mapbox ${dark}`}>
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
}

export default Mapbox;
