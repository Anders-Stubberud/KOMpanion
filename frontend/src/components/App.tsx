import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Mapbox from './Mapbox';
import Header from './Header';
import Search from './Search'
import List from '../hooks/List'

function App() 
{

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

  return (
    <div>
      <Header></Header>
      <hr></hr>
      <Mapbox></Mapbox>
      <Search></Search>
      <List></List>
    </div>
  );
}

export default App;
