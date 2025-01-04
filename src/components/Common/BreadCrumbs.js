import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const BreadCrumbs = (props) => {
  const authState = useSelector((state) => state.auth);
  const streakCount = useSelector((state) => state.auth.streak);
  let breadcrumbs = props.data;
  let currentPage = props.currentPage;

  return (
    <div className="d-lg-block d-none S">
      {/* <div className="bread-crumb" style={{backgroundColor: '#222222', borderTop: '1px solid #444444'}}> */}
      <div className="bread-crumb" style={{backgroundColor: '#222222', borderTop: '1px solid #444444'}}>
        <ul className="home-section">
          {breadcrumbs?.map((item, index) => (
            <React.Fragment key={index}>
              {currentPage !== item.url ? (
                <li>
                  <Link to={item.url}>{item.name}</Link>
                </li>
              ) : (
                <li className="faded">{item.name}</li>
              )}
              {index !== breadcrumbs.length - 1 && (
                <li className="contents" style={{paddingTop: '0px'}}> {'>'} </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
		</div>
  )
}
export default BreadCrumbs
