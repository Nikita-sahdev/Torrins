import React from 'react'
import '../common.scss'
import './NotFound.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='dummyPage'>
            <div class="container-notfound notfound-main">
                <div class="overlay"></div>
                <div class="contents">
                    <h1>Looks like you are lost in the woods</h1>
                    <p>We could not find the page you are looking for</p>
                    <Link to ='/' class="gotoHome">Go to Home Page</Link>
                </div>
            </div>
        </div>
        
    )
}

export default NotFound
