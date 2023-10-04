import { useEffect, useRef, useState } from 'react';
import { Heading } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import Segments from './Segments';
import '../sheets/List.css'
import '../index.css'
import React from 'react';
import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

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
        <div id='scrolldiv' ref={scrolly} className={`listcontainer transition_list ${dark}`}>
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
                    (window.innerWidth / window.innerHeight > 1) ? (
                    <Stack paddingTop={1.75} paddingRight={4} spacing={5}>
                        <Skeleton height='32'>
                        </Skeleton>
                        <Skeleton
                        marginTop={2.75}
                        marginBottom={2.75}
                        height='32'
                        color='grey'
                        fadeDuration={1}
                        >
                        </Skeleton>
                        <Skeleton
                        height='32'
                        fadeDuration={4}
                        color='grey'
                        >
                        </Skeleton>
                    </Stack>
                    )
                    :
                    (
                        <Skeleton
                        marginTop={3}
                        borderRadius={28}
                        height='36'
                        color='grey'
                        fadeDuration={1}
                        >
                        </Skeleton>
                    )
                )
            :   (
                    <Heading
                     as='h4' size='md'
                     className={`transition_potential leftalign ${darkm}`}
                     >
                        No segments in given bounds
                     </Heading>
                )
            }
        </div>
    );
}

export default List;


