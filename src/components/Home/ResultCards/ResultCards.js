import React, { useContext, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import '../calculator/Calculator';
import SkeletonElement from '../../shared/SkeletonElement';
import Paginate from '../../shared/Paginate';
import { CreateResultsInfo } from '../../../App';
import ResultViewModal from '../../shared/ResultViewModal/ResultViewModal';

const ResultCards = () => {
    const { resultsInfo, singleResult, handleSingleResult } = useContext(CreateResultsInfo);
    const [visible, setVisible] = useState(3);
    const allResultsInfo = resultsInfo.slice(0, visible);

    const fetchMoreData = () => {
        setTimeout(() => {
            setVisible(previousItems => previousItems + 3);
        }, 1000);
    };

    return (
        <>
            <div>
                <div id="scrollableDiv2" className={"mt-3 pb-2 calculator "+ ( resultsInfo.length > 3 ? "border2" : "")}>
                    <div className="px-3 upload border-0">
                        <h3 className="pt-3 pb-2">Total results: {resultsInfo.length}</h3>
                        <InfiniteScroll
                            dataLength={allResultsInfo.length}
                            next={fetchMoreData}
                            hasMore={true}
                            loader={allResultsInfo.length === visible ? <SkeletonElement /> : false}
                            scrollableTarget="scrollableDiv2"
                        >
                            {allResultsInfo?.map(item => {
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
                                                <p onClick={() => handleSingleResult(item)} className="preview-btn mb-0">See Input</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </InfiniteScroll>
                    </div>
                    {allResultsInfo.length === visible && resultsInfo.length > 3 ?
                         <Paginate /> : ""
                    }
                </div>
            </div>
            {
                <ResultViewModal singleResult={singleResult} />
            }
        </>
    );
};

export default ResultCards;