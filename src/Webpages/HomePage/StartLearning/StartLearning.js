import React from 'react'
import './StartLearning.scss'
import { Link } from 'react-router-dom';

export const StartLearning = (props) => {

    const data = [
        { number: `${props?.lessonsCount || 0}`, label: 'Video Lessons' },
        { number: `${props?.songsCount || 0}`, label: 'Song Lessons' },
        { number: `${props?.allCounts?.countries|| 0}`, label: 'Countries' },
        { number: `${props?.allCounts?.instructorsCount || 0}`, label: 'Instructors' }
    ];

    return (
        <div className='start-learning-container'>

            <div className='containers col-lg-12'>
                <div className='contents col-lg-6'>
                    <h3>Learn and play our courses and song lessons</h3>
                    <p>Leading music educators since 2010</p>
                    <Link onClick={props?.handlePersonalization} className="start-btn mt-2">Start Learning</Link>
                </div>
                <div className='count-container col-lg-6'>
                    {data?.map((item, index) => (
                        <div key={index} className='count-content'>
                            <p>{item?.number}</p>
                            <span>{item?.label}</span>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}
