import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { lessonSongs } from "../../Action/lessonSongs.actions";

const RecentSearch = (props) => {
    const dispatch = useDispatch();
    const recentData = useSelector((state) => state.lesson.recentSearchValue);
    const loadMoreSearchData = useSelector((state) => state.lesson.loadMoreSearchData);
    const searchPagination = useSelector((state) => state.lesson.searchPagination);

    const relatedLoading = useSelector((state) => state.lesson.relatedLoading);

    const [visibleRecords, setVisibleRecords] = useState(loadMoreSearchData?.slice(0, 10));
    const containerRef = useRef(null);
    const [prevScrollTop, setPrevScrollTop] = useState(0); // Track previous scroll position

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = () => {
            const currentScrollTop = container.scrollTop;

            // Only trigger request when scrolling down
            if (currentScrollTop > prevScrollTop && container.scrollTop + container.clientHeight >= container.scrollHeight - 50 && searchPagination?.next_page !== null) {
                loadMoreRecords();
            }

            setPrevScrollTop(currentScrollTop); // Update previous scroll position
        };

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [loadMoreSearchData, visibleRecords, props?.page, prevScrollTop]);

    const loadMoreRecords = () => {
        props?.setPage((prevPage) => {
            const nextPage = prevPage + 1;

            const requestData = {
                instrument: props?.selectedInstrument,
                type: props?.activeTab === 'Courses' ? 'lesson' : 'song',
                string: props?.recentValue,
                page: nextPage,
            };

            dispatch(
                lessonSongs.getSearch(requestData, {
                    Token: props?.token || props?.SocialToken,
                })
            );

            return nextPage;
        });
    };


    return (
        <div
            className="related-searches"
            ref={containerRef}
            style={{ height: props?.recentValue?.length > 2 && loadMoreSearchData?.length > 0 ? "400px" : '', overflowY: "scroll" }}
        >
            {props?.recentValue?.length > 2 && loadMoreSearchData?.length > 0 ? (
                <p>Search Results</p>
            ) : recentData?.length > 0 && props?.recentValue?.length <= 2 ? (
                <p>Recent searches</p>
            ) : (
                ""
            )}
            {props?.recentValue?.length > 2 && props.loading ? (
                <>
                    <ul className="search-results-list">
                        {props?.loading && loadMoreSearchData?.length > 0 ? (
                            loadMoreSearchData?.map((results, index) => (
                                <React.Fragment key={index}>
                                    <li className="search-result-item">
                                        <div className="search-result-content">
                                            <img
                                                className="search-icon"
                                                src="/assets/img/Navigations/Vector.svg"
                                                alt="Search Icon"
                                            />
                                            <div className="result-text">
                                                <Link
                                                    to={`/${results?.instrument?.toLowerCase()}-lessons/${results?.hash}-${results?.id}`}
                                                    onClick={() => { props?.handleSearchResult(results); props?.handleClose(); }}
                                                    className="search-link"
                                                >
                                                    {results?.title}
                                                </Link>
                                                <span className="hierarchy">
                                                    {results.path && results.path.length <= 2
                                                        ? results.path.map((item, index) => (
                                                            <React.Fragment key={index}>
                                                                {item.title}
                                                                {index < results.path.length - 1 && ' > '}
                                                            </React.Fragment>
                                                        ))
                                                        : results.path
                                                            ?.slice(0, -2)
                                                            .reverse()
                                                            .map((item, index) => (
                                                                <React.Fragment key={index}>
                                                                    {item.title} {index < results.path.length - 3 && ' > '}
                                                                </React.Fragment>
                                                            ))}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </React.Fragment>
                            ))
                        ) : (
                            <div className="no-data-found">
                                <img src="/assets/img/Navigations/not-found.png" alt="No Data Found" />
                                <p style={{ marginTop: "-9px" }}>
                                    {props?.activeTab === "Courses"
                                        ? "Lesson not available currently."
                                        : "Song lesson not available currently."}
                                </p>
                            </div>
                        )}
                    </ul>
                </>
            ) : (
                <ul>
                    {recentData.map((value, index) => (
                        <React.Fragment key={index}>
                            <li onClick={() => { props?.handleRecentClick(value); props?.handleClose(); }}>
                                <Link
                                    to={`/${value?.lesson?.instrument?.toLowerCase()}-lessons/${value?.lesson?.hash}-${value?.lesson?.id}`}
                                    className="search-link"
                                >
                                    <img
                                        src="/assets/homepage/carbon.svg"
                                        alt=""
                                        style={{ marginRight: "10px", zIndex: "9999" }}
                                    />
                                    {value?.lesson?.title}
                                </Link>
                            </li>
                            <hr />
                        </React.Fragment>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecentSearch;
