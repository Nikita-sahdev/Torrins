import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const DeskTopSideBar = (props) => {
    const currentUrl = useLocation();
    const [profileImage, setProfileImage] = useState('');

    const chordIndex = props?.menus?.courses[0]?.lessons[props?.menus?.courses[0]?.lessons?.length - 1]

    const checkActiveNav = (currentPage) => {
        if (currentUrl?.pathname?.includes(currentPage)) {
            return 'show'
        } else return ''
    }


    useEffect(() => {
        setProfileImage(props?.authState?.userProfile?.user_data?.poster || props?.streakCount?.user_data?.poster)
    }, [props?.authState, props?.streakCount])



    return (
        <Modal
            show={props?.desktopSidebar}
            onHide={props?.handleCloseDesktopSidebar}
            size="md"
            className="desktop-sidebar"
            style={{ zIndex: '999999999999' }}
            animation={false} 

        >
            <Modal.Body>
                <div className="main-modal-container">
                    <div className="mobile-sidenavbar h-100">
                        <div className="w-100 menu h-100">
                            <div className="d-flex justify-content-between pb-3">
                                <img className="" src="/assets/img/chirstmas_black.svg" alt="logo" />
                                <img className='close' src="/assets/img/cross.svg" alt="cross" onClick={() => { props?.handleCloseDesktopSidebar() }} />
                            </div>
                            <div className="mob-nav mt-6">
                                {props?.authState.auth && <div className="pro-img">
                                    <img className="dropbtn5" src={(profileImage ? profileImage : `${process.env.REACT_APP_URL}/assets/img/default_user.png`)} alt="img" />
                                    <p className='name-text'>Welcome {props?.authState?.userProfile?.user_data?.name || props?.authState?.userDetails?.name} </p>
                                </div>

                                }
                                <ul className={props?.authState.auth && 'login'}>
                                    {
                                        (props?.authState?.userDetails?.hash || props?.socialToken) &&
                                        <>
                                            <li className={`${checkActiveNav('dashboard')}`} onClick={() => { props?.handleCloseDesktopSidebar(); }}>
                                                <Link to="/dashboard">My Dashboard
                                                    <img src="/assets/img/arrow-left.svg" alt="arrow-left" />

                                                </Link>
                                            </li>
                                            <hr />
                                        </>
                                    }
                                    {!props?.authState?.userProfile?.user_data?.membership &&
                                        <>
                                            <li className={`${checkActiveNav('membership')}`} onClick={() => { props?.handleCloseDesktopSidebar(); }} >
                                                <Link to="/membership">
                                                    Membership
                                                    <img src="/assets/img/arrow-left.svg" alt="arrow-left" />
                                                </Link>
                                            </li>
                                            <hr /></>
                                    }

                                    <li className="nav-item"  onClick={() => { props?.handleCloseDesktopSidebar(); }}>
                                        <Link  className={`${checkActiveNav('chords')}`} aria-current="page" to={props?.menus?.courses?.length > 0 ? `${props?.menus?.courses[0]?.hash}/${chordIndex?.hash}-${chordIndex?.id}` : 'javascript:void(0)'}>
                                       <p className='mb-0 pb-0'> Lyrics & Chords{''}<sup style={{ color: '#dfa935' }}> Beta</sup></p>
                                        <img src="/assets/img/arrow-left.svg" alt="arrow-left" />
                                        </Link>
                                    </li>
                                    <hr />

                                    <li className={`${checkActiveNav('instructors')}`} onClick={() => { props?.handleCloseDesktopSidebar(); }} >
                                        <Link to="/instructors">
                                            Our Instructors
                                            <img src="/assets/img/arrow-left.svg" alt="arrow-left" />
                                        </Link>
                                    </li>
                                    <hr />
                                    <li className={`${checkActiveNav('giftCards')}`} onClick={() => { props?.handleCloseDesktopSidebar(); }} >
                                        <Link to="/giftCards">
                                            Gift Card
                                            <img src="/assets/img/arrow-left.svg" alt="arrow-left" />
                                        </Link>
                                    </li>
                                    <hr />

                                    <li className={`${checkActiveNav('blogs')}`} onClick={() => { props?.handleCloseDesktopSidebar(); }} >
                                        <Link to="/blogs">
                                            Blogs
                                            <img src="/assets/img/arrow-left.svg" alt="arrow-left" />
                                        </Link>
                                    </li>
                                    <hr />
                                    <li className={`${checkActiveNav('support')}`} onClick={() => { props?.handleCloseDesktopSidebar(); }} >
                                        <Link to="/support">
                                            Contact Us
                                            <img src="/assets/img/arrow-left.svg" alt="arrow-left" />
                                        </Link>
                                    </li>
                                 
                                    <hr />


                                    <li className={`${checkActiveNav('battle-of-bands')}`} onClick={() => { props?.handleCloseDesktopSidebar(); }} >
                                        <Link to="/battle-of-bands">
                                            Battle of the Bands
                                            <img src="/assets/img/arrow-left.svg" alt="arrow-left" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="side-bottom" style={{ marginTop: '15rem !important' }}>
                                {props?.authState?.userDetails?.hash || props?.socialToken ? (
                                    <button className={`logoout-text ${props?.authState.submitted ? "disabled" : ""}`}
                                        disabled={props?.authState.submitted} onClick={() => { props?.handleCloseDesktopSidebar(); props?.logout() }}>Logout</button>
                                ) : <>
                                    <Link className='btn-1' to="/signin" onClick={() => { props?.handleCloseDesktopSidebar(); }}>Login</Link>
                                    <div className="text-center mt-3"><Link onClick={() => { props?.handleCloseDesktopSidebar(); }} to="/signup-whatsapp">Start for free</Link></div>
                                </>}
                                <div className='mt-4 d-flex justify-content-center align-items-center gap-3'>
                                    <Link to={'https://www.instagram.com/torrinsindia'} target='_blank'>
                                        <img src='/assets/img/HomeNew/insta.svg' alt='' />

                                    </Link>
                                    <Link to={'https://twitter.com/Torrinsonline'} target='_blank'>

                                        <img src='/assets/img/HomeNew/tweet.svg' alt='' />
                                    </Link>
                                    <Link to={'https://www.linkedin.com/company/torrinsindia/mycompany'} target='_blank'>
                                        <img src='/assets/img/HomeNew/linkdin.svg' alt='' />
                                    </Link>
                                    <Link to={'https://www.youtube.com/user/torrinsonline'} target='_blank'>

                                        <img src='/assets/img/HomeNew/youtube.svg' alt='' />
                                    </Link>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default DeskTopSideBar