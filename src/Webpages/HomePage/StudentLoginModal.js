//Library
import * as yup from "yup";
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


const schema = yup.object().shape({
    login: yup.string().required('Please enter the  username or email'),
    password: yup.string().required('Please enter the password')
});


const StudentLoginModal = (props) => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const authState = useSelector((state) => state.auth)
    const [passwordLength, setPasswordLength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const storedData = localStorage.getItem('data');
    const localStorageData = storedData ? JSON.parse(storedData) : null;
    const studentLoading = useSelector((state) => state.auth.studentSubmit)
    const modalShouldClose = authState.auth ? '' : 'static';
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit"
    });

    useEffect(() => {
        if(authState?.auth) {
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
            navigate('/dashboard')
        }
    },[authState])
    
    const onSubmit = (data) => {
        const requestData = {
            ...data,
            login: data.login.trim()
        }
        dispatch({ type: authConstants.SIGNIN_REQUEST });
        dispatch(auth.signIn(requestData));
    }

    const handleSocialButton = (data) => {
       
        const requestData = {
            ...data,
            id:props?.studentId,
        }
        dispatch({ type: authConstants.SOCIAL_LOGIN_REQUEST });
        dispatch(auth.studentSocialLogin(requestData));
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

    const handleKeyUp = (e) => {
        const inputValue = e.target.value;
        localStorage.setItem('email', inputValue);
    };

    return (
        <div class="modal fade signup-modal email-signup-modal login-page " id="login-signmodal" tabindex="-1"
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
                                <h4>Welcome back!</h4>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-group">
                                    <FormInput
                                        class="form-control"
                                        id="floatingInputValue"
                                        register={register('login')}
                                        error={errors?.login}
                                        name="login"
                                        type="text"
                                        identity="login"
                                        autoComplete="off"
                                        placeholder="Enter email address"
                                        onKeyUp={(e) => handleKeyUp(e)}
                                    />
                                </div>
                                <div class="form-group">
                                    <FormInput
                                        class="form-control"
                                        id="floatingInputValue"
                                        type={showPassword ? 'text' : 'password'}
                                        identity="password"
                                        name="password"
                                        autoComplete="off"
                                        placeholder="Enter Password"
                                        register={register('password')}
                                        error={passwordLength >= 8 ? '': errors?.password}
                                        defaultValue={localStorageData !== null ? localStorageData.password : ''}
                                    />
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
                                {authState?.submitted? <button disabled>Loading...</button> : <button type="submit">Proceed</button>}
                                    
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
                                            Sign in with Google
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
