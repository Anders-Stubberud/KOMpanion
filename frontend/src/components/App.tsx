import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import '../sheets/App.css'
import Mapbox from './Mapbox';
import Header from './Header';
import Search from './Search'
import List from '../hooks/List'

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
      <Header></Header>
      <hr></hr>
      <Search></Search>
      <div className='mapbox-list'>
        <List></List>
        <Mapbox></Mapbox>
      </div>
    </div>
  );
}

export default App;
