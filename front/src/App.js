import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import Homepage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profil from './pages/Profil';
import SpotDetails from "./pages/SpotDetails";
import Spots from './pages/Spots';
import authAPI from "./services/authAPI";

authAPI.setup();

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  ); 
  
  return (
    <BrowserRouter >
      <Header  isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
      <Navbar/>
      <Routes>
          
          <Route path="/" element={ <Homepage/> } />
          <Route path="/login" 
          element= { <LoginPage/>} 
          render={props => <LoginPage onLogin={setIsAuthenticated} {...props} /> } />
          <Route path="/register" element={ <RegisterPage/> } />
          <Route path="/profil" element={ <Profil/> } />
          <Route path="/spots" element={ <Spots/> } />
          <Route path="/spots/:id" element={ <SpotDetails/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
