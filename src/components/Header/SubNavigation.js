import React from 'react';

const SubNavigation = (props) => {
    return (
        <div id="subnav">
            <div className="subnav">
                <p>Home</p>
                {props?.authState?.userDetails?.hash || props?.socialToken ?
                    <div className="d-flex align-items-center gap-3">
                        <img id="dollar" src="/assets/homepage/Frame 1410085184.svg" alt="" />
                        <p>{props?.streakCount?.user_data?.wallet}</p>
                        <div className="fire">
                            <img src="/assets/homepage/Vector.png" alt="" />
                        </div>
                        <p>{props?.streakCount?.daily_streak} days</p>
                    </div>
                : ''}
            </div>
        </div>
    );
};

export default SubNavigation;
