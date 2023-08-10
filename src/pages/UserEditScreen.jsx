import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUsers, updateUser } from '../api/usersApi';
// import { useQuery } from 'react-query';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

const UserEditScreen = () => {
    const location = useLocation();
    const data = location.state?.data;

	const navigate = useNavigate();
    
	const { mutate } = useMutation(updateUser);
	const queryClient = useQueryClient();


    console.log(data, "eeeeeeeee");

    const [formData, setFormData] = useState({
        name: data?.name,
        userType: data?.userType,
    });

    // Fetch user data when the component mounts
    // useEffect(() => {
    //     fetchUserData();
    // }, []);

    // const fetchUserData = async () => {
    //     try {
    //         const response = await axios.get('/api/getCurrentUser'); // Replace with your API endpoint to fetch the current user data
    //         const user = response.data;
    //         setFormData({
    //             name: user.name,
    //             mobile: user.mobile,
    //             photo: null,
    //             userType: user.userType,
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            photo: file,
        }));
    };

    const handleUpdateUser = async () => {
        try {
            // Send updated user data to the backend
            await updateUser(data._id, formData);
            mutate(formData, {
                onSuccess: () => {
                    queryClient.invalidateQueries("users");
                },
            });
            console.log(formData, "formData");
            alert('User updated successfully');
        } catch (err) {
            console.error(err);
            alert('Error updating user');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto pt-36 px-4 flex flex-col min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Edit User</h1>
                <form>
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
                            onClick={() => {handleUpdateUser(), navigate(-1)}}
                            className="bg-primary-500 text-white py-2 px-4 rounded-lg"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default UserEditScreen;