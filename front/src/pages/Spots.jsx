import React from 'react';

const Spots = () => {
    return (
        <>
        <div className="spotsPage">
            <div className="leftSideBar">

            </div>
            <div className="spotsPageWrapper">
                <div className="spotsPageHeader">
                    <p>Filter</p>
                    <p>Filter</p>
                    <p>Filter</p>
                    <p>Filter</p>
                </div>
                <div className="spotsPageWrapperCards">
                    <div className="spotsPageCards">
                        <div className='spotsPageCardsInfos'>
                            <h2>name</h2>
                            <p>Adress</p>
                            <p>City</p>
                            <p>Postal code</p>
                            <p>Created At</p>
                            <p>Details</p>
                            <button className="deleteButton">Delete</button>
                        </div>
                        <div className='spotsPageCardsMedia'></div>
                    </div>
                    <div className="spotsPageCards"></div>
                    <div className="spotsPageCards"></div>
                    <div className="spotsPageCards"></div>
                    <div className="spotsPageCards"></div>
                    <div className="spotsPageCards"></div>
                    {/* <div className="spotsPageCards"></div>
                    <div className="spotsPageCards"></div>
                    <div className="spotsPageCards"></div>
                    <div className="spotsPageCards"></div>
                    <div className="spotsPageCards"></div> */}
                </div>
            </div>
        </div>
        </>
    )
}

export default Spots;