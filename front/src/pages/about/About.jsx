import React from 'react';
import alexis from "../../assets/img/alexis.jpg";


const About = () => {
    return ( 
        <>
        <div className="globalPage">
            <div className="leftSideBar">
            </div>
            <div className="globalPageWrapper">
                <div className="globalPageHeader">
                    <div className="searchBar">
                    </div>
                </div>
                <div className="globalPageWrapperCards" id="about">
                    <div className="aboutContainer">
                        <h1>ABOUT</h1>
                        <p>
                        Bordeaux is a city with several places suitable for  skateboarding. There are developed places  dedicated to this sport, the « skateparks »,  and urban environments conducive to this practice, the « street » spots.
                        </p>
                        <p>I am a person passionate about this activity,  which I have been practicing for almost 20 years.  I spent a lot of time scouring the city to research  and discover new places to exploit. Over time,  I realized that it was sometimes difficult to memorize  all the « spots » identified. Thus, I chose to combine  my passion and my professional training in order to design an application allowing the identification  of spots and sharing with the skateboarding community. </p>
                        <p>The « Spoted » project was born.</p>
                        <div>
                            <img src={alexis} alt="alexis" />
                            <p>Alexis Duru - Developper of Spoted</p>
                        </div>
                    </div>
                </div>
            <div className="globalPageWrapperCards_overlay"></div>
                </div>
                <div className="globalFullPaginationContainer">
                </div>
            </div>
        </> 
     );
}
 
export default About;