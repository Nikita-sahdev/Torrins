import React, { useState } from 'react'
import './LatestLaunch.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useWindowDimensions from '../../../Helpers/useWindowDimensions'
import { Box, Tab, Tabs } from '@mui/material'

export const LatestLaunch = () => {

    const { windowWidth } = useWindowDimensions();
    const [value, setValue] = useState(0);
    const { recentLessonSongsData , recentCourseData } = useSelector((state) => state.homepage)

    
    const getPath = (path) => path?.[path.length - 1]?.hash;


    const truncate = (content, count = 100) => {
        const truncatedContent =
            content &&
                content?.length > count
                ? `${content.slice(0, count)}...`
                : content;
        return truncatedContent
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='latest-launches'>

            {
                windowWidth > 991 ? <div className='contents col-lg-12'>
                    <div className='latest-song col-lg-5'>
                        <h3>Latest Song Launches</h3>
                        <div className='song-contents mt-4'>
                            {recentLessonSongsData && recentLessonSongsData?.slice(0, 4)?.map((item, index) => (
                                <Link to={`${process.env.REACT_APP_URL}/${getPath(item?.path)}/${item?.hash}-${item?.id}`} key={index} className='d-flex gap-2 mb-3'>
                                    <img loading="lazy"src={item?.poster} alt='' />
                                    <div>
                                        <p>{truncate(item?.title)}</p>
                                        <span>{item?.artist}</span>
                                    </div>
                                </Link>
                            ))}
                            {/* <Link className='btn btn-song' to={'/guitar-lessons/song-lessons'}>View All Songs</Link> */}
                        </div>
                    </div>
                    <hr />
                    <div className='latest-course col-lg-5'>
                        <h3>Latest Courses</h3>
                        <div className='song-contents mt-4'>
                            {recentCourseData && recentCourseData?.slice(0, 4)?.map((item, index) => (
                                <Link to={`${process.env.REACT_APP_URL}/${getPath(item?.path)}/${item?.hash}-${item?.id}`} key={index} className='d-flex gap-2 mb-3'>
                                    <img loading="lazy"src={item?.poster} alt='' />
                                    <div>
                                        <p>{truncate(item?.title)}</p>
                                        <span>{item?.instructor?.name}</span>
                                    </div>
                                </Link>
                            ))}
                            {/* <Link className='btn btn-course' to={'/guitar-lessons'}>Explore All Courses</Link> */}
                        </div>

                    </div>
                </div>
                    :
                    <div className='latest-release'>
                        <h3>Our latest releases</h3>

                        <Box>
                            <Tabs value={value} onChange={handleChange} className='tab-name'>
                                <Tab label="Song Lessons" />
                                <Tab label="Courses" />
                            </Tabs>
                            {value === 0 && (
                                <Box>
                                    <div className='song-contents mt-4'>
                                        {recentLessonSongsData && recentLessonSongsData?.slice(0, 4)?.map((item, index) => (
                                            <Link to={`${process.env.REACT_APP_URL}/${getPath(item?.path)}/${item?.hash}-${item?.id}`} key={index} className='d-flex gap-2 mb-3'>
                                                <img loading="lazy"src={item?.poster} alt='' />
                                                <div>
                                                    <p>{truncate(item?.title, 20)}</p>
                                                    <span>{item?.artist}</span>
                                                </div>
                                            </Link>
                                        ))}
                                        {/* <Link className='btn btn-song' to={'/guitar-lessons/song-lessons'}>View All Songs</Link> */}
                                    </div>
                                </Box>
                            )}
                            {value === 1 && (
                                <Box>
                                    <div className='song-contents mt-4'>
                                        {recentCourseData && recentCourseData?.slice(0, 4)?.map((item, index) => (
                                            <Link to={`${process.env.REACT_APP_URL}/${getPath(item?.path)}/${item?.hash}-${item?.id}`} key={index} className='d-flex gap-2 mb-3'>
                                                <img loading="lazy"src={item?.poster} alt='' />
                                                <div>
                                                    <p>{truncate(item?.title, 20)}</p>
                                                    <span>{item?.instructor?.name}</span>
                                                </div>
                                            </Link>
                                        ))}
                                        {/* <Link className='btn btn-course' to={'/guitar-lessons'}>Explore All Courses</Link> */}
                                    </div>
                                </Box>
                            )}
                        </Box>

                    </div>

            }





        </div>
    )
}
