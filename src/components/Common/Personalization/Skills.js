import React, { useState } from 'react';

const Skills = ({ skills, onSelectSkill, step, activeInstrument, setSkillsValue,
    skillsValue }) => {
    const [selectedSkill, setSelectedSkill] = useState(skillsValue);
    

    const handleSkillSelection = (skill) => {
        setSelectedSkill(skill);
        setSkillsValue(skill)

        setTimeout(() => {
            onSelectSkill(skill, step + 1)
        }, 300);
        
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center middle-section">
            <h1>How are your {activeInstrument}-playing skills?</h1>
            {/* <div className="assessment-categories mt-2">
                <img src="./assets/img/Personalization/person.png" alt="" />
            </div> */}

            {skills?.length ? <div className="options-container container d-flex justify-content-center">
                <div className="row">
                    {skills.map((skill) => (
                        <div key={skill.id} className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center my-3 sub-container">
                            <div className={`options d-flex justify-content-center align-items-center ${selectedSkill === skill.id ? ' options-active' : ''}`} onClick={() => handleSkillSelection(skill.id)}>
                                <p>{skill.skill_level}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div> : '' }
            
        </div>
    );
};

export default Skills;