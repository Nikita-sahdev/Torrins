import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../../Utility/ProgressBar";

const CourseHistory = ({loading, total, lessonHistory}) => {
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
                message = `${seconds} secs remaining`;
            } else {
                message = ``;
            }
            return message
        }
        
    }
    
    function parseTimeToSeconds(timeString) {
        const parts = timeString?.split(':');
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const seconds = parseInt(parts[2]);
        
        return hours * 3600 + minutes * 60 + seconds;
    }

    return (
        <>
            {lessonHistory?.length ? lessonHistory.map(historyData => {
                let lastPath=historyData?.path?.[historyData?.path.length - 1];
                let parent = (historyData?.parents && historyData.parents.length > 0) ? historyData.parents[0] : {};
                let courseUrl = '/'+historyData?.path[(historyData?.path?.length - 1)]?.hash + '/'+ historyData?.hash +'-'+ historyData?.id;
                return (
                    <div className="border-bottom d-flex bg-white  course-history align-items-start justify-content-between mb-2">
                        <div className="d-none d-md-flex  container gap-3 ">
                            <div className="container-course-img">
                                <Link to={courseUrl}><img loading="lazy" alt='' className="video" src={historyData?.poster} /><img loading="lazy" alt='' className="play-icon" src="assets/img/playicon.svg" />
                                </Link>
                            </div>

                            <div className="second-card d-flex">
                                <div>
                                    <h6>{parent?.title}</h6>
                                    {/* <p className="size-12 mb-1">{historyData?.position}/{parent?.total} modules completed</p> */}
                                    {/* <span className="size-12">Lesson {historyData?.position}</span> */}
                                    <Link to={courseUrl}><h3>{lastPath?.title}</h3></Link>
                                    <div className=" remaining d-flex "> 
                                        <p className="custom-badge">{historyData?.instrument}</p>
                                            {parseTimeToSeconds(historyData?.remaining_duration) !== 0 && (
                                                <>
                                                    <div className="separator" style={{marginTop: '17px'}}></div>
                                                    <p className="custom-badge">
                                                        <img alt='' src="assets/img/clockGrey.png" />
                                                        {parseDurationTime(historyData?.remaining_duration)}
                                                    </p>
                                                </>
                                            )}
                                    </div>
                                </div>
                                
                                <div class="circle-container">
                                    <div class={`circle percentage-${parseInt(historyData.parents[2]?.completion_progress)}`}>
                                        <span>{`${historyData.parents[2]?.completion_progress}`}</span>
                                        <div class="percentage-bar"></div>
                                    </div>
                                </div>

                            </div>
                           
                        </div>
                        <div className="d-flex d-md-none" style={{width:'100%'}}>
                        <div className="d-flex  container gap-3 d-md-none">
                            <div className="container-course-img d-flex">
                                <div >
                                    <Link to={courseUrl}>
                                        <img alt='' className="video" src={historyData?.poster} />
                                        <div class="circle-container">
                                            <div class={`circle percentage-${parseInt(historyData.parents[2]?.completion_progress)}`}>
                                                <span>{`${historyData.parents[2]?.completion_progress}`}</span>
                                                <div class="percentage-bar"></div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="title-div" >
                                    <h6 style={{textAlign:'left',fontWeight: '600'}}>{parent?.title}</h6>
                                    <Link to={courseUrl}><h3 className='historyT-title'>{lastPath?.title}</h3></Link> 
                                </div>
                              
                               
                            </div>

                            <div className="second-card d-flex">
                                <div>
                                
                                <div className=" remaining d-flex "> 
                                <p className="custom-badge" style={{marginRight: '-7px'}}>{historyData?.instrument}</p>
                                {parseTimeToSeconds(historyData?.remaining_duration) !== 0 && (
                                    <>
                                        <div className="separator" style={{marginTop: '13px'}}></div>
                                        <p className="custom-badge" style={{marginLeft: '-7px'}}>
                                            <img alt='' src="assets/img/clockGrey.png" />
                                            {parseDurationTime(historyData?.remaining_duration)}
                                        </p>
                                    </>
                                )}
                                </div>
                                </div>
                                
                               

                            </div>
                           
                        </div>
                        <svg style={{marginTop: '31px',marginLeft: '31px', width: '21px'}} xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73452 7.91085L1.51815e-05 1.1767L1.13271 0.0439453L9 7.91082L1.13272 15.7781L0 14.6454L6.73452 7.91085Z" fill="#222222"/>
                                </svg>
                                </div>
                    </div>
                )
            }) : 
                ! loading && <div style={{ textAlign: 'center',marginTop: '20%' }}>No record found.</div>
            }
        </>
    );
};

export default CourseHistory;
