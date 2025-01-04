import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BreadCrumbs.css'
import '../../Webpages/Courses/Learning.scss'

const BreadCrumbs = (props) => {
    return (
        <div class="d-lg-block d-none container-fluid" >
            <div class="page-navigation">
                <ul>
                    {props?.data?.map((list, index) => {
                        const lastindex = props.data.length - 1 == index
                        return (
                            <React.Fragment key={`${list.url}-${index}`}>
                                <li className={lastindex ? 'active' : ''}>
                                    <Link to={list.url}>{list.name}</Link>
                                </li>
                                {!lastindex && <i style={{ fontSize: '18px' }} className="ri-arrow-right-s-line"></i>}
                            </React.Fragment>
                        )
                    })}
                </ul>
            </div>
        </div>

    )
}
export default BreadCrumbs
