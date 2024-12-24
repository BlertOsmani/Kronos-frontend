import { createContext, useCallback, useContext, useState } from "react"
import PropTypes from 'prop-types';

const ToastContext = createContext();

export default function ToastProvider({children}) {
    const [toasts, setToasts] = useState([]);
    const toastTypeClass = {
        success: 'bg-emerald-100 text-emerald-600',
        error: 'bg-red-100 text-red-600',
    }

    const showToast = useCallback((message, type="success", duration = 3000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, {id, message, type}]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, duration);
    }, []);

  return (
    <ToastContext.Provider value={{showToast}}>
        {children}
        <div className="fixed top-5 left-1/2 translate-x-[-50%]">
            {toasts.map((toast) => (
                <div key={toast.id} className={`px-4 py-2 rounded shadow-lg ${toastTypeClass[toast.type]}`}>
                    {toast.message}
                </div>
            ))}
        </div>
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
    children: PropTypes.node
}

export const useToast = () => useContext(ToastContext);