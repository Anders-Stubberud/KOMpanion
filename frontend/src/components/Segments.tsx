import { useEffect, useRef, useState } from 'react';
import '../sheets/Segments.css'
import React from 'react';

interface SearchProps {
    darkmode: boolean;
    segment_data: any;
    index: number;
    setChosenSegment: (i:number) => void;
}

function Segments({darkmode, segment_data, index, setChosenSegment}: SearchProps) 
{

    const dark = darkmode ? 'darkmode_list' : '';

    function polylineNewSegment() {
        setChosenSegment(index)
    }

    return (
        <button className={'segment'} onClick={polylineNewSegment}>
            <div className='segment_div'>
                <p><span className='bolds'>Segment name: </span>{segment_data[0].name}</p>
                <div className='spacer'></div>
                <p><span className='bolds'>Difficulty: </span>must beat {segment_data[1][0]}% of the database</p>
                <div className='spacer'></div>
                <p><span className='bolds'>Effort: </span>
                {segment_data[1][1][0]}W for {segment_data[1][1][1]} to take KOM with 5% time margin
                </p>
                <div className='spacer'></div>
                <p><span className='bolds'>Segment link: </span>
                <a href={`https://www.strava.com/segments/${segment_data[0].id}`} target="_blank" rel="noopener noreferrer">
                    {`https://www.strava.com/segments/${segment_data[0].id}`}
                </a>
                </p>
            </div>
        </button>
    );
}

export default Segments;


