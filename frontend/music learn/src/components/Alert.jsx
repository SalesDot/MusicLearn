import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Alert;