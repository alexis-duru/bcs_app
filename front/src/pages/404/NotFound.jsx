import React from 'react';
import { useEffect } from 'react';
import  { circle } from '../404/circle.js';



const NotFound = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "circle.js";
        script.type = "text/babel"
        script.async = true;
        
        document.body.appendChild(script);
        
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return ( 
        <>
            <div className="circle__container">
            <div className="vertical__line"></div>
            <div className="horizontal__line"></div>
            <div className="circle__container__inner">
                <div className="circle middle__circle"></div>
                <div className="circle circle__one"></div>
                <div className="circle circle__two"></div>
                <div className="circle circle__three"></div>
                <div className="circle circle__four"></div>
            </div>
        </div>
        </>
     );
}
 
export default NotFound;