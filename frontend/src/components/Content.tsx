import List from "./List";
import Header from "./Header";
import Mapbox from "./Mapbox";
import Search from "./Search";
import '../sheets/Content.css';
import React, { Dispatch, SetStateAction, useState } from "react";

interface SearchProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

function Content({darkmode, toggleDarkmode}:SearchProps) {

    const [data, updateData] = useState<[]>([]);
    const setData = (data: []) => {
        updateData(data);
    }

    const [isLoading, updateIsLoading] = useState<boolean>(false);
    const setIsLoading = (n: boolean) => {
        updateIsLoading(n);
    }

    const [chosenSegment, updateChosenSegment] = useState(0);
    const setChosenSegment = (i: any) => {
        console.log(i);
        updateChosenSegment(i);
    }

    const [coord, updateCoord] = useState<number[]|string>('');

    return (
        <div>
            <Header darkmode={darkmode} toggleDarkmode={toggleDarkmode}></Header>
            <Search
                data={data}
                darkmode={darkmode}
                setData={setData} 
                coord={coord}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                updateCoord={updateCoord}
                updateChosenSegment={updateChosenSegment}
            ></Search>
            <div className='mapbox-list'>
                <List 
                darkmode={darkmode} 
                data={data} 
                chosenSegment={chosenSegment} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setChosenSegment={setChosenSegment}
                ></List>
                <Mapbox 
                setChosenSegment={setChosenSegment} 
                darkmode={darkmode} data={data} 
                chosenSegment={chosenSegment} 
                coord={coord}
                ></Mapbox>
            </div>
        </div>
    )

}

export default Content;