import React from 'react';
import '../sheets/MapBox.css';

interface SearchProps {
    darkmode: boolean;
}

function Mapbox({darkmode}: SearchProps) 
{

    const dark = darkmode ? 'darkmode_mapbox' : '';

    return (
        <div className={`mapbox ${dark}`}>
        </div>
    );
}

export default Mapbox;