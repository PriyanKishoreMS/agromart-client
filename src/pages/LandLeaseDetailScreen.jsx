import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import noimage from "../assets/noimage.png";
import "./Carousel.css";
import { useQuery } from 'react-query';
import { getLandDetail } from '../api/usersApi';
import { useAuth } from '../hooks/useAuth';
const LandLeaseDetailScreen = () => {
    const location = useLocation();
    const { data, id, index } = location.state;


    const { userDataContent } = useAuth();

    const navigate = useNavigate();

    const handleTender = () => {
        navigate('/tender', { state: { data, index } })
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-wrap min-h-screen pt-32">
                <div className="w-full md:w-1/2 lg:w-1/4">
                    <div className="lg:mt-20">
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
                            {data.landImage && data.landImage.length > 0 ? (
                                data.landImage.map((imageUrl, imgIndex) => (
                                    <div key={imgIndex} className="carousel-image">
                                        <img
                                            // src={`https://agromart-dev.onrender.com/${imageUrl}`}
                                            src={`http://localhost:3000/${imageUrl}`}
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
                        <div className="grid mb-4 grid-cols-6 mt-6 gap-3 lg:ml-4 mx-auto">
                            {data.landImage && data.landImage.length > 0 ? (
                                data.landImage.map((imageUrl, imgIndex) => (
                                    <div key={imgIndex} className="gallery-item">
                                        <img
                                            // src={`https://agromart-dev.onrender.com/${imageUrl}`}
                                            src={`http://localhost:3000/${imageUrl}`}
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
                </div>
                <div className="w-full md:w-1/2 lg:w-3/4 lg:pl-4">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl mt-5 font-semibold mb-2">Land Owner Details:</h3>
                        <p className="mb-2">
                            <span className="font-bold">Name:</span> {data.user?.name}
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">E-Mail:</span> {data.user?.email}
                        </p>
                        <h2 className="text-xl font-semibold mb-2">Leasing Land #{index + 1}</h2>
                        <p>
                            We are offering a prime land for sale, located in{' '}
                            <a className="text-primary-700 font-bold">{data.landLocation}</a>, with an expansive area of{' '}
                            <a className="text-primary-700 font-bold">{data.landArea}</a>. This fertile land is suitable for cultivating{' '}
                            <a className="text-primary-700 font-bold">{data.cropType}</a> and{' '}
                            <a className="text-primary-700 font-bold">
                                {data.registered ? 'Land is Registered' : 'Land is not Registered'}
                            </a>
                            . Whether you prefer traditional or modern cultivation methods, this land provides versatility in{' '}
                            <a className="text-primary-700 font-bold">{data.cultivationType}</a>. The land is available at a competitive price of{' '}
                            <a className="text-primary-700 font-bold">{data.landPrice}</a>. Don't miss this opportunity to acquire a valuable piece of land for your agricultural ventures.
                        </p>
                        <h3 className="text-xl mt-5 font-semibold mb-2">Additional Details:</h3>
                        <p className="mb-2">
                            <span className="font-bold">Land Cultivation History:</span>{' '}
                            {Array.isArray(data.cultivationHistory) ? data.cultivationHistory.join(', ') : data.cultivationHistory}
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Land Soil Type:</span> {data.soilType}
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Land Water Facility:</span> {data.waterFacility}
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Land Description:</span> {data.landDesc}
                        </p>
                        {userDataContent?.userType === "user" && (
                            <div className="flex justify-end mt-4">
                                {/* <button onClick={handleworkinprogress} className="bg-primary-500 text-white py-2 px-4 rounded mr-2">
                                    Add to Wish List
                                </button> */}
                                <button onClick={handleTender} className="bg-primary-500 text-white py-2 px-4 rounded">
                                    Tender
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LandLeaseDetailScreen;