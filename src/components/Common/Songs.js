import React from "react";
import { Link, useParams } from 'react-router-dom'
import { RWebShare } from "react-web-share";

const Songs = (props) => {

    return (
        <>
            {props.component === 'dashboard' ?
                (props?.songs?.length > 0 ?
                    <div className=" bg-white p-3 recommended-songs mt-3 mb-4">
                        <section className="recommended-songs songLessons celebrity-instructors-section category_list details-page song-details-page song-list p-0">
                            <div>
                                <div className="celebrity-grid " style={{marginLeft: '-19px', width: '106%',marginTop: '-29px'}}>
                                    <div className="row bg-white songLessons">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="song-cat-list">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Title</th>
                                                            <th scope="col d-lg-block d-md-block d-none">Album/Movie
                                                                and Genre
                                                            </th>
                                                            <th scope="col">Lesson Info</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {props?.songs?.length ? props.songs.map(song => {
                                                            const maxContentLength = 12;
                                                            const truncate = (content) => {
                                                                const truncatedContent =
                                                                content &&
                                                                content?.length > maxContentLength? `${content.slice(0, maxContentLength)}...`: content;
                                                                return truncatedContent
                                                            }
                                                        
                                                            let courseUrl = '/' + song?.path[(song?.path?.length - 1)]?.hash + '/' + song?.hash + '-' + song?.id;
                                                            let courseHistorySongUrl =''
                                                            if(props?.activeTab == 'courseHistory') {
                                                                courseHistorySongUrl = `/${song?.path[(song?.path?.length - 1)]?.hash}/${song?.parent[0]?.hash}-${song?.parent[0]?.id}`
                                                            }
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        <div className="d-flex title-area">
                                                                            <div className="media">
                                                                                <div
                                                                                    className="d-flex justify-content-center align-items-center"
                                                                                    style={{ position: "relative" }}>
                                                                                    <Link to={props?.activeTab === 'courseHistory' ? courseHistorySongUrl :courseUrl}>
                                                                                        <img style={{borderRadius: '8px'}} loading="lazy" src={song?.poster ? song?.poster : "./assets/img/scenery.png"} alt="" />
                                                                                    </Link>
                                                                                </div>

                                                                            </div>
                                                                            <div className="tittle" style={{marginTop: '-16px'}}>
                                                                                <Link to={props?.activeTab === 'courseHistory' ? courseHistorySongUrl :courseUrl}>
                                                                                    <h3 className="cut-text-songs">{props?.activeTab === 'courseHistory' ?  truncate(song?.parent[0]?.title) : truncate(song?.title)}</h3>
                                                                                </Link>
                                                                                <h5 className="m-0 mt-1">{song?.artist}</h5>
                                                                            </div>
                                                                        </div>

                                                                    </td>
                                                                    <td className="d-lg-block d-none" style={{ marginTop: "10px;" }}>
                                                                        <div className="album" style={{marginTop: '6px'}}>
                                                                            <p>{props?.activeTab === 'courseHistory' ? song?.parent[0]?.album : song?.album}</p>
                                                                            
                                                                            <div className="d-flex mt-1 align-items-center gap-2">
                                                                                {(props?.activeTab === 'courseHistory' && song?.parent[0]?.genre) ? 
                                                                                    <div className="song-class">{song?.parent[0]?.genre}</div>
                                                                                : song?.genre && <div className="song-class">{song?.genre}</div>}
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td >
                                                                        <div class={window.innerWidth <= 768 ? "d-flex info-area song-line d-lg-block d-md-block d-none": "d-flex info-area song-line"}>
                                                                            <ul>
                                                                                <li class="d-lg-block d-md-block d-none">
                                                                                    {song?.difficulty &&
                                                                                        <a href="javacript:void(0);" style={{cursor:'text'}}>
                                                                                            {song?.difficulty && typeof song.difficulty === 'string' && (
                                                                                                <div>
                                                                                                    <span>{song.difficulty.charAt(0).toUpperCase() + song.difficulty.slice(1)}</span>
                                                                                                </div>
                                                                                            )}
                                                                                        </a>
                                                                                    }
                                                                                </li>
                                                                            </ul>
                                                                          
                                                                        </div>
                                                                    </td>
                                                                    <td className="d-lg-none  d-block ">
                                                                        <div>
                                                                            <img class="guitar-img" src="assets/img/instructor/ph_guitar-thin.png" alt="" />
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div className="action-area">
                                                                            <ul className="d-flex align-items-center" style={{minWidth: 'unset'}}>
                                                                                <li className=" d-lg-block  d-none">
                                                                                    {song?.new === 1 ? <a className="trending" href="javascript:void(0);">Trending</a> : ""}
                                                                                </li>
                                                                                <li className="wishlist d-lg-block d-none mx-3">
                                                                                    <a href="javascript:void(0);"><img
                                                                                        src={song?.liked ? "./assets/img/love.svg" : "./assets/img/unlike.svg"}
                                                                                        alt="unlove"
                                                                                        onClick={(e) => { props?.handleLikeSongs(e, song?.id) }}
                                                                                        id={`song-${song?.id}`}
                                                                                        data-liked={song?.liked}
                                                                                        style={{ cursor: 'pointer' }}
                                                                                    /></a>
                                                                                </li>
                                                                                <div class="dropdown  d-flex">
                                                                                    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <i class="bi bi-three-dots-vertical"></i>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                                                                                    <li>
                                                                                    <RWebShare
                                                                                        data={{
                                                                                            text: "",
                                                                                            url:
                                                                                            props?.activeTab === 'courseHistory' ? courseHistorySongUrl :courseUrl
                                                                                        }}
                                                                                        onClick={() => console.log("shared successfully!")}
                                                                                    >
                                                                                        <a class="dropdown-item" href='javascript:void(0);'>Share</a>
                                                                                    </RWebShare></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )

                                                        }) : <td style={{ textAlign: 'center',marginTop: '20%' }} colSpan={3}>No record found.</td>}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    : <div style={{ textAlign: 'center', marginTop: '30px' }}>No record found.</div>)

                : props.component === 'savedCourses' ?
                    (props?.songs?.length > 0 ? <section
                        className="recommended-songs songLessons celebrity-instructors-section category_list details-page song-details-page song-list p-0">
                        <div >

                            <div className="celebrity-grid " >
                                <div className="row bg-white songLessons">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="song-cat-list">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Title</th>
                                                        <th scope="col d-lg-block d-md-block d-none">Album/Movie and Genre
                                                        </th>
                                                        <th scope="col">Lesson Info</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props?.songs?.length > 0 ? props.songs.map(song => {
                                                        let courseUrl = '/' + song?.path[(song?.path?.length - 1)]?.hash + '/' + song?.hash + '-' + song?.id;

                                                        const truncatedTitle = song?.title.length > 23 ? `${song.title.slice(0, 23)}...` : song?.title;

                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex title-area">
                                                                        <div className="media">
                                                                            <div className="d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
                                                                                <Link to={courseUrl}>
                                                                                    <img src={song?.poster} alt="" />
                                                                                    {parseInt(song?.completion_progress) > 0 ?
                                                                                    <div className="circle-container">
                                                                                        <div className={`circle percentage-${parseInt(song?.completion_progress)}`} style={{ cursor: 'pointer' }}>
                                                                                            <span>{parseInt(song?.completion_progress)}%</span>
                                                                                            <div className="percentage-bar"></div>
                                                                                        </div>
                                                                                    </div> : '' }
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tittle">
                                                                            <Link to={courseUrl}><h3 className="cut-text-songs">{truncatedTitle}</h3></Link>
                                                                            <h5 className="m-0 mt-1">{song?.artist}</h5>
                                                                        </div>
                                                                    </div>

                                                                </td>
                                                                <td className="d-lg-block d-md-block d-none" style={{ marginTop: "10px" }}>
                                                                    <div className="album">
                                                                        {song?.album && <p>{song?.album}</p>}
                                                                        {song?.genre && <div className="song-class mt-1">{song?.genre}</div>}
                                                                    </div>


                                                                </td>
                                                                <td className="d-lg-none d-md-none d-block ">
                                                                    <div>
                                                                        <img style={{height: '25px', width: '25px'}} src="assets/img/instructor/ph_guitar-thin.png" alt="" />
                                                                    </div>

                                                                </td>
                                                                <td>
                                                                    <div
                                                                        className=" justify-content-between d-lg-flex d-md-flex d-none"
                                                                        style={{ gap: "100px" }}>
                                                                        <div
                                                                            className="d-flex align-items-center justify-content-between">
                                                                            <div className="song-info ml-4">{song?.difficulty.charAt(0).toUpperCase() + song?.difficulty.slice(1)}</div>
                                                                            <hr />
                                                                            <div className="d-flex align-items-center gap-2 mr-4">
                                                                                {song?.instructor?.name &&
                                                                                    <>
                                                                                        <img className="image"
                                                                                            src={song?.instructor?.poster}
                                                                                            alt=""
                                                                                            style={{
                                                                                                borderRadius: '13px',
                                                                                                width: '24px',
                                                                                                height: '24px'
                                                                                            }} />
                                                                                        <div
                                                                                            className="d-flex flex-column recomendation-contents ">

                                                                                            <h5 className="p-0 m-0">by</h5>
                                                                                            <div className="recomendation-text">{song?.instructor?.name}
                                                                                            </div>

                                                                                        </div>
                                                                                    </>}
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="action-area d-lg-block d-md-block d-none">
                                                                        <ul className="d-flex align-items-center">
                                                                            <li className=" d-lg-block d-md-block d-none">
                                                                                {song?.new === 1 ? <a className="trending" href="javascript:void(0);">Trending</a> : ""}

                                                                            </li>
                                                                            <li className="wishlist d-lg-block d-md-block d-none">
                                                                                <a 
                                                                                    href="javascript:void(0);"
                                                                                >
                                                                                    <img
                                                                                        src={song?.liked ? "./assets/img/love.svg" : "./assets/img/unlike.svg"}
                                                                                        alt="unlove"
                                                                                        onClick={(e) => { props?.handleLikeSongs(e, song?.id) }}
                                                                                        id={`song-${song?.id}`}
                                                                                        data-liked={song?.liked}
                                                                                        style={{ cursor: 'pointer' }}
                                                                                    />

                                                                                    {/* <UseAnimations 
                                                                                        animation={heart} 
                                                                                        size={30} 
                                                                                        fillColor={'#e10052'}
                                                                                        reverse={song?.liked}
                                                                                        strokeColor={'inherit'} 
                                                                                        onClick={(e) => { props?.handleLikeSongs(e, song?.id) }}
                                                                                        id={`song-${song?.id}`}
                                                                                        data-liked={song?.liked}
                                                                                        style={{ cursor: 'pointer' }}
                                                                                    /> */}
                                                                                </a>
                                                                                
                                                                            </li>
                                                                            <li>
                                                                            <li>
                                                                          
                                                                        </li>
                                                                        </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )

                                                    }) : <td style={{ textAlign: 'center' }} colSpan={4}>No record found.</td>}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : <div style={{ textAlign: 'center', marginTop: '30px' }}>No record found.</div>)
            : ''}
        </>
    );
};

export default Songs;
