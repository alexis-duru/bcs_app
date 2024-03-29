import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
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
import UserSpots from './pages/user/profile/UserSpots';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from './pages/contact/ContactForm';
import About from './pages/about/About';
import NotFound from "./pages/404/NotFound";
import CookieConsent from "react-cookie-consent";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
// import Test from "./components/Test";
import Comment from "./components/Comment";
import usersAPI from "./services/usersAPI";
import jwtDecode from "jwt-decode";

authAPI.setup();

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  ); 
  
  return (
    <BrowserRouter >

      <Header  isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />

      <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />

      <Routes>
          {/* HOMEPAGE */}
          
          <Route path="/" element={ <Homepage/> } />

          {/* USERROUTES */}

          <Route path="/login" element={ <LoginPage onLogin={setIsAuthenticated} /> } />
          <Route path="/register" element={ <RegisterPage/> } />
          <Route path="/profile" element={isAuthenticated ? <Profile/> : <LoginPage/> }/>
          <Route  path="/profile/spots" element={isAuthenticated ? <UserSpots/> : <LoginPage/> }/>
          
          {/* SPOTSROUTES */}
    
          <Route path="/spots"  element={ <Spots/> } />
          <Route path="/spots/:id" element={ isAuthenticated ? <SpotDetails/> : <LoginPage/>  } />
          <Route path="/spots/create" element={ isAuthenticated ? <SpotCreate/> : <LoginPage />} />
          <Route path="/spots/update/:id" element={ isAuthenticated ? <SpotCreate/> : <LoginPage />} />

          {/* CONTACT */}

          <Route path="/contact" element={ <ContactForm/> } />

          {/* ABOUT */}

          <Route path="/about" element={ <About/> } />

          {/* PRIVACY POLICY */}

          <Route path="/privacypolicy" element={ <PrivacyPolicy/> } />

          {/* 404 */}

          <Route path='*' element={<NotFound />} />

          {/* TEST */}
          
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/testComment" element={<Comment />} />

      </Routes>
      
    <ToastContainer position={toast.POSITION.BOTTOM_RIGHT } />
    <CookieConsent>This website uses cookies to enhance the user experience. See our <Link to="/privacypolicy" >Privacy Policy</Link></CookieConsent>

    </BrowserRouter>
    
    
    );
}

export default App;
