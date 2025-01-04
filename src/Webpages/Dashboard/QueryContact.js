import React from 'react';
import { Link } from 'react-router-dom';

function QueryContact() {
    const contactNo = '+91 9289207070';
    const contactEmail = 'support@torrins.com';
    return (
        <div className="query_section">
            <div className="query-content">
                <p className="query-head">Reach out to us in case of any query</p>
                {/* <div className="d-flex single-query align-items-center">
                    <img loading="lazy"src="./assets/img/phone-yellow.svg" alt="phone icon" />
                    <div className="ms-2">
                        <span className="size-12">Call us</span>
                        <p className="size-12 mb-0">{contactNo}</p>
                    </div>
                </div> */}
                <div className="d-flex single-query align-items-center">
                    <img loading="lazy"src="./assets/img/mail-yellow.svg" alt="mail icon" />
                    <div className="ms-2 d-flex flex-column">
                        <span className="size-12">Email us</span>
                        <p className="size-12 mb-0">{contactEmail}</p>
                    </div>
                </div>
            </div>

            <div className="or-section mt-0 mb-0">
                <hr />
                <span className="mx-2"> OR</span>
                <hr />
            </div>
            <div className="d-flow text-center ">
            
                <Link to='/support'><button class="btn btn-explore my-2">Get in Touch</button></Link>
                <Link to='/faq'><button class="btn btn-learn-more my-2">Read FAQs</button></Link>
            </div>
        </div>
    );
}

export default QueryContact;
