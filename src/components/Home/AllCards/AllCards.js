import React from 'react';
import ResultCards from '../ResultCards/ResultCards';

const AllCards = () => {

    return (
        <>
            <div className="mb-5 mt-2 container custom-container">
                <div className="row justify-content-center">
                    <div className="col-md-6 pt-5 pt-md-0">
                        <ResultCards />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllCards;