import React from 'react';

const Alert = ({ type, message }) => {
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

    console.log("entered", type, message);

    return (
        <div className={`p-4 rounded ${alertClass}`}>
            {message}
        </div>
    );
};

export default Alert;