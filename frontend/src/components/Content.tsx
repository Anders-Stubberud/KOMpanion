import List from "../hooks/List";
import Header from "./Header";
import Mapbox from "./Mapbox";
import Search from "./Search";


function Content () {

    return (
        <div>
            <Header></Header>
            <hr></hr>
            <Search></Search>
            <div className='mapbox-list'>
                <List></List>
                <Mapbox></Mapbox>
            </div>
        </div>
    )

}

export default Content;