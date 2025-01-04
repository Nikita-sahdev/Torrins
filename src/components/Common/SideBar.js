import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { authConstants } from "../../Constants/Auth";
import { auth } from "../../Action/auth.actions";

const SideBar = (props) => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const [token] = useState(authState?.userDetails?.hash ?? authState?.userDetails?.token);
    const pathName = useLocation();
    const [activeLink, setActiveLink] = useState(pathName.pathname);

    const handleActiveLink = (active) => {
        setActiveLink(active);
    };

    const logout = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch({ type: authConstants.SIGNOUT_REQUEST });
        dispatch(auth.signOut({}, { token }));
    };

    const sidebarLinks = [
        {
            path: ["/premium"],
            label: "Premium",
            icon: "/assets/img/Member/small-logo.svg",
            activeIcon: "/assets/img/Member/small-logo.svg",
            isStudent: authState?.userDetails?.school_student_id ? true : false
        },
        {
            path: ["/dashboard"],
            label: "Dashboard",
            icon: "/assets/img/dashboard.svg",
            activeIcon: "/assets/img/dashboardicon.svg",
        },
        {
            path: ["/saved-courses"],
            label: "Saved Courses & Lessons",
            icon: "/assets/img/savewidget.svg",
            activeIcon: "/assets/img/feedback-yellow.svg",
        },
        {
            path: ["/saved-notes"],
            label: "Saved Notes and Loops",
            icon: "/assets/img/non-active-note.svg",
            activeIcon: "/assets/img/saved-note.png",
        },
        {
            path: ["/feedback-library"],
            label: "Feedback Library",
            icon: "/assets/img/message.svg",
            activeIcon: "/assets/img/feedback.svg",
        },
        {
            path: ["/membership-settings", "/membership/cancel", "/membership/cancel/reasons"],
            label: "Membership Settings",
            icon: "/assets/img/membership-setting.svg",
            activeIcon: "/assets/img/MembershipSettings/highlightedMembership.svg",
        },
        {
            path: ["/giftCards"],
            label: "GiftCards",
            icon: "/assets/img/Navigations/giftCard.svg",
            activeIcon: "/assets/img/Navigations/giftCard.svg",
        },
        {
            path: ["/referral", "/my-referrals"],
            label: "Refer & Earn",
            icon: "/assets/img/refer.svg",
            activeIcon: "/assets/img/refer-active.svg",
        },
        {
            path: ["/profile-setting"],
            label: "Profile Settings",
            icon: "/assets/img/person.svg",
            activeIcon: "assets/img/profile-yellow.svg",
        },
        {
            path: ["/notification"],
            label: "Notification Center",
            icon: "/assets/img/notifications.svg",
            activeIcon: "/assets/img/notify-yellow.svg",
        },
        {
            path: ["javascript:void(0);"],
            label: "Logout",
            icon: "/assets/img/new-Logout.svg",
            action: logout,
            isLogout: true,
        },
    ];

    const isActive = (paths) => {
        return paths?.includes(activeLink);
    };

    return (
        <>
            <div
                className={`${props?.sidebarClass} left-sidebar px-0`}
                onMouseEnter={props?.handleMouseEnter}
                onMouseLeave={props?.handleMouseLeave}
            >
                <ul>
                    {sidebarLinks?.filter((link) => link.label !== "Premium" || link.isStudent)?.map((link, idx) => (
                        <li
                            key={idx}
                            className={isActive(link?.path) && !link.isLogout ? "active" : ""}
                            style={{ background: isActive(link?.path) && !link.isLogout && props?.sidebarClass == 'col-md-3' ? 'linear-gradient(271.22deg, #fefefe 4.22%, rgba(255, 201, 82, .478) 96.86%)' : 'none' }}
                        >
                            <Link
                                to={link.path[0]}
                                onClick={() => {
                                    if (link?.isLogout) {
                                        link.action();
                                    } else {
                                        handleActiveLink(link?.path[0]);
                                    }
                                }}
                            >
                                <span className="d-flex">
                                    <img height={24}
                                        className="mx-2"
                                        src={
                                            isActive(link?.path)
                                                ? link.activeIcon
                                                : link.icon
                                        }
                                        alt={link.label}
                                        title={link.label}
                                    />
                                    {props?.isHovered && link.label}
                                </span>
                                {!link.isLogout && props?.isHovered && (
                                    <img src="/assets/img/sidebarArrow.svg" alt="arrow" />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default SideBar;
