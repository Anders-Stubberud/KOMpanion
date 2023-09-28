import '../sheets/Search.css';
import Suggestions from './Suggestions';
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

    const dark = darkmode ? 'darkmode_search' : '';

    function search() {
        axios.get('http://localhost:5001/data', {
            params: {
                location: "teste",
                radius: "testeee"
            }
        }).then(
            (response) => {
                setData(response.data);
            })
    }

    const [location, setLocation] = useState('');

    const handleInputChange = (e: any) => {
      const inputValue = e.target.value;
      setLocation(inputValue);
    };

    const [suggestions, updateSuggestions] = useState<string []>([]);
    const setSuggestions = (suggestions: string []) => {
        updateSuggestions(suggestions);
    }

    useEffect(() => {
        if (location.length > 2) {
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
                    className="searchbar"
                    onChange={handleInputChange}
                    ></input>
                    <div className='suggestions'>
                        <Suggestions darkmode={darkmode} suggestions={suggestions}></Suggestions>
                    </div>
                </div>
                {/* ts function for maksimal radius */}
                <div className='outer'>
                    <p className={`transition_search ${dark}`}>radius</p>
                    <input type="number" className="radius"></input>
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