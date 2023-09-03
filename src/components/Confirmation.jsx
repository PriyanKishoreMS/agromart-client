import React from 'react';


const Confirmation = ({ message, onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-10 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;