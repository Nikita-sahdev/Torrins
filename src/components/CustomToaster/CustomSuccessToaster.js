// CustomSuccessToast.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const CustomSuccessToast = ({ message }) => {
  return (
    <div className="custom-success-toast">
      <img src="/assets/img/Snackbar/snackbarlogo.svg" alt="Success" />{"  "}
      <span>{message}</span>
    </div>
  );
};

export default CustomSuccessToast;