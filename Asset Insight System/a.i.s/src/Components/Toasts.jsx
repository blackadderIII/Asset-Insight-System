import React, { useState,useContext } from "react";
import "../css/toast.css";
import { ToastContext } from "../utils/toastContext";





function Toasts() {


    
    const { errorMessage, successMessage, warnMessage } = useContext(ToastContext);

  return (
    <div>
      <div className={`toast success ${successMessage !==""? "active" : ""}`}>
        <i className="fas fa-check-circle"></i>
        <p>{successMessage}</p>
      </div>

      <div className={`toast warn ${warnMessage !=="" ? "active" :""}`} >
        <i className="fas fa-warning"></i>
        <p>{warnMessage}</p>
      </div>

      <div className={`toast error ${errorMessage !=="" ? "active":""}`}>
        <i className="fas fa-times-circle"></i>
        <p id="toast-error-message">Success adding laptop</p>
      </div>
    </div>
  );
  
}

export default Toasts;

