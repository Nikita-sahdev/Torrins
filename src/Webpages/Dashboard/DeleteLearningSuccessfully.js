import React from 'react'
import '../SavedNotes/savedNotes.scss'

const DeleteLearningSuccessfully = () => {
    return (
        <div
            className="modal fade signup-modal login-page delete-popup saved-notes"
            id="deleteSuccess-modal"
            tabIndex="-1"
            aria-labelledby="signModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
        >
        <div
            className="modal-dialog modal-dialog-centered modal-md"
            style={{ maxWidth: "429px" }}
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
                            src="/assets/img/learning/successDelete.png"
                            alt=""
                            style={{marginLeft:'45%'}}
                        />
                        <img className='tick' src="/assets/img/learning/successDelete-tick.png"
                            alt=""/>
                             <p className='success-note'>Personalisation has been deleted successfully</p>
                        
               
                </div>
            </div>
        </div>
    </div>
    )
}

export default DeleteLearningSuccessfully
