import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./footer.scss";
// import '../Common/CSS/homepage.css';
import NewsLetter from './NewsLetter';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../Adapters/auth.services';


const Footer = () => {

    const navigate = useNavigate();
    const [footerData, setFooterData] = useState({})

    const handleClick = (e) => {
        dispatchEvent(new CustomEvent('privacySectionCustomEvent'))
    };

    useEffect(() => {
        getfooterData()
    }, [])



    const getfooterData = async () => {
        try {
            const data = await authService.getData(`${process.env.REACT_APP_API_URL}/api/footer-links`);
            if (data?.status === 200) {
                setFooterData(data?.data?.data)
            } else {
                setFooterData({})
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
        }
    };



    const groupedData = footerData?.bottom && Object.keys(footerData?.bottom).map(category => ({
        category,
        items: footerData?.bottom[category]
    }));




    return (
        <div className='HeaderFooterHomepageDiv'>

            <div className="footer container-fluid p-3 p-sm-5" style={{ position: 'relative', bottom: '0' }}>
                <div className='top'>
                    <Link className="navbar-brand" to="/">
                        <img src={`/assets/img/chirstmas-logo.svg`} class="logo" alt="logo" />
                    </Link>

                </div>
                {/* mobile view start */}
                <div id="dropdwns">
                    <hr />

                    {/* Essential Section */}
                    <div className="accordion mbl-drop mt-2 mbl-footer-dropdown" id="exploreAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="exploreHeading">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#exploreCollapse"
                                    aria-expanded="true" aria-controls="exploreCollapse">
                                    Essential
                                </button>
                            </h2>
                            <div id="exploreCollapse" className="accordion-collapse collapse" aria-labelledby="exploreHeading">
                                <div className="accordion-body">
                                    <ul className="list-unstyled">
                                        {footerData?.top?.Essential?.map((item, index) => (
                                            <li key={index}>
                                                <Link to={item?.link} target='_blank' className="dropdown-item">{item?.name}</Link>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Company Section */}
                    <div className="accordion mbl-drop mt-3 mbl-footer-dropdown" id="companyAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="companyHeading">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#companyCollapse"
                                    aria-expanded="true" aria-controls="companyCollapse">
                                    Company
                                </button>
                            </h2>
                            <div id="companyCollapse" className="accordion-collapse collapse" aria-labelledby="companyHeading">
                                <div className="accordion-body">
                                    <ul className="list-unstyled">
                                        {footerData?.top?.Company?.map((item, index) => (
                                            <li key={index}>
                                                <Link to={item?.link} target='_blank' className="dropdown-item">{item?.name}</Link>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Explore Section */}
                    <div className="accordion mbl-drop mt-2 mbl-footer-dropdown" id="popularCoursesAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="popularCoursesHeading">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#popularCoursesCollapse"
                                    aria-expanded="true" aria-controls="popularCoursesCollapse">
                                    Explore
                                </button>
                            </h2>
                            <div id="popularCoursesCollapse" className="accordion-collapse collapse" aria-labelledby="popularCoursesHeading">
                                <div className="accordion-body">
                                    <ul className="list-unstyled">
                                        {footerData?.top?.Explore?.map((item, index) => (
                                            <li key={index}>
                                                <Link to={item?.link} target='_blank' className="dropdown-item">{item?.name}</Link>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-12 col-sm-3 mt-4 justify-content-center justify-content-md-end" id="emailbox">
                    <NewsLetter />
                </div>
                {/* mobile view end */}

                <div className="row mt-3 mid-sec">

                    <div className="col-lg-3">
                        <h6>Essential</h6>
                        {footerData?.top?.Essential?.map((item, index) => (
                            <Link key={index} to={item?.link} target='_blank' className="dropdown-item"><p>{item?.name}</p></Link>

                        ))
                        }
                    </div>
                    <div className="col-lg-3">
                        <h6>Company</h6>
                        {footerData?.top?.Company?.map((item, index) => (
                            <Link key={index} to={item?.link} target='_blank' className="dropdown-item"><p>{item?.name}</p></Link>
                        ))
                        }
                    </div>

                    <div className="col-lg-3">
                        <h6>Explore</h6>
                        {footerData?.top?.Explore?.map((item, index) => (
                            <Link key={index} to={item?.link} target='_blank' className="dropdown-item"><p>{item?.name}</p></Link>

                        ))
                        }
                    </div>

                    <div className="col-lg-3 col-sm-12 d-flex justify-content-center justify-content-md-end">
                        <NewsLetter />
                    </div>
                </div>

                <div className=' d-flex w-100 getintouch'>
                    <div className='d-flex gap-2'>
                        <img src='/assets/img/mail-yellow.svg' alt='' />
                        <a href={`mailto:${footerData?.email}`}>{footerData?.email}</a>
                    </div>
                    <div className='d-flex gap-2'>
                        <img src='/assets/img/phone-yellow.svg' alt='' />
                        <a href={`tel:${footerData?.phone}`}>{footerData?.phone}</a>
                    </div>

                </div>
                <hr />
                <div className='footer-categories'>
                    {groupedData?.map((item, index) => (
                        <div className='category' key={index}>
                            <span className='category-title'>{item?.category}</span>
                            <p className='category-items d-flex'>
                                {item?.items?.map((lesson, i) => (
                                    <Link to={lesson?.link} target='_blank' key={i}>&nbsp;{lesson?.name}&nbsp;{i !== item.items.length - 1 && '| '}</Link>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="copyright">
                    <p><Link to={'/t&c'} target='_blank' style={{ textDecoration: 'none', color: '#999' }}>Terms &amp; Conditions </Link><Link to='/t&c' style={{ textDecoration: 'none', color: '#999' }} onClick={handleClick()}> | Privacy</Link><Link to='https://www.torrins.com/sitemap.xml' style={{ textDecoration: 'none', color: '#999' }}> | Sitemap</Link></p>
                    <div className="d-flex gap-3">
                        <Link to={'https://www.instagram.com/torrinsindia'} target='_blank'>
                            <img src={`${process.env.REACT_APP_URL}/assets/homepage/instagram2.svg`} alt='Instagram' />
                        </Link>
                        <Link to={'https://twitter.com/Torrinsonline'} target='_blank'>
                            <img src={`${process.env.REACT_APP_URL}/assets/homepage/tweet.svg`} alt='tweeter' />
                        </Link>
                        <Link to={'https://www.linkedin.com/company/torrinsindia/mycompany'} target='_blank'>
                            <img src={`${process.env.REACT_APP_URL}/assets/homepage/linkdin.svg`} alt='linkdin' />
                        </Link>
                        <Link to={'https://www.youtube.com/user/torrinsonline'} target='_blank'>
                            <img src={`${process.env.REACT_APP_URL}/assets/homepage/youtube.svg`} alt='youtube' />
                        </Link>
                    </div>
                    <p>© 2023 Torrins. All rights reserved</p>
                </div>

            </div>
        </div>

    );
};

export default Footer;