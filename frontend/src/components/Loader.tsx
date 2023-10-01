import { useEffect, useState } from 'react';
import '../sheets/Loader.css';

interface SearchProps {
    darkmode: boolean;
    isLoading: boolean;
    data: any;
}

function Loader({darkmode, isLoading, data}:SearchProps)
{

    const dark: string = darkmode ? 'darkmode_loader' : ''

    const [loadInfo, setLoadInfo] = useState<number>(0);

    const loadArray: string [] = [
        '', 
        'fetching data.', 'fetching data..', 'fetching data...',
        'crunching numbers.', 'crunching numbers..', 'crunching numbers...',
        'data wrangling.', 'data wrangling..', 'data wrangling...',
        'optimizing algorithms.', 'optimizing algorithms..', 'optimizing algorithms...',
        'regression analysis.', 'regression analysis..', 'regression analysis...',
        'statistical magic.', 'statistical magic..', 'statistical magic..',
        'analyzing.', 'analyzing..', 'analyzing...',
        'exploring insights.', 'exploring insights..', 'exploring insights...'
    ];

    useEffect(() => {
        if (isLoading) {
            const intervalId = setInterval(() => {
                setLoadInfo((prevIndex) => (prevIndex + 1) % loadArray.length);
            }, 300);
    
            return () => clearInterval(intervalId);
        }
        else {
            setLoadInfo(0);
        }
    }, [isLoading])

    return (
        <h3 className={`loader_loader ${dark}`}>{loadArray[loadInfo]}</h3>
    );
}

export default Loader;