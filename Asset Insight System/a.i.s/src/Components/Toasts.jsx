import React, { useState } from "react";
import "../css/toast.css";

function Toasts() {

    const[errorMessage,setErrorMessage]= useState("");
    const[successMessage,setSuccessMessage]= useState("");
    const[warnMessage,setWarnMessage]= useState("");
 

  const successT = (message) => {
    successToast.classList.add("active");
    successMessage.innerHTML = message;
    setTimeout(() => successToast.classList.remove("active"), 4000);
    setTimeout(() => (successMessage.innerHTML = ""), 4100);
  };

  const successTPermanent = (message) => {
    successToast.classList.add("active");
    successMessage.innerHTML = message;
  };

  const warnT = (message) => {
    warnToast.classList.add("active");
    warnMessage.innerHTML = message;
    setTimeout(() => warnToast.classList.remove("active"), 4000);
    setTimeout(() => (warnMessage.innerHTML = ""), 4100);
  };

  const warnTPermanent = (message) => {
    warnToast.classList.add("active");
    warnMessage.innerHTML = message;
  };

  const errorT = (message) => {
    errorToast.classList.add("active");
    errorMessage.innerHTML = message;
    setTimeout(() => errorToast.classList.remove("active"), 4000);
    setTimeout(() => (errorMessage.innerHTML = ""), 4100);
  };

  const errorTPermanent = (message) => {
    errorToast.classList.add("active");
    errorMessage.innerHTML = message;
  };

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
  );
}

export default Toasts;
