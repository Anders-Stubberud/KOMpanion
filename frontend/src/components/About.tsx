import Header from "./Header";

interface SearchProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

function About({darkmode, toggleDarkmode}:SearchProps)
{
    return (
        <div>
            <Header darkmode={darkmode} toggleDarkmode={toggleDarkmode}></Header>
        </div>
    );
}

export default About;