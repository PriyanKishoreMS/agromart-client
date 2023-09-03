import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../components/loading.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import { DeleteProductData, getProduct } from '../api/usersApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import noimage from "../assets/noimage.png";
import { useAuth } from '../hooks/useAuth';
import Confirmation from '../components/Confirmation';



const SellProductDashboard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const limit = 10;


  const { isError, isLoading, isSuccess, data, error } = useQuery(
    ["products", searchQuery, page],
    () => getProduct(searchQuery, page, limit)
  );

  const { userDataContent } = useAuth();

  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation(DeleteProductData, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const navigate = useNavigate();


  const handleProduct = () => {
    navigate("/sellproductservice");
  }

  const handleDetailClick = (data, index) => {
    navigate(`/productdetail/${index + 1}`, { state: { data, index } });
  };

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
      await deleteProductMutation.mutateAsync(selectedItemId);
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
      <div className="flex items-center mt-4 mb-8">
        {userDataContent?.userType === 'user' && (
          <button
            onClick={handleProduct}
            className="bg-primary-500 text-white py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Product
          </button>
        )}
        <div className="w-72 ml-4">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full rounded-lg border border-gray-400 focus:outline-none focus:border-primary-700"
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
          <span className="loading-text">Loading...</span>
        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data?.products?.length === 0 || !Array.isArray(data?.products)) ? (
            <div className="col-span-full flex justify-center items-center h-48 bg-slate-100 rounded-lg shadow-md mx-2">
              <p className="text-gray-500">No Products Available</p>
            </div>
          ) : (data?.products.map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md mx-2">
              <div className="relative">
                <Carousel
                  showThumbs={true}
                  showStatus={false}
                  dynamicHeight={false}
                  autoPlay={true}
                  infiniteLoop={true}
                  swipeable={true}
                  emulateTouch={true}
                  showIndicators={true}
                  showArrows={false}
                >
                  {item?.productImage && item?.productImage.length > 0 ? (
                    item.productImage.map((imageUrl, imgIndex) => (
                      <div key={imgIndex} className="carousel-image">
                        <img
                          // src={`http://localhost:3000/${imageUrl}`}
                          src={`https://agromart-dev.onrender.com/${imageUrl}`}
                          alt={`Image ${imgIndex + 1}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ))
                  ) : (
                    <img
                      src={noimage}
                      className="w-full h-auto"
                    />
                  )}
                </Carousel>

                {userDataContent?.userType === "admin" && (
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="bg-red-500 text-white rounded-lg absolute top-2 right-2 p-2 hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-lg mb-2">{item.productName}</p>
                {/* <p className="text-gray-600 mb-2">{item.productPrice}</p> */}
                <p className="font-semibold text-lg mb-2">{item.user?.name}</p>
                <div className="flex justify-between items-center">
                  <p className="text-primary-500 font-semibold">{item.productPrice}</p>
                  <button
                    onClick={() => handleDetailClick(item, index, item._id)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave()}
                    className="text-primary-500 hover:text-primary-700 font-semibold cursor-pointer"
                  >
                    {hoveredIndex === index ? 'View' : 'Details'}
                  </button>
                </div>
              </div>
            </div>
          ))
          )}
        </div >
      )}
      <div className="pagination-container flex justify-center items-center mt-4 mb-4">
        <button
          onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="bg-primary-500 text-white px-4 py-2 rounded-l hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="px-4">{page}</span>
        <button
          onClick={() => setPage(prevPage => prevPage + 1)}
          disabled={!data?.landService || data?.landService.length === 0 || data?.landService.length < limit}
          className="bg-primary-500 text-white px-4 py-2 rounded-r hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {isConfirmationVisible && (
        <Confirmation
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this item?"
        />
      )}
    </>
  );
};

export default SellProductDashboard;
