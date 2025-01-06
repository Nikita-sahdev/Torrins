import React from 'react';
import { Link } from 'react-router-dom';

const MemberShipSection = (props) => {
    return (
        <div className="join-community my-5 position-relative">
            <h6>Join a community of happy learners</h6>
            <div class="d-flex align-items-center justify-content-center gap-2 mt-5">
                <p>Learn 1 instrument</p>
                <label class="switch">
                    <input
                        type="checkbox"
                        checked={props?.selectedOption === "all"}
                        onChange={props?.handleOptionChange}
                        id="membership"
                        aria-label="membership"
                    />
                    <span class="slider round" style={{backgroundColor: '#7969e3'}}></span>
                </label>

                <p>Learn all 3 instruments</p>
            </div>
            {
                props?.selectedOption === "single" && 
            <p className='mt-3'>Select instrument in the next step -  Guitar . Piano . Bass</p>

            }
            <div className="bill-box mt-4">
                {props?.filteredMemberships?.length > 0 ? (
                    props?.filteredMemberships?.map((plan, index) => {
                        const price = plan?.price;
                        const monthlyDivision = price / 30;
                        const yearlyDivision = price / 365;
                        const savingPrice = (props?.filteredMemberships[0]?.price * 12) - plan?.price
                        const annualPriceForMonth = plan?.price / 12
                        
                        return (
                            <>
                                {/* {plan?.purchased_plan ? 
                                    <div className={`billed ${(props?.filteredMemberships?.length - 1 === index) ? 'mt-4 mt-sm-0' : ''} `}>
                                        <div className="top d-flex align-items-center justify-content-center">
                                            <img loading="lazy"src="/assets/img/green.svg" alt="" />
                                            <h6 style={{paddingLeft: '5px'}}>Currently Active Plan</h6>
                                        </div>

                                        <div className={`bottom ${(props?.filteredMemberships?.length - 1 === index) ? 'bottom-2 position-relative' : ''} d-flex align-items-center justify-content-center flex-column mt-3 pt-3`}>
                                            <h5 class="faded-start">Membership Details</h5>
                                            {props?.plan?.purchased_plan && <h2>{props?.plan?.name}</h2>  }
                                            <p class="valid">Valid till {props?.formattedDate}</p>
                                            {plan?.currency == "INR" ? (
                                                <h2>{plan?.duration_text == 'Monthly' ? `₹${props.plan?.price}/month`: `₹${Math.round(annualPriceForMonth)}/month`}</h2>
                                            ) : (
                                                <h2>{plan?.duration_text == 'Monthly' ? `$${props.plan?.price}/month`: `$${Math.round(annualPriceForMonth)}/month`}</h2>
                                            )}
                                            <div class="d-flex  flex-column mt-4 btns">
                                                <Link class="btn btn-cancel" to="#" onClick={props?.cancelSubscription}>Cancel Subscription</Link>
                                
                                            </div>
                                        </div>
                                    </div>
                                :
                                <div className={`billed ${(props?.filteredMemberships?.length - 1 === index) ? 'mt-4 mt-sm-0' : ''} `}>
                                    <div className="top d-flex align-items-center justify-content-center">
                                        <h6>{`${plan?.label}`}</h6>
                                        {(props?.filteredMemberships?.length - 1 === index) ? <p class="saved">Save up to ₹{savingPrice}</p> : ''}
                                    </div>

                                    <div className={`bottom ${(props?.filteredMemberships?.length - 1 === index) ? 'bottom-2 position-relative' : ''} d-flex align-items-center justify-content-center flex-column mt-3 pt-3`}>
                                        {plan?.currency == "INR" ? (
                                            <h2>{plan?.duration_text == 'Monthly' ? `₹${plan?.price}/month` : `₹${Math.round(annualPriceForMonth)}/month`}</h2>
                                        ) : (
                                            <h2>{plan?.duration_text == 'Monthly' ? `$${plan?.price}/month` : `$${Math.round(annualPriceForMonth)}/month`}</h2>
                                        )}

                                        {plan?.duration_text == "Monthly" ? (
                                            plan?.currency === 'INR' && <p>Just ₹{Math.round(monthlyDivision)} everyday</p>
                                        ) : (
                                            plan?.currency === 'INR' && <p>Just ₹{Math.round(yearlyDivision)} everyday</p>
                                        )}

                                        <Link to='/membership' className="btn-1 mt-5">Subscribe Now</Link>
                                        <span className="d-block mt-2">
                                            {plan?.currency === 'INR' ? 
                                                (plan?.duration_text === "Monthly" ? "" : `Total billing ₹${plan?.price} p.a.`) :
                                                (plan?.duration_text === "Monthly" ? "" : `Total billing $${plan?.price} p.a.`)
                                            }
                                            {" Cancel anytime "}
                                        </span>
                                    </div>
                                </div>
                                } */}

                                <div className={`billed ${(props?.filteredMemberships?.length - 1 === index) ? 'mt-4 mt-sm-0' : ''} `} key={index}>
                                    <div className="top d-flex align-items-center justify-content-center">
                                        <h6>{`${plan?.label}`}</h6>
                                        {(props?.filteredMemberships?.length - 1 === index) ? <p class="saved">Save up to {plan?.currency === 'INR' ? '₹' : '$'}{savingPrice}</p> : ''}
                                    </div>

                                    <div className={`bottom ${(props?.filteredMemberships?.length - 1 === index) ? 'bottom-2 position-relative' : ''} d-flex align-items-center justify-content-center flex-column mt-3 pt-3`}>
                                        {plan?.currency == "INR" ? (
                                            <h2>{plan?.duration_text == 'Monthly' ? `₹${plan?.price}/month` : `₹${Math.round(annualPriceForMonth)}/month`}</h2>
                                        ) : (
                                            <h2>{plan?.duration_text == 'Monthly' ? `$${plan?.price}/month` : `$${Math.round(annualPriceForMonth)}/month`}</h2>
                                        )}

                                        {plan?.duration_text == "Monthly" ? (
                                            plan?.currency === 'INR' && <p>Just ₹{Math.round(monthlyDivision)} everyday</p>
                                        ) : (
                                            plan?.currency === 'INR' && <p>Just ₹{Math.round(yearlyDivision)} everyday</p>
                                        )}
                                        <h5>{props?.selectedOption === 'all' ? props?.instrumentLabels : 'Select instrument in the next step'}</h5>
                                        {! plan?.purchased_plan ?
                                            <Link to='/membership' className="btn-1 mt-4">Subscribe Now</Link> 
                                        :   <div class="active-sections mt-4">
                                                <img loading="lazy"src="/assets/img/green.svg" alt="" />
                                                <p class="current-active-plan-text">Currently Active Plan</p>
                                            </div> 
                                        }

                                        <span className="d-block mt-2">
                                            {plan?.currency === 'INR' ? 
                                                (plan?.duration_text === "Monthly" ? "" : `Total billing ₹${plan?.price} p.a.`) :
                                                (plan?.duration_text === "Monthly" ? "" : `Total billing $${plan?.price} p.a.`)
                                            }
                                            {" Cancel anytime "}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )
                    })
                ) : (
                    <p style={{ textAlign: 'center' }}>No membership plans available for the selected option</p>
                )}
            </div>
        </div>
    );
};

export default MemberShipSection;
