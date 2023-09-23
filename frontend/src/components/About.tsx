import { Dispatch, SetStateAction } from "react";
import Header from "./Header";

interface SearchProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

function About({darkmode}:SearchProps, {toggleDarkmode}:SearchProps)
{
    return (
        <div>
            <Header darkmode={darkmode} toggleDarkmode={toggleDarkmode}></Header>
        </div>
    );
}

export default About;