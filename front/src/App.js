import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import Spots from './pages/Spots';
import Profil from './pages/Profil';
import Homepage from './pages/Homepage';
import Header from './components/Header';
import Navbar from './components/Navbar';

// /users - Url des users

// /spots - Url des spots

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Navbar/>
    <Routes>
        <Route path="/" element={ <Homepage/> } />
        <Route path="/profil" element={ <Profil/> } />
        <Route path="/spots" element={ <Spots/> } />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
