import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FeedbackSection = memo(() => {
    const navigate = useNavigate()

    const handleNavigation = (e) => {
        navigate('/membership');
    }

    return (
        

        <div className="feedback container-fluid">
            <div className="feed-in">
                <div className="row" id="playing">
                    <div className="col-12 col-sm-6">
                        <div className="left" style={{ transform: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
                            <h6>
                                Get expert feedback <br/>on your playing for <br/> effective learning 
                               
                            </h6>
                            <div className="d-sm-flex align-items-center gap-2 mt-4">
                                <Link onClick={(e) => handleNavigation(e)} className="btn-1 mb-3 mb-sm-0" to="/membership" style={{marginRight: 'unset'}}>
                                    Explore Memberships
                                </Link>
                            </div>
                            <p>1500 subscribers found this feature helpful</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 get-expt">
                        <div className="right d-flex justify-content-end position-relative">
                            <div className="mid-img">
                                <video playsInline autoPlay muted loop src="./assets/homepage/Home Page instructor.webm" ></video>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row loop-sec">
                    <div className="col-12 col-sm-6">
                        <div className="left" style={{ transform: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
                            <h6>
                                Loop any part of the<br />
                                lesson to learn any <br />
                                technique efficiently
                            </h6>
                            <div className="d-sm-flex align-items-center gap-2 mt-4">
                                <Link onClick={(e) => handleNavigation(e)} className="btn-1 mb-3 mb-sm-0" to="/membership" style={{marginRight: 'unset'}}>
                                    Explore Memberships
                                </Link>
                            </div>
                            <p>Voted as the best feature on Torrins</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 get-expt">
                        <div className="right d-flex justify-content-end position-relative">
                            <div className="mid-img">
                                <video playsInline loop autoPlay muted src="./assets/homepage/Home page loop timer.webm"></video>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row lesson-sec">
                    <div className="col-12 col-sm-6">
                        <div className="left" style={{ transform: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
                            <h6>Lessons shot from <br />multiple angles for <br />thorough learning</h6>
                            <div className="d-sm-flex align-items-center gap-2 mt-4">
                                <Link onClick={(e) => handleNavigation(e)} className="btn-1 mb-3 mb-sm-0" to="/membership" style={{marginRight: 'unset'}}>
                                    Explore Memberships
                                </Link>
                            </div>
                            <p>Helps to understand finger placement better</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 get-expt">
                        <div className="right d-flex justify-content-end position-relative">
                            <div className="mid-img position-relative">
                                <div className="inner-img">
                                    <video playsInline autoPlay muted loop className="w-100" src="./assets/homepage/Ehsaan Noorani.webm"  poster={`${process.env.REACT_APP_URL}/assets/homepage/Homepage Video Thumbnails/Ehaan Noorani.jpg`}></video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default FeedbackSection;
