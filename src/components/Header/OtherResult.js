import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const OtherResult = (props) => {
const otherSearchValue = useSelector((state) => state.lesson.otherSearchValue)

    return (
        <>
        {otherSearchValue?.length > 0 &&
        <div className="other-results">
            <p>Other results</p>
            <ul>
                {otherSearchValue?.map((otherData) => {
                    return (
                        <>
                        <div className="search-result-content">
                            <img
                                className="search-icon"
                                src="/assets/img/Navigations/Vector.svg"
                                alt="Search Icon"
                            />
                            <div className="result-text">
                                <Link onClick={() => {
                                    props?.closePersonalisation();
                                    props?.handleClose();
                                    }} to={`/${otherData?.instrument?.toLowerCase()}-lessons/${otherData?.hash}-${otherData?.id}`}><li>{otherData?.title}</li></Link>
                          
                                <span className="hierarchy">
                                {otherData.path
                                    ?.slice(0, -1)  // Exclude the last 2 items
                                    .reverse()      // Reverse the remaining array
                                    .map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item.title?.replace('Lessons','')} {index < otherData.path.length - 2 && ' > '}
                                    </React.Fragment>
                                ))}
                                </span>
                            </div>
                        </div>
                          
                        </>
                    )
                })}
            </ul>
        </div>}
        </>
        
    )
}

export default OtherResult
