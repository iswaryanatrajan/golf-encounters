import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ToastContextProps {
  children: ReactNode;
  iconColor: string;
  textColor: string;
}

interface ToastMessage {
  id: string;
  message: string;
  bgColor: string;
  
}

interface ToastContextType {
  showToast: (message: string, bgColor: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastContextProps> = ({ children,iconColor,textColor }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, bgColor:string) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, bgColor }]);
    setTimeout(() => hideToast(id), 5000);
  };

  const hideToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`fixed top-0 right-0 p-2 space-y-4 `}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`text-${textColor} bg-${toast.bgColor} p-2 rounded shadow-md`}
            onClick={() => hideToast(toast.id)}
          >
            <p>
            {toast.message}
            </p>
            
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
