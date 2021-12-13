import React, { useState } from 'react';
import axios from 'axios';
import './Calculator.css';

const Calculator = () => {
    const [writtenValue, setWrittenValue] = useState('');
    const [fileValue, setFileValue] = useState('');
    const [file, setFile] = useState('');

    const writtenText = (e) => {
        const newWrittenValue = { ...writtenValue };
        newWrittenValue[e.target.name] = e.target.value;
        setWrittenValue(newWrittenValue.writtenText);
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        const reader = new FileReader();
          reader.onload = function() {
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
                if(res){
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

    return (
        <div className="my-5 container custom-container">
            <h4 className="text-danger">Screen A</h4>
            <div className="row">
                <div className="col col-md-6">
                    <div className="mt-3 pb-5 calculator">
                        <div className="px-3 pb-4">
                            <h3 className="pt-3 pb-2">Total results: 03</h3>
                            <div className="mt-1 py-2 rounded-3 result-card">
                                <p className="mb-0">
                                    <span>=24</span>
                                    <span className="fw-bolder">calculation title</span>
                                    <span className="preview-btn">See Input</span>
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 upload">
                            <h3 className="px-3 py-2">Input</h3>
                            <form className="px-3" onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-9">
                                        <input type="text" onBlur={writtenText} name="writtenText" className="form-control" placeholder="Calculation Title" required />
                                    </div>
                                    <div className="col-3 d-flex align-items-center">
                                        <p className="text-dark mb-0 text-center">Required</p>
                                    </div>
                                </div>
                                <div className="row pb-4">
                                    <div className="col-9">
                                        <input type="file" onChange={handleFile} name="file" className="form-control" accept=".txt" required />
                                    </div>
                                    <div className="col-3 d-flex align-items-center">
                                        <p className="text-dark mb-0 text-center">Optional</p>
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