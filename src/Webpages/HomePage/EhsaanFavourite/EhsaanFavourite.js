import React, { useRef, useState } from 'react';
import './EhsaanFavourite.scss';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../../Helpers/useWindowDimensions';

const EhsaanFavourite = (data) => {
  const { windowWidth } = useWindowDimensions();

  const videoRef = useRef(null);
  const [playingVideo, setPlayingVideo] = useState(false);


  const handlePlayVideo = () => {
    if (videoRef?.current) {
      videoRef?.current?.play();
      setPlayingVideo(true)
    }
  };





  const pauseVideo = () => {
    if (videoRef?.current) {
      videoRef.current.pause();
      setPlayingVideo(false);
    }
  };

  const handleVideoEnd = () => {
    setPlayingVideo(false);
  };

  return (
    <div className='ehsaan-favourite'>

      <div className='favourite-container col-lg-12'>

        <div className='video-container'>
          <video id="video" preload="auto" src={data?.data?.video} type="video/mp4" className="video" poster={data?.data?.poster} playsInline ref={videoRef} onEnded={handleVideoEnd} >
          </video>

          {data &&
            playingVideo ? <div className='pay-btn' onClick={pauseVideo}>
            <img loading="lazy"src='/assets/img/BattleBands/pause2.svg' alt='' />
          </div> : <div className='pay-btn' onClick={handlePlayVideo}>
            <img loading="lazy"src='/assets/img/BattleBands/play.svg' alt='' />
          </div>
          }
        </div>
        <div className='about-section'>
          <h3>{data?.data?.title}</h3>
          <p>“{data?.data?.review}”</p>
          <span>Ehsaan Noorani</span>
          {windowWidth > 991 && <br />}
          <span>Shankar Ehsaan Loy</span>
          {/* <Link><img loading="lazy"src='/assets/img/HomeNew/play.svg' alt='' /> Watch Ehsaan’s Thoughts </Link> */}
        </div>

      </div>

    </div>
  )
}

export default EhsaanFavourite