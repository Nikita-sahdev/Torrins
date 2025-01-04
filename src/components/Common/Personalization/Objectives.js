import React, { useState } from 'react';

const Objectives = ({ objectives, onSelectObjective, step, activeInstrument, setObjectiveValue, objectiveValue }) => {
    const [selectedObjective, setSelectedObjective] = useState(objectiveValue);
    
    const handleObjectiveSelection = (objective) => {
        setSelectedObjective(objective);
        setObjectiveValue(objective)

        setTimeout(() => {
            onSelectObjective(objective, step + 1)
        }, 300);
        
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center middle-section">
            {objectives?.length ? 
            <>
                <h1>Select your top {activeInstrument} goals.</h1>
                <p>This will help us curate your personalised course.</p>

                <div className="options-container container d-flex justify-content-center">
                    <div className="row">
                        {objectives.map((objective) => (
                            <div key={objective.id} className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center my-3 sub-container">
                                <div className={`options d-flex justify-content-center align-items-center ${selectedObjective === objective.id ? ' options-active' : ''}`} onClick={() => handleObjectiveSelection(objective.id)}>
                                    <p>{objective.objective}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> 
            </>
            : '' }
        </div>
        
    );
};

export default Objectives;
