import { useEffect, useRef, useState } from 'react';
import Segments from './Segments';
import '../sheets/List.css'
import React from 'react';

interface SearchProps {
    darkmode: boolean;
    data: [];
    active: boolean,
    isLoading: boolean;
    setIsLoading: (n: boolean) => void;
    setChosenSegment: (i:number) => void;
    chosenSegment: number;
}

function List({darkmode, data, setChosenSegment, chosenSegment, isLoading, setIsLoading, active}: SearchProps) 
{

    const dark = darkmode ? 'darkmode_list' : '';
    const darkm = darkmode ? 'darkmode_list_potential' : '';
    const scrolly = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsLoading(false);
        if (scrolly.current) {
            scrolly.current.scrollTop = 0;
        }
    }, [data])

    return (
        <div ref={scrolly} className={`listcontainer transition_list ${dark}`}>
            {data.length!=0 ?  
                (data.map((segment_data, index) => 
                    <Segments 
                    darkmode={darkmode} 
                    segment_data={segment_data} 
                    key={index} 
                    index={index}
                    setChosenSegment={setChosenSegment}
                    ></Segments>
                )) 
            :   !active?
                (
                    <h3 className={`transition_potential ${darkm}`}>
                        Enter location to view segments
                    </h3>
                )
            :   (
                    <h3 className={`transition_potential ${darkm}`}>
                        No segments in given bounds
                    </h3>
                )
            }
        </div>
    );
}

export default List;


