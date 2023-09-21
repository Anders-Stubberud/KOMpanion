
import '../sheets/Header.css';
import { change } from '../utils/change';

function Header() 
{
    return (
        <div className='header'>
            <div className='intro'>
                <h2>KOMpanion</h2>
                <p><em>KOM analyzer</em></p>
            </div>
            <button onClick={change} className='change' title='change theme'>change</button>
        </div>
    );
}

export default Header;