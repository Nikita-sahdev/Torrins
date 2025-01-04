import React from 'react';
import './finalScreen.css'

const FinalScreen = ({ activeInstrumentPoster , isBobShow }) => {

    return (
        <div id="personalization-modal-seventh" className="modal" style={{ display: 'block', marginTop:isBobShow ? '28px':'auto' }}>
            <div className="personalization-modal">
                <div className="personalization-container flex-column seventh-section-personalization">
                    <img className="line-flow line-flow2" src="./assets/img/Personalization/line.svg" alt="" />
                    <div className="d-flex justify-content-center flex-column contents align-items-center">
                        <div className="bg-circle">
                            <img src={activeInstrumentPoster} alt="Guitarbase" style={{ width: '174px', height: '174px', borderRadius: '50%' }} />
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center mt-0 content-section">
                            <h1 style={{textAlign: 'center'}}>Curating your personalised journey...</h1>
                            <p>In a matter of minutes you will be playing real music with fun and easy exercises.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalScreen;
