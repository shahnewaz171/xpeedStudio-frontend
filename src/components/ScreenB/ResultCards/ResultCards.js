import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import '../../ScreenA/calculator/Calculator';
import SkeletonElement from '../../SkeletonElement';
import Paginate from '../../Paginate';

const ResultCards = () => {
    const [resultsCard, setResultsCard] = useState([]);
    const [visible, setVisible] = useState(3);
    const allResultsCard = resultsCard.slice(0, visible);

    useEffect(() => {
        axios.get('http://localhost:5000/results')
            .then(res => {
                if(res){
                    console.log(res.data);
                    const data = res.data?.reverse();
                    setResultsCard(data);
                }
            })
    }, [resultsCard])

    const fetchMoreData = () => {
        setTimeout(() => {
            setVisible(previousItems => previousItems + 3);
        }, 1000);
    };

    return (
        <>
            <h4 className="text-danger">Screen B</h4>
            <div>
                <div id="scrollableDiv2" className={"mt-3 pb-2 calculator "+ ( resultsCard.length > 3 ? "border2" : "")}>
                    <div className="px-3 upload border-0">
                        <h3 className="pt-3 pb-2">Total results: {resultsCard.length}</h3>
                        <InfiniteScroll
                            dataLength={allResultsCard.length}
                            next={fetchMoreData}
                            hasMore={true}
                            loader={allResultsCard.length === visible ? <SkeletonElement /> : false}
                            scrollableTarget="scrollableDiv2"
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
                    {allResultsCard.length === visible && resultsCard.length > 3 ?
                         <Paginate /> : ""
                    }
                </div>
            </div>
        </>
    );
};

export default ResultCards;