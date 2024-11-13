import { ToastOptions } from "react-toastify";

export interface ToastConfig extends ToastOptions {
    position: "top-right";
    autoClose: number;
    hideProgressBar: boolean;
    closeOnClick: boolean;
    pauseOnHover: boolean;
    draggable: boolean;
  }
  
export const toastProperties = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};
