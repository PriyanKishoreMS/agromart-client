import React from 'react';
import { useNavigate } from 'react-router-dom';


const WorkInProgress = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Work in Progress</h1>
            <p className="text-lg">This page is under construction.</p>
            <button className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-white bg-primary-500 hover:text-yellow-700 hover:bg-white mx-auto" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}

export default WorkInProgress;