import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const InstructorSection = ({ instructors }) => {
    // useEffect(() => {
    //     var swiper = new window.Swiper(".instructor-slider", {
    //         slidesPerView: 1,
    //         spaceBetween: 10,

    //         grabCursor: true,
    //         pagination: {
    //             el: ".swiper-pagination",
    //             clickable: true,
    //         },
    //         navigation: {
    //             nextEl: ".a-right",
    //             prevEl: ".a-left",
    //         },
    //         breakpoints: {
    //             // when window width is >= 320px
    //             320: {
    //                 slidesPerView: 1,
    //                 spaceBetween: 20,
    //             },
    //             // when window width is >= 480px
    //             480: {
    //                 slidesPerView: 1,
    //                 spaceBetween: 30,
    //             },
    //             // when window width is >= 640px
    //             640: {
    //                 slidesPerView: 3,
    //                 spaceBetween: 40,
    //             },
    //             940: {
    //                 slidesPerView: 3,
    //                 spaceBetween: 40,
    //             },
    //             1200: {
    //                 slidesPerView: 5,
    //                 spaceBetween: 40,
    //             },
    //             1366: {
    //                 slidesPerView: 6,
    //                 spaceBetween: 40,
    //             },
    //         },
    //     });

    //     return () => {
    //         if (swiper) {
    //             swiper.destroy();
    //         }
    //     };
    // }, [])

    return (
        <div className="instructors">
            <h6>Learn from our experts</h6>
            <div className="cards">
                <div className="arrow">
                    <div className="arr left">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                        >
                            <path
                                d="M7.28998 0.904148L1.39928 6.79485L7.28998 12.6855"
                                stroke="#222222"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.00763 6.66992H14.6009"
                                stroke="#222222"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                <div className="instructor-slider overflow-hidden">
                    <div className="card-in swiper-wrapper">
                        {instructors?.slice(0, 14)?.map((instructor, index) => (
                            <div className="user swiper-slide" key={index}>
                                <div className="prof">
                                    <Link to={`/instructors/${instructor?.hash}`}>
                                        <img loading="lazy"loading='lazy'
                                            src={instructor?.poster}
                                            alt="inst"
                                        />
                                    </Link>
                                </div>
                                <Link to={`/instructors/${instructor?.hash}`}><p>{instructor?.name}</p></Link>
                            </div>

                        ))}
                    </div>
                </div>
                <div className="arrow">
                    <div className="arr right">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                        >
                            <path
                                d="M8.71002 12.6857L14.6007 6.795L8.71002 0.904297"
                                stroke="#222222"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13.9924 6.91992L1.39913 6.91992"
                                stroke="#222222"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <Link className='btn-instru' to={'/instructors'}>View Our Instructors</Link>
        </div>
    );
};

export default InstructorSection;
