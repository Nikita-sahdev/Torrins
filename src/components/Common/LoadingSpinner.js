import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ marginTop: '202px' }}>
        <div
            className="loader spinner-border m-5 d-table m-auto"
            role="status"
        >
            <span className="visually-hidden"></span>
        </div>
        <span className=" m-5 d-table m-auto">
            Loading...
        </span>
    </div>
  );
};

export default LoadingSpinner;
