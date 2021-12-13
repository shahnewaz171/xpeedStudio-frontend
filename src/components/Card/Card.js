import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ item, index }) => {
    const { _id, writtenText, output } = item;

    return (
        <>
            <Draggable key={_id} draggableId={_id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="mt-1 py-3 mb-4 result-card">
                            <div className="mb-0 d-flex align-items-center">
                                <div className="col-md-3">
                                    <p className="ps-3 mb-0">
                                        = <span >{output}</span>
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="fw-bolder mb-0">{writtenText}</p>
                                </div>
                                <div className="col-md-3">
                                    <p className="preview-btn mb-0">See Input</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        </>
    );
};

export default Card;