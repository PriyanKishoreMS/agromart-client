import React, { useEffect, useState } from 'react';
// import fetchfirebase from '../components/fetchfirebase';
// import Footer from './Footer';
// import Navbar from '../components/Navbar';
import "../components/loading.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
// import bgprof from "../assets/bgprof.png"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "react-query";
import { getFilteredLandServices } from "../api/usersApi";
import noimage from "../assets/noimage.png";

const Dashboard = () => {
  // const [formData, setFormData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [page, setPage] = useState(1);

  const { isError, isLoading, isSuccess, data, error, totalPages } = useQuery(
    ["lands", searchQuery, page],
    () => getFilteredLandServices(searchQuery, page)
  );

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  console.log("totalllllll", data , page);

  // Handle the next page
  const handleNextPage = () => {
    if (page < data?.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // setIsLoading(true);
  //     const formDataRef = fetchfirebase.database().ref('landLease');

  //     try {
  //       const snapshot = await formDataRef.once('value');
  //       const formDataList = [];

  //       snapshot.forEach((childSnapshot) => {
  //         const data = childSnapshot.val();
  //         formDataList.push(data);
  //       });

  //       setFormData(formDataList);
  //     } catch (error) {
  //       console.error('Error fetching data from Firebase:', error);
  //     }
  //     // setIsLoading(false);
  //   };

  //   fetchData();
  // }, []);

  // console.log("formData", formData.length);



  const handlelandlease = () => {
    navigate("/landsellingservice");
  }

  // const handleDetailView = () => {
  //   navigate("/dashboard");
  // }

  const handleDetailClick = (data, index) => {
    navigate(`/landleasedetail/${index + 1}`, { state: { data, index } });
  };


  if (isLoading) {
    return (<div className="loading-container">
    <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
    <span className="loading-text">Loading...</span>
    </div>)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mr-5">
        <button onClick={handlelandlease} className="bg-primary-500 text-white py-2 px-4 rounded lg:self-end mt-4 md:mt-0">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Tender
        </button>
        <input
          type="text"
          placeholder="Search by location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="lg:mt-4 md:mt-0 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-yellow-700"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data && data.landService.map((item, index) => (

          <div key={index} className="pr-4 mb-20">
            <div className="mt-4">
              <div className="">
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
                  {item.landImage && item.landImage.length > 0 ? (
                    item.landImage.map((imageUrl, imgIndex) => (
                      <>
                        <div key={imgIndex} className="carousel-image">
                          <img
                            src={`https://agromart-dev.onrender.com/${imageUrl}`}
                            // src={`http://localhost:3000/${imageUrl}`}
                            alt={`Image ${imgIndex + 1}`}
                            className="max-w-full container mb-2"
                            style={{ width: '500px', height: '250px' }}
                          />
                        </div>
                        {/* {console.log(imageUrl, "Hello")} */}
                      </>
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
            </div>
            <div
              className="bg-primary-500 rounded-3xl items-center justify-center  text-center border border-primary-500 pl-2 text-white w-full h-12"
              onClick={() => handleDetailClick(item, index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave()}
            >
              {hoveredIndex === index ? (
                <p className="">View</p>
              ) : (
                <div>
                  <p className=''>Available {item.landArea} in {item.landLocation}</p>
                  <p className=''><span className="font-bold">Tender pricing:</span> {item.landPrice}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === data?.totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div> */}
    </>
  );
};

export default Dashboard;

{/* <div className="bg-yellow-50 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Leasing Land #{index + 1}</h2>
                <p>We are offering a prime land for sale, located in {data.landLocation}, with an expansive area of {data.landArea}.
                  This fertile land is suitable for cultivating {data.cropType} and {data.landRegistered ? "Land is Registered" : "Land is not Registered"}.
                  Whether you prefer traditional or modern cultivation methods, this land provides versatility in {data.cultivationType}.
                  The land is available at a competitive price of {data.landPrice}.
                  Don't miss this opportunity to acquire a valuable piece of land for your agricultural ventures.</p>
                <h3 className="text-xl mt-5 font-semibold mb-2">Additional Details:</h3>
                <p className="mb-2"><span className="font-bold">Land Cultivation History:</span>  {Array.isArray(data.cultivationHistory)
                  ? data.cultivationHistory.join(", ")
                  : data.cultivationHistory}</p>
                <p className="mb-2"><span className="font-bold">Land Soil Type:</span> {data.soilType}</p>
                <p className="mb-2"><span className="font-bold">Land Water Facility:</span> {data.waterFacility}</p>
                <p className="mb-2"><span className="font-bold">Land Description:</span> {data.landDesc}</p>
              </div> */}
{/* </div >
            </div >
          ))} */}