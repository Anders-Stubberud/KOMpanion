import { useRef, useState } from 'react';
import '../sheets/Suggestions.css';

interface SearchProps {
    darkmode: boolean;
    suggestions: string [];
    setSelectLocation: (e:any) => void;
    setSuggestions: (e:any) => void;
}

function Suggestions({suggestions, darkmode, setSelectLocation, setSuggestions}: SearchProps)
{
    function getStringWidth(string: string) {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.whiteSpace = 'nowrap';
        span.textContent = string;
        document.body.appendChild(span);
        const width = span.offsetWidth;
        document.body.removeChild(span);
        return width;
    }

    function trim(suggestion: string) {
        let dimention = window.innerWidth/window.innerHeight;
        if (dimention > 1 && getStringWidth(suggestion) > window.innerWidth * 0.27) {
            let slice = suggestion.substring(0, suggestion.lastIndexOf(" "));
            while (
                getStringWidth(slice) > window.innerWidth * 0.27 
                && slice.indexOf(" ") > 0
                ) 
                {
                    slice = slice.substring(0, slice.lastIndexOf(" "));
                }
                if (slice.indexOf(',') > -1) {
                    slice = slice.substring(0, slice.lastIndexOf(","));
                }
            return slice;
        }
        return suggestion;
    }

    function funcy(e:any) {
        setSelectLocation(e);
        setSuggestions([]);
    }

    const border = suggestions.length > 0 ? 'border' : '';
    const dark = darkmode ? 'darkmode_suggestion' : '';

    return (
        <div className={`main_suggestions ${border} ${dark}`}>
            {suggestions.map((suggestion, index) => (
                <button 
                className={`suggestion transistion_suggestion ${dark}`} key={index}
                onClick={(e) => funcy(e)}
                >{trim(suggestion)}
                </button>
            ))}
        </div>
    );
}

export default Suggestions;