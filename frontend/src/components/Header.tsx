import React, { Dispatch, SetStateAction, useState } from 'react';
import '../sheets/Header.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Heading } from '@chakra-ui/react'
import { color } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'

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
    const darkheader = darkmode ? 'dark_header' : '';

    return (
        <div className={`outer_header ${darkheader}`}>
            <div className='header'>
                <div className='intro'>
                    <button onClick={() => handleNavigate(location.pathname, '/')}  
                    className={`kompanion transition_header ${dark}`}>
                        <Heading as='h3' size='lg'>KOMpanion</Heading>
                        </button>
                    <div className={`transition_header divide ${dark}`}>
                        <Text fontSize='sm'>Segment analyzer</Text>
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
                        <Text fontSize='md' className={`transition_header ${dark}`}>About</Text>
                    </button>
                </div>  
            </div>
        </div>
    );
}

export default Header;