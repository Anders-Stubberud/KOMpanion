import React from 'react';
import logo from './logo.svg';
import '../sheets/App.css';
import Mapbox from './Mapbox';
import Header from './Header';

function App() {
  return (
    <div>
      <Header></Header>
      <hr></hr>
      <div className='mapboxcontainer'>
        <Mapbox></Mapbox>
      </div>
    </div>
  );
}

export default App;
