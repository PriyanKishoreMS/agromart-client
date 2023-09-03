import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { postDonation } from '../api/usersApi';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  } from '@fortawesome/free-brands-svg-icons';

const DonateScreen = () => {


    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const addDonateMutation = useMutation(postDonation, {
        onSuccess: () => {
            queryClient.invalidateQueries('donate');
            navigate(-1);
        },
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        donate_amount: "",
        donate_purpose: "",
        transaction_mode: "",
        transaction_id: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        const fieldValue = value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: fieldValue
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate each field here
        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
        }
        if (formData.email.trim() === '' || !isValidEmail(formData.email)) {
            newErrors.email = 'Valid email is required';
        }
        if (formData.donate_amount.trim() === '' || isNaN(formData.donate_amount)) {
            newErrors.donate_amount = 'Valid donation amount is required';
        }
        if (formData.donate_purpose.trim() === '') {
            newErrors.donate_purpose = 'Donation purpose is required';
        }
        if (formData.transaction_mode.trim() === '') {
            newErrors.transaction_mode = 'Transaction mode is required';
        }
        if (formData.transaction_id.trim() === '') {
            newErrors.transaction_id = 'Transaction ID is required';
        }

        return newErrors;
    };

    const handleSubmit = async e => {
        try {
            e.preventDefault();

            const newErrors = validateForm();


            setErrors(newErrors);

            const hasErrors = Object.values(newErrors).some((error) => !!error);
            if (!hasErrors) {
                addDonateMutation.mutate(formData);
                setFormData(null);
            }
        } catch (error) {
            console.error('Error adding Donate:', error);
        }
    };

    const isValidEmail = (email) => {
        // Basic email validation regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

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
                                    <form className="space-y-4" onSubmit={handleSubmit} >
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                onChange={handleChange}
                                                value={formData.name}
                                                className={`mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                            />
                                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                onChange={handleChange}
                                                value={formData.email}
                                                className={`mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                            />
                                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
                                                Donation Amount
                                            </label>
                                            <input
                                                type="number"
                                                id="donate_amount"
                                                name="donate_amount"
                                                onChange={handleChange}
                                                value={formData.donate_amount}
                                                step="0.01"
                                                className={`mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm ${errors.donate_amount ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }} // Disable the arrow buttons
                                            />
                                            {errors.donate_amount && <p className="text-red-500">{errors.donate_amount}</p>}
                                        </div>
                                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-600">
                                            Donation Purpose
                                        </label>
                                        <select
                                            id="donate_purpose"
                                            name="donate_purpose"
                                            onChange={handleChange}
                                            value={formData.donate_purpose}
                                            className={`mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm ${errors.donate_purpose ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        >
                                            <option value={""}>select</option>
                                            <option value="clothes">Clothes</option>
                                            <option value="food">Food</option>
                                            <option value="education">Education</option>
                                            {/* Add more options as needed */}
                                        </select>
                                        {errors.donate_purpose && <p className="text-red-500">{errors.donate_purpose}</p>}
                                        <div>
                                            <label htmlFor="mode" className="block text-sm font-medium text-gray-600">
                                                Mode of Transaction
                                            </label>
                                            <select
                                                id="transaction_mode"
                                                name="transaction_mode"
                                                onChange={handleChange}
                                                value={formData.transaction_mode}
                                                className={`mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm ${errors.transaction_mode ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                            >
                                                <option value={""}>select</option>
                                                <option value="credit_card">Credit Card</option>
                                                <option value="debit_card">Debit Card</option>
                                                <option value="bank_transfer">Bank Transfer</option>
                                                {/* Add more options as needed */}
                                            </select>
                                            {errors.transaction_mode && <p className="text-red-500">{errors.transaction_mode}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="transaction_id" className="block text-sm font-medium text-gray-600">
                                                Transaction ID
                                            </label>
                                            <input
                                                type="text"
                                                id="transaction_id"
                                                name="transaction_id"
                                                onChange={handleChange}
                                                value={formData.transaction_id}
                                                className={`mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm ${errors.transaction_id ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                            />
                                            {errors.transaction_id && <p className="text-red-500">{errors.transaction_id}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                                                Message (Optional)
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows="4"
                                                onChange={handleChange}
                                                value={formData.message}
                                                className={`mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
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

