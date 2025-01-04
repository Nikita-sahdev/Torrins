import React from 'react';
import { Link } from 'react-router-dom';

const NavigationTwo = () => {
    return (
        <nav id="nav2" className="navbar navbar-expand-lg px-1 px-sm-5">
            <div className="container-fluid bg-color">
                <Link className="navbar-brand" to="#">T
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="28" viewBox="0 0 33 28" fill="none">
                        <circle cx="16.7437" cy="14.3405" r="12.1353" stroke="#FFC444" strokeWidth="2.73671" />
                        <line x1="0.18927" y1="8.70088" x2="33.0085" y2="8.70088" stroke="white" strokeWidth="0.684179" />
                        <line x1="0.18927" y1="13.9978" x2="33.0085" y2="13.9978" stroke="white" strokeWidth="0.684179" />
                        <line x1="0.18927" y1="19.1696" x2="33.0085" y2="19.1696" stroke="white" strokeWidth="0.684179" />
                    </svg>RRINS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto d-flex gap-3 px-5 mb-2 mb-lg-0">
                        <li className="nav-item d-flex align-items-center gap-1">
                            <div className="drop d-flex align-items-center gap-1">
                                <Link className="nav-link dropbtn2" aria-current="page" to="#">My Dashboard</Link>

                                <div className="dropdown-content">
                                    <Link to="#">Guitar Courses</Link>
                                    <hr />
                                    <Link to="#">Bass Courses</Link>
                                    <hr />
                                    <Link to="#">Drum Courses</Link>
                                    <hr />
                                    <Link to="#">Piano Courses</Link>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item d-flex align-items-center gap-1">
                            <div className="drop3 d-flex align-items-center gap-1">
                                <Link className="nav-link dropbtn3" aria-current="page" to="#">All Courses</Link>
                                <img className="arrow-img" src="/assets/homepage/Vector 1769.png" alt="" />
                                <div className="dropdown-content3">
                                    <div className="d-flex">
                                        <div>
                                            <Link className="first" to="#">Guitar Courses
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17"
                                                    viewBox="0 0 16 17" fill="none">
                                                    <path d="M5.93701 13.2528L10.6037 8.5861L5.93701 3.91943"
                                                        stroke="#222222" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg></Link>
                                            <hr />
                                            <Link to="#">Bass Courses</Link>
                                            <hr />
                                            <Link to="#">Drum Courses</Link>
                                            <hr />

                                            <Link to="#">Piano Courses</Link>
                                        </div>
                                        <div className="dropdown-3-mid p-2">
                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">Beginner Courses(10) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">Style/Genre (20) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">Song Lessons (25) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">Skills (25) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">Lead Guitar (25) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <Link href="">View All
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17"
                                                    viewBox="0 0 16 17" fill="none">
                                                    <path d="M5.93701 13.2528L10.6037 8.5861L5.93701 3.91943"
                                                        stroke="#222222" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg></Link>
                                        </div>

                                        <div className="dropdown-3-end">
                                            <div className="inner d-flex">
                                                <div>
                                                    <h6>
                                                        Become a blues<br />
                                                        guitar expert
                                                    </h6>
                                                    <div className="d-flex gap-3 mt-3">
                                                        <div className="gray">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                height="21" viewBox="0 0 20 21" fill="none">
                                                                <path
                                                                    d="M5.21094 10.009L8.78779 13.5859L14.7878 7.58594"
                                                                    stroke="#222222" stroke-width="1.5"
                                                                    stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <p>
                                                            For intermediate to <br />
                                                            advance players
                                                        </p>
                                                    </div>
                                                    <div className="d-flex gap-3">
                                                        <div className="gray">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                height="21" viewBox="0 0 20 21" fill="none">
                                                                <path
                                                                    d="M5.21094 10.009L8.78779 13.5859L14.7878 7.58594"
                                                                    stroke="#222222" stroke-width="1.5"
                                                                    stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <p>
                                                            Learn important <br />
                                                            techniques and style
                                                        </p>
                                                    </div>
                                                    <button className="btn-1 mt-4">Explore Course</button>
                                                </div>

                                                <div className="right">
                                                    <img src="https://s3-alpha-sig.figma.com/img/78b3/f8a4/8a59119ff5fc31bb3becca132c980c94?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W0V8Y6eS3TPHhyitz2eQgBGHKkYOSaEPXL0AzgiOmA8YsRsFGs8i2UC~mRv6SQEn8ov1RIxzresNvUIhIwzHRIrIFg8ZgPDw84gyuaBif6lrUpjBGTdmD8hTjFW6d9VLL-K7uVeR34X445MzFDdX2z7f0-xHLdmIxXEs2iKAUNK-JKj1P83rwczg7InR3YR~RT2ba-xoyssKXJyFCIXqqjkhGWgsrh2Vg~NWRdSFWow0mJhziX4S5u9DGxKvI91JBEUmgocRZgssQOS6wk-QQ2DNyCpy49f-j-J0fYvNNqHnOB6GYK9LIcazL-4fwCc6sTDDPfwnhvCSgcL-rQKqdg__"
                                                        alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item d-flex align-items-center gap-1">
                            <div className="drop3 d-flex align-items-center gap-1">
                                <Link className="nav-link dropbtn3" aria-current="page" to="#">Song Library</Link>
                                <img className="arrow-img" src="/assets/homepage/Vector 1769.png" alt="" />
                                <div className="dropdown-content3">
                                    <div className="d-flex">
                                        <div>
                                            <Link className="first" to="#">Guitar Songs
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17"
                                                    viewBox="0 0 16 17" fill="none">
                                                    <path d="M5.93701 13.2528L10.6037 8.5861L5.93701 3.91943"
                                                        stroke="#222222" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg></Link>
                                            <hr />
                                            <Link to="#">Bass Songs</Link>
                                            <hr />
                                            <Link to="#">Piano Songs</Link>
                                            <hr />
                                        </div>
                                        <div className="dropdown-3-mid p-2">
                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">Bollywood Songs (25) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">Pakistani Songs (10) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">Tamil Songs (20) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">English Songs (25) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">Assamese Songs (25) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <div className="d-flex align-items-center w-100 justify-content-between">
                                                <Link to="#">South Indian Songs (25) </Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                    viewBox="0 0 17 17" fill="none">
                                                    <path d="M12.9189 4.58594L4.91895 12.5859" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.25244 4.58594H12.9191V11.2526" stroke="#222222"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <hr />

                                            <Link href="">View All
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17"
                                                    viewBox="0 0 16 17" fill="none">
                                                    <path d="M5.93701 13.2528L10.6037 8.5861L5.93701 3.91943"
                                                        stroke="#222222" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg></Link>
                                        </div>

                                        <div className="dropdown-3-end">
                                            <div className="inner d-flex">
                                                <div>
                                                    <h6>
                                                        Become a blues<br />
                                                        guitar expert
                                                    </h6>
                                                    <div className="d-flex gap-3 mt-3">
                                                        <div className="gray">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                height="21" viewBox="0 0 20 21" fill="none">
                                                                <path
                                                                    d="M5.21094 10.009L8.78779 13.5859L14.7878 7.58594"
                                                                    stroke="#222222" stroke-width="1.5"
                                                                    stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <p>
                                                            For intermediate to <br />
                                                            advance players
                                                        </p>
                                                    </div>
                                                    <div className="d-flex gap-3">
                                                        <div className="gray">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                height="21" viewBox="0 0 20 21" fill="none">
                                                                <path
                                                                    d="M5.21094 10.009L8.78779 13.5859L14.7878 7.58594"
                                                                    stroke="#222222" stroke-width="1.5"
                                                                    stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <p>
                                                            Learn important <br />
                                                            techniques and style
                                                        </p>
                                                    </div>
                                                    <button className="btn-1 mt-4">Explore Course</button>
                                                </div>

                                                <div className="right">
                                                    <img src="https://s3-alpha-sig.figma.com/img/78b3/f8a4/8a59119ff5fc31bb3becca132c980c94?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W0V8Y6eS3TPHhyitz2eQgBGHKkYOSaEPXL0AzgiOmA8YsRsFGs8i2UC~mRv6SQEn8ov1RIxzresNvUIhIwzHRIrIFg8ZgPDw84gyuaBif6lrUpjBGTdmD8hTjFW6d9VLL-K7uVeR34X445MzFDdX2z7f0-xHLdmIxXEs2iKAUNK-JKj1P83rwczg7InR3YR~RT2ba-xoyssKXJyFCIXqqjkhGWgsrh2Vg~NWRdSFWow0mJhziX4S5u9DGxKvI91JBEUmgocRZgssQOS6wk-QQ2DNyCpy49f-j-J0fYvNNqHnOB6GYK9LIcazL-4fwCc6sTDDPfwnhvCSgcL-rQKqdg__"
                                                        alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item d-flex align-items-center gap-1">
                            <Link className="nav-link" aria-current="page" to="#">Tools</Link>
                            <img src="/assets/homepage/Vector 1769.png" alt="" />
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="#">Our instructors</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavigationTwo;
