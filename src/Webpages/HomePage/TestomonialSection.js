import React, { useEffect, useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';

const TestimonialSection =({testimonialData}) => {


    const marqueeRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (!marqueeRef.current?.contains(event.target)) {
                setIsPaused(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [isPaused]);

    useEffect(() => {
        const marqueeContent = document.querySelector('.Marquee-content');
        marqueeContent.style.animationPlayState = isPaused ? 'paused' : 'running';
    }, [isPaused]);

    return (
        <div className="dont-just text-center">
            <h6 style={{ marginBottom: '.5rem' }}>Don’t just take our word for it</h6>
            <p style={{ marginBottom: '1rem' }}>Hear from our students themselves</p>
            <Link to={'/membership'} className="btn-1 exp-memb">Explore Memberships</Link>
            <div className="dont-just-slider mt-3">
                <div className={`cards-div Marquee`}>
                    <div className={`Marquee-content`} ref={marqueeRef}>
                        {testimonialData?.length && testimonialData.map((data, index) => (
                            <div
                                className="Marquee-tag"
                                key={index}
                                onClick={(e) => { togglePause(e) }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="boxes">
                                    <h5>{data?.title}</h5>
                                    <p>{data?.text}</p>
                                    <div className="profile-section">
                                        {/* <img loading="lazy"src='/assets/img/avatar/user.png' alt='' /> */}
                                        <div>
                                            <h4>{data?.testimonial_by}</h4>
                                            <p>{data?.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;
