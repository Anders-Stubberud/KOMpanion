import React, { useState } from 'react';
import '../sheets/Header.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export let dark = false;

function getDarkmode() {
    return dark;
}

function Header() 
{

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleNavigate = () => {
        if (location.pathname !== '/about')
        {
            navigate('/about')
        }
    }
    
    const [darkmodeBool, setDarkmode] = React.useState(false);
    const handleDarkmode = () => {
        if (darkmodeBool) {
            setDarkmode(false);
            dark = false;
        } 
        else {
            setDarkmode(true);
            dark = true;
        }
    };

    return (
        <div className='header'>
            <div className='intro'>
                <h2>KOMpanion</h2>
                <p><em>KOM analyzer</em></p>
            </div>  
            <button onClick={handleNavigate} className='aboutButton'><span>About</span></button>
            <button onClick={handleDarkmode}  className='darkmodeButton'>darkmode</button>
        </div>
    );
}

export default Header;
export {getDarkmode};