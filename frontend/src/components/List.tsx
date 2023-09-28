import { useEffect, useRef, useState } from 'react';
import '../sheets/List.css'
import React from 'react';

interface SearchProps {
    darkmode: boolean;
    data: any;
}

function List({darkmode, data}: SearchProps) 
{

    const dark = darkmode ? 'darkmode_list' : '';

    return (
        <div className={`listcontainer transition_list ${dark}`}>

        </div>
    );
}

export default List;

function setPost(data: any) {
    throw new Error('Function not implemented.');
}
