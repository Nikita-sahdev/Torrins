import { BrowserRouter as Router, Routes, Route, useParams, Navigate, } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import Layout from '../Layout/Layout';
import History from '../Helpers/History';
import HomePage from "../Webpages/HomePage/index.js";
import SavedNotes from "../Webpages/SavedNotes/SavedNotes.js";
const Referal = lazy(() => import("../Webpages/Referal/Referal.js"));
const MyReferals = lazy(() => import("../Webpages/Referal/MyReferals/MyReferal.js"));

// lazy loading
const PrivateRoute = lazy(() => import('./PrivateRoute/PrivateRoute'));
const Notification = lazy(() => import('../Webpages/Profile/Notification'));
const Membership = lazy(() => import('../Webpages/Profile/Membership'));
const Courses = lazy(() => import('../Webpages/Courses/Courses'));
const CourseView = lazy(() => import('../Webpages/Courses/CourseView'));
const Dashboard = lazy(() => import('../Webpages/Dashboard/Dashboard'));
const SavedCourses = lazy(() => import('../Webpages/SavedCourses/SavedCourses'));
const FeedbackLibrary = lazy(() => import('../Webpages/FeedbackLibrary/FeedbackLibrary'));
const ProfileSetting = lazy(() => import('../Webpages/Profile/ProfileSetting'));
const NotFound = lazy(() => import('../components/Common/NotFound/NotFound'));
const VerifyEmail = lazy(() => import('../Webpages/Authentication/Register/VerifyEmail'));

function RouteIndex() {
    const authState = useSelector((state) => state.auth);


    useEffect(() => {
        const unlisten = History.listen((location, action) => {
            if (History.action === 'POP') {
                document.querySelector('.modal-backdrop')?.classList?.remove('modal-backdrop');
                if (History.action === 'POP') {
                    document.querySelector('.modal-backdrop')?.remove();
                    document.body.style.removeProperty("overflow");
                    document.body.classList.remove("modal-open");

                }
            }
        });

        return unlisten;

    }, [])

    return (
        <Router history={History}>
            <Suspense fallback={<div style={{ paddingTop: "19%", minHeight: "800px" }}>
                <div
                    className="loader spinner-border m-5 d-table m-auto"
                    role="status"
                >
                    <span className="visually-hidden"></span>
                </div>
                <span className=" m-5 d-table m-auto">Loading...</span>
            </div>}>

                <Layout>
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        

                        <Route path="/verify-email" element={
                            <PrivateRoute isSignedIn={!authState?.userDetails?.hash || !authState?.userDetails?.token}><VerifyEmail /></PrivateRoute>
                        } />
                        <Route path="/profile-setting" element={
                            <PrivateRoute isSignedIn={authState?.userDetails?.hash || authState?.userDetails?.token}><ProfileSetting /></PrivateRoute>
                        } />
                        <Route path="/notification" element={
                            <PrivateRoute isSignedIn={authState?.userDetails?.hash || authState?.userDetails?.token}><Notification /></PrivateRoute>
                        } />

                        <Route path="/referral" element={
                            <PrivateRoute isSignedIn={authState?.userDetails?.hash || authState?.userDetails?.token}><Referal /></PrivateRoute>
                        } />
                        <Route path="/my-referrals" element={
                            <PrivateRoute isSignedIn={authState?.userDetails?.hash || authState?.userDetails?.token}><MyReferals /></PrivateRoute>
                        } />


                        <Route path="/membership-settings" element={
                            <PrivateRoute isSignedIn={authState?.userDetails?.hash || authState?.userDetails?.token}><Membership /></PrivateRoute>
                        } />

                        <Route path="/dashboard" element={
                            <PrivateRoute isSignedIn={authState?.userDetails?.hash || authState?.userDetails?.token}><Dashboard /></PrivateRoute>
                        } />

                        <Route path="/saved-courses" element={
                            <PrivateRoute isSignedIn={authState?.userDetails?.hash || authState?.userDetails?.token}><SavedCourses /></PrivateRoute>
                        } />

                        <Route path="/feedback-library" element={
                            <PrivateRoute isSignedIn={authState?.userDetails?.hash || authState?.userDetails?.token}><FeedbackLibrary /></PrivateRoute>
                        } />
                        <Route path="/saved-notes" element={
                            <PrivateRoute isSignedIn={authState?.userDetails?.hash || authState?.userDetails?.token}><SavedNotes /></PrivateRoute>
                        } />

                        {/* Personalization course routes */}
                        <Route path="/:courses-courses/:courseSlug" element={
                            <PrivateRoute isSignedIn={authState?.userDetails?.hash || authState?.userDetails?.token}>
                                <CourseView viewPage={'course'} />
                            </PrivateRoute>
                        } />

                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<Navigate replace to="/404" />} />

                    </Routes>
                </Layout>
                {/* <NotFound /> */}
            </Suspense>

        </Router>
    )
}
export default RouteIndex
