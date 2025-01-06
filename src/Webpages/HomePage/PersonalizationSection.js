import React from 'react';
import LazyLoad from 'react-lazyload';

function PersonalizationSection(props) {
    return (
        <div className="personalised position-relative">
            {/* <div className="music-section mus-2">
                <div className="music-marquee">
                    <LazyLoad once>
                        <img loading="lazy"src="./assets/homepage/music.svg" alt="Music Icon" />
                    </LazyLoad>
                </div>
                <div className="music-marquee clone">
                    <LazyLoad once>
                        <img loading="lazy"src="./assets/homepage/music.svg" alt="Music Icon" />
                    </LazyLoad>
                </div>
            </div> */}
            <div className="inner">
                <p>Don’t know where to start?</p>
                <h4>Get a personalised learning path based on your skills and goals.</h4>
                <button className="btn-1 lets-btn mt-3" onClick={props?.handlePersonalization}>Let's Begin</button>
                {/* <div className="bottom">
                    <div className="left">
                        <LazyLoad once>
                            <img loading="lazy"src="./assets/homepage/piano-boy.webp" alt="Boy playing piano" style={{bottom: '-10px'}} />
                        </LazyLoad>
                    </div>
                    <div className="right">
                        <LazyLoad once>
                            <img loading="lazy"src="./assets/homepage/guitar-girl.webp" alt="Girl playing guitar"  style={{top: '30px'}} />
                        </LazyLoad>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default PersonalizationSection;
