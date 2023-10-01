import { useEffect, useRef, useState } from 'react';
import Segments from './Segments';
import '../sheets/List.css'
import React from 'react';

interface SearchProps {
    darkmode: boolean;
    data: [];
    isLoading: boolean;
    setIsLoading: (n: boolean) => void;
    setChosenSegment: (i:number) => void;
    chosenSegment: number;
}

function List({darkmode, data, setChosenSegment, chosenSegment, isLoading, setIsLoading}: SearchProps) 
{

    const dark = darkmode ? 'darkmode_list' : '';
    const scrolly = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsLoading(false);
        if (scrolly.current) {
            scrolly.current.scrollTop = 0;
        }
    }, [data])

    return (
        <div ref={scrolly} className={`listcontainer transition_list ${dark}`}>
            {data.map((segment_data, index) => 
                <Segments 
                darkmode={darkmode} 
                segment_data={segment_data} 
                key={index} 
                index={index}
                setChosenSegment={setChosenSegment}
                ></Segments>
            )}
        </div>
    );
}

export default List;


