import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import noimage from "../assets/noimage.png";
import "./Carousel.css";
const LandLeaseDetailScreen = () => {
    const location = useLocation();
    const { data, index } = location.state;

    const navigate = useNavigate();

    const handleworkinprogress = () => {
        navigate('/workinprogress');
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-wrap">
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
                                            src={`https://agromart-dev.onrender.com/${imageUrl}`}
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
                                    style={{ width: '500px', height: '250px' }} // Set the desired height here
                                />
                            )}
                        </Carousel>
                        <div className="grid mb-4 grid-cols-6 mt-6 gap-3 lg:ml-4 mx-auto">
                            {data.landImage && data.landImage.length > 0 ? (
                                data.landImage.map((imageUrl, imgIndex) => (
                                    <div key={imgIndex} className="gallery-item">
                                        <img
                                            src={`https://agromart-dev.onrender.com/${imageUrl}`}
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
                    <div className="bg-yellow-50 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">Leasing Land #{index + 1}</h2>
                        <p>
                            We are offering a prime land for sale, located in{' '}
                            <a className="text-yellow-700 font-bold">{data.landLocation}</a>, with an expansive area of{' '}
                            <a className="text-yellow-700 font-bold">{data.landArea}</a>. This fertile land is suitable for cultivating{' '}
                            <a className="text-yellow-700 font-bold">{data.cropType}</a> and{' '}
                            <a className="text-yellow-700 font-bold">
                                {data.landRegistered ? 'Land is Registered' : 'Land is not Registered'}
                            </a>
                            . Whether you prefer traditional or modern cultivation methods, this land provides versatility in{' '}
                            <a className="text-yellow-700 font-bold">{data.cultivationType}</a>. The land is available at a competitive price of{' '}
                            <a className="text-yellow-700 font-bold">{data.landPrice}</a>. Don't miss this opportunity to acquire a valuable piece of land for your agricultural ventures.
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
                        <div className="flex justify-end mt-4">
                            <button onClick={handleworkinprogress} className="bg-mybgcolor text-white py-2 px-4 rounded mr-2">
                                Add to Cart
                            </button>
                            <button onClick={handleworkinprogress} className="bg-mybgcolor text-white py-2 px-4 rounded">
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

export default LandLeaseDetailScreen;





// import React from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from './Footer';
// import { Carousel } from "react-responsive-carousel";
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import "./Carousel.css";

// const LandLeaseDetailScreen = () => {
//     const location = useLocation();
//     const { data, index } = location.state;


//     return (
//         <>
//             <Navbar />
//             <div className="bg-yellow-50 rounded-lg shadow-lg p-6">
//                 <div>
//                     <Carousel
//                         showThumbs={false}
//                         showStatus={false}
//                         dynamicHeight={false}
//                         autoPlay={true}
//                         infiniteLoop={true}
//                         swipeable={true}
//                         emulateTouch={true}
//                         showIndicators={false}
//                     >
//                         {data.landImage && data.landImage.length > 0 ? (
//                             data.landImage.map((imageUrl, imgIndex) => (
//                                 <div key={imgIndex} className="carousel-image">
//                                     <img
//                                         src={imageUrl}
//                                         alt={`Image ${imgIndex + 1}`}
//                                         className="max-w-full container mb-2"
//                                         style={{ width: '500px', height: '250px' }}
//                                     />
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No images available</p>
//                         )}
//                     </Carousel>
//                 </div>
//                 <h2 className="text-xl font-semibold mb-2">Leasing Land #{index + 1}</h2>
//                 <p>
//                     We are offering a prime land for sale, located in {data.landLocation}, with an expansive area of {data.landArea}.
//                     This fertile land is suitable for cultivating {data.cropType} and {data.landRegistered ? "Land is Registered" : "Land is not Registered"}.
//                     Whether you prefer traditional or modern cultivation methods, this land provides versatility in {data.cultivationType}.
//                     The land is available at a competitive price of {data.landPrice}.
//                     Don't miss this opportunity to acquire a valuable piece of land for your agricultural ventures.
//                 </p>
//                 <h3 className="text-xl mt-5 font-semibold mb-2">Additional Details:</h3>
//                 <p className="mb-2">
//                     <span className="font-bold">Land Cultivation History:</span>{' '}
//                     {Array.isArray(data.cultivationHistory) ? data.cultivationHistory.join(', ') : data.cultivationHistory}
//                 </p>
//                 <p className="mb-2">
//                     <span className="font-bold">Land Soil Type:</span> {data.soilType}
//                 </p>
//                 <p className="mb-2">
//                     <span className="font-bold">Land Water Facility:</span> {data.waterFacility}
//                 </p>
//                 <p className="mb-2">
//                     <span className="font-bold">Land Description:</span> {data.landDesc}
//                 </p>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default LandLeaseDetailScreen;