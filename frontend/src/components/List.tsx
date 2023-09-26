import '../sheets/List.css'

interface SearchProps {
    darkmode: boolean;
}

function List({darkmode}: SearchProps) 
{

    const dark = darkmode ? 'darkmode_list' : '';

    return (
        <div className={`listcontainer ${dark}`}>

        </div>
    );
}

export default List;