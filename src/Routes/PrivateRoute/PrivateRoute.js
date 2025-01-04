import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ isSignedIn, children }) => {
  
  if (! isSignedIn ) {
    return <Navigate to="/signin" replace />
  } 
  
  return children;
};

export default PrivateRoute;


