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
    const setData = (data: any) => {
        updateData(data);
        console.log(data);
    }

    return (
        <div>
            <Header darkmode={darkmode} toggleDarkmode={toggleDarkmode}></Header>
            <Search
                darkmode={darkmode}
                setData={setData} 
            ></Search>
            <div className='mapbox-list'>
                <List darkmode={darkmode} data={data}></List>
                <Mapbox darkmode={darkmode}></Mapbox>
            </div>
        </div>
    )

}

export default Content;