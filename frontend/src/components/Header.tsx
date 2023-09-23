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
    
    const handleNavigate = (cur: string, des: string) => {
        if (cur !== des)
        {
            navigate(des)
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
        <div>
            <div className='header'>
                <div className='intro'>
                    <button onClick={() => handleNavigate(location.pathname, '/')}  className='kompanion'>KOMpanion</button>
                    <p><em>KOM analyzer</em></p>
                </div>  
                <div className='buttons'>
                    <button onClick={() => handleNavigate(location.pathname, '/about')} className='aboutButton'><span>About</span></button>
                    <button onClick={handleDarkmode}  className='darkmodeButton'>darkmode</button>
                </div>  
            </div>
            <hr></hr>
        </div>
    );
}

export default Header;
export {getDarkmode};