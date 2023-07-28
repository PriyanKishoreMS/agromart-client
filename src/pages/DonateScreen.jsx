// src/components/DonateScreen.js

import React from 'react';

const DonateScreen = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-3xl px-4">
                <h1 className="text-3xl font-bold mb-6">Donate Now</h1>

                <div className="flex flex-col md:flex-row md:space-x-4">

                    {/* Card-like view for Local Users */}
                    <div className="flex-1 bg-blue-100 p-4 rounded-lg mb-4 md:mb-0">
                        <h2 className="text-xl font-semibold mb-2">Local Users</h2>
                        <div className="mb-2">
                            <span className="font-semibold">Name of the Bank:</span> Bank Name for Local Users
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Branch:</span> Branch for Local Users
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Name of account holder:</span> Account Holder Name for Local Users
                        </div>
                        {/* Add the rest of the fields here for Local Users */}
                    </div>

                    {/* Card-like view for NRI Users */}
                    <div className="flex-1 bg-green-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">NRI Users</h2>
                        <div className="mb-2">
                            <span className="font-semibold">Name of the Bank:</span> Bank Name for NRI Users
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Branch:</span> Branch for NRI Users
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Name of account holder:</span> Account Holder Name for NRI Users
                        </div>
                        {/* Add the rest of the fields here for NRI Users */}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DonateScreen;

