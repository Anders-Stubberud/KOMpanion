import List from "../hooks/List";
import Header from "./Header";
import Mapbox from "./Mapbox";
import Search from "./Search";
import '../sheets/Content.css';
import React, { Dispatch, SetStateAction } from "react";

interface SearchProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

function Content({darkmode, toggleDarkmode}:SearchProps) {

    return (
        <div>
            <Header darkmode={darkmode} toggleDarkmode={toggleDarkmode}></Header>
            <Search darkmode={darkmode}></Search>
            <div className='mapbox-list'>
                <List></List>
                <Mapbox></Mapbox>
            </div>
        </div>
    )

}

export default Content;