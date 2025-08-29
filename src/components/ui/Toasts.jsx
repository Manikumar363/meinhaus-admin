import React from 'react';

const CloseBtn = ({ closeToast }) => (
  <button onClick={closeToast} className="toast-close-btn" aria-label="Close">×</button>
);

const BaseToast = ({ colorClass, icon, message, closeToast, spinner }) => (
  <div className="toast-card">
    <div className={`toast-icon-circle ${colorClass}`}>
      {spinner ? <div className="spinner" /> : icon}
    </div>
    <div className="flex-1 font-medium">{message}</div>
    <CloseBtn closeToast={closeToast} />
  </div>
);

export const LoadingToast = ({ message, closeToast }) => (
  <BaseToast colorClass="toast-icon-gray" message={message} closeToast={closeToast} spinner />
);

export const SuccessToast = ({ message, closeToast }) => (
  <BaseToast
    colorClass="toast-icon-green"
    message={message}
    closeToast={closeToast}
    icon={
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    }
  />
);

export const ErrorToast = ({ message, closeToast }) => (
  <BaseToast
    colorClass="toast-icon-red"
    message={message}
    closeToast={closeToast}
    icon={
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    }
  />
);