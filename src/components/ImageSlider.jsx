import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../assets/Gallery/IMG20220815084029.jpg';
import image2 from '../assets/Gallery/IMG20220815102744.jpg';
import image3 from '../assets/Gallery/IMG20220815111037.jpg';
import image4 from '../assets/Gallery/IMG20220815110714.jpg';
import image5 from '../assets/Gallery/IMG20220815110741.jpg';
import image6 from '../assets/Gallery/IMG20220815111443.jpg';

const ImageSlider = () => {
    const images = [image1, image2, image3, image4, image5, image6]; // Add more image paths here

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1   ,
        autoplay: true,
        focusOnSelect: true,
    };

    return (
        <div className="max-w-screen- mt-10">
            <Slider  {...settings}>
                {images.map((image, index) => (
                    <div className='pr-2 my-auto aspect-w-16 aspect-h-9' key={index}>
                        <img src={image} alt={`Slide ${index}`} className="w-full h-auto rounded-md" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;