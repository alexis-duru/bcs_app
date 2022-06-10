import { useState } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import Homepage from './pages/home/HomePage';
import LoginPage from "./pages/user/authentication/LoginPage";
import RegisterPage from "./pages/user/registration/RegisterPage";
import Profile from './pages/user/profile/ProfilePage';
import SpotDetails from "./pages/spot/SpotDetails";
import Spots from './pages/spot/Spots';
import authAPI from "./services/authAPI";
import SpotCreate from './pages/spot/SpotCreate';
import SpotUpdate from "./pages/spot/SpotUpdate";
// useEffect useNavigate

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
          {/* HOMEPAGE */}
          <Route path="/" element={ <Homepage/> } />

          {/* USERROUTES */}
          <Route path="/login" element={ <LoginPage onLogin={setIsAuthenticated} /> } />
          <Route path="/register" element={ <RegisterPage/> } />
          <Route path="/profile" element={isAuthenticated ? <Profile/> : <LoginPage/> }/>
          
          {/* SPOTSROUTES */}
    
          <Route path="/spots"  element={isAuthenticated ? <Spots/> : <LoginPage /> } />
          <Route path="/spots/:id" element={isAuthenticated ? <SpotDetails/> : <LoginPage /> } />
          <Route path="/spots/create" element={ isAuthenticated ? <SpotCreate/> : <LoginPage />} />
          <Route path="/spots/update" element={ isAuthenticated ? <SpotUpdate/> : <LoginPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
