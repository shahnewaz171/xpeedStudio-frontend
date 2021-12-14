import React, { useContext } from 'react';
import Modal from 'react-modal';
import { CreateResultsInfo } from '../../../App';
import './ResultViewModal.css';

const ResultViewModal = ({ singleResult }) => {
    const { modalIsOpen, setIsOpen } = useContext(CreateResultsInfo);
    const { fileValue, output, writtenText, fileName } = singleResult;

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="resultViewModal"
                overlayClassName="resultViewOverlay"
                ariaHideApp={false}
                contentLabel="See Input"
            >
                <div className="pb-1 pt-3 px-5 quickView">
                   <p>
                       <span className="me-1 title">Input:</span>
                       {fileValue}
                   </p>
                   <p>
                       <span className="me-1 title">Output:</span>
                       {output}
                   </p>
                   <p>
                       <span className="me-1 title">WrittenText:</span>
                       {writtenText}
                   </p>
                   <p>
                       <span className="me-1 title">Filename:</span>
                       {fileName}
                   </p>
                </div>

                <button onClick={closeModal} className="btn btn-danger close-btn">X</button>
            </Modal>
        </>
    );
};

export default ResultViewModal;