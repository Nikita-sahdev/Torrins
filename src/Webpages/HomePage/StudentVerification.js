import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../Action/auth.actions";

const StudentVerification = (props) => {
    const dispatch= useDispatch()
    const emailSubmitted = useSelector((state) => state.auth.emailSubmitted)
    const authState = useSelector((state) => state.auth.studentData)
    const modalShouldClose = authState.auth ? '' : 'static';

    // const handleResendLink = (e) => {
        // e.preventDefault();
        // const requestData = {
        //     email:props?.studentData?.email
        // }
        // console.log('req-', requestData);
        // dispatch(auth.verifyEmail(requestData))
    // }

    useEffect(() => {
        dispatch({type:'EMPTY_STUDENTDATA'})

        window.$('#resendLink').click(function() {
            const requestData = {
                email:props?.studentData?.email
            }

            dispatch(auth.verifyEmail(requestData))
           
        })
    },[])

   
    const handleClose = () => {
        const modalBackdrops = document.querySelectorAll(
                ".modal-backdrop.fade.show"
            )
            modalBackdrops.forEach(modalBackdrop => {
                modalBackdrop?.parentNode?.removeChild(modalBackdrop);
            });

            setTimeout(() => {
                document.body.classNameList?.remove("modal-open");
                window.$('body').css('padding-right', '0px');
                window.$('body').css('overflow', 'auto');
            }, 300);
    }

    return (
        <div
            class="modal fade signup-modal email-signup-modal login-page "
            id="verification-signmodal"
            tabindex="-1"
            aria-labelledby="signmodalLabel"
            aria-hidden="false"
            style={{ zIndex: "9999" }}
            data-bs-backdrop={modalShouldClose}
        >
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <button
                        type="button"
                        class="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M20 20L4 4M20 4L4 20"
                                stroke="black"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <div class="modal-body">
                        <div class="signup-modal-area">
                            <div class="row"></div>
                            <div class="form-area verify-email" style={{background:'white'}}>
                                <img
                                    src="/assets/img/verify.svg"
                                    alt=""
                                    class="icon"
                                />
                                <h2>Verify your email address</h2>
                                <p class="verify-instruction-msg">
                                    We have sent a verification link to your
                                    email address <br />
                                    <b>{props?.studentData?.email}</b>  
                                </p>
                                <div class="verify-by">
                                    <p>
                                        To open your email click on your email
                                        provider
                                    </p>
                                    <div>
                                        <a
                                            href={
                                                process.env.REACT_APP_EMAIL_URL
                                            }
                                            class="google-reg"
                                            target="_blank"
                                        >
                                            <img
                                                src="/assets/img/google 1.svg"
                                                alt=""
                                            />
                                        </a>
                                        <a
                                            href={
                                                process.env
                                                    .REACT_APP_OUTLOOK_URL
                                            }
                                            class="google-reg"
                                            target="_blank"
                                        >
                                            <img
                                                src="/assets/img/outlook.svg"
                                                alt=""
                                            />
                                        </a>
                                        <a
                                            href={
                                                process.env.REACT_APP_YAHOO_URL
                                            }
                                            class="google-reg"
                                            target="_blank"
                                        >
                                            <img
                                                src="/assets/img/yahoo.svg"
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div class="login-if-account">
                                    Did not receive verification link?{emailSubmitted ? <Link to="#" >Sending...</Link> : <a href="#" id="resendLink">Resend Link</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentVerification;
