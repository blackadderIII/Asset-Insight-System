import React from 'react';
import '../css/toast.css'

function Toasts() {
  return (
    <div>
      <div className="toast success" id="toast-success">
        <i className="fas fa-check-circle"></i>
        <p id="toast-success-message">Success adding laptop</p>
    </div>

    <div className="toast warn" id="toast-warn">
        <i className="fas fa-warning"></i>
        <p id="toast-warn-message">Failed to reach servers</p>
    </div>

    <div className="toast error" id="toast-error">
        <i className="fas fa-times-circle"></i>
        <p id="toast-error-message">Success adding laptop</p>
    </div>
    </div>
  )
}

export default Toasts

