import React, { Dispatch, SetStateAction, useState } from 'react';
import '../sheets/Header.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { color } from '@chakra-ui/react';

interface SearchProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

function Header({darkmode, toggleDarkmode}:SearchProps) 
{

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleNavigate = (cur: string, des: string) => {
        if (cur !== des)
        {
            navigate(des)
        }
    }

    const dark = darkmode ? 'darkmode_header' : '';
    const mode = darkmode ? 'lightmode' : 'darkmode';

    return (
        <div className='outer_header'>
            <div className='header'>
                <div className='intro'>
                    <button onClick={() => handleNavigate(location.pathname, '/')}  
                    className={`kompanion transition_header ${dark}`}>KOMpanion</button>
                    <div className={`transition_header divide ${dark}`}>
                        <p>Segment analyzer</p>
                    </div>
                </div>  
                <div className='buttons'>
                    <DarkModeSwitch
                        checked={darkmode}
                        onChange={toggleDarkmode}
                        size={25}
                    />
                    <button onClick={() => handleNavigate(location.pathname, '/about')} 
                        className={`aboutButton ${dark} `}>
                        <span className={`transition_header ${dark}`}>About</span>
                    </button>
                    {/* <button onClick={() => toggleDarkmode()}  className={`darkmodeButton transition_header ${dark}`}>
                        {mode}
                    </button> */}
                </div>  
            </div>
        </div>
    );
}

export default Header;