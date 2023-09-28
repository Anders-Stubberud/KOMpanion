import '../sheets/Search.css';
import Suggestions from './Suggestions';
import { isValidLocation } from '../utils/validLocation';
import { loadModules } from 'esri-loader';
import { getAutoComplete } from '../utils/locationAutocomplete';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface SearchProps {
    darkmode: boolean;
    setData: (data: any) => void;
}

function Search({darkmode, setData}:SearchProps) 
{

    const dark: string = darkmode ? 'darkmode_search' : '';

    function search() {

        if (radchange < 1 || radchange > 50) {
            alert("Must have 1 <= radius <= 50")
        }

        if (! isValidLocation(exactLocation)) {

        }

    }

    const [location, setLocation] = useState('');

    const handleInputChange = (e: any) => {
      const inputValue = e.target.value;
      setExactLocation(inputValue);
      setLocation(inputValue);
    };

    const [radchange, updateRadChange] = useState<number>(25);
    const setRadChange = (e: any) => {
        updateRadChange(e.target.value);
    }

    const [exactLocation, setExactLocation] = useState<string>();


    const setSelectLocation = (e: any) => {
        const value: string = e.target.textContent;
        setExactLocation(value);
        if (value.indexOf(',') > -1) 
        {
            setLocation(value.substring(0, value.indexOf(',')));
        }
        else {
            setLocation(value);
        }
    }

    const [suggestions, updateSuggestions] = useState<string []>([]);
    const setSuggestions = (suggestions: string []) => {
        updateSuggestions(suggestions);
    }

    const handleDocumentClick = (e: any) => {
        if (! e.target.classList.contains('suggestion') && !e.target.classList.contains('darkmodeButton')) {
            setSuggestions([]);
        }
    }

    useEffect(() => {

        document.addEventListener('click', handleDocumentClick);

        if (location.length > 1) {
            const token = "AAPK12f0f22fbf4c4417b38d8ec96ccd5b34Sx1eaIuw5mRwzMv5Imvs-Z7LlYvbsUpgCMLzktGWeINH_ZeXo8QcMDnk-jcUO90t";
            const url = `https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${location}&f=json&token=${token}`;
            let sug_arr: string[] = [];
            axios.get(url)
            .then((response) => {
                let suggestions = response.data.suggestions;
                for (let i=0; i<5 && i< suggestions.length ; i++) {
                    sug_arr.push(suggestions[i]["text"]);
                }
                setSuggestions(sug_arr);
            })
            .catch((error) => {
                console.error('Error fetching suggestions:', error);
            });
        }
        else {
            setSuggestions([]);
        }

    }, [location]
    );

    return (
        <div className="main">
                <div className='outer'>
                    <p className={`transition_search ${dark}`}>location</p>
                    <input 
                    type="text" 
                    id='loc'
                    value={location}
                    className="searchbar"
                    onChange={handleInputChange}
                    >
                    </input>
                    <div className='suggestions'>
                        <Suggestions darkmode={darkmode} suggestions={suggestions} setSelectLocation={setSelectLocation}></Suggestions>
                    </div>
                </div>
                {/* ts function for maksimal radius */}
                <div className='outer'>
                    <p className={`transition_search ${dark}`}>
                        radius
                    </p>
                    <input value={radchange} onChange={setRadChange} type="number" className="radius"></input>
                </div>
                <div className='outer'>
                    <br></br>
                    <button className="enter">
                        <span className={`transition_search ${dark}`} onClick={search}>search</span>
                    </button>
                </div>
        </div>
    );
}

export default Search;