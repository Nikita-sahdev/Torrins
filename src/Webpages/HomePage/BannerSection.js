import React, { memo } from 'react';
import CountUp from 'react-countup';
import useWindowDimensions from '../../Helpers/useWindowDimensions';



const BannerSection = memo((props) => {

    const { windowWidth } = useWindowDimensions();

    const users = props?.users?.toString().split("");

    return (
        <div className="banner" style={{ top: '0px !important', marginTop: '-2px' }}>

            {windowWidth > 981 ?
                <video playsInline preload="auto" class="d-none d-lg-flex d-md-flex" autoPlay muted loop src={`${process.env.REACT_APP_URL}/assets/homepage/home_banner_video_new.webm`} poster={`${process.env.REACT_APP_URL}/assets/homepage/Homepage Video Thumbnails/Banner Desktop.webp`}></video> :
                <video preload="auto" class="d-flex  d-lg-none d-md-none mobile" autoPlay muted loop src={`${process.env.REACT_APP_URL}/assets/homepage/mobile-banner.webm`} playsInline poster={`${process.env.REACT_APP_URL}/assets/homepage/Homepage Video Thumbnails/Banner Mobile.jpg`}></video>
            }

            <div className="overlay">
                <div className="banner-txt">
                    <h2>Learn music and unleash <br />the rockstar in you</h2>
                    <p style={{ marginBottom: '1rem' }}>Start learning for free</p>
                    <button style={{ cursor: 'pointer' }} target='_blank' onClick={props?.handlePersonalization}>Get Started</button>

                    <div className="Active-Learners mt-5">
                        <div className="d-flex gap-2">
                            {users?.length > 0 && users.map((digit, index) => (
                                <div className="count" key={index}>
                                    <p>
                                        <CountUp
                                            start={0}
                                            end={digit}
                                            duration={3}
                                            delay={index * 0.7}
                                        />
                                    </p>
                                </div>
                            ))}
                        </div>
                        <h6>Active Learners</h6>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default BannerSection;
