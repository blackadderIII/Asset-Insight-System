import { createContext, useState } from 'react';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [warnMessage, setWarnMessage] = useState('');

  const errorT = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 4000);
  };

  const successT = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const warnT = (message) => {
    setWarnMessage(message);
    setTimeout(() => setWarnMessage(""), 4000);
  };

  const successTPermanent = (message) =>{
    setSuccessMessage(message);
  }
  const warnTPermanent = (message) =>{
    setWarnMessage(message);
  }
  const errorTPermanent = (message) =>{
    setErrorMessage(message);
  }

  return (
    <ToastContext.Provider value={{ errorT, successT, warnT,successTPermanent,warnTPermanent,errorTPermanent, errorMessage, successMessage, warnMessage }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };