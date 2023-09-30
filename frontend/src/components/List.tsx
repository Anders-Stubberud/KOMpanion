import { useEffect, useRef, useState } from 'react';
import Segments from './Segments';
import '../sheets/List.css'
import React from 'react';

interface SearchProps {
    darkmode: boolean;
    data: [];
}

function List({darkmode, data}: SearchProps) 
{

    const dark = darkmode ? 'darkmode_list' : '';

    return (
        <div className={`listcontainer transition_list ${dark}`}>
            {data.map((segment_data, index) => 
                <Segments darkmode={darkmode} segment_data={segment_data} key={index}></Segments>
            )}
        </div>
    );
}

export default List;


