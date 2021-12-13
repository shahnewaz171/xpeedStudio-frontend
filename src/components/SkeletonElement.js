import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonElement = () => {

    return (
        <>
            <div className="mb-2 text-center">
                <Skeleton width={340} height={3} style={{ backgroundColor: "#000" }} />
            </div>
            <div className="mb-2 text-center">
                <Skeleton width={150} height={3} style={{ backgroundColor: "#000" }} />
            </div>
            <div className="mb-2 text-center">
                <Skeleton width={200} height={3} style={{ backgroundColor: "#000" }} />
            </div>
        </>
    );
};

export default SkeletonElement;