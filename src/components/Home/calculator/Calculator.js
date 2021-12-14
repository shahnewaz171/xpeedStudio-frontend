import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUploadCloud } from "react-icons/fi";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from 'react-toastify';
import Card from '../Card/Card';
import SkeletonElement from '../../shared/SkeletonElement';
import Paginate from '../../shared/Paginate';
import { fetchAllResults } from '../../shared/httpRequests';
import { CreateResultsInfo } from '../../../App';
import ResultViewModal from '../../shared/ResultViewModal/ResultViewModal';
import 'react-toastify/dist/ReactToastify.css';
import './Calculator.css';

const Calculator = () => {
    const [writtenValue, setWrittenValue] = useState('');
    const [fileValue, setFileValue] = useState('');
    const [file, setFile] = useState('');
    const { resultsInfo, setResultsInfo, singleResult,  handleSingleResult } = useContext(CreateResultsInfo);
    const [visible, setVisible] = useState(3);
    const [disable, setDisable] = useState(false);
    const toastId = useRef(null);
    const allResultsInfo = resultsInfo.slice(0, visible);

    const writtenText = (e) => {
        const newWrittenValue = { ...writtenValue };
        newWrittenValue[e.target.name] = e.target.value;
        setWrittenValue(newWrittenValue.writtenText);
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = function () {
            const text = reader.result;
            const newTextValue = text.replace(/\s/g, '');
            setFileValue(newTextValue);
        };
        reader.readAsText(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        const re = /^[-+]?\d*\.?\d+(?:[-+*/]?\d+)+?$/;
        const formData = new FormData();

        if (re.test(fileValue)) {
            const result = eval(fileValue);

            formData.append('writtenText', writtenValue);
            formData.append('fileValue', fileValue);
            formData.append('output', result);
            formData.append('file', file);

            setTimeout(() => {
                axios.post('https://sheltered-forest-00893.herokuapp.com/addCalculation', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    if (res) {
                        fetchAllResults(setResultsInfo);
                        setDisable(false);
                        toast.success("Success!", {
                            theme: "dark",
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 3000
                        });
                        e.target.reset();
                    }
                })
            }, 15000);
            setDisable(true);
        }
        else {
            toast.dismiss(toastId.current);
            toast.error("You did put the wrong input. Please check your text file!", {
                theme: "dark",
                position: toast.POSITION.TOP_LEFT,
                autoClose: 8000
            });
            e.target.reset();
        }
        e.preventDefault();
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(resultsInfo);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setResultsInfo(items);
    }

    const fetchMoreData = () => {
        setTimeout(() => {
            setVisible(previousItems => previousItems + 3);
        }, 1000);
    };

    return (
        <>
            <div className="mb-5 mt-2 container custom-container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className={"mt-3 calculator " + (resultsInfo.length > 3 ? "border1" : "")}>
                            <div id="scrollableDiv1" className="px-3 pb-4 upload">
                                <div className="row">
                                    <div className="col-6">
                                        <h3 className="pt-3 pb-2">Total results: {resultsInfo.length}</h3>
                                    </div>
                                    <div className="col-6 text-end">
                                        <Link to="/allResults" className="btn mt-3 allResults-btn">All Results</Link>
                                    </div>
                                </div>
                                <DragDropContext onDragEnd={handleOnDragEnd}>
                                    <Droppable droppableId="items">
                                        {(provided) => (
                                            <div className="items" {...provided.droppableProps} ref={provided.innerRef}>
                                                <InfiniteScroll
                                                    dataLength={resultsInfo.length}
                                                    next={fetchMoreData}
                                                    hasMore={true}
                                                    loader={allResultsInfo.length === visible ? <SkeletonElement /> : false}
                                                    scrollableTarget="scrollableDiv1"
                                                >
                                                    {allResultsInfo.map((item, index) => <Card item={item} index={index} key={item._id} handleSingleResult={handleSingleResult} />)}
                                                    {provided.placeholder}
                                                </InfiniteScroll>
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                {allResultsInfo.length === visible && resultsInfo.length > 3 ?
                                    <Paginate /> : ""
                                }
                            </div>
                            <div className={resultsInfo.length > 3 ? "input-area" : ""}>
                                <h3 className="px-3 py-2">Input</h3>
                                <form className="px-3" onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-9">
                                            <input type="text" onBlur={writtenText} name="writtenText" className="form-control" placeholder="Calculation Title" required />
                                        </div>
                                    </div>
                                    <div className="row pb-2">
                                        <div className="col-9">
                                            <div className="file-upload">
                                                <label htmlFor="file" className="pt-3">
                                                    <FiUploadCloud />
                                                </label>
                                                <input type="file" onChange={handleFile} name="file" id="file" className="form-control" accept=".txt" required />
                                            </div>
                                        </div>
                                    </div>
                                    <button disabled={disable} type="submit" className="btn rounded-pill my-2 px-4 calculator-btn">{disable ? "Calculating, Please wait" : "Calculate"}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                <ResultViewModal singleResult={singleResult} />
            }
            {
                <ToastContainer />
            }
        </>
    );
};

export default Calculator;