import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../../Helpers/useWindowDimensions';

export const BobTicker = ({ setIsBobShow, isBobShow, isModalActive, tickerData }) => {

  const { windowWidth } = useWindowDimensions();


  const filteredMessages = tickerData.filter(
    (msg) => !(msg.url === "/battle-of-bands" && window.location.pathname.includes('/battle-of-bands'))
  );

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (filteredMessages?.length === 0) return;
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % filteredMessages.length);
        setIsFading(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [filteredMessages]);

  // if (filteredMessages?.length === 0) return null;


  const { message, url, exempt_url } =  filteredMessages?.length > 0 ? filteredMessages[currentSlideIndex] : '';


  return (
    <div className={`bobticker ${isBobShow ? "show" : ""}`} style={{ zIndex: isModalActive ? '9999' : '1' }} >
      <div
        className={`${windowWidth <= 991
            ? (message?.replace(/<.*?>/ig, '').length < 35
              ? `slide ${isFading ? "out" : "in"}`
              : "rolling-text")
            : `slide ${isFading ? "out" : "in"}`
          }`}
      >   {exempt_url ? (
        <a href={exempt_url} target="_blank" rel="noopener noreferrer">
          <p className="" dangerouslySetInnerHTML={{ __html: message}} />
        </a>
      ) : (
        <Link to={url}>
          <p className="" dangerouslySetInnerHTML={{ __html: message }} />
        </Link>
      )}
      </div>
    </div>
  );
};

