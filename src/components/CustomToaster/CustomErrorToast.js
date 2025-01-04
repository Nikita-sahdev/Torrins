
// CustomErrorToast.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const CustomErrorToast = ({ message }) => {
  return (
    <div className="custom-error-toast">
      <img src="/assets/img/Snackbar/snackbarlogo.svg" alt="Error" />{"  "}
      <span>{message}</span>
    </div>
  );
};

export default CustomErrorToast;