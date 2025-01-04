import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import History from "../../../Helpers/History";
import Instruments from './Instruments';
import Skills from './Skills';
import Objectives from './Objectives';
import GraphSection from './GraphSection';
import Genre from './Genre';
import SongGenre from './SongGenre';
import Questions from './Questions';
import RecommendedTimes from './RecommendedTime';
import './personalization.scss'

import { useDispatch, useSelector } from "react-redux";
import { auth } from '../../../Action/auth.actions';
import { personalizationAction } from "../../../Action/personalization.action";
import CourseSignIn from '../../../Webpages/Courses/CourseChapter/CourseAuthentication/CourseSignIn';
import CourseSignUp from '../../../Webpages/Courses/CourseChapter/CourseAuthentication/CourseSignUp';
import FinalScreen from './FinalScreen';
import { personalizationConst } from '../../../Constants/Personalization';
import CourseSignInWhatsapp from '../../../Webpages/Courses/CourseChapter/CourseAuthentication/CourseSignInWhatsapp';
import WhatsAppOtpModal from '../../../Webpages/Courses/CourseChapter/CourseAuthentication/WhatsAppOtpModal';
import CreateAccountModal from '../../../Webpages/Courses/CourseChapter/CourseAuthentication/CreateAccountModal';
import CourseRegisterWhatsapp from '../../../Webpages/Courses/CourseChapter/CourseAuthentication/CourseRegisterWhatsapp';
import { authConstants } from '../../../Constants/Auth';

const Personalization = (props) => {
    const SKILL = 'skill';
    const OBJECTIVE = 'objective';
    const GENRE = 'genre';
    const SONG_GENRE = 'song-genre';
    const QUESTION = 'questions';
    const RECOMMENDED_TIMES = 'times';
    const FINAL_STEP = 8;
    const perStepProgress = 100 / (FINAL_STEP - 1);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { personalizationData: personalization, loading, activeInstrument, personalizationSteps, requestLoading, saveSuccess, previousStep, previousStepData, activeInstrumentPoster } = useSelector((state) => state.personalization);
    const authState = useSelector((state) => state.auth);
    const userToken = authState?.userDetails?.hash ?? authState?.userDetails?.token;
    const userId = authState?.userProfile?.user_data?.id;

    const [step, setStep] = useState(1);
    const [selectedInstrument, setSelectedInstrument] = useState(null);
    const [params, setParams] = useState({ action: 'instrument' });
    const [actionHistory, setActionHistory] = useState(['instrument']);
    const [stepProgress, setStepProgress] = useState(0);

    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [authView, setAuthView] = useState('');
    const [showModule, setShowModule] = useState(false);
    const [showTimeScreen, setShowTimeScreen] = useState(false);
    const [errorLoginMsg, setErrorLoginMsg] = useState(true);
    const [isPrevious, setIsPrevious] = useState(false)
    const [isFinal, setIsFinal] = useState(false)
    const [skipPreviousScreen, setSkipPreviousScreen] = useState('');
    const [objectiveValue, setObjectiveValue] = useState('');
    const [skillsValue, setSkillsValue] = useState('');
    const [genreValue, setGenreValue] = useState('');
    const [songGenreValue, setSongGenreValue] = useState('');
    const [questionValue, setQuestionValue] = useState([]);
    const [timeValue, setTimeValue] = useState({})


    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [showWhatsAppOtpModal, setShowWhatsAppOtpModal] = useState(false);
    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
    const [showWhatsAppRegisterModal, setShowWhatsAppRegisterModal] = useState(false);

    const [selectedFrequency, setSelectedFrequency] = useState(timeValue || { index: null, id: null });
    const savedData = userId ? personalizationSteps[userId] : personalizationSteps?.guest_user;

    const getStepAction = (step) => {
        switch (step) {
            case 2:
                return SKILL;
            case 3:
                return OBJECTIVE;
            case 4:
                return GENRE;
            case 5:
                return SONG_GENRE;
            case 6:
                return QUESTION;
            case 7:
                return RECOMMENDED_TIMES;
            default:
                return 'instrument';
        }
    };

    const getDivClass = (step) => {
        switch (step) {
            case 3:
                return 'second';
            case 6:
                return 'fifth';
            case 7:
                return 'eleventh';
            case 8:
                return 'eleventh';
            default:
                return 'third';
        }
    };


    const handleCloseSignIn = () => {
        setShowSignIn(false)
    }

    const handleCloseSignUp = () => {
        setShowSignUp(false)

    }

    useEffect(() => { }, [personalization]);
    // Fetching stored data here...
    useEffect(() => {
        if (savedData && Date.now() < savedData.expiryTimestamp) {
            // Restore state from saved data
            setStep(savedData.step);
            setSelectedInstrument(savedData.selectedInstrument);
            setParams(savedData.params);
            setActionHistory(savedData.actionHistory || []);
        }

        if (savedData && savedData.expiryTimestamp && Date.now() >= savedData.expiryTimestamp) {
            // Removing steps from the state
            dispatch({ type: 'REMOVE_PERSONALIZATION_STEPS', payload: userId ? userId : 'guest_user' });
        }

        dispatch({ type: 'CHANGE_INITIAL_STATES' });
    }, []);

    // Fetching data for each steps...
    useEffect(() => {
        const actionPayload = {
            step: step == FINAL_STEP ? step - 1 : step,
            selectedInstrument,
            params,
            actionHistory: [...actionHistory, getStepAction(step)],
            // expiryTimestamp: Date.now() + (5 * 60 * 1000)
            expiryTimestamp: Date.now() + (48 * 3600 * 1000)
        };
        dispatch({ type: 'SET_PERSONALIZATION_STEPS', payload: { userToken: userId ? userId : 'guest_user', data: actionPayload } });

        if (step < FINAL_STEP && !isFinal) {
            dispatch({ type: personalizationConst.GET_PERSONALIZATION_PENDING })
            personalizationAction.fetchPersonalization(params).then((response) => {
                if (response.data.data.length) {
                    dispatch({ type: personalizationConst.GET_PERSONALIZATION_SUCCESS, payload: response.data.data })
                } else {
                    dispatch({ type: personalizationConst.GET_PERSONALIZATION_FAILURE, error: '' })

                    // if (isPrevious) {
                    //     handlePreviousScreen()
                    // } else {
                    handleNextScreen('', step + 1)
                    // }
                }
                setStepProgress(perStepProgress * step)
            }).catch((error) => {
                dispatch({ type: personalizationConst.GET_PERSONALIZATION_FAILURE, error: error })
            })
        } else {
            return;
        }
        // }
    }, [step]);


    const handleCloseWhatsappModal = () => {
        setShowWhatsAppModal(false)
        onHide()

    }

    const handleCloseWhatsappOtpModal = () => {
        onHide()
        setShowWhatsAppOtpModal(false)

    }

    const handleCreateAccountModal = () => {
        onHide()
        setShowCreateAccountModal(false)

    }
    const handleCloseWhatsappRegisterModal = () => {
        setShowWhatsAppRegisterModal(false)
        onHide()
    }


    useEffect(() => {

        dispatch({ type: authConstants.RESET_FLAGS });

    }, [])

    // Function to handle instrument selection
    const handleNextScreen = (activeScreen, nextScreen, flag = '') => {
        if (flag) setSkipPreviousScreen(flag)
        if (loading) return;

        // Getting Skill with instrument_id here...
        if (nextScreen === 2 && nextScreen < FINAL_STEP) {
            setShowTimeScreen(false)
            const instrument = personalization.find(item => item.id === activeScreen);
            dispatch({ type: 'ACTIVE_INSTRUMENT', payload: { label: instrument.label.toLowerCase(), poster: instrument.image } })

            setSelectedInstrument(activeScreen);
            setActionHistory([...actionHistory, SKILL]);
            setParams({ action: SKILL, instrument_id: activeScreen });
        }
        // Getting Objective with skill_id here...
        if (nextScreen === 3 && nextScreen < FINAL_STEP) {
            setActionHistory([...actionHistory, OBJECTIVE]);
            setParams({ ...params, action: OBJECTIVE, skill_id: activeScreen });
        }
        // Genre progress screen
        if (nextScreen === 4 && nextScreen < FINAL_STEP) {
            setSelectedFrequency({ index: null, id: null })
            if (personalization.length) setActionHistory([...actionHistory, GENRE]);
            setParams({ ...params, action: GENRE, objective_id: activeScreen });
        }
        // Song genre progress screen
        if (nextScreen === 5 && nextScreen < FINAL_STEP) {
            setSelectedFrequency({ index: null, id: null })
            if (personalization.length) setActionHistory([...actionHistory, SONG_GENRE]);
            setParams({ ...params, action: SONG_GENRE, genre: activeScreen });
        }
        // Additional questions screen
        if (nextScreen === 6 && nextScreen < FINAL_STEP) {
            if (personalization.length) setActionHistory([...actionHistory, QUESTION]);
            setParams({ ...params, action: QUESTION, genre_song: activeScreen });

        }
        // Time screen
        if (nextScreen === 7 && nextScreen < FINAL_STEP) {
            setShowTimeScreen(true)
            if (personalization.length) setActionHistory([...actionHistory, RECOMMENDED_TIMES]);
            setParams({ ...params, action: RECOMMENDED_TIMES, question_ids: activeScreen });
        }

        if (nextScreen === FINAL_STEP) {
            setIsFinal(true);
            if (!authState.auth) {
                // setAuthView('signin');
                setStep(FINAL_STEP);
                setShowWhatsAppRegisterModal(true)

                return;
            }
        }


        if (step < FINAL_STEP) setStep(step + 1);

        if (
            (typeof activeScreen === 'number' && activeScreen !== 0) ||
            (Array.isArray(activeScreen) && !activeScreen.length && personalization.length)
        ) {
            dispatch({ type: 'CHANGE_PREVIOUS_STEP', payload: { step, data: personalization } });
        }
    };

    const handlePreviousScreen = (from = '') => {
        if (step == 1) {
            const url = new URL(window.location.href);
            url.searchParams.delete('personalisation');
            window.history.replaceState({}, '', url.toString());
        }
        if (step > 1) {
            //setIsPrevious(true)
            // Pop the last action from the history

            const newActionHistory = [...actionHistory];

            newActionHistory.pop();
            setActionHistory(newActionHistory);

            const updatedParams = { ...params };

            for (const key in updatedParams) {
                if (updatedParams[key] === null || updatedParams[key] === '') {

                    delete updatedParams[key];
                }
            }

            delete updatedParams[Object.keys(updatedParams).pop()];

            let previousStepNo = previousStep;
            setStep(previousStepNo);

            if (from !== 'onHide' && skipPreviousScreen) {
                previousStepNo = skipPreviousScreen;
                setStep(skipPreviousScreen);
                setSkipPreviousScreen('');

            }
            setParams({ ...updatedParams, action: getStepAction(previousStepNo) });

            dispatch({ type: 'CHANGE_PREVIOUS_STEP', payload: { step: previousStepNo - 1 } })
        } else {
            props?.setIsModalActive(false);
            dispatch({ type: 'CHANGE_PERSONALIZATION_STATE', payload: false });
        }
    };

    const handleSwitchForm = () => {
        setErrorLoginMsg(true)
        setAuthView('signin');
        setShowModule(true)
        setShowSignIn(true)
        setShowSignUp(false);
        setShowWhatsAppModal(false)

    }

    const handleSwitchSignIn = () => {
        setAuthView('signup');
        setShowSignUp(true)
        setShowSignIn(false)
        setShowModule(true)
        setShowWhatsAppModal(false)

    }

    // Saving personlization data here...
    useEffect(() => {
        if (authState?.auth && (step === FINAL_STEP)) {
            onHide()
            const updatedParams = { ...params };

            if (selectedFrequency.id) {
                updatedParams['time_id'] = selectedFrequency.id;
                setSelectedFrequency({ index: null, id: null })
            }

            delete updatedParams.action;
            dispatch(personalizationAction.savePersonalization(updatedParams, { Token: userToken }))
        }

    }, [authState?.auth, step]);

    // Redirecting on dashboard after the save personalization data...
    useEffect(() => {
        if (saveSuccess) {
            dispatch({ type: 'REMOVE_PERSONALIZATION_STEPS', payload: userId });
            dispatch({ type: 'REMOVE_PERSONALIZATION_STEPS', payload: 'guest_user' });
            // dispatch({ type: 'CHANGE_PERSONALIZATION_SAVE_STATE' });

            props?.setIsModalActive(false);
            // dispatch({ type: 'CHANGE_PERSONALIZATION_STATE', payload: false });

            navigate('/dashboard?activeTab=learningPath')
            // window.location.href = '/dashboard';
        }
    }, [saveSuccess]);


    useEffect(() => {
        if (authState.signUpFlag) setAuthView('signin');
    }, [authState.signUpFlag]);

    const onHide = () => {
        setIsFinal(false);
        // setAuthView('');
        // setStep(step - 1);

        if (!personalization.length) {
            handlePreviousScreen('onHide')
        }
    }

    const getDivId = (step) => {
        switch (step) {
            case 2:
                return 'first';
            case 3:
                return 'second';
            case 4:
                return 'third';
            case 5:
                return 'third';
            case 6:
                return 'fifth';
            case 7:
                return 'eleventh';
            case 8:
                return 'eleventh';
            default:
                return 'main';
        }
    };

    const closePersonalisation = () => {

        dispatch({ type: 'CHANGE_PERSONALIZATION_STATE', payload: false });
        props?.setIsModalActive(false);


    }
    

    return (
        <>
            <div className='personalizationSection'>
                {requestLoading ? <FinalScreen activeInstrumentPoster={activeInstrumentPoster} isBobShow={props?.isBobShow} /> :
                    <div id={`personalization-modal-${getDivId(step)}`} className="modal mainModalSection" style={{ display: 'block' , marginTop:props?.isBobShow ? '30px':'auto' }}>
                        <div className="personalization-modal">
                            <div className={`personalization-container flex-column ${step !== 2 ? getDivClass(step) : ''}-section-personalization`}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="custom-progress-bar w-90">
                                        <div className="custom-progress-compeleted" style={{ width: `${stepProgress}%` }}></div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center flex-column contents">
                                    <div  className="d-flex  justify-content-between  align-items-end mt-4  sm-p-3" >
                                        <div className="d-flex gap-2 justify-content-start   align-items-center">
                                            <img
                                                src="/assets/img/back-arrow.png"
                                                onClick={!loading ? handlePreviousScreen : undefined}
                                                alt="Back"
                                                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                                            />
                                            <p className="p-0 m-0 mob-arrow-head">Back</p>
                                        </div>
                                        <div style={{cursor:"pointer"}} onClick={() => closePersonalisation()} >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M20 20L4 4M20 4L4 20"
                                                    stroke="black"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>

                                    </div>




                                    {loading ?
                                        <div style={{ padding: '15%' }}>
                                            <div className="loader spinner-border m-5 d-table m-auto" role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                            <span className=" m-5 d-table m-auto">Loading...</span>
                                        </div>
                                        :
                                        <>
                                            {step === 1 &&
                                                <Instruments
                                                    instruments={personalization}
                                                    selectedInstrument={selectedInstrument}
                                                    onSelectInstrument={handleNextScreen}
                                                    setSelectedInstrument={setSelectedInstrument}
                                                    step={step}
                                                />
                                            }
                                            {step === 2 &&
                                                <Skills
                                                    skills={personalization}
                                                    step={step}
                                                    onSelectSkill={handleNextScreen}
                                                    activeInstrument={activeInstrument}
                                                    setSkillsValue={setSkillsValue}
                                                    skillsValue={skillsValue}
                                                />
                                            }
                                            {step === 3 &&
                                                <Objectives
                                                    objectives={personalization}
                                                    step={step}
                                                    onSelectObjective={handleNextScreen}
                                                    activeInstrument={activeInstrument}
                                                    loading={loading}
                                                    setObjectiveValue={setObjectiveValue}
                                                    objectiveValue={objectiveValue}
                                                // setShowTimeScreen={setShowTimeScreen}
                                                />
                                            }
                                            {/* Genre listing here */}
                                            {step === 4 &&
                                                <Genre
                                                    geners={personalization}
                                                    step={step}
                                                    onSelectGenre={handleNextScreen}
                                                    activeInstrument={activeInstrument}
                                                    loading={loading}
                                                    setGenreValue={setGenreValue}
                                                    genreValue={genreValue}
                                                />
                                            }
                                            {/* Song-genre listing here */}
                                            {step === 5 &&
                                                <SongGenre
                                                    songGeners={personalization}
                                                    step={step}
                                                    onSelectGenre={handleNextScreen}
                                                    activeInstrument={activeInstrument}
                                                    loading={loading}
                                                    setSongGenreValue={setSongGenreValue}
                                                    songGenreValue={songGenreValue}
                                                />
                                            }
                                            {step === 6 &&
                                                <Questions
                                                    questions={personalization}
                                                    step={step}
                                                    onSelectQuestions={handleNextScreen}
                                                    activeInstrument={activeInstrument}
                                                    setShowTimeScreen={setShowTimeScreen}
                                                    finalStep={FINAL_STEP}
                                                    loading={loading}
                                                    previousStep={previousStep}
                                                    previousStepData={previousStepData}
                                                    questionValue={questionValue}
                                                    setQuestionValue={setQuestionValue}
                                                />
                                            }
                                            {/* This screen will be display only for the Absoluter Beginner */}
                                            {(step === 7 || step === FINAL_STEP) &&
                                                <RecommendedTimes
                                                    recommendedData={personalization}
                                                    step={step}
                                                    onSelectTimes={handleNextScreen}
                                                    activeInstrument={activeInstrument}
                                                    finalStep={FINAL_STEP}
                                                    setShowTimeScreen={setShowTimeScreen}
                                                    selectedFrequency={selectedFrequency}
                                                    setSelectedFrequency={setSelectedFrequency}
                                                    loading={loading}
                                                    previousStep={previousStep}
                                                    previousStepData={previousStepData}
                                                    timeValue={timeValue}
                                                    setTimeValue={setTimeValue}

                                                />
                                            }
                                        </>
                                    }
                                </div>
                            </div>

                            {/* Graph section */}
                            <GraphSection />
                        </div>
                    </div>
                }
            </div>

            {authView === 'signin' &&
                <CourseSignIn
                    show={showSignIn}
                    setAuthView={setAuthView}
                    showModule={showModule}
                    handleSwitchForm={handleSwitchForm}
                    handleSwitchSignIn={handleSwitchSignIn}
                    setShowSignUp={setShowSignUp}
                    setShowSignIn={setShowSignIn}
                    authView={authView}
                    onHide={onHide}
                    handleCloseSignIn={handleCloseSignIn}
                    extStyle={'rgba(0, 0, 0, 0.5)'}
                    component='personalisation'
                    errorLoginMsg={errorLoginMsg}
                    setErrorLoginMsg={setErrorLoginMsg}
                    setShowWhatsAppModal={setShowWhatsAppModal}
                    setShowWhatsAppRegisterModal={setShowWhatsAppRegisterModal}
                />
            }
            {authView === 'signup' &&
                <CourseSignUp
                    show={showSignUp}
                    setAuthView={setAuthView}
                    showModule={showModule}
                    handleSwitchForm={handleSwitchForm}
                    handleSwitchSignIn={handleSwitchSignIn}
                    setShowModule={setShowModule}
                    setShowSignUp={setShowSignUp}
                    setShowSignIn={setShowSignIn}
                    authView={authView}
                    onHide={onHide}
                    extStyle={'rgba(0, 0, 0, 0.5)'}
                    handleCloseSignUp={handleCloseSignUp}
                    setShowWhatsAppRegisterModal={setShowWhatsAppRegisterModal}


                />
            }

            <CourseSignInWhatsapp showWhatsAppModal={showWhatsAppModal} handleCloseWhatsappModal={handleCloseWhatsappModal} setShowSignUp={setShowSignUp} setAuthView={setAuthView}
                setShowModule={setShowModule}
                handleSwitchSignIn={handleSwitchForm}
                setShowWhatsAppOtpModal={setShowWhatsAppOtpModal} handleSwitchForm={handleSwitchForm} setShowWhatsAppRegisterModal={setShowWhatsAppRegisterModal} />

            <WhatsAppOtpModal handleCloseWhatsappOtpModal={handleCloseWhatsappOtpModal} showWhatsAppOtpModal={showWhatsAppOtpModal} setShowCreateAccountModal={setShowCreateAccountModal} />

            <CreateAccountModal handleCloseWhatsappOtpModal={handleCloseWhatsappOtpModal} showCreateAccountModal={showCreateAccountModal} handleCreateAccountModal={handleCreateAccountModal} />

            <CourseRegisterWhatsapp showWhatsAppRegisterModal={showWhatsAppRegisterModal} handleCloseWhatsappRegisterModal={handleCloseWhatsappRegisterModal} setShowSignUp={setShowSignUp} setAuthView={setAuthView}
                setShowModule={setShowModule}
                handleSwitchSignIn={handleSwitchSignIn}
                setShowWhatsAppOtpModal={setShowWhatsAppOtpModal} handleSwitchForm={handleSwitchForm} setShowWhatsAppModal={setShowWhatsAppModal} />


        </>
    );
};

export default Personalization;
