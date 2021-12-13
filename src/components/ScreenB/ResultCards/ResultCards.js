import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../ScreenA/calculator/Calculator';

const ResultCards = () => {
    const [resultsCard, setResultsCard] = useState([]);
    const [visible, setVisible] = useState(3);
    const allResultsCard = resultsCard.slice(0, visible);

    useEffect(() => {
        axios.get('http://localhost:5000/results')
            .then(res => {
                console.log(res.data);
                setResultsCard(res.data);
            })
    }, [])

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            setVisible(previousLeague => previousLeague + 3);
        }, 1500);
    };

    return (
        <>
            <h4 className="text-danger">Screen B</h4>
            <div className="mt-3 pb-2 calculator scroll">
                <div className="px-3 pb-4 upload border-0">
                    <h3 className="pt-3 pb-2">Total results: {resultsCard.length}</h3>
                    <InfiniteScroll
                    dataLength={resultsCard.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    >
                        {allResultsCard?.map(item => {
                            return (
                                <div key={item._id} className="mt-1 py-3 mb-4 result-card">
                                    <div className="mb-0 d-flex align-items-center justify-content-around">
                                        <div className="col-md-3">
                                            <p className="ps-3 mb-0">
                                                = <span >{item.output}</span>
                                            </p>
                                        </div>
                                        <div className="col-md-5">
                                            <p className="fw-bolder mb-0">{item.writtenText}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="preview-btn mb-0">See Input</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </InfiniteScroll>
                </div>
                <div className="pagination px-3 justify-content-center">
                    <ul className="list-inline">
                        {[...new Array(8)].map(item => {
                            return (
                                <li>
                                    <span className="white"></span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ResultCards;