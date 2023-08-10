import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import agribg2 from '../assets/bg/Agribg2.jpg';
import 'slick-carousel/slick/slick-theme.css';

const QuoteSlider = ({ quotes }) => {
    const settings = {
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="justify-center items-center bg-black py-8 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${agribg2})` }}>
            <div className="">
                <Slider {...settings}>
                    {quotes.map((quote, index) => (
                        <div key={index} className="my-6 py-8 transition-all duration-150 ease-in-out bg-transparent rounded shadow animate-fade-in">
                            <div>
                                <p className="text-center px-6 text-white font-bold text-2xl animate-pulse">{quote}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default QuoteSlider;