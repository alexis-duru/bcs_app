import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundImg from '../../assets/img/home.png';
import logo from '../../assets/img/logo-header.png';

const Homepage = () => {

    
    useEffect(() => {

    }, [])
    
    return ( 
        <>
        <main>
            <div className="header">
            <div id="overlay-hero-image"></div>
                <div className="hero-image">
                    <img src={logo} alt="home" />
                </div>
                <div id="overlay-hero-image"></div>
                <h1>
                    <span className="title" id="l-1">W</span>
                    <span className="title" id="l-2">E</span>
                    <span className="title" id="l-3">L</span>
                    <span className="title" id="l-4">C</span>
                    <span className="title" id="l-5">O</span>
                    <span className="title" id="l-6">M</span>
                    <span className="title" id="l-7">E</span>
                </h1>
                {/* <div class="loader-line"></div> */}
                <span className="mouse">
                    <span className="mouse-wheel"></span>
                </span>
            </div>
            <div id="contentHome">
                <div className="content">
                    <Link to="/spots"><img src={backgroundImg} alt="home" /></Link>  
                </div>
            </div>
        </main>
        </>
     );
}
 
export default Homepage;