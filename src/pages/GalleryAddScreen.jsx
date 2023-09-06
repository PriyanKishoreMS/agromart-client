import React, { useState } from 'react';
import Footer from './Footer';
import Navbar from '../components/Navbar';
import { useMutation, useQueryClient } from 'react-query';
import { addImageToGallery } from '../api/usersApi';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

const GalleryAddScreen = () => {
    // const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({
        image: "",
        content: "",
    });
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);


    const navigate = useNavigate();

    // const handleTitleChange = (event) => {
    //     setTitle(event.target.value);
    // };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const queryClient = useQueryClient();

    // React Query mutation for adding image to the gallery
    const addImageMutation = useMutation((formData) => addImageToGallery(formData), {
        onSuccess: () => {
            setShowAlert(true);
            // Invalidate and refetch the gallery data after successful submission
            queryClient.invalidateQueries('gallery');
        },
    });

    const validateForm = () => {
        const newErrors = {
            image: "",
            content: "",
        };

        if (image === null) {
            newErrors.image = "Select An Image.";
        }

        if (!content) {
            newErrors.content = "Description is required.";
        }

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        const newErrors = validateForm();

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => !!error);

        const galleryData = {
            galleryImage: image,
            content: content
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('content', content);

        if(!hasErrors) {
        addImageMutation.mutate(galleryData);
        }
    };

    const handleAlertClose = () => {
        setShowAlert(false);
        navigate(-1);
    };

    return (
        <>
            <Navbar />
            <div className="container pt-36 pb-4 mx-auto min-h-screen">
                <h1 className="text-2xl font-semibold mb-4">Add Image to Gallery</h1>
                <form action="http://localhost:3000/uploads/gallery" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                {/* <form action="https://agromart-dev.onrender.com/uploads/gallery" method="post" encType="multipart/form-data" onSubmit={handleSubmit}> */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name='image'
                            onChange={handleImageChange}
                            className="mt-1"
                            accept="image/*"
                        />
                        {errors.image && <p className="text-red-500">{errors.image}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={handleContentChange}
                            className="mt-1 p-2 border rounded w-full"
                            rows="4"
                        // required
                        ></textarea>
                        {errors.content && <p className="text-red-500">{errors.content}</p>}
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 focus:ring-primary-500 bg-primary-500 text-white rounded hover:bg-primary-600"
                    >
                        Add to Gallery
                    </button>
                </form>
            </div>
            {showAlert && (
                <Alert
                    message="Image added successfully!"
                    type="success"
                    onClose={handleAlertClose}
                />
            )}
            <Footer />
        </>
    );
};

export default GalleryAddScreen;