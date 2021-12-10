import React from 'react';
import './Calculator.css';

const Calculator = () => {

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
                            <form className="px-3">
                                <div className="row mb-3">
                                    <div className="col-9">
                                        <input type="text" name="title" className="form-control" placeholder="Calculation Title" />
                                    </div>
                                    <div className="col-3 d-flex align-items-center">
                                        <p className="text-dark mb-0 text-center">Required</p>
                                    </div>
                                </div>
                                <div className="row pb-4">
                                    <div className="col-9">
                                        <input type="text" name="title" className="form-control" placeholder="Calculation Title" />
                                    </div>
                                    <div className="col-3 d-flex align-items-center">
                                        <p className="text-dark mb-0 text-center">Optional</p>
                                    </div>
                                </div>
                                <button className="btn rounded-pill px-4 calculator-btn">Calculate</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;