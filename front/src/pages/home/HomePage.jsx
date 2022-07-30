import React, { useEffect } from 'react';
import backgroundImg from '../../assets/img/home.png';

const Homepage = () => {

    
    useEffect(() => {

    }, [])
    
    return ( 
        <>
        <main>
            <div className="content">
                <img src={backgroundImg} alt="home" />;
            </div>
        </main>
        </>
     );
}
 
export default Homepage;