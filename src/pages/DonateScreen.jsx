// src/components/DonateScreen.js

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';

const DonateScreen = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen bg-gray-100">
                <div className="pt-36 flex-col items-center justify-center bg-gray-100">
                    <div className="w-full px-4">
                        <h1 className="text-3xl font-bold mb-6 text-center">Donate</h1>

                        <div className="flex flex-col md:flex-row md:space-x-4">
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

                            <div className="flex-1 bg-green-100 p-4 rounded-lg">
                                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-2xl font-semibold mb-4">Donate Now</h2>
                                    <form className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
                                                Donation Amount
                                            </label>
                                            <input
                                                type="number"
                                                id="amount"
                                                name="amount"
                                                step="0.01"
                                                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }} // Disable the arrow buttons
                                            />
                                        </div>
                                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-600">
                                            Donation Purpose
                                        </label>
                                        <select
                                            id="purpose"
                                            name="purpose"
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="clothes">Clothes</option>
                                            <option value="food">Food</option>
                                            <option value="education">Education</option>
                                            {/* Add more options as needed */}
                                        </select>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                                                Message (Optional)
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows="4"
                                                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            ></textarea>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default DonateScreen;

