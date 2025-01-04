import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { dashboardAction } from "../../Action/User/dashboard.actions";

const LearningProgress = ({learningData, loading, handlePersonalization, token, handleDelete}) => {
    const dispatch = useDispatch()
    const parseDurationTime = (durationString) => {

        if (durationString) {
            const [hours, minutes, seconds] = durationString?.split(":").map(Number);
    
            let message = '';
        
            if (hours > 1) {
                message = `${hours} hrs remaining`;
            } else if (hours == 1) {
                message=`${hours} hr remaining`
            } else if (minutes > 0) {
                message = `${minutes} mins remaining`;
            } else if (seconds > 0) {
                message = `T${seconds} secs remaining`;
            } else {
                message = ``;
            }
            return message
        }
        
    }

    return (
        <>
            {learningData?.length ? learningData.map((learning, index )=> {   
                const reverseIndex = learningData.length - 1 - index;  
                let personalizationId =  learning.user_personalisation;
                let lastIndexOfPath = (learning?.path[learning.path.length - 1]) ? learning?.path[learning.path.length - 1] : {};
                let courseUrl = '/' + lastIndexOfPath.hash + '/' + learning.hash + '-' + personalizationId
                
                return (
                    <div className="course-container ">
                        <div
                            className="border-bottom d-flex bg-white p-3 course-card align-items-start justify-content-between">
                            <div className="d-none d-md-flex align-items-center gap-3" style={{width: '100%'}}>
                                <div className="container-course-img">
                                    <Link to={courseUrl}>
                                        <img loading="lazy"src={learning?.poster} alt="" />
                                        <img loading="lazy"className="play-icon" src="assets/img/playicon.svg" alt="" />
                                    </Link>
                                </div>

                                <div className="second-card d-flex">
                                    <div>
                                        <Link to={courseUrl}><h6>{`Path ${reverseIndex+1}-${learning?.title}`}</h6></Link>
                                        <span className="size-12">{learning?.parents[0]?.total_progress}/{learning?.parents[0]?.total} modules completed</span>
                                        {/* <Link to={courseUrl}><h5>{learning?.title}</h5></Link> */}
                                        {/* <div className="custom-progress-bar learning-progress">
                                            <div className="custom-progress-compeleted" style={{ width: `${learning?.completion_progress}` }}></div>
                                        </div> */}
                                        <div className=" remaining d-flex "> 
                                            <p className="custom-badge">{learning?.path[2]?.title}</p>
                                                {learning?.completion_progress && parseInt(learning?.completion_progress) !== 100 && parseDurationTime(learning?.remaining_duration) ? 
                                                    <>
                                                        <div className="separator" style={{marginTop: '17px'}}></div>
                                                        <p className="custom-badge">
                                                            <img src="./assets/img/clockGrey.png" alt="" />
                                                            {parseDurationTime(learning?.remaining_duration)}
                                                        </p>
                                                        {/* <p  className="custom-badge">Curated on : 15th Dec 2021</p> */}
                                                    </>
                                                : ''}
                                        </div>
                                    </div>
                                    <div className="d-flex" style={{gap: '27px', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <p id='paypal-button' data-bs-toggle="modal" data-bs-target="#delete-modal"onClick={()=> handleDelete(learning?.user_personalisation)} style={{color: '#262626', fontSize:'12px'}}>Delete</p>
                                        <div class="circle-container">
                                            <div class={`circle percentage-${parseInt(learning?.completion_progress)}`}>
                                                <span>{`${learning?.completion_progress}`}</span>
                                                <div class="percentage-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {learning?.completion_progress && parseInt(learning?.completion_progress) !== 100 && parseDurationTime(learning?.remaining_duration) ? 
                                        <p className="custom-badge">
                                            <img loading="lazy"src="./assets/img/clock.png" alt="" />
                                            {parseDurationTime(learning?.remaining_duration)}
                                        </p>
                                    : ''} */}
                                </div>
                            </div>

                            {/* mobile */}
                            <div className="d-flex align-items-center gap-3 d-md-none" style={{width: '100%'}}>
                                <div className="container-course-img" style={{marginTop: '-49px'}}>
                                    <Link to={courseUrl}>
                                        <img src={learning?.poster} alt="" />
                                        <div>
                                        <div class="circle-container">
                                            <div class={`circle percentage-${parseInt(learning?.completion_progress)}`}>
                                                <span>{`${learning?.completion_progress}`}</span>
                                                <div class="percentage-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                    </Link>
                                </div>

                                <div className="second-card d-flex">
                                    <div>
                                        <Link to={courseUrl}><h6>{`Path ${reverseIndex+1}-${learning?.title}`}</h6></Link>
                                        <div className=" remaining d-flex " style={{marginLeft: '-104px', marginTop: '24px'}}> 
                                            <p className="custom-badge">{learning?.path[2]?.title}</p>
                                                {learning?.completion_progress && parseInt(learning?.completion_progress) !== 100 && parseDurationTime(learning?.remaining_duration) ? 
                                                    <>
                                                        <div className="separator" style={{marginTop: '17px'}}></div>
                                                        <p className="custom-badge">
                                                            <img src="./assets/img/clockGrey.png" alt="" />
                                                            {parseDurationTime(learning?.remaining_duration)}
                                                        </p>
                                                        {/* <p  className="custom-badge">Curated on : 15th Dec 2021</p> */}
                                                    </>
                                                : ''}
                                        </div>
                                    </div>
                                    <div class="action-dropdown" style={{width:'16px'}}>
                                        <div class="dropdown">
                                            <button
                                                class="btn dropdown-toggle"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i class="bi bi-three-dots-vertical" style={{fontSize: '22px'}}></i>
                                            </button>
                                            <ul
                                                class="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton1"
                                            >
                                                <li>
                                                    <a
                                                        class="dropdown-item delete"
                                                        href="javascript:void(0)"
                                                        onClick={()=> handleDelete(learning?.user_personalisation)}
                                                    >
                                                        Delete
                                                    </a>
                                                </li>
                                            </ul> 
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) : 
                ! loading ? 
                <div className="col-md-12 my-learning-section">
                    <div className="content">Get a personalised learning path based on your skills and goals.</div>
                  <button className="get-started" onClick={handlePersonalization}>Get Started</button>
                </div> : ''
            }
        </>
    );
};

export default LearningProgress;
