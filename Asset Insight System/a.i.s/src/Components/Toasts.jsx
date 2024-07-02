import React, { useState } from "react";
import "../css/toast.css";

function Toasts() {

    const[errorMessage,setErrorMessage]= useState("");
    const[successMessage,setSuccessMessage]= useState("");
    const[warnMessage,setWarnMessage]= useState("");
 

  const successT = (message) => {
    setSuccessMessage(message)
    // setTimeout(() => successToast.classList.remove("active"), 4000);
    setTimeout(() => setSuccessMessage(""), 4100);
  };

  const successTPermanent = (message) => {
    setSuccessMessage(message)
  };

  const warnT = (message) => {
    setWarnMessage(message)
    // setTimeout(() => warnToast.classList.remove("active"), 4000);
    setTimeout(() => setWarnMessage(""), 4100);
  };

  const warnTPermanent = (message) => {
    setWarnMessage(message)
  };

  const errorT = (message) => {
    setErrorMessage(message)
    // setTimeout(() => errorToast.classList.remove("active"), 4000);
    setTimeout(() => setErrorMessage(""), 4100);
  };

  const errorTPermanent = (message) => {
    setErrorMessage(message)
  };

  return (
    <div>
      <div className={`toast success ${successMessage ? "active" : ""}`}>
        <i className="fas fa-check-circle"></i>
        <p>{successMessage}</p>
      </div>

      <div className={`toast warn ${warnMessage ? "active":""}`} >
        <i className="fas fa-warning"></i>
        <p>{warnMessage}</p>
      </div>

      <div className={`toast error ${errorMessage ? "active":""}`}>
        <i className="fas fa-times-circle"></i>
        <p id="toast-error-message">Success adding laptop</p>
      </div>
    </div>
  );
}

export default Toasts;
