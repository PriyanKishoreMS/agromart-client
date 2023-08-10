import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth";
import Footer from "../Footer";
// import bgprof from "../assets/bgprof.png"
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import "../Carousel.css";
import Dashboard from "../LandLeaseDashboard";
import { useState } from "react";
import SellProductDashboard from "../SellProductsDashboard";
// import Lands from "./Lands";


const AdminProfile = () => {
	const [showPopupProduct, setShowPopupProduct] = useState(false);
	const [showPopupLandLease, setshowPopupLandLease] = useState(false);

	const { user } = useAuth();

	const navigate = useNavigate();

	const handleworkinprogress = () => {
		navigate('/workinprogress');
	};

	const togglePopupProduct = () => {
		setshowPopupLandLease(false);
		setShowPopupProduct(!showPopupProduct);
	};

	const togglePopupLandLease = () => {
		setShowPopupProduct(false);
		setshowPopupLandLease(!showPopupLandLease);
	};

	return (
		<>
			<div className="bg-fixed bg-white bg-no-repeat bg-cover flex flex-col min-h-screen"
			//  style={{ backgroundImage: `url(${bgprof})` }}
			>
				<Navbar />
				<div className="lg:mx-4 pt-36 bg-transparent -mt-4 rounded-lg shadow-lg">
					<div className="px-0 py-1.5 flex items-center gap-10">
						<div className="lg:flex">
							<img src={user?.photoURL} alt="Profile Logo" className="w-12 h-12 sm:mb-4 lg:-mb-1 rounded-full mx-auto" />
							<h2 className="lg:text-xl my-auto sm:text-xs font-semibold font-serif italic text-center ml-4 text-primary-700">{user?.displayName}</h2>
						</div>
						<div className="text-white lg:flex lg:w-auto hidden">
							<button onClick={togglePopupLandLease} className="bg-primary-500 rounded font-bold border border-primary-500 font-serif italic mr-4 px-4 py-2.5">
								Tenders
							</button>
							<button onClick={togglePopupProduct} className="bg-primary-500 rounded font-bold border border-primary-500 font-serif italic mr-4 px-4 py-2.5">
								Products
							</button>
						</div>
					</div>
				</div>
				<div className="flex flex-col lg:flex-row lg:mb-20">
					{/* <div className="py-8 lg:w-1/4">
						<div className="justify-start lg:ml-5 mt-4 max-w-xs">
							<div
								onClick={togglePopupLandLease}
								className="flex flex-col justify-center items-center bg-primary-500 text-white p-4 rounded-lg cursor-pointer hover:bg-opacity-80 mr-2 mb-2 relative"
							>
								<h4 className="text-lg font-semibold">Tenders</h4>
							</div>

							<div
								onClick={togglePopupProduct}
								className="flex flex-col justify-center items-center bg-primary-500 text-white p-4 rounded-lg cursor-pointer hover:bg-opacity-80 mr-2 mb-2 relative"
							>
								<h4 className="text-lg font-semibold">Buy Products</h4>
							</div>
						</div>
					</div> */}
					<div className="">
						{showPopupProduct && <SellProductDashboard />}
						{showPopupLandLease && <Dashboard />}
					</div>
				</div>
				<Footer />
			</div>

		</>
	);
};

export default AdminProfile;









// import React, { useState } from 'react';
// import Carousel from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// // import noimage from '../../assets/noimage.png'; // Replace with your no image placeholder
// import Navbar from '../../components/Navbar';
// import Footer from '../Footer';
// import { getFilteredLandServices, getProduct } from '../../api/usersApi';
// import { useQuery } from 'react-query';

// const AdminProfile = () => {
//     const [hoveredIndex, setHoveredIndex] = useState(null);

//     const { isError: landServiceIsError, isLoading: landServiceIsLoading, isSuccess: landServiceIsSuccess, data: landServiceData, error: landServiceError, totalPages: landServiceTotalPages } = useQuery(
//         ["lands"],
//         () => getFilteredLandServices(null, null)
//     );

//     const { isError: productIsError, isLoading: productIsLoading, isSuccess: productIsSuccess, data: productData, error: productError } = useQuery(
//         ["products"],
//         getProduct
//     );

//     console.log(landServiceData, productData, 'datttttttt');


//     const handleMouseEnter = (index) => {
//         setHoveredIndex(index);
//     };

//     const handleMouseLeave = () => {
//         setHoveredIndex(null);
//     };

//     const handleDetailClick = (item, index) => {
//         // Handle detail click action
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="flex flex-col min-h-screen bg-gray-100 p-6">
//                 <h1 className="text-4xl font-bold text-center mb-12 text-primary-700">
//                     Admin Profile
//                 </h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {/* {landServiceData && landServiceData.landService.map((item, index) => (
//                         <div key={index} className="pr-4 mb-8">
//                             <div className="mt-4">
//                                 <Carousel
//                                     showThumbs={false}
//                                     showStatus={false}
//                                     dynamicHeight={false}
//                                     autoPlay={true}
//                                     infiniteLoop={true}
//                                     swipeable={true}
//                                     emulateTouch={true}
//                                     showIndicators={false}
//                                 >
//                                     {item.landImage && item.landImage.length > 0 ? (
//                                         item.landImage.map((imageUrl, imgIndex) => (
//                                             <div key={imgIndex} className="carousel-image">
//                                                 <img
//                                                     src={`https://agromart-dev.onrender.com/${imageUrl}`}
//                                                     alt={`Image ${imgIndex + 1}`}
//                                                     className="max-w-full container mb-2"
//                                                     style={{ width: '500px', height: '250px' }}
//                                                 />
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <img
//                                             src={noimage}
//                                             className="max-w-full container mb-2"
//                                             style={{ width: '500px', height: '250px' }}
//                                             alt="No Image"
//                                         />
//                                     )}
//                                 </Carousel>
//                             </div>
//                             <div
//                                 className={`bg-primary-500 rounded-3xl items-center justify-center text-center border border-primary-500 pl-2 text-white w-full h-12 ${hoveredIndex === index ? 'cursor-pointer' : ''}`}
//                                 onClick={() => handleDetailClick(item, index)}
//                                 onMouseEnter={() => handleMouseEnter(index)}
//                                 onMouseLeave={handleMouseLeave}
//                             >
//                                 {hoveredIndex === index ? (
//                                     <p className="">View</p>
//                                 ) : (
//                                     <div className="">
//                                         <p className="">Available {item.landArea} in {item.landLocation}</p>
//                                         <p className=""><span className="font-bold">Tender pricing:</span> {item.landPrice}</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}

//                     {productData && productData.products.map((item, index) => (
//                         <div key={index} className="pr-4 mb-8">
//                             <div className="mt-4">
//                                 <Carousel
//                                     showThumbs={false}
//                                     showStatus={false}
//                                     dynamicHeight={false}
//                                     autoPlay={true}
//                                     infiniteLoop={true}
//                                     swipeable={true}
//                                     emulateTouch={true}
//                                     showIndicators={false}
//                                 >
//                                     {item.productImage && item.productImage.length > 0 ? (
//                                         item.productImage.map((imageUrl, imgIndex) => (
//                                             <div key={imgIndex} className="carousel-image">
//                                                 <img
//                                                     src={`https://agromart-dev.onrender.com/${imageUrl}`}
//                                                     alt={`Image ${imgIndex + 1}`}
//                                                     className="max-w-full container mb-2"
//                                                     style={{ width: '500px', height: '250px' }} // Set the desired height here
//                                                 />
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <img
//                                             src={noimage}
//                                             className="max-w-full container mb-2"
//                                             style={{ width: '500px', height: '250px' }}
//                                             alt="No Image"
//                                         />
//                                     )}
//                                 </Carousel>
//                             </div>
//                             <div
//                                 className={`bg-primary-500 rounded-3xl items-center justify-center text-center border border-primary-500 pl-2 text-white w-full h-12 ${hoveredIndex === index ? 'cursor-pointer' : ''}`}
//                                 onClick={() => handleDetailClick(item, index)}
//                                 onMouseEnter={() => handleMouseEnter(index)}
//                                 onMouseLeave={handleMouseLeave}
//                             >
//                                 {hoveredIndex === index ? (
//                                     <p className="">View</p>
//                                 ) : (
//                                     <div className="">
//                                         <p className="">Available {item.productName}</p>
//                                         <p className=""><span className="font-bold">Price:</span> {item.productPrice}</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))} */}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default AdminProfile;
