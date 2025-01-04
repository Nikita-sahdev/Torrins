import React, { useEffect, useState } from 'react';

const Instruments = ({ instruments, selectedInstrument, onSelectInstrument, step, setSelectedInstrument }) => {
    const [activeInstrument, setActiveInstrument] = useState(selectedInstrument || null);

    useEffect(() => {
        if (selectedInstrument) {
            setActiveInstrument(selectedInstrument);
        }
    }, [selectedInstrument]);

    const handleClick = (instrumentId) => {
        setActiveInstrument(instrumentId);
        setSelectedInstrument(instrumentId);

        setTimeout(() => {
            onSelectInstrument(instrumentId, step + 1);
        }, 300);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center middle-section">
            <h1>Which instrument do you want to learn?</h1>
            <div className="assessment-categories">
                {instruments?.length ? instruments.map((instrument) => (
                    <div className={`guitar ${activeInstrument === instrument.id ? 'active-img' : ''}`} key={instrument.id}>
                        <div className="img-container img-selection" onClick={() => handleClick(instrument.id)}>
                            <img src={instrument.image} alt={instrument.label} />
                            <div className="cat-name" style={{cursor: 'pointer'}}>{instrument.label}</div>
                        </div>
                    </div>
                )) : ''}
            </div>
        </div>
    );
};

export default Instruments;
