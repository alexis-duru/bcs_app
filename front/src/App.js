import Navbar from './components/navbar';
import { ReactDOM } from 'react';
import React from 'react';
import Homepage from './pages/homepage';
import Header from './components/header';

function App() {
  return (
  <div class="page">
    <Header />
    <Navbar/>
    <Homepage />
</div>
  );
}

export default App;
