import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../Helpers/useWindowDimensions';

const SubscriberSection = memo(() => {
    const { windowWidth } = useWindowDimensions();

    const isMobile = windowWidth <= 767;
    return (
        <div id='subscriberSection' >
            <div id="sub1">
                <div className="text-section1 subscribers">
                    <p>Why 17000+ subscribers chose Torrins?</p>
                    <div className="txt-overlayer mb-5">
                        <div className="elem1">
                            <div className="elem-in">
                                <h6>We offer more than 10,000 video lessons</h6>
                            </div>
                        </div>
                    </div>
                    <Link to={'/guitar-lessons'} className="btn-1 explore" style={{marginBottom: '.5rem'}}>Explore All Courses</Link>
                </div>
                <div className="subscribers" id="mid">
                    {!isMobile && <div className="mid position-relative overflow-hidden">
                        <img loading="lazy"src="./assets/homepage/laptop.png" alt="laptop" />
                        <div className="cover-div overflow-hidden">
                            <div className="upper">
                                <video preload="auto" playsInline className="img11" autoPlay muted loop
                                    src="./assets/homepage/Courses page crop version.webm" poster={`${process.env.REACT_APP_URL}/assets/homepage/Homepage Video Thumbnails/Course Desktop.jpg`}></video>
                            </div>
                        </div>
                    </div>}

                    {isMobile && <div className="mbl position-relative  mobile-wrapper">
                        <img loading="lazy"className="mbl-img" src="./assets/homepage/phone.png" alt="phone" />
                        <div className="cover-div overflow-hidden" style={{ top: '-48px !important' }}>
                            <div className="upper">
                                <video preload="auto" playsInline className="img11" autoPlay muted loop
                                    src="./assets/homepage/Final Msite Video 232x502.webm" poster={`${process.env.REACT_APP_URL}/assets/homepage/Homepage Video Thumbnails/Course Msite.jpg`}></video>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

            <div id="sub22">
                <div className="text-section2 subscribers">
                    <p>Why 17000+ subscribers chose Torrins?</p>
                    <div className="txt-overlayer mb-5">
                        <div className="elem1">
                            <div className="elem-in">
                                <h6 style={{ marginBottom: '.5rem' }}>Explore from our library of  1000+ song lessons</h6>
                            </div>
                        </div>
                    </div>
                    <Link to={'/guitar-lessons/song-lessons-656'} className="btn-1 explore">Explore All Songs</Link>
                </div>
                <div className="subscribers" id="mid2">
                    {!isMobile && <div className="mid position-relative overflow-hidden">
                        <img loading="lazy"src="./assets/homepage/laptop.png" alt="laptop" />
                        <div className="cover-div overflow-hidden">
                            <div className="upper">
                                <video preload="auto" playsInline className="img11" autoPlay muted loop src="./assets/homepage/Second video.webm" poster={`${process.env.REACT_APP_URL}/assets/homepage/Homepage Video Thumbnails/Songs Desktop.jpg`}></video>
                            </div>
                        </div>
                    </div>}

                    {isMobile && <div className="mbl position-relative mobile-wrapper">
                        <img loading="lazy"className="mbl-img" src="./assets/homepage/phone.png" alt="phone" />
                        <div className="cover-div overflow-hidden" style={{ top: '-48px !important' }}>
                            <div className="upper">
                                <video preload="auto" playsInline className="img11" autoPlay muted loop src="/assets/homepage/Final Msite Video (232_502).webm" poster={`${process.env.REACT_APP_URL}/assets/homepage/Homepage Video Thumbnails/Songs Msite.jpg`}></video>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

            <div id="sub3">
                <div className="text-section3 subscribers">
                    <p>Why 17000+ subscribers chose Torrins?</p>    
                    <div className="txt-overlayer mb-5">
                        <div className="elem1">
                            <div className="elem-in">
                                <h6 style={{ marginBottom: '.5rem' }}>We make learning fun and rewarding</h6>
                            </div>
                        </div>
                    </div>
                    <Link to={'/membership'} className="btn-1 explore">Explore Memberships</Link>
                </div>
                <div className="subscribers" id="mid3">
                    {!isMobile && <div className="mid position-relative overflow-hidden">
                        <img loading="lazy"src="./assets/homepage/laptop.png" alt="phone" />
                        <div className="cover-div overflow-hidden">
                            <div className="upper">
                                <video preload="auto" playsInline className="img11" autoPlay muted loop src="./assets/homepage/Final Desktop Video.webm" poster={`${process.env.REACT_APP_URL}/assets/homepage/Homepage Video Thumbnails/Gamification desktop.jpg`}></video>
                            </div>
                        </div>
                    </div>}

                    {isMobile && <div className="mbl position-relative  mobile-wrapper">
                        <img loading="lazy"className="mbl-img" src="./assets/homepage/phone.png" alt="phone" />
                        <div className="cover-div overflow-hidden" style={{ top: '-48px !important' }}>
                            <div className="upper">
                                <video preload="auto" playsInline className="img11" autoPlay muted loop src="./assets/homepage/Final Msite Video Gamilfication 232x502.webm"  poster={`${process.env.REACT_APP_URL}/assets/homepage/Homepage Video Thumbnails/Gamification Msite.jpg`}></video>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
})

export default SubscriberSection;
