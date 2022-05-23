import React from 'react';

const LoginPage = (props) => {
    return (  
        <>
          <div className="spotsPage">
            <div className="leftSideBar">

            </div>
            <div className="spotsPageWrapper">
                <div className="spotsPageHeader">
                    <div className="searchBar">
                        {/* <input type="text" onChange={handleSearch} value={search} placeholder="Rechercher ..." className="searchBarControl" /> */}
                    </div>
                </div>
                <div className="spotsPageWrapperCards">
                <div className="spotsPageWrapperCards_overlay"></div>
                </div>
                <div className="fullPaginationContainer">
                </div>
            </div>
        </div>
        </>
    );
}
 
export default LoginPage;