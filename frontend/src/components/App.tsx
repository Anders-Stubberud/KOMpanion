import About from './About'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Content from './Content';
import '../index.css'
import { Dispatch, SetStateAction } from 'react';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

function App() 
{

  const [darkmode, setDarkmode] = React.useState(false);
  const toggleDarkmode = () => {
      setDarkmode(!darkmode);
      const transitionDuration: number = 500;
      document.body.style.transition = `background-color ${transitionDuration}ms ease-in-out`;
      if (darkmode)
      {
        document.body.style.backgroundColor = '#ffffff';
      }
      else 
      {
        document.body.style.backgroundColor = "#1c1c1d";
      }
  }

  return (
    <div className='app'>
        <ChakraProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Content darkmode={darkmode} toggleDarkmode={toggleDarkmode}></Content>}></Route>
              <Route path='/about' element={<About darkmode={darkmode} toggleDarkmode={toggleDarkmode}></About>}></Route>
            </Routes>
          </Router>
        </ChakraProvider>
      </div>
  );
}

export default App;
