import '../sheets/Search.css';

function Search() 
{
    return (
        <div className="main">
                <div className='outer'>
                    <p>location</p>
                    <input type="text" className="searchbar"></input>
                </div>
                {/* ts function for maksimal radius */}
                <div className='outer'>
                    <p>radius</p>
                    <input type="number" className="radius"></input>
                </div>
                <div className='outer'>
                    <br></br>
                    <button className="enter" name='enter'>
                        search
                    </button>
                </div>
        </div>
    );
}

export default Search;