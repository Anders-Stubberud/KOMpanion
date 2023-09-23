import React, { useState } from 'react';
import '../sheets/Header.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Header() 
{

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/about')
    }


    return (
        <div className='header'>
            <div className='intro'>
                <h2>KOMpanion</h2>
                <p><em>KOM analyzer</em></p>
            </div>  
            <button onClick={handleNavigate}>about</button>
        </div>
    );
}

export default Header;