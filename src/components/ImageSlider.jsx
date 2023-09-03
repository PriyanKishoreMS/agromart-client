import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from 'react-query';
import { getGalleryList } from '../api/usersApi';

const ImageSlider = () => {

    const { isError, isLoading, isSuccess, data: galleryImages, error } = useQuery(
        ["gallery"],
        () => getGalleryList()
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        focusOnSelect: true,
    };

    return (
        <>
        <div className="mt-10">
            <Slider  {...settings}>
                {galleryImages?.map((item, index) => (
                    <div className='pr-2 my-auto aspect-w-16 aspect-h-9' key={item._id}>
                        <img
                            src={`https://agromart-dev.onrender.com/${item.image}`}
                            // src={`http://localhost:3000/${item.image}`}
                            alt={item._id} 
                            className="w-full h-auto rounded-md" />
                    </div>
                ))}
            </Slider>
        </div>
        </>
    );
};

export default ImageSlider;