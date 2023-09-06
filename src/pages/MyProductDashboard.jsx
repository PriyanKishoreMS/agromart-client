import React, { useEffect, useState } from 'react';
import "../components/loading.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";
import { useNavigate } from 'react-router-dom';
import { useQuery } from "react-query";
import { getMyProductServices } from "../api/usersApi";
import noimage from "../assets/noimage.png";
import { useAuth } from '../hooks/useAuth';

const MyProductDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [page, setPage] = useState(1);

    const limit = 10;

    const { userDataContent } = useAuth();

    const { isError, isLoading, isSuccess, data, error, totalPages } = useQuery(
        ["products", userDataContent._id, page],
        () => getMyProductServices(userDataContent._id, page, limit)
    );

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(-1);
    };

    const navigate = useNavigate();


    const handleDetailClick = (data, index) => {
        navigate(`/productdetail/${index + 1}`, { state: { data, index } });
    };

    return (
        <>
            {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mr-5">
                <input
                    type="text"
                    placeholder="Search by location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="lg:mt-4 md:mt-0 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-yellow-700"
                />
            </div> */}

            {isLoading ? (
                <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
                    <span className="loading-text">Loading...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
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
                                                    src={`http://localhost:3000/${imageUrl}`}
                                                    // src={`https://agromart-dev.onrender.com/${imageUrl}`}
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
                            </div>
                            <div className="p-4">
                                <p className="font-semibold text-lg mb-2">{item.productName}</p>
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
                    disabled={!data?.lands || data?.lands.length === 0 || data?.lands.length < limit}
                    className="bg-primary-500 text-white px-4 py-2 rounded-r hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default MyProductDashboard;