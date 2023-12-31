import '../sheets/Search.css';
import Suggestions from './Suggestions';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Loader from './Loader';
import axios from 'axios';
import '../index.css'
// import {Input} from "@nextui-org/react";
import { useEffect, useState } from 'react';

interface SearchProps {
    darkmode: boolean;
    data: any;
    setData: (data: any) => void;
    coord: number[]|string;
    isLoading: boolean;
    setIsActive: (n: boolean) => void;
    setIsLoading: (n: boolean) => void;
    updateCoord: (n:number[]|string) => void;
    updateChosenSegment: (n:number) => void;
}

function Search({darkmode, setData, coord, updateCoord, updateChosenSegment, setIsLoading, isLoading, data, setIsActive}:SearchProps) 
{

    const dark: string = darkmode ? 'darkmode_search' : '';

    function search() {
        if (radchange < 1 || radchange > 50) {
            alert("Must have 1 <= radius <= 50")
            return;
        }
        if (exactLocation.length < 2) {
            alert('Must enter more precise location');
            return;
        }
        setIsLoading(true);
        const api_url = 'https://stubberud.pythonanywhere.com/api/fetch_coordinates';
        axios.get(api_url, {
            params: {
                location: exactLocation
            }
        }).then((response) => {
            if (response.data == 'NO_HIT') {
                if (coord == 'NO_HIT') {
                    setCoord('NO__HIT') 
                }
                else {
                    setCoord('NO_HIT') 
                }
            }
            else {
                setCoord(response.data)
            }
        }).catch((error) => {
            setIsActive(false);
            setIsLoading(false)
        })
    }

    const setCoord = (coords: number[]|string) => {
        updateCoord(coords);
    }
    // let first: boolean = true;
    // const [fir, setFir] = useState<boolean>(true);
    // (first && fir)

    useEffect(() => {
        if (coord == '' || !coord) {
            // first = false;
            // setFir(false);
            return;
        }
        else if (coord == 'NO_HIT' || coord == 'NO__HIT') {
            setIsActive(true);
            setIsLoading(false)
            setData([]);
            console.log('NO HIT - fant ikke stedet')
        }
        else {
            const api_url = 'https://stubberud.pythonanywhere.com/api/fetch_segments';
            axios.get(api_url, {
                params: {
                    latitude: coord[0],
                    longtitude: coord[1],
                    radius: radchange
                }
            }).then((response) => {
                let res = response.data;
                setIsActive(true);
                setData(res)
            }).catch((error) => {
                setIsActive(true);
                setData([]);
                setIsLoading(false);
                console.log(error);
            })
        }
    }, [coord])

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

    const [exactLocation, setExactLocation] = useState<string>('');


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
        if (!e.target.classList.contains('darkmodeButton')) {
            setSuggestions([]);
        }
    }

    useEffect(() => {

        document.addEventListener('click', handleDocumentClick);

        if (location.length > 1 && location!=exactLocation.slice(0, exactLocation.indexOf(','))) {
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
        <div className="main_search">
            <div className='searchelements'>
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
                        <Suggestions 
                        darkmode={darkmode} 
                        setSuggestions={setSuggestions}
                        suggestions={suggestions} 
                        setSelectLocation={setSelectLocation}
                        ></Suggestions>
                    </div>
                </div>
                <div className='outer'>
                    <Text className={`transition_search ${dark}`}>
                        radius
                    </Text>
                    <input 
                    type="text" 
                    value={radchange}
                    className="radiusss"
                    onChange={setRadChange}
                    >
                    </input>
                </div>
                <div className='outer scuffed'>
                    <p>&nbsp;</p>
                    {isLoading? 
                        (
                        <Button 
                            isLoading
                            height={'5vh'} 
                            display="inline-block" 
                            paddingLeft={'1'}
                            paddingRight={'1'}  
                            m="0"
                            verticalAlign={'middle'}
                            colorScheme='whatsapp' 
                            onClick={search}
                            variant='solid'>
                                Search
                        </Button>
                        )
                        :
                        (
                        <Button 
                            height={'5vh'} 
                            display="inline-block" 
                            paddingLeft={'1'}
                            paddingRight={'1'}  
                            m="0"
                            verticalAlign={'middle'}
                            colorScheme='whatsapp' 
                            onClick={search}
                            variant='solid'>
                                Search
                        </Button>
                        )
                    }   
                    {/* <button className="enter" onClick={search}>
                        <span className={`transition_search ${dark}`}>search</span>
                    </button> */}
                </div>
            </div>
            <Loader darkmode={darkmode} isLoading={isLoading} data={data}></Loader>
        </div>
    );
}

export default Search;