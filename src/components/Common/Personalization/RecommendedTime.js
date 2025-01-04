import React, { useEffect } from 'react';

const RecommendedTimes = ({ recommendedData, step, onSelectTimes, activeInstrument, finalStep, setShowTimeScreen, selectedFrequency, setSelectedFrequency, loading, previousStep , setTimeValue}) => {
    useEffect(() => {
        if (step === finalStep) {
            step = step - 1;
        }
    }, [])

    const onSelectFrequency = (index, id) => {
        setSelectedFrequency({ index, id });
        setTimeValue({index, id})

        setTimeout(() => {
            onSelectTimes(id, step + 1, previousStep)
        }, 300);
        
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center middle-section">
            {recommendedData?.length ? 
                <>
                    <h1>How often will you play the {activeInstrument}?</h1>
                    <p>Learners who practice daily reach their goals 5X faster.</p>

                    <div className="options-container container-fluid d-flex justify-content-center">
                        <div className="row">

                            {recommendedData.map((data, index) => (
                                <div className={`col-lg-4 col-md-12 col-sm-12 sub-container my-3 d-flex justify-content-center position-relative`} key={data.id}>
                                    <div className={`options d-flex justify-content-center align-items-center ${selectedFrequency.index === index ? 'options-active' : ''}`} onClick={() => onSelectFrequency(index, data.id)}>
                                        <p>{data.time}</p>
                                    </div>
                                    {index === 0 && <p className="recommended">Recommended</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                : ''}
        </div>
    );
};

export default RecommendedTimes;
