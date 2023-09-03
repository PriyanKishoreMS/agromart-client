import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUsers, updateUser } from '../api/usersApi';
// import { useQuery } from 'react-query';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import Alert from '../components/Alert';

const UserEditScreen = () => {
    const location = useLocation();
    const data = location.state?.data;


    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: data?.name,
        userType: data?.userType,
    });

    const updateUserMutation = useMutation(updateUser, {
        onSuccess: () => {
            setShowAlert(true);
            queryClient.invalidateQueries('users');
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                name: formData.name,
                userType: formData.userType,
            };

            updateUserMutation.mutate({ userId: data?._id, formData: updatedUser });

        } catch (err) {
            console.error(err);
            alert('Error updating user');
        }
    };


    const handleClose = () => {
        setShowAlert(false);
        navigate(-1);
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto pt-36 px-4 flex flex-col min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Edit User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="py-2 px-4 border rounded-lg"
                            placeholder="Name"
                        />
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleInputChange}
                            className="py-2 px-4 border rounded-lg"
                        >
                            <option value="">Select User Type</option>
                            <option value="admin">Admin</option>
                            {/* <option value="seller">Seller</option> */}
                            <option value="user">User</option>
                        </select>
                        <button
                            type="submit"
                            disabled={updateUserMutation.isLoading}
                            className="bg-primary-500 text-white py-2 px-4 rounded-lg"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
            {showAlert && (
                <Alert
                    message={'User updated successfully'}
                    type={'success'}
                    onClose={handleClose}
                />
            )}
        </>
    );
};

export default UserEditScreen;