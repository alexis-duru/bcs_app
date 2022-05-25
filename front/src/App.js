import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import Homepage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import Profil from './pages/Profil';
import SpotDetails from "./pages/SpotDetails";
import Spots from './pages/Spots';
// import authAPI from "./services/authAPI";

// authAPI.setup();

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Navbar/>
    <Routes>
        <Route path="/login" element={ <LoginPage/> } />
        <Route path="/" element={ <Homepage/> } />
        <Route path="/profil" element={ <Profil/> } />
        <Route path="/spots" element={ <Spots/> } />
        <Route path="/spots/:id" element={ <SpotDetails/> } />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
