import React, { useState } from 'react';
import '../sheets/Header.css';
import { Navigate } from 'react-router-dom';

function Header() 
{

    const [goTo, setGoTo] = React.useState(false);
    if (goTo) {
        return <Navigate to="/about"></Navigate>
    }


    return (
        <div className='header'>
            <div className='intro'>
                <h2>KOMpanion</h2>
                <p><em>KOM analyzer</em></p>
            </div>  
            <button onClick={() => {setGoTo(true)}}>about</button>
        </div>
    );
}

export default Header;