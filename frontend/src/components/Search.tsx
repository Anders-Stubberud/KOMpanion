import '../sheets/Search.css';

interface SearchProps {
    darkmode: boolean;
}

function Search({darkmode}:SearchProps) 
{

    const dark = darkmode ? 'darkmode' : '';

    function func() {
        console.log("k");
        console.log(darkmode);
    }

    return (
        <div className="main">
                <div className='outer'>
                    <p className={dark}>location</p>
                    <input type="text" className="searchbar"></input>
                </div>
                {/* ts function for maksimal radius */}
                <div className='outer'>
                    <p className={dark}>radius</p>
                    <input type="number" className="radius"></input>
                </div>
                <div className='outer'>
                    <br></br>
                    <button className="enter">
                        <span className={dark} onClick={func}>search</span>
                    </button>
                </div>
        </div>
    );
}

export default Search;