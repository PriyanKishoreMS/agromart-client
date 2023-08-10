import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { useAuth } from '../hooks/useAuth';
import firebase from '../components/firebaseConfig';

const Registration = () => {
    const { user } = useAuth();

    const [confirmationResult, setConfirmationResult] = useState(null);
    const recaptchaRef = useRef(null);
    const [verificationId, setVerificationId] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [formData, setFormData] = useState({
        fullName: user?.displayName !== '' ? user?.displayName : '',
        username: '',
        email: user?.email !== '' ? user?.email : '',
        password: '',
        address: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            console.log(formData, "formData");
        }
    };

    console.log('verificationId', verificationId);

    const sendOTP = async () => {
        try {
            setConfirmationResult(true);
            const phoneNumber = '+91' + formData.phoneNumber; // Replace with the user's phone number
            const appVerifier = new firebase.auth.RecaptchaVerifier(recaptchaRef.current, {
                size: 'invisible', // Set the reCAPTCHA size to invisible
            });

            await appVerifier.verify();

            const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
            setVerificationId(confirmationResult.verificationId);
        } catch (error) {
            console.log('Error sending OTP:', error);
        }
    };

    const verifyOTP = async () => {
        try {
            const code = otpCode; // Replace with the OTP code entered by the user
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
            await firebase.auth().signInWithCredential(credential);
            console.log('Phone number verified successfully!');
        } catch (error) {
            console.log('Error verifying OTP:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="max-w-md w-full p-8 bg-yellow-50 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-yellow-700">Register</h2>
                    <form onSubmit={handleSubmit}>
                        {/* {verificationCompleted && <p>OTP verification successful. Proceed with registration.</p>} */}

                        {/* Show error message if OTP verification failed */}
                        {/* {verificationError && <p>{verificationError}</p>} */}
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-yellow-700"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-yellow-700"
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-yellow-700"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-yellow-700"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-yellow-700"
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-yellow-700"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                        </div>
                        {/* Send OTP button */}
                        <div className="mb-4">
                            <div ref={recaptchaRef}></div>
                            <button
                                onClick={sendOTP}
                                className="bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-700"
                            >
                                Send OTP
                            </button>
                        </div>

                        {/* OTP verification */}
                        {confirmationResult && (
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value)}
                                    placeholder="Enter OTP"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-yellow-700"
                                />
                                <button
                                    onClick={verifyOTP}
                                    className="bg-primary-500 mt-2 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-700"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-700"
                        >
                            Register
                        </button>

                        {/* {verificationSent && <p>Verification email sent. Please check your inbox.</p>} */}
                    </form>
                </div >
            </div >
            <Footer />
        </>
    );
};

export default Registration;