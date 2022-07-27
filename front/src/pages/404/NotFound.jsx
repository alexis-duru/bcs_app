import React from 'react';
import { useEffect } from 'react';
import animation from './circle.js';



const NotFound = () => {

    useEffect(() => {
        animation();
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
            <h1 id="title">404</h1>
        </div>
        </>
     );
}
 
export default NotFound;