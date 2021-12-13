import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUploadCloud } from "react-icons/fi";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './Calculator.css';
import Card from '../Card/Card';

const Calculator = () => {
    const [writtenValue, setWrittenValue] = useState('');
    const [fileValue, setFileValue] = useState('');
    const [file, setFile] = useState('');
    const [resultsCard, setResultsCard] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/results')
            .then(res => {
                console.log(res.data);
                setResultsCard(res.data);
            })
    }, [])

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

            axios.post('http://localhost:5000/addCalculation', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    if (res) {
                        console.log(res);
                        e.target.reset();
                    }
                })
        }
        else {
            alert("Something went wrong. Please check your text file!");
            e.target.reset();
        }

        e.preventDefault();
    }

   const handleOnDragEnd = (result) => {
        if (!result.destination) return;
    
        const items = Array.from(resultsCard);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log(items);
    
        setResultsCard(items);
      }

    return (
        <div className="my-5 container custom-container">
            <h4 className="text-danger">Screen A</h4>
            <div className="row">
                <div className="col col-md-6">
                    <div className="mt-3 pb-2 calculator">
                        <div className="px-3 pb-4 upload">
                            <h3 className="pt-3 pb-2">Total results: {resultsCard.length}</h3>
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Droppable droppableId="items">
                                    {(provided) => (
                                        <div className="items" {...provided.droppableProps} ref={provided.innerRef}>
                                            {resultsCard.map((item, index) => <Card item={item} index={index} key={item._id} /> )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                        <div className="mt-2">
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
                                <button type="submit" className="btn rounded-pill px-4 calculator-btn">Calculate</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;