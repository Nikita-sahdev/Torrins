import React, { useEffect, useState } from "react";
import { songs } from '../../Action/songs.action'
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Action/auth.actions";
import { authConstants } from "../../Constants/Auth";
// import "./Header.css";
import { lessonSongs } from "../../Action/lessonSongs.actions";
import { homepageAction } from '../../Action/homepage.action';
// import '../Common/CSS/homepage.css';
import BottomNavigation from "./BottomNavigation";
import SideNavigation from "./SideNavigation";
import { seoAction } from "../../Action/seo.actions";
import { membership } from "../../Action/membership.action";
import Search from "./Search";
import useWindowDimensions from "../../Helpers/useWindowDimensions";
import DeskTopSideBar from "./Navigation/DeskTopSideBar/DeskTopSideBar";
import { BobTicker } from "./BobTicker/BobTicker";
import { dashboardAction } from "../../Action/User/dashboard.actions";

const Header = (props) => {
    const { pathname, search } = useLocation();
    const { windowWidth } = useWindowDimensions();
    const [searchParams] = useSearchParams(); 
    const id = pathname?.split('-').pop()?.match(/^\d+$/) ? pathname.split('-').pop() : undefined;
    const courseSongsLessons = searchParams.get("courseSongsLessons") === "true"; 

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const courses = useSelector((state) => state.lesson);
    const mainInstruments = useSelector((state) => state.lesson.mainInstruments);
    const menus = { courses: mainInstruments?.courses?.courses };
    const [activeLink, setActiveLink] = useState("");
    const authState = useSelector((state) => state.auth);
    const socialToken = authState?.userDetails?.token;
    const course_type = useSelector((state) => state.lesson.course_type);
    const streakCount = useSelector((state) => state.auth.streak);
    const getSeoTypeData = useSelector((state) => state.seo.seoValues);
    const token = authState?.userDetails?.hash;
    const SocialToken = authState?.userDetails?.token;
    const [active, setActive] = useState(activeLink);
    const [courseOption, setCourseOption] = useState('');
    const [isFree, setIsFree] = useState(0);
    const [mainMenuData, setMainMenuData] = useState(mainInstruments?.courses);
    const [isTabChange, setIsTabChange] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [activeMenu, setActiveMenu] = useState('courses');
    const [activeCourseLink, setActiveCourseLink] = useState(null);
    const [activeCourse, setActiveCourse] = useState('')
    const [courseLists, setCourseLists] = useState([])
    const [activeSong, setActiveSong] = useState('')
    const [songsLists, setSongsLists] = useState([])
    const [activeSongTab, setActiveSongTab] = useState('')
    const [clickedState, setClickedState] = useState(false)
    // const chordIndex = menus?.courses[0]?.lessons[menus?.courses[0]?.lessons?.length - 1]
    const [recentValue, setRecentValue] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showModalMobile, setShowModalMobile] = useState(false)
    const [page, setPage] = useState(1);
    const [desktopSidebar, setDesktopSidebar] = useState(false);
    const levelType = useSelector((state) => state.lesson.levelType);

    const [isChecked, setIsChecked] = useState(false)

    const handleCloseDesktopSidebar = () => {
        setDesktopSidebar(false)
        closePersonalisation();

    }


    const handleClose = () => {
        setShowModal(false)
    }

    const handleCloseMobile = () => {
        setShowModalMobile(false)
    }


    useEffect(() => {
        
        if (id) {
            dispatch({ type: "SET_MAIN_ACTIVE_MENU", payload: Number(id) });
        }

    }, [id])

    useEffect(() => {
        if (showModal) {
            document.body.style.paddingRight = '0px';
        } else {
            document.body.style.paddingRight = '';
        }

    }, [showModal])

    useEffect(() => {
        const docEl = window.$(document);
        const nav = window.$("nav");
        let lst = 1;

        if (pathname === '/') {
            const handleScroll = () => {
                const cst = window.$(document).scrollTop();
                if (cst > lst) {
                    nav.addClass("hidden");
                } else {
                    nav.removeClass("hidden");
                }

                lst = cst;
            };

            docEl.on("scroll", handleScroll);

            // Cleanup function
            return () => {
                docEl.off("scroll", handleScroll);
            };
        } else {
            nav.removeClass("hidden");
        }

        if(token || SocialToken) {
            dispatch(dashboardAction.recentCourse({}, {Token: token || SocialToken}));
        }
        
    }, [pathname]);



    // to handle back scroll search
    // const handleMouseEnter = () => {
    //     document.body.style.overflow = 'hidden';
    // }
    // const handleMouseleave = () => {
    //     document.body.style.overflow = 'auto';
    // }
    // useEffect(() => {
    //     const searchIcon = document.querySelector('.searchicon-mob');
    //     const dropdown = document.querySelector('.dropdown-content4');
    //     searchIcon.addEventListener('mouseenter', handleMouseEnter);
    //     dropdown.addEventListener('mouseleave', handleMouseleave);
    // })

    useEffect(() => {
        setProfileImage(authState?.userProfile?.user_data?.poster || streakCount?.user_data?.poster)
    }, [authState?.userProfile?.user_data])

    useEffect(() => {
        // if (pathname.includes("free-")) {
        //     dispatch(lessonSongs.fetchAllCourses({free: 1}));
        // } else {
        // dispatch(lessonSongs.fetchAllCourses());
        // }
    }, [course_type])

    useEffect(() => {
        setClickedState(false)
        // Top scroller not to add here
        // window.scrollTo({ top: 0, behavior: 'smooth' });



        const courseObj = menus && menus?.courses?.find(course => course.hash === activeLink);


        if (courseObj) {
            if (id) {
                dispatch({ type: 'SET_INSTRUMENT_PAGE_CONTENT', payload: { 'sub_course': {}, 'course': courseObj?.lessons.filter((item => item?.id == Number(id))) } })
                dispatch({ type: "SET_ACTIVE_MENU", payload: { course: courseObj, course_type: 'lessons' } });
                dispatch({ type: 'SET_SEO_VALUE', payload: { type: 'LESSON', id: Number(id) } })
                dispatch(lessonSongs.getMainCategoryData(Number(id), { Token: token || SocialToken }));
                if (authState?.auth) {
                    dispatch(lessonSongs.getLessonsExtras(Number(id), {}, { Token: token || SocialToken }));
                }

                return

            }

            if (pathname?.includes('free')) {
                dispatch({ type: 'SET_INSTRUMENT_PAGE_CONTENT', payload: { 'course': courseObj?.lessons[0], 'sub_course': {} } })

            } else {
                dispatch({ type: 'SET_INSTRUMENT_PAGE_CONTENT', payload: { 'course': courseObj, 'sub_course': {} } })
            }

            if (levelType?.type !== 'songs') {
                dispatch({ type: 'SET_SEO_VALUE', payload: { type: 'LESSON', id: courseObj?.id } })
                dispatch({ type: "SET_ACTIVE_MENU", payload: { course: courseObj, course_type: 'lessons' } });
            }

            if (clickedState) {
                dispatch({ type: "SET_MAIN_ACTIVE_MENU", payload: id ? id : courseObj?.lessons[0]?.id });

            } else {
                dispatch({ type: "SET_MAIN_ACTIVE_MENU",  payload: id ? id : courseObj?.lessons[0]?.id });
                dispatch({ type: "SET_ACTIVE_MENU", payload: { course: courseObj, course_type: 'lessons' } });
            }

            const filter = {}

            if (isFree) {
                filter.level = courseObj?.lessons[0]?.level + 1 ?? 2;
                filter.free = 1
            }

            if (clickedState) {
                dispatch(lessonSongs.getMainCategoryData(id ? id : courseObj?.lessons[0]?.id, filter, { Token: token || SocialToken }));
                if (authState?.auth) {
                    dispatch(lessonSongs.getLessonsExtras(id ? id : courseObj?.lessons[0]?.id, filter, { Token: token || SocialToken }));
                }

            } else {
                dispatch(lessonSongs.getMainCategoryData(id ? id : courseObj?.lessons[0]?.id, filter, { Token: token || SocialToken }));
                if (authState?.auth) {
                    dispatch(lessonSongs.getLessonsExtras(id ? id : courseObj?.lessons[0]?.id, filter, { Token: token || SocialToken }));
                }
            }


            return () => {
                dispatch({ type: 'SET_SEO_VALUE', payload: { type: 'LESSON', id: courseObj?.id } })

                dispatch({ type: "SET_ACTIVE_MENU", payload: { course: courseObj } });
            }
        }
    }, [menus?.courses, activeLink , id]);

    useEffect(() => {
        if (authState?.auth === false) {
            const isForgotPasswordPath = window.location.pathname === "/forgotpassword";
            const isSignUpPath = window.location.pathname === "/signup";
            const isResetPath = window.location.pathname === "/resetpassword";

            if (isForgotPasswordPath) {
                navigate("/forgotpassword");
            } else if (isSignUpPath) {
                navigate("/signup");
            } else if (isResetPath) {
                navigate("/resetpassword");
            }
        }

        document.querySelectorAll("#navbarDefault .nav-item").forEach((item) => {
            item.addEventListener("click", function () {
                if (window.innerWidth < 768) {
                    document.getElementById("navigation-menu").click();
                }
            });
        });
    }, [authState.auth]);


    const closePersonalisation = () => {

        dispatch({ type: 'CHANGE_PERSONALIZATION_STATE', payload: false });
        props?.setIsModalActive(false);

    }

    useEffect(() => {
        dispatch(lessonSongs.fetchAllCourses());
        // Getting alll main menu here
        if (!mainInstruments?.courses?.courses?.length) {

            lessonSongs.fetchAllMainCourses().then((response) => {
                if (response?.data?.data?.courses?.length) {
                    setMainMenuData((prevData) => {
                        return response.data.data;
                    });

                    dispatch({ type: 'MAIN_INSTRUMENTS_DATA', payload: { courses: response?.data?.data, filters: response?.data } })
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    useEffect(() => {

        if (mainMenuData?.courses?.length) {
            setActiveCourse(mainMenuData?.courses[0])
            setCourseLists(mainMenuData?.courses[0]?.lessons)
        }
        if (mainMenuData?.songs?.length) {
            setActiveSong(mainMenuData?.songs && mainMenuData?.songs[0])
            setSongsLists(mainMenuData?.songs && mainMenuData?.songs[0]?.songs)
        }

    }, [mainMenuData])

    useEffect(() => {
        //Streak request
        if (token || socialToken) {
            dispatch(auth.userStreak({ Token: token || socialToken }));
        }

        // dispatch(homepageAction.fetchHomepageData());
    }, [authState?.auth]);

    useEffect(() => {
        const modifypath = pathname.replace("/", "");
        let path = modifypath.replace(/^\//, "").split("/");

        if (pathname.includes("free-")) {
            path[0] = path[0].replace("free-", "");
            setIsFree(1);
        }
        setActiveLink(path[0]);
    }, [pathname]);

    const logout = () => {
        dispatch({ type: 'START_COURSE_DATA_EMPTY', payload: true })
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch({ type: authConstants.SIGNOUT_REQUEST });
        dispatch(auth.signOut({}, { token: authState?.userDetails?.hash || SocialToken }));
        navigate('/signin')

    }

    const handleSlug = (course, item) => {
        setIsFree(false);
        setCourseOption(course.hash);
        setActive(course);
        closePersonalisation()

        if (item == 'all') {
            if (activeLink === course.hash && course_type === "lessons") return;
            dispatch({ type: "SET_MAIN_ACTIVE_MENU", payload: course?.lessons[0]?.id });
            dispatch({ type: 'SET_SEO_VALUE', payload: { type: 'LESSON', id: course?.id } })
            dispatch({ type: "SET_ACTIVE_MENU", payload: { course: course, course_type: 'lessons' } });

        } else if (item == 'free') {
            setClickedState(false)
            // dispatch({ type: 'SET_INSTRUMENT_PAGE_CONTENT', payload: { 'course': course?.lessons[0], 'sub_course': {} } })
            if (pathname == `${'/free-' + course.hash}` && course_type === "lessons") return;
            dispatch({ type: "SET_ACTIVE_MENU", payload: { course: course, course_type: 'lessons' } });
            dispatch({ type: 'SET_INSTRUMENT_PAGE_CONTENT', payload: { 'course': course?.lessons[0], 'sub_course': {} } })
            dispatch({ type: "SET_MAIN_ACTIVE_MENU", payload: course?.lessons[0]?.id });
            dispatch(lessonSongs.getMainCategoryData(course?.lessons[0]?.id, '', { Token: token || SocialToken }));
            if (authState?.auth) {
                dispatch(lessonSongs.getLessonsExtras(course?.lessons[0]?.id, '', { Token: token || SocialToken }));
            }

        } else {
            setClickedState(true)
            // if (activeLink === course.hash && course_type === "lessons") return;
            dispatch({ type: 'SET_INSTRUMENT_PAGE_CONTENT', payload: { 'course': course, 'sub_course': item } })
            dispatch({ type: "SET_MAIN_ACTIVE_MENU", payload: item?.id });
            dispatch({ type: 'SET_SEO_VALUE', payload: { type: 'LESSON', id: course?.id } })
            dispatch({ type: "SET_ACTIVE_MENU", payload: { course: course, course_type: 'lessons' } });
            dispatch(lessonSongs.getMainCategoryData(item?.id, '', { Token: token || SocialToken }));
            if (authState?.auth) {
                dispatch(lessonSongs.getLessonsExtras(item?.id, '', { Token: token || SocialToken }));
            }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });


        // if (token || SocialToken) {
        //     dispatch(lessonSongs.getLessonHistory({ Token: token || SocialToken }));
        //     dispatch(
        //         lessonSongs.getTopPickData(course?.id, "1", {
        //             Token: token || SocialToken,
        //         })
        //     );
        // }
    };

    const handleSongsSlug = (course, songObject) => {
        setClickedState(true)
        setActiveSongTab(songObject?.hash)
        setActive(course);
        closePersonalisation()

        if (songObject == 'all') {
            if (activeLink === course.hash && course_type === "songs") return;
            dispatch({ type: "SET_MAIN_ACTIVE_MENU", payload: course?.lessons[0]?.id });
            dispatch({ type: 'SET_SEO_VALUE', payload: { type: 'LESSON', id: course?.id } })
            dispatch({ type: "SET_ACTIVE_MENU", payload: { course: course, course_type: 'songs' } });

        } else if (songObject == 'free') {
            if (pathname == `${'/free-' + course.hash}` && course_type === "lessons") return;
            dispatch({ type: "SET_MAIN_ACTIVE_MENU", payload: course?.lessons[0]?.id });
            dispatch({ type: "SET_ACTIVE_MENU", payload: { course: course, course_type: 'songs' } });
        }
        else {
            dispatch({ type: 'SET_SEO_VALUE', payload: { type: 'LESSON', id: songObject?.id } })
            dispatch({ type: "SET_ACTIVE_MENU", payload: { course: course, course_type: 'songs' } });
            // if (course?.lessons.length > 0) {
            //     dispatch({ type: "SET_MAIN_ACTIVE_MENU", payload: course.lessons[0].id });
            // }
            dispatch({ type: 'SET_CLICKED_STATE', payload: true })
            // dispatch(songs.getSongsTabs({ 'parent': course?.id, 'path': songObject?.id }, { Token: token || SocialToken }));

        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

    };

    const handleHover = (course) => {
        setActiveCourse(course);
        setCourseLists(course?.lessons)
    }


    const handleLessons = (course) => {
        setClickedState(false)
        dispatch({ type: 'SET_INSTRUMENT_PAGE_CONTENT', payload: { 'course': course, 'sub-course': {} } })
        closePersonalisation()
        dispatch({ type: "SET_MAIN_ACTIVE_MENU", payload: course?.lessons[0]?.id });
        dispatch({ type: 'SET_SEO_VALUE', payload: { type: 'LESSON', id: course?.id } })
        dispatch({ type: "SET_ACTIVE_MENU", payload: { course: course, course_type: 'lessons' } });
        dispatch(lessonSongs.getMainCategoryData(course?.lessons[0]?.id, '', { Token: token || SocialToken }));
        if (authState?.auth) {
            dispatch(lessonSongs.getLessonsExtras(course?.lessons[0]?.id, '', { Token: token || SocialToken }));
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }


    const handleSongs = (course) => {
        // dispatch({ type: 'SET_SEO_VALUE', payload: { type: 'LESSON', id: songObject?.id } })
        dispatch({ type: "SET_ACTIVE_MENU", payload: { course: course, course_type: 'songs' } });
        // if (course?.lessons.length > 0) {
        //     dispatch({ type: "SET_MAIN_ACTIVE_MENU", payload: course.lessons[0].id });
        // }
        dispatch({ type: 'SET_CLICKED_STATE', payload: true })
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // dispatch(songs.getSongsTabs({ 'parent': course?.id, 'path': songObject?.id }, { Token: token || SocialToken }));
    }

    const handleSongHover = (songs) => {
        setActiveSong(songs)
        setSongsLists(songs?.songs)
    }

    const handleSignup = () => {
        navigate('/signup');
    }

    const handleNavigate = (hash) => {
        navigate(`/${hash}`);

    }

    useEffect(() => {
        window.$('.nav-link').on('click', function () {
            window.$('.nav-link').removeClass('active')
            window.$(this).addClass('active')
        })

    }, [])

    // useEffect(() => {
    //     if (getSeoTypeData.type === undefined) return;
    //     const requestData = {
    //         type: getSeoTypeData?.type,
    //         id: getSeoTypeData?.id ?? '',
    //         hash: getSeoTypeData?.hash ?? ''
    //     }
    //     dispatch(seoAction.getSeo(requestData, { Token: token || SocialToken }))
    // }, [getSeoTypeData, levelType])

    const handleTabChange = (type, id) => {
        closePersonalisation()
        setIsTabChange(true);
        const requestData = {
            type: type,
            id: id
        };
        dispatch(seoAction.getSeo(requestData, { Token: token || SocialToken }));
    };

    const handleLogin = () => {
        closePersonalisation()
        dispatch({ type: 'START_COURSE_DATA_EMPTY', payload: false })
    }

    //remove chords tab
    let mainTabss = courseLists.filter(function (tab) {
        return tab.title !== 'Chords' && !tab.title.includes('Free');
    });


    // for nav personalisation
    const handlePersonalization = () => {
        dispatch({ type: 'CHANGE_PERSONALIZATION_STATE', payload: true });

        const navbar = document.getElementById('mainNavbar');
        // Removing the 'hidden' class from the navbar
        navbar.classList.remove('hidden');
        if (windowWidth < 800) navbar.style.zIndex = "1";


    }

    const handleClickSearch = () => {
        setPage(0)
        dispatch({ type: 'SET_EMPTY_SEARCH_VALUE' })
        if (token || socialToken) {
            dispatch(lessonSongs.recentSearches({ Token: token || SocialToken }))
        } else {
            dispatch({ type: 'SET_RECENT_SEARCH_VALUE' })
        }

        setRecentValue('')
    }


    const handleChangeSchool = () => {

        if (authState?.userDetails?.school_student_id) {
            setIsChecked(true)
            window.location.href = `${process.env.REACT_APP_ONLINE_TORRINS_URL}/?student-token=${authState?.userDetails?.school_student_token}`;
        }

    }


    return (
        <div className={`HeaderFooterHomepageDiv homepageMainDiv ${props?.isBobShow && 'isbobticker'}`} >

            <nav id="mainNavbar" className="navbar navbar-expand-lg px-1 py-0" style={{ zIndex: '999999999999999 !important', minHeight: 'auto', margin: '0px auto' }}>
                {props?.isBobShow && <BobTicker setIsBobShow={props?.setIsBobShow} isBobShow={props?.isBobShow} isModalActive={props?.isModalActive} tickerData={props?.tickerData} />}

                <div className="container-fluid bg-color" style={{ margin: '14px auto', position: 'relative', height: '38px' }}>

                    {/* Logo */}
                    <Link className="navbar-brand" to="/" style={{ transform: 'translate(0px, 0px)', opacity: 1 }} onClick={() => handleTabChange('HOME', '0')}>
                        <img src={`/assets/img/chirstmas-logo.svg`} className="logo" alt="logo" />
                    </Link>

                    <div className="navbar-collapse collapse" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto d-flex gap-3 px-5 mb-2 mb-lg-0">
                            {(authState?.userDetails?.hash || SocialToken) && authState?.userProfile?.user_data?.membership &&
                                <li className="nav-item d-flex align-items-center gap-1">
                                    <Link onClick={handleTabChange} className={`nav-link ${pathname.includes('/dashboard') ? 'active' : ''}`} aria-current="page" to="/dashboard">My Learning Path</Link>
                                </li>
                            }
                            {/* All Courses */}
                            {!authState?.userProfile?.user_data?.membership &&
                                <li className="nav-item d-flex align-items-center gap-1">
                                    <div className="drop-all-course drop3 d-flex align-items-center gap-1">
                                        <Link className="nav-link dropbtn3" aria-current="page" to="#" onMouseEnter={() => setActiveCourseLink(0)}>Free Lessons</Link>
                                        <img className="arrow-img" src={`${process.env.REACT_APP_URL}/assets/homepage/Vector 1769.png`} alt="" />

                                        <div className="dropdown-content-all-course">
                                            <div className="d-flex">
                                                <div>
                                                    <Link to="#" onMouseEnter={() => setActiveMenu('courses')} className={activeMenu == 'courses' ? 'active' : ""}>
                                                        Free Courses
                                                        {activeMenu === 'courses' ? <img src={`/assets/img/head-arrow.svg`} alt="arrow" /> : ' '}
                                                    </Link>
                                                    {/* <hr /> */}
                                                    <Link to="#" onMouseEnter={() => setActiveMenu('songs')} className={activeMenu == 'songs' ? 'active' : ""}>
                                                        Free Songs
                                                        {activeMenu === 'songs' ? <img src={`/assets/img/head-arrow.svg`} alt="arrow" /> : ' '}
                                                    </Link>
                                                </div>

                                                {activeMenu === 'courses' && menus?.courses?.length > 0 ?
                                                    <div className='dropdown-course-mid p-2' key={courses.id}>

                                                        {menus.courses.map((courses, index) => (
                                                            <>
                                                                <Link to={`free-${courses?.hash}`}
                                                                    onClick={() => { handleSlug(courses, 'free') }}

                                                                >
                                                                    {courses.title}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                        <path d="M12.7636 4.71875L4.76355 12.7188" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <path d="M6.09692 4.71875H12.7636V11.3854" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                </Link>
                                                                {index != menus.courses?.length - 1 ? <hr /> : ""}
                                                                {/* <Link onClick={() => handleSlug(courses)} to={courses?.hash} style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)", opacity: "1" }}>View All
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                                                    <path d="M5.93701 13.2528L10.6037 8.5861L5.93701 3.91943" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                </svg>
                                                            </Link> */}
                                                            </>
                                                        ))
                                                        }
                                                    </div>

                                                    : ''}


                                                {activeMenu === 'songs' && menus?.courses?.length > 0 ? (
                                                    <div className='dropdown-course-mid p-2 '>

                                                        {menus?.courses?.map((song, idx) => {
                                                            const index = song?.lessons?.findIndex(item => item.hash === 'song-lessons');
                                                            const lessonObject = song?.lessons[index];
                                                            return (<>
                                                                <Link onClick={closePersonalisation} to={`free-${song?.hash}/${lessonObject?.hash}-${lessonObject?.id}`}>{song.title.replace('Lessons', 'Songs')}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                                        <path d="M12.7636 4.71875L4.76355 12.7188" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <path d="M6.09692 4.71875H12.7636V11.3854" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                </Link>
                                                                {idx != menus.courses?.length - 1 ? <hr /> : ""}
                                                            </>
                                                                // {/* <Link onClick={() => handleSlug(song)} to={`${song?.hash}/${lessonObject?.hash}-${lessonObject?.id}`} style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)", opacity: "1" }}>View All
                                                                //     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                                                //         <path d="M5.93701 13.2528L10.6037 8.5861L5.93701 3.91943" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                //     </svg>
                                                                // </Link> */}
                                                            )

                                                        })
                                                        }
                                                    </div>
                                                ) : ''}
                                            </div>
                                        </div>
                                    </div>
                                </li>}
                            {/* Free Courses */}
                            {/* {!authState?.userProfile?.user_data?.membership &&
                                <li className="nav-item d-flex align-items-center gap-1">
                                    <div className="drop d-flex align-items-center gap-1">
                                        <Link onClick={handleTabChange} className={`nav-link dropbtn2 ${pathname.includes("free-guitar-lessons") ||
                                                pathname.includes("free-bass-lessons") ||
                                                pathname.includes("free-piano-lessons")
                                                ? 'active'
                                                : ''
                                            }`} aria-current="page" to="#">Free Courses</Link>
                                        <img className="arrow-img" src={`${process.env.REACT_APP_URL}/assets/homepage/Vector 1769.png`} alt="img" />

                                        <div className="dropdown-content">
                                            <Link onClick={() => { dispatch({ type: 'SET_COURSE_TYPE', payload: 'free-lessons' }); handleTabChange('FREE-LESSON','/free-guitar-lessons' ) }} to={`/free-guitar-lessons`} className={pathname.includes("free-guitar-lessons") ? 'active' : ''}>Guitar</Link>
                                            <Link onClick={() => { dispatch({ type: 'SET_COURSE_TYPE', payload: 'free-lessons' }); handleTabChange('FREE-LESSON', '/free-bass-lessons') }} to={`/free-bass-lessons`} className={pathname.includes("free-bass-lessons") ? 'active' : ''}>Bass</Link>
                                            <Link onClick={() => { dispatch({ type: 'SET_COURSE_TYPE', payload: 'free-lessons' }); handleTabChange('FREE-LESSON', '/free-piano-lessons') }} to={`/free-piano-lessons`} className={pathname.includes("free-piano-lessons") ? 'active' : ''}>Piano</Link>
                                        </div>
                                    </div>
                                </li>
                            } */}
                            {/* Courses */}
                            {/* <li className="nav-item d-flex align-items-center gap-1">
                                <div className="drop d-flex align-items-center gap-1">
                                    <Link
                                        className={`nav-link dropbtn2 ${/\/guitar-lessons$/.test(pathname) ||
                                            /\/bass-lessons$/.test(pathname) ||
                                            /\/piano-lessons$/.test(pathname)
                                            ? 'active'
                                            : ''
                                            }`}
                                        aria-current="page"
                                        to="#"
                                        onClick={handleTabChange}
                                    >
                                        Courses
                                    </Link>
                                    <img className="arrow-img" src={`${process.env.REACT_APP_URL}/assets/homepage/Vector 1769.png`} alt="img" />

                                    <div className="dropdown-content">
                                        {menus?.courses?.length > 0 ? menus?.courses?.map((course, index) => {
                                            return (
                                                <Link key={index} onClick={() => { handleSlug(course); handleTabChange('LESSON', course?.id) }} to={`/${course.hash}`} className={new RegExp(`/${course.hash}$`).test(pathname) ? 'active' : ''}>{course.title}</Link>
                                            )
                                        })
                                            : ""}
                                    </div>
                                </div>
                            </li> */}

                            <li className="nav-item d-flex align-items-center gap-1">
                                <div className="drop3 d-flex align-items-center gap-1">
                                    {/* <a className="nav-link dropbtn3" aria-current="page" href="#">All Courses</a> */}
                                    <Link
                                        className={`nav-link dropbtn2 ${/\/guitar-lessons$/.test(pathname) ||
                                            /\/bass-lessons$/.test(pathname) ||
                                            /\/piano-lessons$/.test(pathname)
                                            ? 'active'
                                            : ''
                                            }`}
                                        aria-current="page"
                                        to="#"
                                        onClick={handleTabChange}
                                    >
                                        All Courses
                                    </Link>
                                    <img className="arrow-img" src={`${process.env.REACT_APP_URL}/assets/homepage/Vector 1769.png`} alt="" />
                                    {mainMenuData?.courses?.length > 0 && <div className="dropdown-content3">
                                        <div className="d-flex">
                                            <div>
                                                {mainMenuData?.courses?.length > 0 ?
                                                    mainMenuData?.courses?.map((course, index) => {
                                                        return (
                                                            <React.Fragment key={course?.id}>
                                                                <Link
                                                                    onMouseEnter={() => handleHover(course)}  // Handle hover
                                                                    onClick={() => handleLessons(course)}    // Handle click
                                                                    to={`/${course?.hash}`}
                                                                    className={course?.title === activeCourse?.title ? 'active' : ''}
                                                                >
                                                                    {course.title}
                                                                    {activeCourse?.title === course?.title ? <img src={`/assets/img/head-arrow.svg`} alt="arrow" /> : ' '}
                                                                </Link>
                                                                {index !== mainMenuData?.courses?.length - 1 ? <hr /> : ""}
                                                            </React.Fragment>
                                                        );
                                                    })
                                                    : ""}
                                            </div>

                                            <div className="dropdown-3-mid p-2">

                                                {mainTabss?.slice(0, 7)?.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <div className="d-flex align-items-center w-100 justify-content-between" >

                                                            <Link to={`/${activeCourse?.hash}/${item.hash}-${item?.id}`}
                                                                onClick={() => { handleSlug(activeCourse, item); handleTabChange('LESSON', item?.id) }}
                                                            >
                                                                {item.title}{' '}({item?.total || ''})
                                                            </Link>
                                                            <img style={{ cursor: 'pointer' }} src="/assets/img/navigate.svg" alt="" onClick={() => { handleNavigate(item.hash) }} />
                                                        </div>
                                                        <hr />

                                                    </React.Fragment>

                                                ))

                                                }
                                                {
                                                    mainTabss?.length > 6 && <Link style={{ width: 'max-content' }} to={activeCourse.hash}
                                                        onClick={() => { handleSlug(activeCourse, 'all'); handleTabChange('LESSON', activeCourse?.id) }}

                                                    >View All
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
                                                            fill="none">
                                                            <path d="M5.93701 13.2528L10.6037 8.5861L5.93701 3.91943" stroke="#222222"
                                                                stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg></Link>
                                                }
                                            </div>

                                            <div className="dropdown-3-end">
                                                <div className="inner d-flex">
                                                    <div>
                                                        <h6>
                                                            Learn your favourite <br /> instrument with  <br /> personalised lessons
                                                        </h6>
                                                        {/* <div className="d-flex gap-3 mt-3">
                                                            <div className="gray">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21"
                                                                    viewBox="0 0 20 21" fill="none">
                                                                    <path d="M5.21094 10.009L8.78779 13.5859L14.7878 7.58594"
                                                                        stroke="#222222" stroke-width="1.5" stroke-linecap="round"
                                                                        stroke-linejoin="round" />
                                                                </svg>
                                                            </div>
                                                            <p>
                                                                For intermediate to <br />
                                                                advance players
                                                            </p>
                                                        </div> */}
                                                        {/* <div className="d-flex gap-3">
                                                            <div className="gray">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21"
                                                                    viewBox="0 0 20 21" fill="none">
                                                                    <path d="M5.21094 10.009L8.78779 13.5859L14.7878 7.58594"
                                                                        stroke="#222222" stroke-width="1.5" stroke-linecap="round"
                                                                        stroke-linejoin="round" />
                                                                </svg>
                                                            </div>
                                                            <p>
                                                                Learn important <br />
                                                                techniques and style
                                                            </p>
                                                        </div> */}
                                                        <button className="btn-1 mt-4 learning-nav" onClick={handlePersonalization} target='_blank'>Start Learning</button>
                                                    </div>

                                                    <div className="right">
                                                        <img
                                                            src="/assets/homepage/pexels-karolina-grabowska-4472065 1.webp"
                                                            alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </li>

                            {/* Songs */}
                            <li className="nav-item d-flex align-items-center gap-1">
                                <div className="drop d-flex align-items-center gap-1">
                                    <Link onClick={handleTabChange} className={`nav-link dropbtn2 ${(pathname.includes("/song-lessons-") && !courseSongsLessons) ? 'active' : ''
                                        }`} aria-current="page" to="#">Songs</Link>
                                    <img className="arrow-img" src={`${process.env.REACT_APP_URL}/assets/homepage/Vector 1769.png`} alt="img" />

                                    {mainMenuData?.songs?.length > 0 && <div className="dropdown-content">
                                        {/* {mainMenuData?.courses?.length > 0 ? mainMenuData?.courses?.map((song) => {
                                            const index = song?.lessons?.findIndex(item => item.hash === 'song-lessons');
                                            const lessonObject = song?.lessons[index];
                                            return (
                                                // <Link to={`${song.hash}`}>{song.title}</Link>
                                                <Link
                                                    className={new RegExp(`/${song?.hash}/song-lessons-`).test(pathname) ? 'active' : ''}
                                                    key={song.id}
                                                    to={`${song.hash}/${lessonObject?.hash}-${lessonObject?.id}`}
                                                    onClick={() => {
                                                        handleSongsSlug(song, lessonObject); handleTabChange('LESSON', lessonObject?.id)
                                                    }}
                                                >
                                                    {song?.title.replace("Lessons", "Songs")}

                                                </Link>
                                            )
                                        })
                                            : ""} */}

                                        <div className="d-flex">
                                            <div>
                                                {mainMenuData?.songs?.length > 0 ? mainMenuData?.songs?.map((course, index) => {
                                                    return (
                                                        <React.Fragment key={course?.id}>
                                                            <Link onMouseEnter={() => handleSongHover(course)}  // Handle hover
                                                                onClick={() => handleSongs(course)}
                                                                to={`${course?.hash}/song-lessons`} className={course?.title === activeSong?.title ? 'active' : ''}>
                                                                {course.title}
                                                                {activeSong?.title === course?.title ? <img src={`/assets/img/head-arrow.svg`} alt="arrow" /> : ' '}
                                                            </Link>
                                                            {index != mainMenuData?.songs?.length - 1 ? <hr /> : ""}
                                                        </React.Fragment>

                                                    )
                                                })
                                                    : ""}

                                            </div>
                                            <div className="dropdown-3-mid p-2">
                                                {songsLists?.slice(0, 8)?.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <div className="d-flex align-items-center w-100 justify-content-between" >

                                                            <Link to={`/${activeSong?.hash}/${item.hash}-${item?.id}`}
                                                                onClick={() => {
                                                                    handleSongsSlug(activeSong, item); handleTabChange('LESSON', item?.id)
                                                                }}
                                                            >
                                                                {item.title}{' '}({item?.total || ''})
                                                            </Link>
                                                            <img style={{ cursor: 'pointer' }} src="/assets/img/navigate.svg" alt="" onClick={() => { handleNavigate(item.hash) }} />
                                                        </div>
                                                        <hr />

                                                    </React.Fragment>

                                                ))

                                                }
                                                {
                                                    songsLists?.length > 6 && <Link style={{ width: 'max-content' }} to={`${activeSong.hash}/song-lessons-656`}
                                                        onClick={() => {
                                                            handleSongsSlug(activeSong, 'all'); handleTabChange('LESSON', activeSong?.id)
                                                        }}
                                                    >View All
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17"
                                                            fill="none">
                                                            <path d="M5.93701 13.2528L10.6037 8.5861L5.93701 3.91943" stroke="#222222"
                                                                stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg></Link>
                                                }
                                            </div>

                                            <div className="dropdown-3-end">
                                                <div className="inner d-flex">
                                                    <div>
                                                        <h6>
                                                            Learn your favourite <br /> instrument with  <br /> personalised lessons
                                                        </h6>
                                                        {/* <div className="d-flex gap-3 mt-3">
                                                            <div className="gray">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21"
                                                                    viewBox="0 0 20 21" fill="none">
                                                                    <path d="M5.21094 10.009L8.78779 13.5859L14.7878 7.58594"
                                                                        stroke="#222222" stroke-width="1.5" stroke-linecap="round"
                                                                        stroke-linejoin="round" />
                                                                </svg>
                                                            </div>
                                                            <p>
                                                                For intermediate to <br />
                                                                advance players
                                                            </p>
                                                        </div> */}
                                                        {/* <div className="d-flex gap-3">
                                                            <div className="gray">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21"
                                                                    viewBox="0 0 20 21" fill="none">
                                                                    <path d="M5.21094 10.009L8.78779 13.5859L14.7878 7.58594"
                                                                        stroke="#222222" stroke-width="1.5" stroke-linecap="round"
                                                                        stroke-linejoin="round" />
                                                                </svg>
                                                            </div>
                                                            <p>
                                                                Learn important <br />
                                                                techniques and style
                                                            </p>
                                                        </div> */}
                                                        <button className="btn-1 mt-4 learning-nav" onClick={handlePersonalization} target='_blank'>Start Learning</button>
                                                    </div>

                                                    <div className="right">
                                                        <img
                                                            src="/assets/homepage/pexels-karolina-grabowska-4472065 1.webp"
                                                            alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    }
                                </div>
                            </li>

                            {/* chords */}
                            {/* <li className="nav-item d-flex align-items-center gap-1">
                                <div className="drop d-flex align-items-center gap-1">
                                    <Link onClick={handleTabChange} className={`nav-link dropbtn2 ${pathname.includes("/chords-") ? 'active' : ''
                                        }`} aria-current="page" to="#">Chords Library</Link>
                                    <img className="arrow-img" src={`${process.env.REACT_APP_URL}/assets/homepage/Vector 1769.png`} alt="" />

                                    <div className="dropdown-content">
                                        {menus?.courses?.length > 0 ? menus?.courses?.map((song) => {
                                            const index = song?.lessons?.findIndex(item => item.hash === 'chords');
                                            const lessonObject = song?.lessons[index];
                                            return (
                                                // <Link to={`${song.hash}`}>{song.title}</Link>
                                                <Link
                                                    className={new RegExp(`/${song?.hash}/chords-`).test(pathname) ? 'active' : ''}
                                                    key={song.id}
                                                    to={`${song.hash}/${lessonObject?.hash}-${lessonObject?.id}`}
                                                    onClick={() => {
                                                        handleSongsSlug(song, lessonObject);handleTabChange('LESSON', lessonObject?.id)
                                                    }}
                                                >
                                                    {song?.title.replace("Lessons", "Chords")}

                                                </Link>
                                            )
                                        })
                                            : ""}
                                    </div>
                                </div>
                            </li> */}
                            {/* <li className="nav-item">
                            <Link onClick={() => handleTabChange('Chords', '0')} className={`nav-link ${pathname.includes('/chords') ? 'active' : ''}`} aria-current="page" to={menus?.courses?.length > 0 ? `${menus?.courses[0]?.hash}/${chordIndex?.hash}-${chordIndex?.id}`:'javascript:void(0)'}>Lyrics & Chords{''}<sup style={{ color: '#dfa935' }}> Beta</sup></Link>
                            </li> */}
                            <li className="nav-item">
                                <Link target='_blank' className={`nav-link`} aria-current="page" to={'https://shop.torrins.com/'}>Shop {''}<sup><img height={18} src="/assets/img/Navigations/shopActive.svg" alt="shop" /></sup></Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={() => handleTabChange('WEBINAR', '0')} className={`nav-link ${pathname.includes('/webinar') ? 'active' : ''}`} aria-current="page" to={'/webinar'}>Webinar</Link>
                            </li>
                            {/* 
                            <li className="nav-item">
                                <Link onClick={() => handleTabChange('Instructors', '0')} className={`nav-link ${pathname.includes('/instructors') ? 'active' : ''}`} aria-current="page" to="/instructors">Our Instructors</Link>
                            </li> */}

                            {!authState?.userProfile?.user_data?.membership &&
                                <li className="nav-item">
                                    <Link onClick={() => handleTabChange('SUBSCRIPTION', '0')} className={`nav-link ${pathname.includes('/membership') ? 'active' : ''}`} aria-current="page" to="/membership">Membership</Link>
                                </li>
                            }
                            {authState?.userDetails?.school_student_id && <li className="nav-item" style={{ alignContent: 'center', padding: '8px' }}>
                                <div class="d-flex custom-switch gap-2 align-items-center">
                                    <p>Switch to School Mode</p>
                                    <label class="switch">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={handleChangeSchool}
                                        />
                                        <span class="slider round"></span>
                                    </label>

                                </div>

                            </li>
                            }
                            {/* <li className="nav-item">
                                <Link onClick={() => handleTabChange('blogs', '0')} className={`nav-link ${pathname.includes('/blogs') ? 'active' : ''}`} aria-current="page" to="/blogs">Blogs</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={() => handleTabChange('battle-of-bands', '0')} className={`nav-link ${pathname.includes('/battle-of-bands') ? 'active' : ''}`} aria-current="page" to="/battle-of-bands">Battle Of Bands {''}<sup style={{ color: '#dfa935' }}> New</sup></Link>
                            </li> */}
                        </ul>
                        <form className="d-flex align-items-center nav-right">

                            {/* desktop search */}
                            <div className="messg drop4 d-lg-block d-md-block d-none ">
                                {/* Search icon */}
                                <div className="dropbtn4 searchicon" onClick={() => { handleClickSearch(); setShowModal(true) }}>
                                </div>
                                <Search setRecentValue={setRecentValue}
                                    recentValue={recentValue} handleClose={handleClose} showModal={showModal} setPage={setPage} page={page} closePersonalisation={closePersonalisation} />
                            </div>

                            {authState?.userDetails?.hash || SocialToken ? (
                                <>
                                    <img id="dollar" src="/assets/homepage/Frame 1410085184.svg" alt="img" style={{ marginRight: '.3rem' }} />
                                    <p style={{ marginRight: '1rem' }}>{streakCount?.user_data?.wallet}</p>

                                    {streakCount?.daily_streak &&
                                        <>
                                            <div className="fire">
                                                <img src="/assets/img/instructor/days.png" alt="" style={{ height: '25px' }} />
                                            </div>
                                            <p style={{ marginRight: '1rem' }}>{streakCount?.daily_streak} {streakCount?.daily_streak == 1 ? 'day' : 'days'}</p>
                                        </>}

                                    {/* <div className="dropdown5" style={{ marginRight: '.3rem' }}>
                                        <div className="pro-img">
                                            <img className="dropbtn5" src={(profileImage ? profileImage : `${process.env.REACT_APP_URL}/assets/img/default_user.png`)} alt="img" />
                                        </div> */}
                                    {/* <div className="dropdown-content5">
                                            <Link to="/dashboard">My Dashboard</Link>
                                            <hr />
                                            <Link
                                                to="#"
                                                onClick={logout}
                                                className={`${authState.submitted ? "disabled" : ""
                                                    }`}
                                                disabled={authState.submitted}
                                            >
                                                Logout
                                            </Link>
                                        </div> */}
                                    {/* </div> */}
                                    <img className="three-line" src="/assets/img/HomeNew/three-line.svg" alt="" onClick={() => { setDesktopSidebar(true) }} />
                                </>
                            ) : (
                                <div className="login-section">
                                    <Link className="login" to="/signin" id="loginBtn" style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)", opacity: "1" }} onClick={() => handleLogin()}> Login / Signup </Link>
                                    <Link className="btn-sign" to="/signup-whatsapp" onClick={closePersonalisation} style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)", opacity: "1" }}>Get Started</Link>
                                    <img className="three-line" src="/assets/img/HomeNew/three-line.svg" alt="" onClick={() => { setDesktopSidebar(true) }} />
                                </div>
                            )}

                        </form>
                    </div>

                    {authState?.userDetails?.school_student_id && <li className="nav-item d-lg-none d-md-none d-block" style={{ alignContent: 'center', listStyle: 'none' }}>

                        <div class="d-flex custom-switch gap-2 align-items-center">
                            <p>School Mode</p>
                            <label class="switch">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleChangeSchool}
                                />
                                <span class="slider round"></span>
                            </label>

                        </div>
                    </li>
                    }


                    {/* mobile search */}
                    <div className="messg drop4 d-lg-none d-md-none d-block">

                        {/* Search icon */}
                        <div className="dropbtn4 searchicon searchicon-mob" onClick={() => { handleClickSearch(); setShowModalMobile(true) }}>
                        </div>
                        <Search setRecentValue={setRecentValue}
                            recentValue={recentValue} handleClose={handleCloseMobile} showModal={showModalMobile} setPage={setPage} page={page} closePersonalisation={closePersonalisation} />

                    </div>
                </div>
            </nav>

            {/* Navigation two */}
            {/* <NavigationTwo /> */}

            {/* Sub navigation */}
            {/* <SubNavigation 
                authState={authState} 
                socialToken={SocialToken}
                streakCount={streakCount}
            /> */}

            {/* Bottom navigation */}
            <BottomNavigation />

            {/* Side navigation */}
            <SideNavigation
                authState={authState}
                socialToken={SocialToken}
                menus={menus?.courses && menus}
                activeLink={activeLink}
                handleLessons={handleLessons}
                handleSongsSlug={handleSongsSlug}
                logout={logout}
                handleSignup={handleSignup}
            />

            <DeskTopSideBar
                authState={authState}
                socialToken={SocialToken}
                handleCloseDesktopSidebar={handleCloseDesktopSidebar}
                desktopSidebar={desktopSidebar}
                logout={logout}
                streakCount={streakCount}
                menus={menus?.courses && menus}

            />

        </div>
    );
};

export default Header;