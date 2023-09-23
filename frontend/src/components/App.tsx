import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import '../sheets/App.css'
import Mapbox from './Mapbox';
import Header from './Header';
import About from './About'
import Search from './Search'
import List from '../hooks/List'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Content from './Content';

function App() 
{

  // const [data, setData] = useState([{}])

  // useEffect(() => {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //     }
  //   )
  // }, [])

  return (
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Content></Content>}></Route>
            <Route path='/about' element={<About></About>}></Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
