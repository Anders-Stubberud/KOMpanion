import About from './About'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Content from './Content';
import { Dispatch, SetStateAction } from 'react';
import React from 'react';

function App() 
{

  const [darkmode, setDarkmode] = React.useState(false);
  const toggleDarkmode = () => {
      setDarkmode(!darkmode);
  }

  return (
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Content darkmode={darkmode} toggleDarkmode={toggleDarkmode}></Content>}></Route>
            <Route path='/about' element={<About darkmode={darkmode} toggleDarkmode={toggleDarkmode}></About>}></Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
