import React from 'react';
import logo from './logo.svg';
import Mapbox from './Mapbox';
import Header from './Header';
import Search from './Search'
import List from './List'

function App() 
{
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
