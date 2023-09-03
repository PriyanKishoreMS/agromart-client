import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Footer from './Footer'; // You need to implement this API function
import { postBlog } from '../api/usersApi';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

const BlogAddScreen = () => {
    const [errors, setErrors] = useState({
        title: "",
        content: "",
    });
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const addBlogMutation = useMutation(postBlog, {
        onSuccess: () => {
            console.log('Setting showAlert to true');
            setShowAlert(true);
            queryClient.invalidateQueries('blog');
        },
    });

    const validateForm = () => {
        const newErrors = {
            title: "",
            content: "",
        };

        if (!title) {
            newErrors.title = "Title is required.";
        }

        if (!content) {
            newErrors.content = "Content is required.";
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
                addBlogMutation.mutate({ title, content });
                navigate(-1);
                setTitle('');
                setContent('');
            }
        } catch (error) {
            console.error('Error adding blog:', error);
        }
    };


    const handleAlertClose = () => {
        console.log('Closing alert');
        setShowAlert(false);
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-2/3 lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Add Blog</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`border ${errors.title ? 'border-red-500' : 'border-gray-300'} mt-1 p-2 w-full border rounded focus:outline-none focus:border-primary-500`}
                            />
                            {errors.title && <p className="text-red-500">{errors.title}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                Content
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className={`border ${errors.content ? 'border-red-500' : 'border-gray-300'} mt-1 p-2 w-full border rounded focus:outline-none focus:border-primary-500`}
                                rows={5}
                            ></textarea>
                            {errors.content && <p className="text-red-500">{errors.content}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={addBlogMutation.isLoading}
                            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                        >
                            {addBlogMutation.isLoading ? "Adding..." : "Add Blog"}
                        </button>
                    </form>
                </div>
            </div>
            {showAlert && (
                <Alert
                    message="Blog submitted successfully!"
                    type="success"
                    onClose={handleAlertClose}
                />
            )}
            <Footer />
        </>

    );
};

export default BlogAddScreen;