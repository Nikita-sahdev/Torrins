import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';

const GraphSection = () => {
    const ref = useRef(null);

    // Define the animation properties using useSpring
    const [animationProps, setAnimationProps] = useSpring(() => ({
        from: { transform: 'translateX(0%)' },
        to: { transform: 'translateX(-58%)' },
        config: { duration: 10000 },

        onRest: () => {
            // Restart the animation when it reaches the end point
            setAnimationProps({
                from: { transform: 'translateX(0%)' },
                to: { transform: 'translateX(-58%)' },
                reset: true,
            });
        },
    }));

    return (
        <div className="graph-section">
            <animated.img
                ref={ref}
                src="./assets/img/Personalization/movingGraph.svg"
                alt="Graph"
                className="moving-graph"
                style={animationProps}
            />
        </div>
    );
};

export default GraphSection;
