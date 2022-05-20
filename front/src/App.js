import Navbar from './components/navbar';
import {BrowserRouter, Routes} from "react-router-dom";
import React from 'react';
import Homepage from './pages/homepage';
import Header from './components/header';

function App() {
  return (
    <BrowserRouter>
      <main className="page">
        <Header />
        <Navbar/>
        <Homepage />
    </main>
    </BrowserRouter>
  );
}

export default App;
