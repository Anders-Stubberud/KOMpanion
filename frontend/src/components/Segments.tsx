import { useEffect, useRef, useState } from 'react';
import { Text } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
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

    const dark = darkmode ? 'darkmode_segment' : '';
    const darkm = darkmode ? 'dark_border' : '';
    const d = 'dark_text';

    function polylineNewSegment() {
        setChosenSegment(index)
    }

    return (
        <button className={`segment`} onClick={polylineNewSegment}>
            <Box className={`segment_div ${darkm} ${d}`}>
                <Text className={`${dark} ${d}`}><span className='bolds'>Segment name: </span>{segment_data[0].name}</Text>
                <div className='spacer'></div>
                <Text className={`${dark} ${d}`}><span className='bolds'>Difficulty: </span>{segment_data[1][0]}% relative power</Text>
                <div className='spacer'></div>
                <Text className={`${dark} ${d}`}><span className='bolds'>Effort: </span>
                <span>average </span>
                {segment_data[1][1][0]}W for {segment_data[1][1][1]} to take the KOM with a 5% time margin
                </Text>
                <div className='spacer'></div>
                <Text className={`${dark} ${d}`}><span className='bolds'>Segment link: </span>
                <a className='linky' href={`https://www.strava.com/segments/${segment_data[0].id}`} target="_blank" rel="noopener noreferrer">
                    {`https://www.strava.com/segments/${segment_data[0].id}`}
                </a>
                </Text>
            </Box>
        </button>
    );
}

export default Segments;


