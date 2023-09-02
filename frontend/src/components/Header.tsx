import '../sheets/index.css';
import { change } from '../utils/change';

function Header() {
    return (
        <div className='header'>
            <button onClick={change} className='change' title='change theme'>change</button>
        </div>
    );
}

export default Header;