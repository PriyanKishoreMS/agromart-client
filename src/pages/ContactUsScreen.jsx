import React from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { Alert } from "@material-tailwind/react";

const ContactUs = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        <Alert color="green">Details saved successfully.</Alert>
        // alert('Details saved successfully');
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row min-h-screen pt-36">
                <div className="bg-gray-100 py-12 px-4 md:w-1/3">
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                        <p className="text-gray-600 mb-4">
                            Feel free to reach out to us with any questions or inquiries. Our team is here to help you!
                        </p>
                        <div className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                            <p className="text-gray-600">Padur, Chennai</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                                />
                            </svg>
                            {/* <a href="info@sustainableworldpeacetrust.org" className="text-primary-500 hover:underline">
                            info@sustainableworldpeacetrust.org
                            </a> */}
                            <p className="text-gray-600">info@sustainableworldpeacetrust.org</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <p className="text-gray-600">+1 (123) 456-7890</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 py-12 px-4 md:w-2/3">
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
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
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                ></textarea>
                            </div>
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                                    onClick={handleSubmit}
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
