import React, { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HoverVideoPlayer from 'react-hover-video-player';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import useWindowDimensions from '../../Helpers/useWindowDimensions';


const SliderSection = memo(() => {

    const { windowWidth } = useWindowDimensions();

    const navigate = useNavigate();
    const { recentLessonSongsData } = useSelector((state) => state.homepage)


    const handleNavigation = (hash) => {
        navigate(hash);
    }
    const [hoveredCards, setHoveredCards] = useState({});

    const handleMouseEnter = (id) => {
        setHoveredCards(prevState => ({ ...prevState, [id]: true }));
    };

    const handleMouseLeave = (id) => {
        setHoveredCards(prevState => ({ ...prevState, [id]: false }));
    };

    const truncate = (content) => {
        const truncatedContent =
            content &&
                content?.length > 100
                ? `${content.slice(0, 100)}...`
                : content;
        return truncatedContent
    }

    const getPath = (path) => path?.[path.length - 1]?.hash;






    return (
        <>
            {recentLessonSongsData?.length > 0 && (
                <div className="course-song-slider" style={{ width: '90%', margin: '0px auto' }}>
                    <h3>A sneak peek at our latest courses and song lessons</h3>
                    <Slider
                        dots={true}
                        arrows={true}
                        infinite={true}
                        slidesToShow={1}
                        slidesToScroll={1}
                        prevArrow={
                            <img
                                className="a-left control-c prev slick-prev slick-arrow"
                                src="/assets/img/learning/left-arrow.svg"
                                alt="Previous"
                            />
                        }
                        nextArrow={
                            <img
                                className="a-right control-c next slick-next slick-arrow"
                                src="/assets/img/learning/right-arrow.svg"
                                alt="Next"
                            />
                        }
                        responsive={[
                            {
                                breakpoint: 2000,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 1,
                                    infinite: true,
                                    dots: true,
                                    arrows: true,
                                },
                            },
                            {
                                breakpoint: 1600,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                    infinite: true,
                                    dots: true,
                                    arrows: true,
                                },
                            },
                            {
                                breakpoint: 1220,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                    infinite: true,
                                    dots: true,
                                    arrows:false
                                },
                            },
                            {
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                    initialSlide: 1,
                                    infinite: true,
                                    dots: true,
                                    arrows:false

                                },
                            },
                            {
                                breakpoint: 780,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    infinite: true,
                                    dots: true,
                                    autoplay: true,
                                    arrows:false

                                },
                            },
                        ]}
                        className="songs-slide"
                    >
                        {recentLessonSongsData.length > 0 &&
                            recentLessonSongsData.map((item, index) => (
                                <div
                                    className="card swiper-slide slick-slider"
                                    style={{ position: 'relative', width: '300px', height: '360px' }}
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                    onMouseLeave={() => handleMouseLeave(item.id)}
                                >
                                    {hoveredCards[item.id] ? (
                                        <HoverVideoPlayer
                                            id="video"
                                            videoSrc={item?.lessons[0]?.videos.medium}
                                            loadingOverlay={
                                                <div className="loading-overlay">
                                                    <div className="loading-spinner" />
                                                </div>
                                            }
                                            controls
                                            controlsList="nodownload nofullscreen noplaybackrate autoplay"
                                            focused={!!hoveredCards[item.id]}
                                            paused={!hoveredCards[item.id]}
                                        />
                                    ) : (
                                        <img loading="lazy"className="banner" src={item.poster} alt={item.title} />
                                    )}

                                    <Link
                                        to={`${process.env.REACT_APP_URL}/${getPath(item?.path)}/${item?.hash}-${item?.id}`}
                                    >
                                        <div className="card-body">
                                            <p className="card-title">{item.title}</p>
                                            <p className="card-text">{item?.artist}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </Slider>
                </div>
            )}

        </>
    );
})

export default SliderSection;

