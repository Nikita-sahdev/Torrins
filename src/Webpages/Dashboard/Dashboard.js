import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import BreadCrumbs from "../../components/Common/BreadCrumbs";
import breadcrumbs from "../../components/BreadCrumbs/breadcrumbsObj";
import SideBar from "../../components/Common/SideBar";
// import '../../components/Common/common.scss';
import './dashboard.scss';
import Calender from "./Calender";
import Songs from '../../components/Common/Songs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Action/auth.actions";
import { dashboardAction } from "../../Action/User/dashboard.actions";
import { instructors } from "../../Action/instructor.action";
import CourseHistory from './CourseHistory';
import moment from 'moment';
import AvtarModal from '../../components/Common/AvtarModal';
import LearningProgress from './LearningProgress';
import QueryContact from './QueryContact';
import { authConstants } from '../../Constants/Auth';
import { membership } from '../../Action/membership.action';
import { Helmet } from 'react-helmet';
import truncatedContents from '../../Helpers/Truncate';
import useWindowDimensions from '../../Helpers/useWindowDimensions';
import RecentSongLesson from './RecentSongLesson';
import DeleteLearningProgressModal from './DeleteLearningProgressModal';
import DeleteLearningSuccessfully from './DeleteLearningSuccessfully';
import '../Courses/NewCourseDetail/newCourseDetail.scss'
import ExploreAllModal from './ExploreAllModal';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { windowWidth } = useWindowDimensions();
    const [searchParams] = useSearchParams();

    const fromPersonliastion = searchParams.get('activeTab');
    const navigate = useNavigate();

    const currentUrl = useLocation();
    const authState = useSelector((state) => state.auth);
    const userProfile = useSelector((state) => state.auth.userProfile?.user_data);
    const dashboardData = useSelector((state) => state.dashboard);
    const [selectedImage, setSelectedImage] = useState('');
    const [avtarImages, setAvtarImages] = useState('');
    const [exploreClick, setExploreClick] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeTab, setActiveTab] = useState('songs');
    const [filter, setFilter] = useState('lessons');
    const [date, setDate] = useState(moment());
    const [page, setPage] = useState(0);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState('')
    const [courseHistoryTabs, setCourseHistoryTabs] = useState(filter);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isAvatarSelected, setIsAvatarSelected] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [token, setToken] = useState(authState?.userDetails?.hash ?? authState?.userDetails?.token);
    const memberships = useSelector((state) => state.member);
    const { saveSuccess } = useSelector((state) => state.personalization);
    const userAchievements = useSelector((state) => state.dashboard.userAchievements);
    const recentCourse = useSelector((state) => state.dashboard.recentCourse);

    useEffect(() => {
        dispatch(auth.getEditProfile({ token: token }));
        dispatch(membership.getMembershipData({ Token: token }));
        dispatch(dashboardAction.userAchivements({}, { Token: token }));

    }, []);

    const singleMembership = memberships?.userMembership?.find(item => item.instrument_type === "single");
    const monthlyDivision = singleMembership?.price / 30;

    // Resetting the state and reloading course data...
    useEffect(() => {
        dispatch({ type: 'CHANGE_PERSONALIZATION_STATE', payload: false });

    }, [dashboardData]);

    useEffect(() => {
        if (saveSuccess) {
            toggleTab('songs')
        }
    }, [saveSuccess]);

    useEffect(() => {
        toggleTab('songs')
    }, [])

    useEffect(() => {
        if (fromPersonliastion) {
            toggleTab('learningPath')
            searchParams?.delete('activeTab');
            navigate({
                pathname: window.location?.pathname,
                search: searchParams?.toString(),
            });
        }
    }, [fromPersonliastion]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        //Streak request
        if (token) {
            dispatch(auth.userStreak({ Token: token }));
        }
    }, []);

    useEffect(() => {
        dispatch(dashboardAction.userActivity({ month: date.month() + 1, year: date.year() }, { Token: token }));
    }, [date]);

    // useEffect(() => {
    //     if (page > 0 && activeTab === 'recommendedSongs') {
    //         dispatch(dashboardAction.fetchRecommendedSongs({ page: page + 1 }, { Token: token }));
    //     }
    // }, [page]);
    useEffect(() => {
        setPage(1); // Reset page on activeTab change
    }, [activeTab]);


    const handleFilterClick = (filterType) => {
        setPage(1)
        dispatch({ type: 'UPDATE_LOADMORE_STATE' });
        setActiveFilter(filterType);
        setIsDropdownOpen(false);
        // Handle API requests based on active tab and filter
        if (activeTab === 'courseHistory') {
            if (filterType === 'All') {
                dispatch(dashboardAction.lessonHistory({ filter: 'lessons' }, { token }));
            } else {
                dispatch(dashboardAction.lessonHistory({ filter: 'lessons', instrument: filterType }, { token }));
            }

        } else if (activeTab === 'learningPath') {
            if (filterType === 'All') {
                dispatch(dashboardAction.learningPath({}, { token }));
            } else {
                dispatch(dashboardAction.learningPath({ instrument: filterType }, { token }));
            }

        } else if (activeTab === 'recommendedSongs') {
            if (filterType === 'All') {
                dispatch(dashboardAction.fetchRecommendedSongs({}, { token }));
            } else {
                dispatch(dashboardAction.fetchRecommendedSongs({ instrument: filterType }, { token }));
            }

        }

        else if (activeTab === 'songs') {
            if (filterType === 'All') {
                dispatch(dashboardAction.lessonHistory({ filter: 'songs' }, { token }));
            } else {
                dispatch(dashboardAction.lessonHistory({ filter: 'songs', instrument: filterType }, { token }));
            }

        }
    };

    const toggleTab = (tabName, childTab = false) => {
        setPage(1); // Reset page number when switching tabs
        setActiveFilter('All'); // Reset filter to default
        dispatch({ type: 'UPDATE_LOADMORE_STATE' });

        if (!childTab) {
            setActiveTab(tabName);

            if (tabName === 'recommendedSongs') {
                dispatch(dashboardAction.fetchRecommendedSongs({}, { token }));
            } else if (tabName === 'courseHistory') {
                dispatch(dashboardAction.lessonHistory({ filter: 'lessons' }, { token }));
            } else if (tabName === 'learningPath') {
                dispatch(dashboardAction.learningPath({}, { token }));
            } else if (tabName === 'songs') {
                dispatch(dashboardAction.lessonHistory({ filter: 'songs' }, { token }));
            }
        } else {
            dispatch({ type: 'UPDATE_COURSE_TAB_STATE', payload: tabName });
            setCourseHistoryTabs(tabName);
            setFilter(tabName);
            dispatch(dashboardAction.lessonHistory({}, { token }));
        }
    };



    const handleLikeSongs = (e, songsId) => {
        const liked = e.target.dataset.liked === "true" || false;

        if (!liked) {
            dispatch(
                instructors.likeSongs(
                    { id: userProfile?.liked_songs_id, lesson_id: songsId },
                    { token }
                )
            );

            e.target.closest("img").src = "./assets/img/love.svg";
        } else {
            dispatch(
                instructors.removeSongs(
                    { playlist_id: userProfile?.liked_songs_id, lesson_id: songsId },
                    { token }
                )
            );

            e.target.closest("img").src = "./assets/img/unlike.svg";
        }

        e.target.setAttribute("data-liked", !liked)
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };
    const handleHistoryLoadMore = () => {
        setPage((prev) => prev + 1);
        if (activeTab === 'songs') {
            if (activeFilter === 'All') {
                dispatch(dashboardAction.lessonHistory({ filter: 'songs', page: page + 1 }, { token }));
            } else {
                dispatch(dashboardAction.lessonHistory({ filter: 'songs', instrument: activeFilter, page: page + 1 }, { token }));
            }
        } else {
            if (activeFilter === 'All') {
                dispatch(dashboardAction.lessonHistory({ filter: 'lessons', page: page + 1 }, { token }));
            } else {
                dispatch(dashboardAction.lessonHistory({ filter: 'lessons', instrument: activeFilter, page: page + 1 }, { token }));
            }
        }


    };
    const handleLearningLoadMore = () => {
        setPage((prev) => prev + 1);

        dispatch(dashboardAction.learningPath({ page: page + 1 }, { token }));
    };

    // Handle profile modal
    const handleAvtarModal = (id) => {
        setModalOpen(true)
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = 'block';
            // Resetting the state...
            setSelectedImage('')
            setAvtarImages('')
            setActiveIndex(-1);
            setIsAvatarSelected(false)
        }
    }

    const closeAvtarModal = (id) => {
        setModalOpen(false)
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = 'none';
        }
    }


    // Displaying personalization modal...
    const handlePersonalization = () => {
        dispatch({ type: 'CHANGE_PERSONALIZATION_STATE', payload: true });

        const navbar = document.getElementById('mainNavbar');
        // Removing the 'hidden' class from the navbar
        navbar.classList.remove('hidden');
        if (windowWidth < 800) navbar.style.zIndex = "1";
    }

    useEffect(() => {
        var swiper = new window.Swiper(".first-section-hero-slider", {
            slidesPerView: 1,
            spaceBetween: 10,

            speed: 2000,
            loop: true,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 3000,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
                940: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
                1200: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
                1366: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
            },
        });

    }, [])

    function formatTime(seconds) {
        const totalMinutes = Math.floor(seconds / 60); // Total minutes
        const hours = Math.floor(totalMinutes / 60);  // Extract hours
        const minutes = totalMinutes % 60;           // Remaining minutes
        return `${hours}h ${minutes}m`;
    }

    const timeSpent = userAchievements?.time_spent


    const handleExploreClick = () => {
        setShowModal(true)
    }

    const handleDelete = (id) => {
        setDeleteId(id)
    }

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const sidebarClass = isHovered ? "col-md-3" : "col-md-1";
    const sidebarViewClass = isHovered ? "col-9" : "col-11";

    const parseDurationTime = (durationString) => {
        if (durationString) {
            const [hours, minutes, seconds] = durationString?.split(":").map(Number);

            let message = '';

            if (hours > 1) {
                message = `${hours} hrs remaining`;
            } else if (hours == 1) {
                message = `${hours} hr remaining`
            } else if (minutes > 0) {
                message = `${minutes} mins remaining`;
            } else if (seconds > 0) {
                message = `${seconds} secs remaining`;
            } else {
                message = ``;
            }
            return message
        }

    }

    function parseTimeToSeconds(timeString) {
        if (!timeString) {
            // Return 0 or another default value if the timeString is invalid
            return 0;
        }

        const parts = timeString.split(':');

        // Ensure parts have at least three components
        if (parts.length < 3) {
            console.error("Invalid time format:", timeString);
            return 0;
        }

        const hours = parseInt(parts[0]) || 0;
        const minutes = parseInt(parts[1]) || 0;
        const seconds = parseInt(parts[2]) || 0;

        return hours * 3600 + minutes * 60 + seconds;
    }

    let courseUrl = recentCourse && recentCourse.path && recentCourse.path.length > 0
        ? '/' + recentCourse?.path[recentCourse?.path.length - 1]?.hash + '/' + recentCourse?.hash + '-' + recentCourse?.id
        : null;

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Width Calculation Based on Conditions
    const getWidth = () => {
        if (screenWidth <= 1350) {
            return isHovered ? '719.429px' : '700px';
        }
        return isHovered ? '719.429px' : '839.429px';
    };

    const getSmallBoxWidth = () => {
        if (screenWidth <= 1350) {
            return isHovered ? '721px' : '700px';
        }
        return isHovered ? '721px' : '845px';
    };


    return (
        <>
            {/* SEO handling start*/}
            <Helmet>
                <title>Torrins - Dashboard</title>
                <meta name="description" content="Torrins dashboard page" />
                <link
                    rel="canonical"
                    href='/dashboard'
                />
                <script type="application/ld+json">
                    {`
                    "@context": "https://schema.org/", 
                    "@type": "BreadcrumbList", 
                    "itemListElement": [{
                        "@type": "ListItem", 
                        "position": 1, 
                        "name": "Home",
                        "item": ${process.env.REACT_APP_URL}  
                    },{
                        "@type": "ListItem", 
                        "position": 2, 
                        "name": "Dashboard",
                        "item": ${process.env.REACT_APP_URL}/dashboard 
                    }]
                    `}
                </script>

            </Helmet>
            {/* SEO handling end*/}

            <div className="authenticate my-dashboard" style={{ overflowX: 'hidden' }}>
                <div className="">
                    <BreadCrumbs data={breadcrumbs.dashboard} currentPage={currentUrl.pathname} />
                    <div className="row px-0">


                        {/* Sidebar view */}
                        <SideBar
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                            sidebarClass={sidebarClass}
                            isHovered={isHovered}
                        />

                        {/* Dashboard view */}
                        <div className={`${sidebarViewClass} right-section px-0`}>
                            <div className='d-md-none'>
                                <Calender
                                    date={date}
                                    setDate={setDate}
                                    activeDates={dashboardData?.userActivity}
                                    loading={dashboardData?.streakLoading}
                                    handleExploreClick={handleExploreClick}
                                />
                            </div>
                            <div className="second-section" style={{ marginTop: 'unset' }}>

                                <div className="row">

                                    <div className="col-md-8 dashboard-title" >
                                        {Object.keys(recentCourse).length > 0 &&
                                            <div className="user-profile d-none d-md-block" style={{ marginTop: '24px' }}>
                                                <div>
                                                    <h5>Last Lesson Watched</h5>
                                                </div>

                                                <div className="d-flex bg-white  align-items-start justify-content-between mb-2 recent-course" style={{ marginTop: '27px', width: getWidth() }}>
                                                    <div className="d-none d-md-flex  container gap-3 ">
                                                        <div className="container-course-img">
                                                            <Link to={courseUrl}>
                                                                <img loading="lazy" alt='' className="video" src={recentCourse?.poster} style={{ marginTop: '15px', borderRadius: '14px', width: '121.128px', height: '78.09px' }} />
                                                                <img loading="lazy" alt='' className="play-icon" src="assets/img/playicon.svg" />
                                                            </Link>
                                                        </div>

                                                        <div className="second-card d-flex">
                                                            <div style={{ marginTop: '12px' }}>
                                                                <h6>{recentCourse?.path && recentCourse?.path[0]?.title}</h6>
                                                                <Link to={courseUrl}><h3>{recentCourse?.title}</h3></Link>
                                                                <div className=" remaining d-flex ">
                                                                    <p className="custom-badge recent-badge" style={{ color: '#333' }}>{recentCourse?.instrument}</p>
                                                                    {recentCourse?.remaining_duration && parseTimeToSeconds(recentCourse.remaining_duration) !== 0 && (
                                                                        <>
                                                                            <div className="separator" style={{ marginTop: '17px', backgroundColor: '#333' }}></div>
                                                                            <p className="custom-badge recent-badge" style={{ color: '#333' }}>
                                                                                <img alt="" src="assets/img/clockBlack.png" />
                                                                                {parseDurationTime(recentCourse.remaining_duration)}
                                                                            </p>
                                                                        </>
                                                                    )}

                                                                </div>
                                                            </div>

                                                            <div class="circle-container">
                                                                <div class={`circle percentage-${parseInt(recentCourse?.completion_progress)}`}>
                                                                    <span>{`${recentCourse?.completion_progress}`}</span>
                                                                    <div class="percentage-bar"></div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>}

                                        <div className='main-dashboard-div' style={{ width: windowWidth > 761 ? getSmallBoxWidth() : 'auto' }}>

                                            <div className='sub-dashboard-div'>
                                                {showModal && <ExploreAllModal
                                                    handleLikeSongs={handleLikeSongs}
                                                    showModal={showModal}
                                                    setShowModal={setShowModal}
                                                />}
                                                <>
                                                    <div className="coursehistory-sub-head d-flex my-3 flex-xxl-nowrap">
                                                        <div className={`course mx-2 ${activeTab === 'songs' ? 'active-history' : ''}`} id="songs" onClick={() => toggleTab('songs')}>Song History</div>
                                                        <div className={`course mx-2 ${activeTab === 'courseHistory' ? 'active-history' : ''}`} id="courseHistory" onClick={() => toggleTab('courseHistory')}>Course History</div>
                                                        <div className={`course mx-2 ${activeTab === 'learningPath' ? 'active-history' : ''}`} onClick={() => toggleTab('learningPath')}>My Learning Journey</div>
                                                        <div className={`course mx-2 ${activeTab === 'recommendedSongs' ? 'active-history' : ''}`} id="recomend-songs" onClick={() => toggleTab('recommendedSongs')}>Song Recommendations</div>
                                                    </div>
                                                    <div className="filters d-none d-md-flex">
                                                        <img src='/assets/img/DashboardBanner/filter.png' className='d-none d-md-flex' style={{ marginLeft: '11px' }} />
                                                        <img src='/assets/img/DashboardBanner/mobile-filter.png' className='d-md-none' style={{ marginLeft: '11px' }} />
                                                        <button className="filter-icon">Filters</button>
                                                        <div className="separator"></div>
                                                        <button
                                                            className={`filter-button ${activeFilter === 'All' ? "active-filter" : ""}`}
                                                            onClick={() => handleFilterClick('All')}
                                                        >
                                                            All
                                                        </button>
                                                        <button
                                                            className={`filter-button ${activeFilter === 'guitar' ? "active-filter" : ""}`}
                                                            onClick={() => handleFilterClick('guitar')}
                                                        >
                                                            Guitar
                                                        </button>
                                                        <button
                                                            className={`filter-button ${activeFilter === 'piano' ? "active-filter" : ""}`}
                                                            onClick={() => handleFilterClick('piano')}
                                                        >
                                                            Piano
                                                        </button>
                                                        <button
                                                            className={`filter-button ${activeFilter === 'bass' ? "active-filter" : ""}`}
                                                            onClick={() => handleFilterClick('bass')}
                                                        >
                                                            Bass
                                                        </button>
                                                    </div>
                                                    {/* mobile */}
                                                    <div className="filters d-md-none ">
                                                        <div className='sub-filters d-flex'>
                                                            <img src='/assets/img/DashboardBanner/filter.png' className='d-none d-md-flex' style={{ marginLeft: '11px' }} />
                                                            <img src='/assets/img/DashboardBanner/mobile-filter.png' className='d-md-none' style={{ marginLeft: '11px' }} />
                                                            <button className="filter-icon">Filters</button>
                                                            <div className="separator"></div>
                                                        </div>
                                                        {/* Dropdown Button */}
                                                        <div>
                                                            <button
                                                                className="filter-icon dropdown-toggle"
                                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                            >
                                                                {activeFilter}
                                                                <span className="arrow">
                                                                    {isDropdownOpen ? (
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="15"
                                                                            height="15"
                                                                            viewBox="0 0 24 24"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        >
                                                                            <polyline points="18 15 12 9 6 15"></polyline>
                                                                        </svg>
                                                                    ) : (
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="15"
                                                                            height="15"
                                                                            viewBox="0 0 24 24"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        >
                                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                                        </svg>
                                                                    )}
                                                                </span>
                                                            </button>


                                                            {/* Dropdown Menu */}
                                                            {isDropdownOpen && (
                                                                <div className="dropdown-menus">
                                                                    <button
                                                                        className={`filter-button ${activeFilter === "All" ? "active-filter" : ""}`}
                                                                        onClick={() => handleFilterClick("All")}
                                                                    >
                                                                        All
                                                                    </button>
                                                                    <button
                                                                        className={`filter-button ${activeFilter === "Guitar" ? "active-filter" : ""}`}
                                                                        onClick={() => handleFilterClick("Guitar")}
                                                                    >
                                                                        Guitar
                                                                    </button>
                                                                    <button
                                                                        className={`filter-button ${activeFilter === "Piano" ? "active-filter" : ""}`}
                                                                        onClick={() => handleFilterClick("Piano")}
                                                                    >
                                                                        Piano
                                                                    </button>
                                                                    <button
                                                                        className={`filter-button ${activeFilter === "Bass" ? "active-filter" : ""}`}
                                                                        onClick={() => handleFilterClick("Bass")}
                                                                    >
                                                                        Bass
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="row ">
                                                        <div className='col-12'>
                                                            {/* <!-- learning path section --> */}
                                                            {activeTab === 'learningPath' && (
                                                                <div className="" id="learningPath">
                                                                    {dashboardData?.courseLoading && !dashboardData?.viewMoreCourses?.length ?
                                                                        <div style={{ padding: '30%' }}>
                                                                            <div
                                                                                className="loader spinner-border m-5 d-table m-auto"
                                                                                role="status"
                                                                            >
                                                                                <span className="visually-hidden"></span>
                                                                            </div>
                                                                            <span className=" m-5 d-table m-auto">
                                                                                Loading...
                                                                            </span>
                                                                        </div>
                                                                        :
                                                                        <LearningProgress
                                                                            learningData={dashboardData?.viewMoreCourses}
                                                                            loading={dashboardData?.loading}
                                                                            handlePersonalization={handlePersonalization}
                                                                            token={token}
                                                                            handleDelete={handleDelete}
                                                                        />
                                                                    }
                                                                    <div className="common-load-more-btn">
                                                                        {!dashboardData?.courseLoading && dashboardData?.viewMoreCourses?.length > 0 && dashboardData?.viewMoreCourses?.length <
                                                                            dashboardData?.totalCourse ?
                                                                            (
                                                                                <a
                                                                                    href="javascript:void(0);"
                                                                                    onClick={handleLearningLoadMore}
                                                                                    style={{ color: "black" }}
                                                                                >
                                                                                    View More
                                                                                </a>
                                                                            ) : dashboardData?.courseLoading && dashboardData?.viewMoreCourses?.length ? 'Loading...' : ''}
                                                                    </div>

                                                                    {dashboardData?.viewMoreCourses?.length ? <div className="container-helpful" style={{ height: 'unset' }}>
                                                                        <div className="row align-items-end">
                                                                            <div className="col" style={{ borderRadius: '16px', background: 'linear-gradient(76deg, #BEE4FF 10.86%, #CFC8FF 106.95%), #C0DFFF' }}>
                                                                                {/* <div className="content"></div> */}
                                                                                <h5 style={{ cursor: 'pointer' }} onClick={handlePersonalization}>Create new learning journey</h5>
                                                                            </div>
                                                                        </div>
                                                                    </div> : ''}
                                                                </div>
                                                            )}
                                                            {/* <!-- course history --> */}
                                                            {activeTab === 'courseHistory' && (
                                                                <div className="" id="courseHistory">
                                                                    {dashboardData?.historyLoading && !dashboardData?.viewMoreHistory?.length ?
                                                                        <div style={{ padding: '20%' }}>
                                                                            <div
                                                                                className="loader spinner-border m-5 d-table m-auto"
                                                                                role="status"
                                                                            >
                                                                                <span className="visually-hidden"></span>
                                                                            </div>
                                                                            <span className=" m-5 d-table m-auto">
                                                                                Loading...
                                                                            </span>
                                                                        </div>
                                                                        : courseHistoryTabs === 'lessons' &&
                                                                        <CourseHistory
                                                                            lessonHistory={dashboardData?.viewMoreHistory}
                                                                            total={dashboardData?.lessonHistory.total}
                                                                            loading={dashboardData?.historyLoading}
                                                                        />
                                                                    }
                                                                    <div className="common-load-more-btn">
                                                                        {!dashboardData?.historyLoading && dashboardData?.viewMoreHistory?.length > 0 && dashboardData?.viewMoreHistory?.length <
                                                                            dashboardData?.lessonHistory?.total ?
                                                                            (
                                                                                <a
                                                                                    href="javascript:void(0);"
                                                                                    onClick={handleHistoryLoadMore}
                                                                                    style={{ color: "black" }}
                                                                                >
                                                                                    View More
                                                                                </a>
                                                                            ) : dashboardData?.historyLoading && dashboardData?.viewMoreHistory?.length ? 'Loading...' : ''}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {/* <!-- recoomended songs --> */}
                                                            {activeTab === 'recommendedSongs' && (
                                                                <div className="tab-container active-course recomend" id="recommendedSongs">
                                                                    {dashboardData?.loading && !dashboardData?.loadMoreData?.length ?
                                                                        <div style={{ padding: '30%' }}>
                                                                            <div
                                                                                className="loader spinner-border m-5 d-table m-auto"
                                                                                role="status"
                                                                            >
                                                                                <span className="visually-hidden"></span>
                                                                            </div>
                                                                            <span className=" m-5 d-table m-auto">
                                                                                Loading...
                                                                            </span>
                                                                        </div>
                                                                        :
                                                                        <Songs
                                                                            show={show}
                                                                            songs={dashboardData?.loadMoreData}
                                                                            pagination={dashboardData?.songPagination}
                                                                            total={dashboardData?.totalSongs}
                                                                            loading={dashboardData?.loading}
                                                                            handleLikeSongs={handleLikeSongs}
                                                                            component='dashboard'
                                                                        />
                                                                    }
                                                                    <div className="common-load-more-btn">
                                                                        {!dashboardData?.loading && dashboardData?.loadMoreData?.length > 0 && dashboardData?.loadMoreData?.length <
                                                                            dashboardData?.totalSongs ?
                                                                            (
                                                                                <a
                                                                                    href="javascript:void(0);"
                                                                                    onClick={handleLoadMore}
                                                                                    style={{ color: "black" }}
                                                                                >
                                                                                    View More
                                                                                </a>
                                                                            ) : dashboardData?.loading && dashboardData?.loadMoreData?.length ? 'Loading...' : ''}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {/* song history */}
                                                            {activeTab === 'songs' && (
                                                                <div className="" id="songs">
                                                                    {dashboardData?.historyLoading && !dashboardData?.viewMoreHistory?.length ?
                                                                        <div style={{ padding: '20%' }}>
                                                                            <div
                                                                                className="loader spinner-border m-5 d-table m-auto"
                                                                                role="status"
                                                                            >
                                                                                <span className="visually-hidden"></span>
                                                                            </div>
                                                                            <span className=" m-5 d-table m-auto">
                                                                                Loading...
                                                                            </span>
                                                                        </div>
                                                                        :
                                                                        <Songs
                                                                            songs={dashboardData?.viewMoreHistory}
                                                                            total={dashboardData?.lessonHistory.total}
                                                                            loading={dashboardData?.historyLoading}
                                                                            handleLikeSongs={handleLikeSongs}
                                                                            component='dashboard'
                                                                            activeTab={activeTab}
                                                                        />

                                                                    }
                                                                    <div className="common-load-more-btn">
                                                                        {!dashboardData?.historyLoading && dashboardData?.viewMoreHistory?.length > 0 && dashboardData?.viewMoreHistory?.length <
                                                                            dashboardData?.lessonHistory?.total ?
                                                                            (
                                                                                <a
                                                                                    href="javascript:void(0);"
                                                                                    onClick={handleHistoryLoadMore}
                                                                                    style={{ color: "black" }}
                                                                                >
                                                                                    View More
                                                                                </a>
                                                                            ) : dashboardData?.historyLoading && dashboardData?.viewMoreHistory?.length ? 'Loading...' : ''}
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </>



                                            </div>
                                        </div>
                                        {!exploreClick &&
                                            <>
                                                <div class="stats-container d-none d-md-flex">
                                                    <div class="stat-item">
                                                        <div class="icon-wrapper">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                                                                <path d="M15.8315 6.06934C13.7835 6.06934 11.7815 6.67664 10.0786 7.81446C8.37575 8.95227 7.04853 10.5695 6.26479 12.4616C5.48105 14.3537 5.27599 16.4358 5.67553 18.4444C6.07508 20.4531 7.0613 22.2982 8.50946 23.7463C9.95762 25.1945 11.8027 26.1807 13.8114 26.5803C15.82 26.9798 17.9021 26.7747 19.7942 25.991C21.6863 25.2073 23.3035 23.88 24.4413 22.1772C25.5791 20.4743 26.1865 18.4723 26.1865 16.4243C26.1865 13.678 25.0955 11.0442 23.1536 9.10223C21.2116 7.1603 18.5778 6.06934 15.8315 6.06934Z" fill="#FFC444" stroke="#FFC444" stroke-width="2.10864" stroke-miterlimit="10" />
                                                                <path d="M15.832 14.0701V9.36328" stroke="white" stroke-width="1.0982" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M15.832 5.59858V4.65723" stroke="#FFC444" stroke-width="2.10864" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M8.5361 8.18746L7.83008 7.48145" stroke="#FFC444" stroke-width="2.10864" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M15.8319 18.3064C16.8717 18.3064 17.7147 17.4635 17.7147 16.4237C17.7147 15.3839 16.8717 14.541 15.8319 14.541C14.7921 14.541 13.9492 15.3839 13.9492 16.4237C13.9492 17.4635 14.7921 18.3064 15.8319 18.3064Z" stroke="white" stroke-width="1.0982" stroke-miterlimit="10" />
                                                            </svg>

                                                            <div class="value">{formatTime(timeSpent)}</div>
                                                        </div>

                                                        <div class="label">Total Time Spent</div>
                                                    </div>
                                                    <div class="separators"></div>
                                                    <div class="stat-item">
                                                        <div class="icon-wrapper">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="26" viewBox="0 0 31 26" fill="none">
                                                                <path d="M28.2216 7.88817C27.9325 7.87878 27.6456 7.94085 27.3862 8.06889C27.1269 8.19693 26.9031 8.38698 26.7348 8.62219C26.7205 8.64266 26.7 8.65805 26.6764 8.66612C26.6528 8.67418 26.6272 8.67451 26.6034 8.66705C26.5796 8.65958 26.5587 8.64472 26.5439 8.62462C26.5291 8.60452 26.5211 8.58022 26.521 8.55525V6.40311C26.521 5.18464 25.5615 4.15937 24.3436 4.1306C24.046 4.12307 23.7498 4.17521 23.4725 4.28394C23.1953 4.39267 22.9426 4.55579 22.7294 4.76368C22.5162 4.97158 22.3468 5.22005 22.2311 5.49445C22.1154 5.76885 22.0558 6.06363 22.0559 6.36142V10.1269C22.0559 10.158 22.0435 10.1879 22.0215 10.2099C21.9994 10.2319 21.9696 10.2443 21.9384 10.2443H9.72438C9.69324 10.2443 9.66336 10.2319 9.64134 10.2099C9.61931 10.1879 9.60694 10.158 9.60694 10.1269V6.40311C9.60694 5.18464 8.64743 4.15937 7.42955 4.1306C7.13206 4.12339 6.83612 4.17576 6.55917 4.28464C6.28221 4.39351 6.02983 4.55668 5.81688 4.76454C5.60392 4.97241 5.4347 5.22077 5.31916 5.49501C5.20363 5.76925 5.14411 6.06383 5.14412 6.36142V8.55642C5.14406 8.58139 5.13605 8.60569 5.12124 8.62579C5.10643 8.6459 5.0856 8.66076 5.06178 8.66822C5.03795 8.67568 5.01237 8.67536 4.98874 8.66729C4.96511 8.65922 4.94466 8.64384 4.93037 8.62337C4.76195 8.3876 4.53787 8.19711 4.27807 8.06885C4.01826 7.94058 3.73078 7.87852 3.4412 7.88817C2.48404 7.91812 1.73828 8.72848 1.73828 9.68622V15.4832C1.73828 16.4409 2.48639 17.2513 3.4412 17.2812C3.73029 17.2906 4.01723 17.2286 4.27658 17.1005C4.53594 16.9725 4.7597 16.7824 4.92802 16.5472C4.94197 16.5256 4.96264 16.5091 4.98686 16.5004C5.01108 16.4916 5.03751 16.4911 5.06207 16.4988C5.08663 16.5065 5.10797 16.5221 5.12279 16.5432C5.13762 16.5643 5.14511 16.5896 5.14412 16.6153V18.7687C5.14412 19.9848 6.10363 21.0124 7.32151 21.0418C7.61905 21.049 7.91504 20.9966 8.19203 20.8877C8.46902 20.7788 8.72143 20.6155 8.93439 20.4076C9.14735 20.1997 9.31657 19.9512 9.43207 19.6769C9.54757 19.4026 9.60703 19.108 9.60694 18.8103V15.0449C9.60694 15.0137 9.61931 14.9839 9.64134 14.9618C9.66336 14.9398 9.69324 14.9274 9.72438 14.9274H21.9384C21.9696 14.9274 21.9994 14.9398 22.0215 14.9618C22.0435 14.9839 22.0559 15.0137 22.0559 15.0449V18.7687C22.0559 19.9871 23.0154 21.0124 24.2333 21.0412C24.5308 21.0484 24.8267 20.996 25.1036 20.8871C25.3806 20.7783 25.633 20.6151 25.8459 20.4072C26.0589 20.1994 26.2281 19.951 26.3436 19.6768C26.4592 19.4025 26.5187 19.1079 26.5187 18.8103V16.6153C26.5187 16.5904 26.5268 16.5661 26.5416 16.546C26.5564 16.5259 26.5772 16.511 26.601 16.5035C26.6249 16.4961 26.6504 16.4964 26.6741 16.5045C26.6977 16.5125 26.7181 16.5279 26.7324 16.5484C26.9009 16.7842 27.1249 16.9747 27.3847 17.1029C27.6445 17.2312 27.932 17.2932 28.2216 17.2836C29.1788 17.2536 29.9245 16.4433 29.9245 15.4855V9.6874C29.9245 8.72965 29.1764 7.9193 28.2216 7.88817Z" fill="#FFC444" />
                                                            </svg>
                                                            <div class="value">{userAchievements?.assessments_completed}</div>
                                                        </div>

                                                        <div class="label">Assessments Done</div>
                                                    </div>
                                                    <div class="separators"></div>
                                                    <div class="stat-item">
                                                        <div class="icon-wrapper">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                                <path d="M2.66602 7.69003C2.66602 7.69003 4.42719 5.3418 8.53661 5.3418C12.646 5.3418 14.4072 7.69003 14.4072 7.69003V24.1277C14.4072 24.1277 12.646 22.9536 8.53661 22.9536C4.42719 22.9536 2.66602 24.1277 2.66602 24.1277V7.69003Z" fill="#FFC444" />
                                                                <path d="M14.4062 7.69003C14.4062 7.69003 16.1674 5.3418 20.2768 5.3418C24.3863 5.3418 26.1474 7.69003 26.1474 7.69003V24.1277C26.1474 24.1277 24.3863 22.9536 20.2768 22.9536C16.1674 22.9536 14.4062 24.1277 14.4062 24.1277V7.69003Z" fill="#FFC444" />
                                                                <line x1="13.9607" y1="25.2644" x2="13.9607" y2="3.30044" stroke="#E5F0F8" stroke-width="1.0982" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                            <div class="value">{userAchievements?.course_completed}</div>
                                                        </div>

                                                        <div class="label">Topics Covered</div>
                                                    </div>
                                                    <div class="separators"></div>
                                                    <div class="stat-item">
                                                        <div class="icon-wrapper">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="26" viewBox="0 0 17 26" fill="none">
                                                                <path d="M7.85984 1.24177C7.71976 1.33048 7.61703 1.44722 7.54699 1.58263L7.44893 1.78808V10.0622C7.44893 14.6149 7.4396 18.3364 7.43026 18.3364C7.42092 18.3364 7.23881 18.2523 7.02402 18.1542C4.37648 16.9122 0.986517 18.0375 0.234748 20.4049C-0.129464 21.5442 0.183384 22.7349 1.0799 23.6314C1.64023 24.1917 2.43869 24.6353 3.27918 24.8595C3.83951 25.0042 4.99284 25.0603 5.57184 24.9669C6.47303 24.8221 7.31352 24.4672 7.95323 23.9629C8.42016 23.5941 8.75636 23.1832 8.9945 22.6975C9.33069 22.0111 9.31668 22.296 9.31668 16.1744C9.31668 13.13 9.33536 10.6786 9.35871 10.6786C9.43809 10.6786 10.0218 10.9634 10.4093 11.1922C11.8008 12.014 12.8187 13.2794 13.3043 14.783C13.5658 15.5861 13.5658 15.5767 13.3137 15.9316C13.1923 16.0997 13.0615 16.3098 13.0242 16.3986C12.8 16.9355 13.1736 17.5846 13.7526 17.664C14.2616 17.734 14.5651 17.5145 15.1254 16.66C15.9472 15.418 16.4888 13.8491 16.6523 12.2475C16.8297 10.4871 16.2227 8.72211 14.9993 7.42402C14.509 6.90572 13.93 6.44812 12.8327 5.70102C11.2265 4.60839 10.7735 4.21616 10.1618 3.39902C9.64354 2.70795 9.47077 2.40444 9.33536 1.95618C9.14392 1.33048 8.88243 1.10635 8.34545 1.10635C8.12599 1.10635 8.03261 1.13437 7.85984 1.24177Z" fill="#FFC444" />
                                                            </svg>
                                                            <div class="value">{userAchievements?.songs_learned}</div>
                                                        </div>

                                                        <div class="label">Songs Learned</div>
                                                    </div>
                                                </div>
                                                <div class="stats-container d-md-none">
                                                    <div class="stat-item">
                                                        <div class="icon-wrapper">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                                                                <path d="M15.8315 6.06934C13.7835 6.06934 11.7815 6.67664 10.0786 7.81446C8.37575 8.95227 7.04853 10.5695 6.26479 12.4616C5.48105 14.3537 5.27599 16.4358 5.67553 18.4444C6.07508 20.4531 7.0613 22.2982 8.50946 23.7463C9.95762 25.1945 11.8027 26.1807 13.8114 26.5803C15.82 26.9798 17.9021 26.7747 19.7942 25.991C21.6863 25.2073 23.3035 23.88 24.4413 22.1772C25.5791 20.4743 26.1865 18.4723 26.1865 16.4243C26.1865 13.678 25.0955 11.0442 23.1536 9.10223C21.2116 7.1603 18.5778 6.06934 15.8315 6.06934Z" fill="#FFC444" stroke="#FFC444" stroke-width="2.10864" stroke-miterlimit="10" />
                                                                <path d="M15.832 14.0701V9.36328" stroke="white" stroke-width="1.0982" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M15.832 5.59858V4.65723" stroke="#FFC444" stroke-width="2.10864" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M8.5361 8.18746L7.83008 7.48145" stroke="#FFC444" stroke-width="2.10864" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M15.8319 18.3064C16.8717 18.3064 17.7147 17.4635 17.7147 16.4237C17.7147 15.3839 16.8717 14.541 15.8319 14.541C14.7921 14.541 13.9492 15.3839 13.9492 16.4237C13.9492 17.4635 14.7921 18.3064 15.8319 18.3064Z" stroke="white" stroke-width="1.0982" stroke-miterlimit="10" />
                                                            </svg>

                                                        </div>
                                                        <div className='user-activity'>
                                                            <div class="label">Total Time Spent</div>
                                                            <div class="value">{formatTime(timeSpent)}</div>
                                                        </div>


                                                    </div>
                                                    <div class="separators"></div>
                                                    <div class="stat-item">
                                                        <div class="icon-wrapper">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="26" viewBox="0 0 31 26" fill="none">
                                                                <path d="M28.2216 7.88817C27.9325 7.87878 27.6456 7.94085 27.3862 8.06889C27.1269 8.19693 26.9031 8.38698 26.7348 8.62219C26.7205 8.64266 26.7 8.65805 26.6764 8.66612C26.6528 8.67418 26.6272 8.67451 26.6034 8.66705C26.5796 8.65958 26.5587 8.64472 26.5439 8.62462C26.5291 8.60452 26.5211 8.58022 26.521 8.55525V6.40311C26.521 5.18464 25.5615 4.15937 24.3436 4.1306C24.046 4.12307 23.7498 4.17521 23.4725 4.28394C23.1953 4.39267 22.9426 4.55579 22.7294 4.76368C22.5162 4.97158 22.3468 5.22005 22.2311 5.49445C22.1154 5.76885 22.0558 6.06363 22.0559 6.36142V10.1269C22.0559 10.158 22.0435 10.1879 22.0215 10.2099C21.9994 10.2319 21.9696 10.2443 21.9384 10.2443H9.72438C9.69324 10.2443 9.66336 10.2319 9.64134 10.2099C9.61931 10.1879 9.60694 10.158 9.60694 10.1269V6.40311C9.60694 5.18464 8.64743 4.15937 7.42955 4.1306C7.13206 4.12339 6.83612 4.17576 6.55917 4.28464C6.28221 4.39351 6.02983 4.55668 5.81688 4.76454C5.60392 4.97241 5.4347 5.22077 5.31916 5.49501C5.20363 5.76925 5.14411 6.06383 5.14412 6.36142V8.55642C5.14406 8.58139 5.13605 8.60569 5.12124 8.62579C5.10643 8.6459 5.0856 8.66076 5.06178 8.66822C5.03795 8.67568 5.01237 8.67536 4.98874 8.66729C4.96511 8.65922 4.94466 8.64384 4.93037 8.62337C4.76195 8.3876 4.53787 8.19711 4.27807 8.06885C4.01826 7.94058 3.73078 7.87852 3.4412 7.88817C2.48404 7.91812 1.73828 8.72848 1.73828 9.68622V15.4832C1.73828 16.4409 2.48639 17.2513 3.4412 17.2812C3.73029 17.2906 4.01723 17.2286 4.27658 17.1005C4.53594 16.9725 4.7597 16.7824 4.92802 16.5472C4.94197 16.5256 4.96264 16.5091 4.98686 16.5004C5.01108 16.4916 5.03751 16.4911 5.06207 16.4988C5.08663 16.5065 5.10797 16.5221 5.12279 16.5432C5.13762 16.5643 5.14511 16.5896 5.14412 16.6153V18.7687C5.14412 19.9848 6.10363 21.0124 7.32151 21.0418C7.61905 21.049 7.91504 20.9966 8.19203 20.8877C8.46902 20.7788 8.72143 20.6155 8.93439 20.4076C9.14735 20.1997 9.31657 19.9512 9.43207 19.6769C9.54757 19.4026 9.60703 19.108 9.60694 18.8103V15.0449C9.60694 15.0137 9.61931 14.9839 9.64134 14.9618C9.66336 14.9398 9.69324 14.9274 9.72438 14.9274H21.9384C21.9696 14.9274 21.9994 14.9398 22.0215 14.9618C22.0435 14.9839 22.0559 15.0137 22.0559 15.0449V18.7687C22.0559 19.9871 23.0154 21.0124 24.2333 21.0412C24.5308 21.0484 24.8267 20.996 25.1036 20.8871C25.3806 20.7783 25.633 20.6151 25.8459 20.4072C26.0589 20.1994 26.2281 19.951 26.3436 19.6768C26.4592 19.4025 26.5187 19.1079 26.5187 18.8103V16.6153C26.5187 16.5904 26.5268 16.5661 26.5416 16.546C26.5564 16.5259 26.5772 16.511 26.601 16.5035C26.6249 16.4961 26.6504 16.4964 26.6741 16.5045C26.6977 16.5125 26.7181 16.5279 26.7324 16.5484C26.9009 16.7842 27.1249 16.9747 27.3847 17.1029C27.6445 17.2312 27.932 17.2932 28.2216 17.2836C29.1788 17.2536 29.9245 16.4433 29.9245 15.4855V9.6874C29.9245 8.72965 29.1764 7.9193 28.2216 7.88817Z" fill="#FFC444" />
                                                            </svg>

                                                        </div>
                                                        <div className='user-activity'>
                                                            <div class="label">Assessments Done</div>
                                                            <div class="value">{userAchievements?.assessments_completed}</div>
                                                        </div>


                                                    </div>
                                                    <div class="separators"></div>
                                                    <div class="stat-item">
                                                        <div class="icon-wrapper">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                                <path d="M2.66602 7.69003C2.66602 7.69003 4.42719 5.3418 8.53661 5.3418C12.646 5.3418 14.4072 7.69003 14.4072 7.69003V24.1277C14.4072 24.1277 12.646 22.9536 8.53661 22.9536C4.42719 22.9536 2.66602 24.1277 2.66602 24.1277V7.69003Z" fill="#FFC444" />
                                                                <path d="M14.4062 7.69003C14.4062 7.69003 16.1674 5.3418 20.2768 5.3418C24.3863 5.3418 26.1474 7.69003 26.1474 7.69003V24.1277C26.1474 24.1277 24.3863 22.9536 20.2768 22.9536C16.1674 22.9536 14.4062 24.1277 14.4062 24.1277V7.69003Z" fill="#FFC444" />
                                                                <line x1="13.9607" y1="25.2644" x2="13.9607" y2="3.30044" stroke="#E5F0F8" stroke-width="1.0982" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>

                                                        </div>
                                                        <div className='user-activity'>
                                                            <div class="label">Courses Covered</div>
                                                            <div class="value">{userAchievements?.course_completed}</div>
                                                        </div>

                                                    </div>
                                                    <div class="separators"></div>
                                                    <div class="stat-item">
                                                        <div class="icon-wrapper">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="26" viewBox="0 0 17 26" fill="none">
                                                                <path d="M7.85984 1.24177C7.71976 1.33048 7.61703 1.44722 7.54699 1.58263L7.44893 1.78808V10.0622C7.44893 14.6149 7.4396 18.3364 7.43026 18.3364C7.42092 18.3364 7.23881 18.2523 7.02402 18.1542C4.37648 16.9122 0.986517 18.0375 0.234748 20.4049C-0.129464 21.5442 0.183384 22.7349 1.0799 23.6314C1.64023 24.1917 2.43869 24.6353 3.27918 24.8595C3.83951 25.0042 4.99284 25.0603 5.57184 24.9669C6.47303 24.8221 7.31352 24.4672 7.95323 23.9629C8.42016 23.5941 8.75636 23.1832 8.9945 22.6975C9.33069 22.0111 9.31668 22.296 9.31668 16.1744C9.31668 13.13 9.33536 10.6786 9.35871 10.6786C9.43809 10.6786 10.0218 10.9634 10.4093 11.1922C11.8008 12.014 12.8187 13.2794 13.3043 14.783C13.5658 15.5861 13.5658 15.5767 13.3137 15.9316C13.1923 16.0997 13.0615 16.3098 13.0242 16.3986C12.8 16.9355 13.1736 17.5846 13.7526 17.664C14.2616 17.734 14.5651 17.5145 15.1254 16.66C15.9472 15.418 16.4888 13.8491 16.6523 12.2475C16.8297 10.4871 16.2227 8.72211 14.9993 7.42402C14.509 6.90572 13.93 6.44812 12.8327 5.70102C11.2265 4.60839 10.7735 4.21616 10.1618 3.39902C9.64354 2.70795 9.47077 2.40444 9.33536 1.95618C9.14392 1.33048 8.88243 1.10635 8.34545 1.10635C8.12599 1.10635 8.03261 1.13437 7.85984 1.24177Z" fill="#FFC444" />
                                                            </svg>

                                                        </div>
                                                        <div className='user-activity'>
                                                            <div class="label">Songs Learned</div>
                                                            <div class="value">{userAchievements?.songs_learned}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        }

                                    </div>
                                    <div className="col-md-4 d-lg-block d-none" style={{ padding: '0px 20px' }}>
                                        <div className="row">
                                            {/* Calender view */}
                                            <RecentSongLesson
                                                handleLikeSongs={handleLikeSongs}
                                            />
                                            <Calender
                                                date={date}
                                                setDate={setDate}
                                                activeDates={dashboardData?.userActivity}
                                                loading={dashboardData?.streakLoading}
                                            />

                                            {/* <!-- for not subscried ones --> */}
                                            {!userProfile?.membership && (
                                                <div className="col-md-12 query-container mb-4">
                                                    <div className="subscription_plan_section">
                                                        <div
                                                            className="d-flex justify-content-center align-items-center flex-column plan-content">
                                                            <p>Premium Plan Starting @</p>
                                                            <h4>{singleMembership?.currency == 'INR' ? `₹${singleMembership?.price}` : `Just $${singleMembership?.price}`}<span>/month</span></h4>
                                                            <h6>{singleMembership?.currency == 'INR' ? `₹${Math.round(monthlyDivision)} everyday` : ''}</h6>
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-center align-items-center flex-column plan-container">
                                                            <div
                                                                className="d-flex  justify-content-center align-items-center mb-4 gap-2">
                                                                <img loading="lazy" className="image-background" src="./assets/img/faded-tick.svg"
                                                                    alt="faded" />
                                                                <div className="text-content">Get access to our entire music library of over 1000 songs.</div>
                                                            </div>
                                                            <div
                                                                className="d-flex  justify-content-center align-items-center mb-4 gap-2">
                                                                <img loading="lazy" className="image-background" src="./assets/img/faded-tick.svg"
                                                                    alt="faded" />
                                                                <div className="text-content">Learn your favourite instrument from your favourite
                                                                    celebrity</div>
                                                            </div>
                                                            <div className="d-flow text-center  ">
                                                                <Link to='/membership'><button className="btn btn-subscribe me-2">Explore Now</button></Link>
                                                                {/* <button className="btn learn-more">Learn More</button> */}
                                                            </div>
                                                            <hr />
                                                            <div
                                                                className="d-flex  justify-content-start align-items-center gap-2 mb-2">
                                                                <img loading="lazy" src="./assets/img/i-icon.svg" alt="info" />
                                                                <div className="footer-text">Not Sure if suitable for you ? We have a 3
                                                                    days money back guarantee</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            )}

                                            {/* <!-- for subscribed ones --> */}
                                            <div className="col-md-12 query-container mb-4">
                                                <QueryContact />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Avtar modal */}
                <AvtarModal
                    closeAvtarModal={closeAvtarModal}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    avtarImages={avtarImages}
                    setAvtarImages={setAvtarImages}
                    setActiveIndex={setActiveIndex}
                    activeIndex={activeIndex}
                    isAvatarSelected={isAvatarSelected}
                    setIsAvatarSelected={setIsAvatarSelected}
                    modalOpen={modalOpen}
                />
                <DeleteLearningProgressModal
                    deleteId={deleteId}
                    token={token}
                />
                <DeleteLearningSuccessfully />
            </div>
        </>
    )
}

export default Dashboard;
