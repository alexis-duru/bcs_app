import React from 'react';
import backgroundImg from '../assets/img/home.png'; 
const Homepage = () => {
    return ( 
        <>
        <main>
            <div className="content">
            <img src={backgroundImg} alt="image of home" />;
            </div>
        </main>
        </>
     );
}
 
export default Homepage;