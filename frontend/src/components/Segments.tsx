import { useEffect, useRef, useState } from 'react';
import '../sheets/Segments.css'
import React from 'react';

interface SearchProps {
    darkmode: boolean;
    segment_data: any;
}

function Segments({darkmode, segment_data}: SearchProps) 
{

    const dark = darkmode ? 'darkmode_list' : '';

    return (
        <button className={'segment'}>
            <p>segment name: {segment_data[0].name}</p>
            <p>you gotta be in the top  {100 - segment_data[1]} % to get the KOM</p>
        </button>
    );
}

export default Segments;


