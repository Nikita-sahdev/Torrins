import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNavigation = (props) => {
    const currentUrl = useLocation();

    const hideSidebar = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const sidenav = document.querySelector('#sidenav')
        sidenav.style.display = 'none'
        const mainBody = document.querySelector('body')
        mainBody.style.overflow = `unset`
    };

    const fncgetRelatedImage = (title) => {

        const imageMap = {
            "Guitar Lessons": "/assets/img/Navigations/guitar.svg",
            "Bass Lessons": "/assets/img/Navigations/bass.svg",
            "Piano Lessons": "/assets/img/Navigations/piano.svg",
        };

        return <img src={imageMap[title] || ''} alt='' />

    }

    const checkActiveNav = (currentPage) => {
        if (currentUrl?.pathname?.includes(currentPage)) {
            return 'show'
        } else return ''
    }

    return (
        <div id="sidenav" style={{ zIndex: '99999999999999999 !important' }}>

            <div className="sidenav">
                <div className='top-side'>
                    <div className="d-flex align-items-center justify-content-between">
                        <Link className="navbar-brand logo" to={'/'}>
                            <img src='/assets/img/chirstmas_black.svg' alt='sml-logo' />
                        </Link>
                        <img onClick={hideSidebar} className="cross" src="/assets/homepage/cross.png" alt="" />
                    </div>

                    {/* My account links */}
                    {(props?.authState?.userDetails?.hash || props?.socialToken) &&
                       <>
                       <div className="dropdown mbl-drop mt-5">
                           <button id="account" className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                               <div className="d-flex gap-3 justify-content-center align-items-center">
                                   My Account
                               </div>
                           </button>
                           <ul className="dropdown-menu sub-drop" style={{ padding: '5%' }}>
                               <li>
                                   <Link className="dropdown-item" onClick={hideSidebar} aria-current="page" to="/dashboard">
                                       {checkActiveNav('dashboard') !== 'show' 
                                           ? <img src="/assets/img/dashboard.svg" alt="learningpath" />
                                           : <img src="/assets/img/dashboardicon.svg" alt="learningpath" />
                                       }
                                       <span>My Learning Path</span>
                                   </Link>
                               </li>
                               <li>
                                   <Link className="dropdown-item" onClick={hideSidebar} to="/saved-courses">
                                       {checkActiveNav('saved-courses') !== 'show' 
                                           ? <img src="/assets/img/savewidget.svg" alt="Saved Courses" />
                                           : <img src="/assets/img/feedback-yellow.svg" alt="Saved Courses" />
                                       }
                                       <span>Saved Courses & Lessons</span>
                                   </Link>
                               </li>
                               <li>
                                   <Link className="dropdown-item" onClick={hideSidebar} to="/feedback-library">
                                       {checkActiveNav('feedback-library') !== 'show' 
                                           ? <img src="/assets/img/message.svg" alt="Feedback Library" />
                                           : <img src="/assets/img/feedback.svg" alt="Feedback Library" />
                                       }
                                       <span>Feedback Library</span>
                                   </Link>
                               </li>
                               <li>
                                   <Link className="dropdown-item" onClick={hideSidebar} to="/membership-settings">
                                       {checkActiveNav('membership-settings') !== 'show' 
                                           ? <img src="/assets/img/membership-setting.svg" alt="Membership Settings" />
                                           : <img src="/assets/img/MembershipSettings/highlightedMembership.svg" alt="Membership Settings" />
                                       }
                                       <span>Membership Settings</span>
                                   </Link>
                               </li>
                               <li>
                                   <Link className="dropdown-item" onClick={hideSidebar} to="/giftCards">
                                       {checkActiveNav('giftCards') !== 'show' 
                                           ? <img src="/assets/img/Navigations/giftCard.svg" alt="Gift Cards" />
                                           : <img src="/assets/img/Navigations/giftCard-active.svg" alt="Gift Cards" />
                                       }
                                       <span>GiftCards</span>
                                   </Link>
                               </li>
                               <li>
                                   <Link className="dropdown-item" onClick={hideSidebar} to="/referral">
                                       {checkActiveNav('referral') !== 'show' 
                                           ? <img src="/assets/img/refer.svg" alt="Refer & Earn" />
                                           : <img src="assets/img/refer-active.svg" alt="Refer & Earn" />
                                       }
                                       <span>Refer & Earn</span>
                                   </Link>
                               </li>
                               <li>
                                   <Link className="dropdown-item" onClick={hideSidebar} to="/profile-setting">
                                       {checkActiveNav('profile-setting') !== 'show' 
                                           ? <img src="/assets/img/person.svg" alt="Profile Settings" />
                                           : <img src="/assets/img/profile-yellow.svg" alt="Profile Settings" />
                                       }
                                       <span>Profile Settings</span>
                                   </Link>
                               </li>
                               <li>
                                   <Link className="dropdown-item" onClick={hideSidebar} to="/notification">
                                       {checkActiveNav('notification') !== 'show' 
                                           ? <img src="/assets/img/notifications.svg" alt="Notification Center" />
                                           : <img src="/assets/img/notify-yellow.svg" alt="Notification Center" />
                                       }
                                       <span>Notification Center</span>
                                   </Link>
                               </li>
                           </ul>
                       </div>
                       <hr />
                   </>
                   
                    }

                    {/* Free courses */}
                    {/* {!props?.authState?.userProfile?.user_data?.membership &&
                        <>
                            <div className={`dropdown mbl-drop ${(props?.authState?.userDetails?.hash || props?.socialToken) ? 'mt-3' : 'mt-5'}`}>
                                <button className="btn dropdown-toggle" id='free-course' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className='d-flex gap-3 justify-content-center align-items-center'>
                                        Free Courses
                                    </div>
                                </button>
                                <ul className="dropdown-menu sub-drop" style={{ padding: '5%' }}>
                                    <Link className="dropdown-item" onClick={hideSidebar} to={`/free-guitar-lessons`}>
                                        <img src='/assets/img/Navigations/guitar.svg' alt='guitar' />
                                        <span>Guitar Lessons</span>
                                    </Link>
                                    <hr />
                                    <Link className="dropdown-item" onClick={hideSidebar} to={`/free-bass-lessons`}>
                                        <img src='/assets/img/Navigations/bass.svg' alt='bass' />
                                        <span>Bass Lessons</span>
                                    </Link>
                                    <hr />
                                    <Link className="dropdown-item" onClick={hideSidebar} to={`/free-piano-lessons`}>
                                        <img src='/assets/img/Navigations/piano.svg' alt='piano' />
                                        <span>Piano Lessons</span>
                                    </Link>
                                    <hr />
                                </ul>
                            </div>
                            <hr />
                        </>
                    } */}

                    {/* Free lessons */}
                    {!props?.authState?.userProfile?.user_data?.membership &&
                        <>
                            <div className={`dropdown mbl-drop ${(props?.authState?.userDetails?.hash || props?.socialToken) ? 'mt-3' : 'mt-3'}`}>
                                <button className="btn dropdown-toggle" id='free-song' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className='d-flex gap-3 justify-content-center align-items-center'>
                                        Free Lessons
                                    </div>
                                </button>
                                <ul className="dropdown-menu sub-drop" style={{ padding: '5%' }}>
                                    <Link className="dropdown-item" onClick={hideSidebar} to={`/free-guitar-lessons`}>
                                        {/* <img src='/assets/img/Navigations/guitar.svg' alt='guitar' /> */}
                                        <span>Free Courses</span>
                                    </Link>
                                    {/* <hr /> */}
                                    <Link className="dropdown-item" onClick={hideSidebar} to={`/free-guitar-lessons/song-lessons-656`}>
                                        {/* <img src='/assets/img/Navigations/bass.svg' alt='bass' /> */}
                                        <span>Free Song Lessons</span>
                                    </Link>
                                    {/* <hr /> */}
                                    {/* <Link className="dropdown-item" onClick={hideSidebar} to={`/free-piano-lessons`}>
                                        <img src='/assets/img/Navigations/piano.svg' alt='piano' />
                                        <span>
                                            Piano Songs
                                        </span>
                                    </Link> */}
                                    {/* <hr /> */}
                                </ul>
                            </div>
                            <hr />
                        </>
                    }

                    {/*All Courses */}
                    <div className="dropdown mbl-drop mt-3">
                        <button id='allCourses' className={`btn  dropdown-toggle `} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className='d-flex gap-3 justify-content-center align-items-center'>
                                All Courses
                            </div>
                        </button>
                        <ul className={`dropdown-menu sub-drop `} style={{ padding: '5%' }}>

                            {props?.menus?.courses?.length > 0 ? props?.menus?.courses?.map((course, index) => {
                                return (
                                    <>
                                        <li key={index}><Link className="dropdown-item" onClick={() => { props?.handleLessons(course); hideSidebar() }} to={`/${course.hash}`}>
                                            {fncgetRelatedImage(course?.title)}
                                            <span>{course?.title}</span>
                                        </Link></li>
                                    </>
                                )
                            }) : ""}
                        </ul>
                    </div>
                    <hr />

                    {/* Songs */}
                    <div className="dropdown mbl-drop mt-3">
                        <button id='allSongs' className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className='d-flex gap-3 justify-content-center align-items-center'>
                                Song Library
                            </div>
                        </button>
                        <ul className="dropdown-menu sub-drop" style={{ padding: '5%' }}>
                            {props?.menus?.courses?.length > 0 ? props?.menus?.courses?.map((song, keyIndex) => {
                                const index = song?.lessons?.findIndex(item => item.hash === 'song-lessons');
                                const lessonObject = song?.lessons[index];

                                return (
                                    <>
                                        <Link
                                            className={`dropdown-item  ${props?.activeLink === song.hash ? "active" : ""}`}
                                            key={keyIndex}
                                            to={`${song.hash}/${lessonObject?.hash}-${lessonObject?.id}`}
                                            onClick={() => {
                                                props?.handleSongsSlug(song, lessonObject); hideSidebar()
                                            }}
                                        >
                                            {fncgetRelatedImage(song?.title)}
                                            <span>
                                                {song?.title.replace("Lessons", "Songs")}
                                            </span>
                                        </Link>
                                    </>
                                )
                            }) : ""}
                        </ul>
                    </div>
                    <hr />

                    {/* chords */}
                    <Link id='chords' className={`list-item ${checkActiveNav('chords')}`} to="/guitar-lessons/chords-123378" onClick={hideSidebar}>
                        <div className='d-flex gap-3 justify-content-center align-items-center'>
                            <p style={{ margin: '0px' }}>Lyrics & Chords {''}<sup style={{ color: '#dfa935' }}> Beta</sup></p>
                        </div>
                    </Link><hr />

                    {/* {(props?.authState?.userDetails?.hash || props?.socialToken) && props?.authState?.userProfile?.user_data?.membership &&
                <><Link to="https://www.torrins.com/blogs" target='_blank'>Blogs</Link><hr /></>
            } */}
                    <Link id='instructor' className={`list-item ${checkActiveNav('instructors')}`} to="/instructors" onClick={hideSidebar}>
                        <div className='d-flex gap-3 justify-content-center align-items-center'>
                            Our Instructors
                        </div>
                    </Link><hr />

                    {!props?.authState?.userProfile?.user_data?.membership &&
                        <><Link id='membership' className={`list-item ${checkActiveNav('membership')}`} to="/membership" onClick={hideSidebar}>
                            <div className='d-flex gap-3 justify-content-center align-items-center'>
                                Membership
                            </div>
                        </Link><hr /></>
                    }

                    <Link to="/blogs" id='blogs' className={`list-item ${checkActiveNav('blogs')}`} onClick={hideSidebar}>
                        <div className='d-flex gap-3 justify-content-center align-items-center'>
                            Blogs
                        </div>
                    </Link><hr />
                    <Link to="https://shop.torrins.com"  target='_blank' id='shop' className={`list-item ${checkActiveNav('shop')}`} onClick={hideSidebar}>
                        <div className='d-flex gap-3 justify-content-center align-items-center'>
                            Shop
                        </div>
                    </Link><hr />
                    <Link to="/webinar" id='webinar' className={`list-item ${checkActiveNav('webinar')}`} onClick={hideSidebar}>
                        <div className='d-flex gap-3 justify-content-center align-items-center'>
                        Webinars
                        </div>
                    </Link><hr />
                    <Link to="/battle-of-bands" id='bands' className={`list-item ${checkActiveNav('battle-of-bands')}`} onClick={hideSidebar}>
                        <div className='d-flex gap-3 justify-content-center align-items-center'>
                            <p style={{ margin: '0px' }}>Battle Of Bands <sup style={{ color: '#dfa935' }}> New</sup></p>
                        </div>
                    </Link><hr />
                    <Link to="/support" id='support' className={`list-item ${checkActiveNav('support')}`} onClick={hideSidebar}>
                        <div className='d-flex gap-3 justify-content-center align-items-center'>
                            Help and Support
                        </div>

                    </Link>
                </div>
                <div className="side-bottom" style={{ marginTop: '15rem !important' }}>
                    {props?.authState?.userDetails?.hash || props?.socialToken ? (
                        <button onClick={props?.logout} className={`btn-1 w-100 ${props?.authState.submitted ? "disabled" : ""}`}
                            disabled={props?.authState.submitted}>Logout</button>
                    ) : <>
                        <Link to="/signin"><button className="btn-1 w-100" onClick={hideSidebar}>Login</button></Link>
                        <div className="text-center mt-3"><Link to="/signup-whatsapp" onClick={hideSidebar}>Start for free</Link></div>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default SideNavigation;
