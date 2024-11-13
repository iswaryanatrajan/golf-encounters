import React from 'react';

interface ToastProps {
  id: string;
  iconColor: string;
  bgColor: string;
  textColor: string;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  iconColor,
  bgColor,
  textColor,
  message,
  onClose,
}) => {
  return (
    <div
      id={id}
      className={` flex items-center w-full max-w-xs p-4 mb-4 text-${textColor} bg-${bgColor} rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
      role="alert"
    >
      <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${iconColor} bg-${iconColor} rounded-lg dark:bg-${iconColor}-800 dark:text-${iconColor}-200`}>
        
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
        data-dismiss-target={`#${id}`}
        aria-label="Close"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
