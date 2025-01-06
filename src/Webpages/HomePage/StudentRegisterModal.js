//Library
import { FormInput } from '../../Utility/FormInput';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux';
import { LoginSocialGoogle } from 'reactjs-social-login'
import { Link, useNavigate } from 'react-router-dom';

//Components
import {StudentLoginSchema} from '../../ValidationSchema/StudentLoginSchema'
import { auth } from '../../Action/auth.actions';
import { authConstants } from '../../Constants/Auth';
import '../Authentication/Login/Login.scss'

const schema = StudentLoginSchema

const StudentLoginModal = (props) => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState("");
    const authState = useSelector((state) => state.auth)
    const studentLoading = useSelector((state) => state.auth.studentSubmit)
    const modalShouldClose = authState.auth ? '' : 'static';
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    });
    
    const onSubmit = (data) => {
        // if (!phoneValidation(phone)) {
        //     return false;
        // }
        const requestData = {
            ...data,
            id: props?.studentId
        }
        dispatch({ type: authConstants.STUDENT_LOGIN_PENDING });
        setTimeout(() => {}, 1000);
        dispatch(auth.studentLogin(requestData)).then((response) => {
            dispatch(auth.studentVerification(props?.studentId))
        })
      
    }

    const handlePhoneChange = (e) => {
        phoneValidation(e.target.value.replace(/\D+/g, ""));
    }; 

    function phoneValidation(phoneValue) {
        setPhone(phoneValue);
       if (phoneValue.length !== 9 && phoneValue.length !== 10) {
            setPhoneError("Phone number should be 9 or 10 digits.");
            return false;
        } else {
            setPhoneError("");
            return true;
        }
    }

    const handleSocialButton = (data) => {
        const requestData = {
            ...data,
            id:props?.studentId,
        }
        dispatch({ type: authConstants.SOCIAL_LOGIN_REQUEST });
        dispatch(auth.studentSocialLogin(requestData)).then(() => {
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
                navigate('/dashboard')
            }, 500);
        })
    }
    const handleKeyUp = (e) => {
        const inputValue = e.target.value;
        localStorage.setItem('email', inputValue);
    };

    useEffect(() => {
        dispatch({type:'EMPTY_STUDENTDATA'})
    },[])

    return (
        <div class="modal fade signup-modal email-signup-modal login-page " id="email-signmodal" tabindex="-1"
        aria-labelledby="signmodalLabel" aria-hidden="false" style={{zIndex:'9999'}} data-bs-backdrop={modalShouldClose}>
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content" >
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 20L4 4M20 4L4 20" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </button>
                <div class="modal-body">
                <div class="signup-modal-area">
                    <div class="row">
                        <div class="">
                            <div class="form-area">
                            <div class="title">
                                <h4>Enter basic details <br />
                                    to Get Started</h4>
                            </div>
                            <form action=""  onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-group">
                                    <FormInput
                                        class="form-control"
                                        id="floatingInputValue"
                                        register={register('email')}
                                        error={errors?.email}
                                        name="email"
                                        type="text"
                                        identity="email"
                                        autoComplete="off"
                                        placeholder="Enter email address"
                                        onKeyUp={(e) => handleKeyUp(e)}
                                    />
                                </div>

                                
                                <div class="form-group">
                                    <FormInput
                                        class="form-control"
                                        id="floatingInputValue"
                                        register={register('phone')}
                                        name="phone"
                                        type="text"
                                        identity="phone"
                                        autoComplete="off"
                                        placeholder="Enter you mobile number"
                                        value={phone}
                                        onChange={(e) => {
                                            handlePhoneChange(e);
                                        }}
                                        
                                    />
                                    {phoneError ? (
                                        <p className="incorrect_msg">
                                            <img loading="lazy"src="assets/img/error.svg" alt="" />{" "}
                                            {phoneError}{" "}
                                        </p>
                                    ) : (
                                        phone?.length === 10 && ""
                                    )}
                                </div>
                                <div class="login-info">
                                    <p>
                                        Your Email ID will help us store your lesson progress and your achievements
                                    </p>
                                </div>
                                <div class="tm">
                                    <p>By clicking on Proceed, I agree to all the<Link to="/t&c"  target="_blank">Terms & Conditions</Link>. and
                                        give my consent as a parent </p>
                                </div>
                                <div class="submit-btn">
                                {studentLoading? <button disabled>Loading...</button> : <button type="submit">Proceed</button>}
                                    
                                </div>
                                <div class="register-with-google">
                                <a href="javascript:void(0)">
                                    <LoginSocialGoogle
                                        className='google-reg'
                                        client_id ='595434321762-t901vug4d7dq10a1ts2m20pv9p0r9rip.apps.googleusercontent.com'
                                        access_type='online'
                                        scope='email profile'
                                        discoveryDocs='claims supported'
                                        onResolve={({ data}) => {
                                            handleSocialButton(data)
                                        }}  
                                        onReject={(err) => {
                                            console.log(err)
                                        }}
                                    >
                                        {authState.socialSubmit ? (
                                        <div className="google-logo-container">
                                            <span style={{color:'black'}}>
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="google-logo-container">
                                            <span>
                                                <img loading="lazy"src="/assets/img/learning/google.svg" alt="Google Logo" />
                                            </span>
                                            Register with Google
                                        </div>
                                    )}
                                    </LoginSocialGoogle>
                                </a>
                                 
                                </div>

                            </form>
                            </div>
                        </div>

                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default StudentLoginModal
