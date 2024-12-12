import { useEffect } from 'react';

const Toast = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); 
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-72 p-4 mb-4 text-white bg-green-500 rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-center">
            <span>{message}</span>
            <button
              onClick={onClose}
              className="ml-2 text-white hover:text-gray-200"
            >
              ✖️
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
