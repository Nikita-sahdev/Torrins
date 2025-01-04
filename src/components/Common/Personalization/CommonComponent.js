import React from 'react';
import './Personalization.css'

const CommonComponent = ({ children, backButtonHandler, title, step }) => {
    return (
        <div id="personalization-modal-main" class="modal" style={{ display: 'block' }}>
            <div class="personalization-modal">
                <div className="personalization-container flex-column">
                    {step > 1 && <div className="d-flex align-items-center justify-content-center">
                        <div className="custom-progress-bar w-90">
                            <div className="custom-progress-compeleted"></div>
                        </div>
                    </div>}

                    <div className="d-flex justify-content-center flex-column contents">
                        <div className="d-flex gap-2 justify-content-start mt-4 align-items-center sm-p-3">
                            <img src="./assets/img/back-arrow.png" onClick={backButtonHandler} alt="Back" />
                            <p className="p-0 m-0 mob-arrow-head">Back</p>
                        </div>

                        <h1>{title}</h1>

                        {children}

                    </div>
                </div>
            </div>

            {/* Graph section */}
            <div className="graph-section" id="graphSection">
                <img src={`${process.env.REACT_APP_URL}/assets/img/Personalization/movingGraph.svg`} alt="Graph" style={{ left: '-10px' }} />
            </div>
        </div>
    );
};

export default CommonComponent;
