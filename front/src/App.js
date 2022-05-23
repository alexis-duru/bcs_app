import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import Homepage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import Profil from './pages/Profil';
import Spots from './pages/Spots';

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
    </Routes>
    </BrowserRouter>
  );
}

export default App;
