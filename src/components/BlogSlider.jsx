import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const BlogSlider = ({ blogs, onItemClick, isLoading }) => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, 
        },
    };

    return (
        <>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : blogs ? (
                    <>
                        <h1 className='text-white text-center text-3xl p-5'>BLOG</h1>
                        <Carousel autoPlay={true} infinite={true} responsive={responsive}>
                            {blogs.map((blog, index) => (
                                <div key={index} className="blog-slide p-10" onClick={() => onItemClick(blog)}>
                                    <h2 className='text-white text-xl text-center h-24'><a className='text-primary-500'>{blog.title}</a></h2>
                                    <p className='text-white mt-3 text-justify h-auto' style={{ maxHeight: '10em', overflow: 'hidden' }}>{blog.content}</p>
                                </div>
                            ))}
                        </Carousel>
                    </>
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>
        </>
    );
};

export default BlogSlider;