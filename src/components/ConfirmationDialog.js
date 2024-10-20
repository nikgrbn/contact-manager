import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="confirmation-dialog">
        <p className=''>{message}</p>
        <button className='ui button red' onClick={onConfirm}>Yes</button>
        <button className='ui button grey' onClick={onCancel}>No</button>
      </div>
    );
  };
  
  export default ConfirmationDialog;