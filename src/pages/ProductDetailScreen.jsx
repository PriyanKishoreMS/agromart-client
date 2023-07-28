import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./Carousel.css";
import noimage from "../assets/noimage.png";

const ProductDetailScreen = () => {
    const location = useLocation();
    const { data, index } = location.state;

    const navigate = useNavigate();

    const handleworkinprogress = () => {
        navigate('/workinprogress');
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-wrap min-h-screen">
                <div className="w-full md:w-1/2 lg:w-1/4">
                    <div className="lg:mt-4">
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            dynamicHeight={false}
                            autoPlay={true}
                            infiniteLoop={true}
                            swipeable={true}
                            emulateTouch={true}
                            showIndicators={false}
                        >
                            {data.productImage && data.productImage.length > 0 ? (
                                data.productImage.map((imageUrl, imgIndex) => (
                                    <div key={imgIndex} className="carousel-image">
                                        <img
                                            src={`https://agromart-dev.onrender.com/${imageUrl}`}
                                            // src={`http://localhost:3000/${imageUrl}`}
                                            alt={`Image ${imgIndex + 1}`}
                                            className="max-w-full container mb-2"
                                            style={{ width: '100%', height: '250px' }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <img
                                    src={noimage}
                                    className="max-w-full container mb-2"
                                    style={{ width: '500px', height: '250px' }}
                                />
                            )}
                        </Carousel>
                    </div>
                    <div className="grid mb-4 grid-cols-6 mt-6 gap-3 lg:ml-4 mx-auto">
                        {data.productImage && data.productImage.length > 0 ? (
                            data.productImage.map((imageUrl, imgIndex) => (
                                <div key={imgIndex} className="gallery-item">
                                    <img
                                        src={`https://agromart-dev.onrender.com/${imageUrl}`}
                                        // src={`http://localhost:3000/${imageUrl}`}
                                        alt={`Image ${imgIndex + 1}`}
                                        style={{ width: '72px', height: '72x' }}
                                    />
                                </div>
                            ))
                        ) : (
                            null
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-3/4 lg:pl-4">
                    <div className="bg-yellow-50 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">Product Name: <a className='text-yellow-700 font-serif italic'>{data.productName}</a></h2>
                        <p>
                            We have a remarkable product available for sale. Our <a className='text-yellow-700 font-bold'>{data.productName}</a>, belonging to the <a className='text-yellow-700 font-bold'>{data.productCategory}</a> category, is manufactured by{' '}
                            <a className='text-yellow-700 font-bold'>{data.productManufacturer}</a> to ensure top-notch quality. This exceptional product is offered at an unbeatable price of <a className='text-yellow-700 font-bold'>{data.productPrice}</a>. We have an
                            abundant quantity available, so you can purchase as per your requirements. Don't miss out on this opportunity to acquire an outstanding product that
                            guarantees satisfaction and value for your investment.
                        </p>
                        <p className="mb-2">
                            <strong>Product Quantity:</strong> {data.productQuantity}
                        </p>
                        <p className="mb-2">
                            <strong>Product Description:</strong> {data.productDescription}
                        </p>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleworkinprogress} className="bg-mybgcolor-500 text-white py-2 px-4 rounded mr-2">
                                Add to Cart
                            </button>
                            <button onClick={handleworkinprogress} className="bg-mybgcolor-500 text-white py-2 px-4 rounded">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetailScreen;

