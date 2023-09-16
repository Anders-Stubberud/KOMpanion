import '../sheets/Search.css';

function Search() 
{
    return (
        <div className="main">
                <input type="text" className="searchbar"></input>
                {/* ts function for maksimal radius */}
                <input type="number" className="radius"></input>
                <button className="enter" name='enter'>
                    <img src={require('../resources/image/searchIcon.png')} alt='search' className='searchIcon'/>
                </button>
        </div>
    );
}

export default Search;