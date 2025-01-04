import React from 'react'
import { useDispatch } from 'react-redux';
import { dashboardAction } from '../../Action/User/dashboard.actions';
import '../SavedNotes/savedNotes.scss'

const DeleteLearningProgressModal = (props) => {
    const dispatch = useDispatch();

    const handeldeletPersonalisation = () => { 
        dispatch(dashboardAction.deletePersonalisation(props?.deleteId, { Token: props?.token }))  
    };

    return (
        <div
            className="modal fade signup-modal login-page delete-popup saved-notes"
            id="delete-modal"
            tabIndex="-1"
            aria-labelledby="signModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-md"
                style={{ maxWidth: "669px" }}
            >
                <div
                    className="modal-content singup-image"
                    style={{ height: "243px" }}
                >
                    <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
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

                    <div className="modal-body">
                            <img
                                className="trash-img"
                                src="/assets/img/learning/trash-modal.png"
                                alt=""
                                style={{marginLeft:'45%'}}
                            />
                           <p>Are you sure you want to delete this personalisation? </p>
                            <div className="confirm-btn" style={{display:'flex', gap:'10px'}}>
                            <a id='paypal-button' data-bs-toggle="modal" data-bs-target="#deleteSuccess-modal" className='active'style={{color: "white"}} onClick={() => handeldeletPersonalisation()}>Yes</a>
                            <a  data-bs-dismiss="modal" style={{color: "black"}}>No</a>
                            </div>
                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteLearningProgressModal
