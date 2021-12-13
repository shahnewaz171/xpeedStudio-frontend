import React, { useContext } from 'react';
import Modal from 'react-modal';
import { CreateResultsInfo } from '../../../App';
import './ResultViewModal.css';

const ResultViewModal = () => {
    const { modalIsOpen, setIsOpen } = useContext(CreateResultsInfo);

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
                <div className="pb-1 pt-3 quickView">
                   <h1>Hellodasdasdsadsadsadsad</h1>
                </div>
            </Modal>
        </>
    );
};

export default ResultViewModal;