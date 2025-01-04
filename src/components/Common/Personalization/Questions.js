import React,  { useState, useEffect } from 'react';
import ContinueButton from './ContinueButton';

const Questions = ({ questions, onSelectQuestions, step, setQuestionValue, questionValue, previousStep, previousStepData }) => {
    const [selectedQuestions, setSelectedQuestions] = useState(questionValue || []);

    useEffect(() => {
        if (previousStepData.length && ! questions.length) {
            questions = previousStepData;
        }
    }, [])

    const handleQuestionsSelection = (question) => {
        let newSelectedQuestions;
        // If the maximum number of selections is reached, remove the last selected question
        if (selectedQuestions.length >= 2 && !selectedQuestions.includes(question)) {
            newSelectedQuestions = selectedQuestions.slice(0, -1); 
        } else {
            newSelectedQuestions = selectedQuestions.slice();
        }
        // Add the new question
        if (newSelectedQuestions.includes(question)) {
            newSelectedQuestions = newSelectedQuestions.filter(item => item !== question);
        } else {
            newSelectedQuestions.push(question);
        }
        
        setSelectedQuestions(newSelectedQuestions);
        setQuestionValue(newSelectedQuestions)
    };
    
    

    return (
        <div className="d-flex flex-column justify-content-center align-items-center middle-section">
            {questions?.length ? 
            <>
                <h1>Select topics that you have learned and can play confidently.</h1>
                <p>We will skip the selected lessons for you.</p>
                <div className="options-container container-fluid d-flex justify-content-center">
                    <div className="row">
                        {questions.map((question) => (
                            <div className="col-lg-3 col-md-6 col-sm-6 sub-container d-flex justify-content-center">
                                <div className={`options d-flex justify-content-start align-items-center ${selectedQuestions.includes(question.id) ? 'options-active' : ''}`} onClick={() => handleQuestionsSelection(question.id)}>
                                    <img src="/assets/img/Personalization/track.svg" alt="Icon" />
                                    <p>{question.question}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="d-flex flex-column gap-2 btn-container">
                    <ContinueButton onClick={() => onSelectQuestions(selectedQuestions, step+1)} disabled={! selectedQuestions.length} />

                    <button className="skip-btn" onClick={() => onSelectQuestions([], step+1, previousStep)}> Skip  </button>
                </div>
            </>
            : '' }
        </div>
    );
};

export default Questions;
