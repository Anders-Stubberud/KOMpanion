import React, { Dispatch, SetStateAction, useState } from 'react';
import '../sheets/Header.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

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

    const dark = darkmode ? 'darkmode' : '';

    return (
        <div>
            <div className='header'>
                <div className='intro'>
                    <button onClick={() => handleNavigate(location.pathname, '/')}  
                    className={`kompanion ${dark}`}>KOMpanion</button>
                    <p className={dark}><em>KOM analyzer</em></p>
                </div>  
                <div className='buttons'>
                    <button onClick={() => handleNavigate(location.pathname, '/about')} 
                        className={`aboutButton ${dark}`}>
                        <span className={dark}>About</span>
                    </button>
                    <button onClick={() => toggleDarkmode()}  className={`darkmodeButton ${dark}`}>
                        darkmode
                    </button>
                </div>  
            </div>
            <hr className={dark}></hr>
        </div>
    );
}

export default Header;