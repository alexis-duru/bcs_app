import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, length, onPageChanged }) => {

    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <ul className="paginationContainer">
            <li className={"pageItem " + (currentPage === 1 && " disabled")}>
                <button
                    className="pageLink arrow"
                    onClick={() => onPageChanged(currentPage - 1)}>
                    <svg width="18" height="18"><use href="#left" /></svg>
                    <span className="arrowText">Previous</span>
                </button>
            </li>
            {pages.map(page => (
                <li key={page} className={"pageItem " + (currentPage === page && " active")}>
                    <button className="pageLink" onClick={() => onPageChanged(page)} >
                        {page}
                    </button>
                </li>
            ))}
            <li className={"pageItem " + (currentPage === pagesCount && " disabled")}>
                <button
                    className="pageLink "
                    onClick={() => onPageChanged(currentPage + 1)}>
                    <svg width="18" height="18">
                        <use href="#right" />
                    </svg>
                </button>
            </li>
            <div className="hide_arrow_container">
                <svg className="hide">
                    <symbol id="left" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></symbol>
                    <symbol id="right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></symbol>
                </svg>
            </div>
        </ul>

    );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}

export default Pagination;