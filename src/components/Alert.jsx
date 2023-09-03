import React, { useEffect, useState } from 'react';

const Alert = ({ type, message, onClose }) => {

    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return null;
    }

    let alertClass = '';

    switch (type) {
        case 'success':
            alertClass = 'bg-green-500 text-white';
            break;
        case 'warning':
            alertClass = 'bg-yellow-500 text-white';
            break;
        case 'error':
            alertClass = 'bg-red-500 text-white';
            break;
        default:
            alertClass = 'bg-blue-500 text-white';
            break;
    }

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 `}
        >
            <div className="bg-slate-100 rounded-lg shadow-xl p-6 text-white">
                <h2 className="text-2xl font-semibold mb-4 text-primary-700">Alert</h2>
                <p className="text-lg text-primary-500">{message}</p>
                <button
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 hover:text-gray-100"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Alert;