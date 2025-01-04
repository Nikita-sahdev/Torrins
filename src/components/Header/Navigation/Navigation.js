import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import LessonData from './LessonData';
import { useDispatch } from 'react-redux';
import '../Header.css';
import '../../Common/common.css';
import './navigation.css';

const Navigation = () => {
    const [menus, setMenus] = useState([]);
    const dispatch = useDispatch();

    const handleSlug = (menu) => {
        dispatch({ type: 'SET_ACTIVE_MENU', payload: menu});
    }

    useEffect(() => {
       setMenus(LessonData)

    }, []);


    return (
        <div>
            <Link to='/membership' style={{ fontSize: '19px', color: 'white', marginLeft: '1235px', position: 'absolute' }}>Membership</Link>
            <div className="navigation">
                <a className="menu-handle hidden menu-handle-default"></a>
                {menus?.categories?.length > 0 ? (
                    menus?.categories?.map((category, index) => {
                        return (
                            <li key={index} className="parent-category">
                                <span className="category-name">{category.name}</span>
                                {category.children && category.children.length > 0 ? (
                                    <ul className="child-categories">
                                        {category.children.map((child, childIndex) => {
                                            return(
                                                <li key={childIndex}>
                                                    <Link onClick={ () => handleSlug(child) } to={`${child.slug}`}>{child.name}</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                ) : null}
                            </li>
                        )  
                    })
                ) : ('')
                }
            </div>
        </div>
    );
};

export default Navigation;
