import '../sheets/Search.css';

function Search() 
{
    return (
        <div className="main">
                <input type="text" className="searchbar"></input>
                <input type="number" className="radius"></input>
                <button className="enter">search</button>
        </div>
    );
}

export default Search;