//Library
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Component
import BannerSection from './BannerSection';
import SliderSection from './SliderSection';
import FeedbackSection from './FeedbackSection';
import SubscriberSection from './SubscriberSection';
import MemberShipSection from './MembershipSection';
import StudentRegisterModal from './StudentRegisterModal';
import InstructorSection from './InstructorSection';
import { auth } from '../../Action/auth.actions';
import TestimonialSection from './TestomonialSection';
import TorrinsSliderSection from './TorrinsSliderSection';
import { membership } from '../../Action/membership.action';
import { instructors } from '../../Action/instructor.action';
import { homepageAction } from '../../Action/homepage.action';
import HelmetComponent from '../../Utility/HelmetComponent';
import PersonalizationSection from './PersonalizationSection';
import MasterInstrumentSection from './MasterInstrumentSection';
import StudentVerification from './StudentVerification';
import StudentLoginModal from './StudentLoginModal';

//css
import './Homepage.css'
import '../../components/Common/CSS/homepage.scss'
import '../../components/Common/CSS/common.css'
import { Link, useLocation } from 'react-router-dom';
import './StudenLoginModal.scss'
import useWindowDimensions from '../../Helpers/useWindowDimensions';
import { StartLearning } from './StartLearning/StartLearning';
import { LatestLaunch } from './LatestLaunches/LatestLaunch';
import OurSubscriber from './OurSubscribers/OurSubscriber';
import EhsaanFavourite from './EhsaanFavourite/EhsaanFavourite';
import { authService } from '../../Adapters/auth.services';
import { seoAction } from '../../Action/seo.actions';

const HomePage = () => {
    const dispatch = useDispatch()
    const pathname = useLocation()
    const queryString = new URLSearchParams(window.location.search);
    const studentId = queryString.get('student');
    const { windowWidth } = useWindowDimensions();


    // State data
    const instructorData = useSelector((state) => state.instructor.instructorDetails?.data?.instructors)
    const memberships = useSelector((state) => state.member)
    const { activeUsersCount, allCounts, lessonsCount, songsCount } = useSelector((state) => state.homepage)
    const authState = useSelector((state) => state.auth)
    const validityDate = authState?.userProfile?.user_data?.purchased_plan?.validity_date
    const formattedDate = new Date(validityDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const token = authState?.userDetails?.hash ?? authState?.userDetails?.token;
    const instruments = useSelector((state) => state.member.instruments);
    const [showStickyDiv, setShowStickyDiv] = useState(false);
    const studentData = useSelector((state) => state.auth.studentData)

    // useStates
    const [selectedOption, setSelectedOption] = useState("all");
    const [testimonialData, setTestimonialData] = useState([])
    const instructorDetails = instructorData?.guitar?.concat(instructorData?.piano)?.concat(instructorData?.bass_guitar);

    useEffect(() => {
        if (studentId) {
            dispatch(auth.studentVerification(studentId))
        }

    }, [])


    useEffect(() => {
        getTestimonialData()
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    const getTestimonialData = async () => {
        try {
            const data = await authService.getData(`${process.env.REACT_APP_API_URL}/api/testimonials`);
            if (data?.status === 200) {
                setTestimonialData(data?.data?.data)
            } else {
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
        }
    };


    // Import the script dynamically
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/assets/homepage/js/script.min.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        dispatch(instructors.getInstructors())
        dispatch(membership.getMembershipData({ token }))
        dispatch(homepageAction.fetchHomepageData());
        dispatch(membership.getInstruments())

        dispatch(homepageAction.getRecentLessonsSongs())
        dispatch(homepageAction.getRecentLessons())


    }, [])


    useEffect(() => {
        dispatch({ type: 'SET_SEO_VALUE', payload: { type: 'HOME', id: '0' } })
        const requestData = {
            type: 'HOME',
            id: 0
        }
        dispatch(seoAction.getSeo(requestData, { Token: token }))
    }, [])

    const filteredMemberships = Array.isArray(memberships?.userMembership) ? memberships.userMembership.filter((plan) =>
        selectedOption === "single"
            ? plan.instrument_type === 'single'
            : plan.instrument_type === 'all'
    ) : [];

    const handleOptionChange = () => {
        const newOption = selectedOption === "single" ? "all" : "single";
        setSelectedOption(newOption);
    };

    // Displaying personalization modal...
    const handlePersonalization = () => {
        dispatch({ type: 'CHANGE_PERSONALIZATION_STATE', payload: true });

        const navbar = document.getElementById('mainNavbar');
        if (navbar) {
            navbar?.classList?.remove('hidden');
            if (windowWidth < 800) navbar.style.zIndex = "1";

        }
    }


    const cancelSubscription = () => {
        dispatch(membership.cancelSubscription('', { Token: token }))
    }

    function getInstrumentLabels(data, instrumentdetails) {
        let labelsSet = new Set();

        data?.forEach(plan => {
            plan.instruments.forEach(instrumentId => {
                let instrument = instrumentdetails?.find(item => item.id === parseInt(instrumentId));
                if (instrument) {
                    labelsSet.add(instrument.label);
                }
            });
        });

        return Array.from(labelsSet).join(', ');
    }

    // Get labels of instruments
    let instrumentLabels = getInstrumentLabels(memberships?.userMembership, instruments?.instrument_details);

    useEffect(() => {

        dispatch({ type: 'EMPTY_STUDENTDATA' })

        const handleScroll = () => {
            const sliderSection = document.getElementById('slider-section');
            if (sliderSection) {
                const rect = sliderSection.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight;
                setShowStickyDiv(isVisible);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    useEffect(() => {
        if (studentData && Object?.keys(studentData)?.length > 0) {
            if ((pathname?.search === `?student=${studentId}`) && !authState?.auth && !studentData?.registration && !studentData?.email_verified) {
                if (document.getElementById('email-signmodal').classList.contains('fade')) document.getElementById('student-signin-action')?.click()
            } else if ((pathname?.search === `?student=${studentId}`) && !authState?.auth && studentData?.registration && !studentData?.email_verified) {
                if (document.getElementById('verification-signmodal').classList.contains('fade')) {
                    document.getElementById('verification-signin-action')?.click()
                }
            } else if ((pathname?.search == `?student=${studentId}`) && !authState?.auth && studentData?.registration && studentData?.email_verified) {
                if (!document.getElementById('login-signmodal').classList.contains('show')) {
                    document.getElementById('login-action')?.click()
                }
            }
        }
    }, [studentData])

    return (
        <>

            {/* SEO handling start*/}
            <HelmetComponent />
            {/* SEO handling end*/}

            {!authState?.auth && pathname?.search == `?student=${studentId}` && !studentData?.registration && !studentData?.email_verified &&
                <>
                    <button data-bs-toggle="modal" id="student-signin-action" data-bs-target="#email-signmodal" style={{ display: 'none' }}></button>
                    <StudentRegisterModal
                        studentId={studentId}
                        studentData={studentData}
                    />
                </>
            }
            {!authState?.auth && (pathname?.search == `?student=${studentId}` && studentData?.registration && !studentData?.email_verified) &&
                <>
                    <button data-bs-toggle="modal" id="verification-signin-action" data-bs-target="#verification-signmodal" style={{ display: 'none' }}></button>
                    <StudentVerification
                        studentData={studentData}
                        authState={authState}
                    />
                </>
            }
            {(pathname?.search == `?student=${studentId}` && studentData?.registration && studentData?.email_verified) &&
                <>
                    <button data-bs-toggle="modal" id="login-action" data-bs-target="#login-signmodal" style={{ display: 'none' }}></button>
                    <StudentLoginModal
                        studentData={studentData}
                        studentId={studentId}
                    />
                </>
            }
            <div className='HeaderFooterHomepageDiv' style={{ overflowX: 'hidden' }}>

                {/* Banner Section */}
                <BannerSection users={activeUsersCount} handlePersonalization={handlePersonalization} />

                {/* Master instrument section */}
                <MasterInstrumentSection />

                {/* Slider section */}
                {/* <SliderSection /> */}

                <StartLearning lessonsCount={lessonsCount} songsCount={songsCount} allCounts={allCounts} handlePersonalization={handlePersonalization} />

                {showStickyDiv && (
                    <div className="stickydiv">
                        <div className="sticky-sec">
                            <h5>Get a free personalised <br />learning journey</h5>
                            <button className="btn-1 mt-2">Let’s Begin</button>
                        </div>
                    </div>
                )}

                <LatestLaunch />

                <OurSubscriber />

                <EhsaanFavourite data={allCounts} />

                {/* Subscriber section */}
                {/* <SubscriberSection /> */}

                {/* Personalization section */}
                <PersonalizationSection handlePersonalization={handlePersonalization} />

                {/* Torrins slider section */}
                {/* <TorrinsSliderSection /> */}

                {/* Feedback section */}
                {/* <FeedbackSection /> */}

                {/* Instructor section */}
                <InstructorSection instructors={instructorDetails} />

                {/* Testimonial section */}
                {testimonialData && <TestimonialSection testimonialData={testimonialData} />}

                {/* Membership section */}
                <MemberShipSection
                    filteredMemberships={filteredMemberships}
                    handleOptionChange={handleOptionChange}
                    selectedOption={selectedOption}
                    formattedDate={formattedDate}
                    cancelSubscription={cancelSubscription}
                    instrumentLabels={instrumentLabels}
                />

                <div className='torrins-student'>

                    <p>I am a Torrins School student.<Link to={'https://online.torrins.com'} target="_blank">Click Here</Link></p>

                </div>

            </div>
        </>
    );
}

export default HomePage;
