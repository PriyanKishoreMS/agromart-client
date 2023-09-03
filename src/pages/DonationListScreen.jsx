import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { getDonationList } from '../api/usersApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../components/loading.css'


const DonationListScreen = () => {

    const { isError, isLoading, isSuccess, data, error } = useQuery(
        ["donate"],
        () => getDonationList()
    );

    return (
        <>

            {isLoading ? (
                <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
                    <span className="loading-text">Loading...</span>
                </div>
            ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                    {data?.donations?.map((donation) => (
                        <div key={donation._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{donation.name}</h2>
                            <p className="text-primary-600">
                                <strong>Email:</strong> {donation.email}
                            </p>
                            <p className="text-primary-600">
                                <strong>Donation Amount:</strong> ${donation.donation}
                            </p>
                            <p className="text-primary-600">
                                <strong>Purpose:</strong> {donation.purpose}
                            </p>
                            <p className="text-primary-600">
                                <strong>Transaction Mode:</strong> {donation.transactionMode}
                            </p>
                            <p className="text-primary-600">
                                <strong>Transaction ID:</strong> {donation.transactionId}
                            </p>
                            {donation.message && (
                                <p className="text-primary-600">
                                    <strong>Message:</strong> {donation.message}
                                </p>
                            )}
                        </div>
                    ))}
                </div >
            )}
        </>
    );
};

export default DonationListScreen;