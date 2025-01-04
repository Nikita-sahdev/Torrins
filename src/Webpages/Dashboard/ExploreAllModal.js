
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { homepageAction } from '../../Action/homepage.action';
import { useDispatch, useSelector } from "react-redux";

const ExploreAllModal = (props) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("song");
    
    const recentLessonSongsData = useSelector(
        (state) => state.homepage.recentLessonSongsData
    );
    const recentCourseData = useSelector(
        (state) => state.homepage.recentCourseData
    );

    let recentData =
        activeTab === "song" ? recentLessonSongsData : recentCourseData;

    

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        if (tab === "song") {
            dispatch(homepageAction.getRecentLessonsSongs());
        } else if (tab === "courses") {
            dispatch(homepageAction.getRecentLessons());
        }
    };

    
    useEffect(() => {
        if (props?.showModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup to ensure the class is removed if the component unmounts
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [props?.showModal]);

  return (
    props?.showModal && (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ background: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => props?.setShowModal(false)} // Close modal on backdrop click
        >
            <div
                className="modal-dialog modal-dialog-centered"
                role="document"
               
            >
                <div className="modal-content" style={{ minHeight: "500px", marginTop:'100%' }}>
                    <div
                        className="modal-header"
                        style={{ borderBottom: "none" }}
                    >
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => props?.setShowModal(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div
                        className="modal-body"
                        style={{ marginTop: "-27px" }}
                    >
                        <ul className="nav custom-navbar">
                            <li
                                className={`nav-item learning-path ${
                                    activeTab === "song" ? "active" : ""
                                }`}
                                onClick={() => handleTabSwitch("song")}
                            >
                                <p className="nav-link">Latest Song Lessons</p>
                            </li>
                            <li
                                className={`nav-item ${
                                    activeTab === "courses" ? "active" : ""
                                }`}
                                onClick={() => handleTabSwitch("courses")}
                            >
                                <p className="nav-link">Latest Courses</p>
                            </li>
                        </ul>
                        {recentData?.length > 0 ? (
                            recentData
                                ?.slice(0, 5)
                                ?.map((data) => {
                                    return (
                                        <div className="d-flex bg-white course-history align-items-start justify-content-between mb-2">
                                            <div
                                                className="d-flex container gap-3"
                                                style={{
                                                    marginBottom: "-24px",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <Link
                                                    to={`/${data?.path[2]?.hash}/${data?.hash}-${data?.id}`}
                                                >
                                                    <div className="container-course-img">
                                                        <img
                                                            alt=""
                                                            className="videos"
                                                            src={data?.poster}
                                                            style={{
                                                                width: "64.937px",
                                                                height: "63.094px",
                                                                borderRadius:
                                                                    "6.426px",
                                                            }}
                                                        />
                                                        <img
                                                            alt=""
                                                            className="play-icon"
                                                            src="assets/img/playicon.svg"
                                                        />
                                                    </div>
                                                </Link>
                                                <div className="second-card d-flex">
                                                    <Link
                                                        to={`/${data?.path[2]?.hash}/${data?.hash}-${data?.id}`}
                                                    >
                                                        <div>
                                                            <h6>{data?.title}</h6>
                                                            <div className="remaining d-flex">
                                                                <p className="custom-badge">
                                                                    {data?.artist}
                                                                </p>
                                                                <p className="custom-badge recent">
                                                                    {
                                                                        data?.instrument
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div className="action-area">
                                                        <ul
                                                            className="d-flex align-items-center"
                                                            style={{
                                                                minWidth: "unset",
                                                            }}
                                                        >
                                                            <li className="wishlist d-lg-block d-none mx-3">
                                                                <a href="javascript:void(0);">
                                                                    <img
                                                                        src={
                                                                            data?.liked
                                                                                ? "./assets/img/love.svg"
                                                                                : "./assets/img/unlike.svg"
                                                                        }
                                                                        alt="unlove"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            props?.handleLikeSongs(
                                                                                e,
                                                                                data?.id
                                                                            );
                                                                        }}
                                                                        id={`song-${data?.id}`}
                                                                        data-liked={
                                                                            data?.liked
                                                                        }
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            width: "20.323px",
                                                                            height: "20.834px",
                                                                            strokeWidth:
                                                                                "1px",
                                                                            stroke: "#000",
                                                                        }}
                                                                    />
                                                                </a>
                                                            </li>
                                                            <div className="dropdown d-flex">
                                                                <button
                                                                    className="btn dropdown-toggle"
                                                                    type="button"
                                                                    id="dropdownMenuButton1"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="bi bi-three-dots-vertical"></i>
                                                                </button>
                                                                <ul
                                                                    className="dropdown-menu"
                                                                    aria-labelledby="dropdownMenuButton1"
                                                                    style={{
                                                                        listStyle:
                                                                            "none",
                                                                        padding:
                                                                            "0px",
                                                                        margin:
                                                                            "0px",
                                                                        minWidth:
                                                                            "60px",
                                                                        zIndex: "0",
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <RWebShare
                                                                            data={{
                                                                                text: "",
                                                                                url:
                                                                                    process
                                                                                        .env
                                                                                        .REACT_APP_URL +
                                                                                    `/${data?.path[2]?.hash}` +
                                                                                    `/${data?.hash}-${data?.id}`,
                                                                            }}
                                                                            onClick={() =>
                                                                                console.log(
                                                                                    "shared successfully!"
                                                                                )
                                                                            }
                                                                        >
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="javascript:void(0);"
                                                                            >
                                                                                Share
                                                                            </a>
                                                                        </RWebShare>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <p>No record found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
  )
}

export default ExploreAllModal
