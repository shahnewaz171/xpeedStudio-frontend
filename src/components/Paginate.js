import React from 'react';

const Paginate = () => {

    return (
        <>
            <div className="pagination mt-3 px-3 justify-content-center">
                <ul className="list-inline">
                    {[...new Array(8)].map((item, index) => {
                        return (
                            <li key={index}>
                                <span className="white"></span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
};

export default Paginate;