import React, { useState } from 'react';
// import agribg2 from '../assets/bg/Agribg.jpeg';
// import agribg3 from '../assets/bg/Agribg3.jpg';
// import agribg4 from '../assets/bg/Agribg4.jpg';
// import agribg5 from '../assets/bg/Agribg5.jpg';

import Navbar from '../components/Navbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteGalleryImage, getGalleryList } from '../api/usersApi';
import Confirmation from '../components/Confirmation';

const GalleryScreen = () => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const { isError, isLoading, isSuccess, data: galleryImages, error } = useQuery(
    ["gallery"],
    () => getGalleryList()
  );

  const queryClient = useQueryClient();

  const deleteGalleryMutation = useMutation(deleteGalleryImage, {
    onSuccess: () => {
      queryClient.invalidateQueries('gallery');
    },
  });

  const reversedImages = galleryImages ? [...galleryImages].reverse() : [];


  // console.log(galleryImages, 'galleryImages');

  const navigate = useNavigate();

  const { userDataContent } = useAuth();
  const handleAddImage = () => {
    navigate('/addGalleryImage')
  }

  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    showConfirmation();
  };

  const showConfirmation = () => {
    setIsConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setIsConfirmationVisible(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedItemId) {
      await deleteGalleryMutation.mutateAsync(selectedItemId);
      hideConfirmation();
      setSelectedItemId(null);
    }
  };

  const handleCancelDelete = () => {
    setSelectedItemId(null);
    hideConfirmation();
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 pt-36 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Gallery</h1>
          {userDataContent?.userType === 'admin' && (
            <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mr-5">
              <button onClick={handleAddImage} className="bg-primary-500 text-white py-2 px-4 rounded lg:self-end mt-4 md:mt-0">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Image
              </button>
            </div>)}
          {reversedImages?.map((item, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
            >
              <div className="md:w-1/2 md:p-4 mt-4">
                <div className="text-2xl text-primary-700 border shadow-2xl p-2 bg-green-100 text-center">
                  {item.content}
                </div>
              </div>
              <div className="md:w-1/2 md:p-4">
                <div className="relative">
                  <img
                    src={`https://agromart-dev.onrender.com/${item.image}`}
                    // src={`http://localhost:3000/${item.image}`}
                    alt={item._id}
                    className="w-full h-auto object-cover rounded-lg shadow-2xl z-10"
                  />
                  {userDataContent?.userType === 'admin' && (
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="absolute top-2 right-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isConfirmationVisible && (
        <Confirmation
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this item?"
        />
      )}
      <Footer />
    </>
  );
};

export default GalleryScreen;