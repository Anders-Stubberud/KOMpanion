import { useEffect, useState } from 'react';
import '../sheets/List.css'
import axios from 'axios';
import React from 'react';

interface SearchProps {
    darkmode: boolean;
}

function List({darkmode}: SearchProps) 
{

    const dark = darkmode ? 'darkmode_list' : '';

    const [data, setData] = useState([{}]);

    React.useEffect(() => {
        axios.get('http://localhost:5000/data').then((response) => {
          setData(response.data);
          console.log(response.data)
        });
      }, []);

    return (
        <div className={`listcontainer transition_list ${dark}`}>

        </div>
    );
}

export default List;

function setPost(data: any) {
    throw new Error('Function not implemented.');
}
