import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BottomNavigation = (props) => {
    const currentUrl = useLocation();
    const [currentPage , setCurrentPage]  =useState('')
    const courses = useSelector((state) => state.lesson);
    const menus = courses?.courses?.courses;

    const blockOverflow = () => {
        const mainBody = document.querySelector('body')
        mainBody.style.overflow = `hidden`
    };

    const showSidebar = () => {
        const sidenav = document.querySelector('#sidenav')
        sidenav.style.display = `block`

        blockOverflow()
    };

    const handleSongDropdown = () => {
        const sidenav = document.querySelector('#sidenav')
        sidenav.style.display = `block`
        blockOverflow()

        setTimeout(() => {
            document.getElementById('allSongs')?.click();
        }, 100);
    };

    const handleCourseDropdown = () => {
        const sidenav = document.querySelector('#sidenav')
        sidenav.style.display = `block`
        blockOverflow()

        setTimeout(() => {
            document.getElementById('allCourses')?.click();
        }, 100);
    };

    useEffect(() => {
        setCurrentPage(currentUrl?.pathname)
    }, [currentUrl])

    return (
        <div id="bottom-nav">
            <div className="bottom-nav">
                <div className="d-flex align-items-center flex-column gap-1">
                    <Link className='d-flex align-items-center flex-column gap-1' to={'/'} >
                      { currentPage === '/' ? <img src='/assets/img/Navigations/home.svg' alt='home' />:    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                            <path d="M17.6348 16.4191V10.8082C17.6348 10.3561 17.5428 9.90872 17.3644 9.49326C17.1861 9.07781 16.9251 8.70298 16.5973 8.39158L11.2831 3.34408C10.9733 3.04981 10.5624 2.88574 10.1352 2.88574C9.70794 2.88574 9.29701 3.04981 8.98727 3.34408L3.67227 8.39158C3.34448 8.70298 3.08346 9.07781 2.9051 9.49326C2.72674 9.90872 2.63477 10.3561 2.63477 10.8082V16.4191C2.63477 16.8611 2.81036 17.285 3.12292 17.5976C3.43548 17.9101 3.8594 18.0857 4.30143 18.0857H15.9681C16.4101 18.0857 16.834 17.9101 17.1466 17.5976C17.4592 17.285 17.6348 16.8611 17.6348 16.4191Z" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.63477 13.0861C7.63477 12.6441 7.81036 12.2201 8.12292 11.9076C8.43548 11.595 8.8594 11.4194 9.30143 11.4194H10.9681C11.4101 11.4194 11.834 11.595 12.1466 11.9076C12.4592 12.2201 12.6348 12.6441 12.6348 13.0861V18.0861H7.63477V13.0861Z" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                      }
                        <p className={currentPage === '/' && 'active' } >Home</p>
                    </Link>
                </div>
                <div className="d-flex align-items-center flex-column gap-1">
     
                    <Link className='d-flex align-items-center flex-column gap-1' to={'#'} onClick={handleSongDropdown}>
                     <img src={currentPage?.includes('song-lessons') && menus?.songs[0]?.songs[0]?.type === 'songs'? '/assets/img/Navigations/song-library-active.svg' : '/assets/img/Navigations/song-library.svg'} alt='song' />  
                        <p className={currentPage?.includes('song-lessons') && menus?.songs[0]?.songs[0]?.type === 'songs' && 'active'}>Song Library</p>
                    </Link>
                </div>
                <div className="d-flex align-items-center flex-column gap-1">
                    <Link className='d-flex align-items-center flex-column gap-1' to={'#'} onClick={handleCourseDropdown}>
                     <img src={currentPage?.includes('lessons') && !currentPage?.includes('song-lessons')  && !currentPage?.includes('chords') && menus?.courses[0]?.type === 'lesson'? '/assets/img/Navigations/song-library-active.svg' : '/assets/img/Navigations/song-library.svg'} alt='song' />  
                        <p className={currentPage?.includes('lessons') && !currentPage?.includes('song-lessons') && !currentPage?.includes('chords') && menus?.courses[0]?.type === 'lesson' && 'active'}>Courses</p>
                    </Link>
                </div>
                <div className="d-flex align-items-center flex-column gap-1">
                    <Link className='d-flex align-items-center flex-column gap-1' to={'/membership'} >
                        { currentPage === '/membership' ? <img src='/assets/img/Navigations/member-active.svg' alt='member' />
                        :<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <path d="M1.80176 7.2526L2.88842 8.12177C3.267 8.42456 3.70705 8.64114 4.17792 8.7564C4.64878 8.87166 5.13912 8.88283 5.61475 8.78914C6.09038 8.69544 6.53984 8.49913 6.93181 8.21389C7.32378 7.92865 7.64881 7.56136 7.88426 7.1376L10.1351 3.08594L12.3859 7.1376C12.6214 7.56129 12.9465 7.92851 13.3385 8.21367C13.7305 8.49882 14.18 8.69505 14.6556 8.78866C15.1313 8.88228 15.6216 8.87104 16.0924 8.75571C16.5632 8.64039 17.0032 8.42376 17.3818 8.12094L18.4684 7.2526L17.0068 14.5609C16.9429 14.8799 16.8071 15.18 16.6097 15.4385C16.4123 15.6971 16.1585 15.9071 15.8676 16.0526C14.0877 16.9426 12.1251 17.406 10.1351 17.406C8.14511 17.406 6.18246 16.9426 4.40259 16.0526C4.1117 15.9071 3.85787 15.6971 3.66045 15.4385C3.46303 15.18 3.32724 14.8799 3.26342 14.5609L1.80176 7.2526Z" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.80176 13.0859C8.96509 14.1968 11.3051 14.1968 13.4684 13.0859" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                        }
                        <p className={currentPage === '/membership' && 'active'}>Membership</p>
                    </Link>
                </div>
                <div className="d-flex align-items-center flex-column gap-2">
                    <svg onClick={showSidebar} className="more" xmlns="http://www.w3.org/2000/svg" width="14" height="12"
                        viewBox="0 0 14 12" fill="none">
                        <path d="M1.30176 0.585938H12.9684M1.30176 5.58594H12.9684M1.30176 10.5859H12.9684" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p>More</p>
                </div>
            </div>
        </div>
    );
};

export default BottomNavigation;
