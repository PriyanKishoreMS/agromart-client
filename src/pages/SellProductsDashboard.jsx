import React, { useEffect, useState } from 'react';
// import fetchfirebase from '../components/fetchfirebase';
// import Footer from './Footer';
// import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import "../components/loading.css";
// import bgprof from "../assets/bgprof.png"
import { Carousel } from 'react-responsive-carousel';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { getProduct } from '../api/usersApi';
import { useQuery } from 'react-query';
import noimage from "../assets/noimage.png";



const SellProductDashboard = () => {
  const [formData, setFormData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);


  const { isError, isLoading, isSuccess, data, error } = useQuery(
    ["products"],
    getProduct
  );

  console.log("SEll", data);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // setIsLoading(true);
  //     const formDataRef = fetchfirebase.database().ref('sellProducts');

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

  var settings = {
    infinite: true,
    autoPlay: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleDetailClick = (data, index) => {
    navigate(`/productdetail/${index + 1}`, { state: { data, index } });
  };

  if (isLoading) {
    return <>
      <div className="loading-container">
        <div className="loading-content">
          <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
          <span>Loading...</span>
        </div>
      </div>
    </>
  }

  return (
    <>
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {data && data.products.map((item, index) => (
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
                  {item.productImage && item.productImage.length > 0 ? (
                    item.productImage.map((imageUrl, imgIndex) => (
                      <div key={imgIndex} className="carousel-image">
                        <img
                          // src={`https://agromart-dev.onrender.com/${imageUrl}`} 
                          src={`http://localhost:3000/${imageUrl}`}
                          alt={`Image ${imgIndex + 1}`}
                          className="max-w-full container mb-2"
                          style={{ width: '500px', height: '250px' }} // Set the desired height here
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
              <div
                className="bg-mybgcolor-500 rounded-3xl items-center justify-center  text-center border border-mybgcolor-500 pl-2 text-white w-full h-12"
                onClick={() => handleDetailClick(item, index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {hoveredIndex === index ? (
                  <p className="">View</p>
                ) : (
                  <div className="">
                    <p className="">Available {item.productName}</p>
                    <p className="">
                      <span className="font-bold">Price:</span> {item.productPrice}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SellProductDashboard;
