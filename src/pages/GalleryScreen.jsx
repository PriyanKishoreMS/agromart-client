import React from 'react';
// import agribg2 from '../assets/bg/Agribg.jpeg';
// import agribg3 from '../assets/bg/Agribg3.jpg';
// import agribg4 from '../assets/bg/Agribg4.jpg';
// import agribg5 from '../assets/bg/Agribg5.jpg';


import image1 from '../assets/Gallery/IMG20220815084029.jpg';
import image2 from '../assets/Gallery/IMG20220815102744.jpg';
import image3 from '../assets/Gallery/IMG20220815111037.jpg';
import image4 from '../assets/Gallery/IMG20220815110714.jpg';
import image5 from '../assets/Gallery/IMG20220815110741.jpg';
import image6 from '../assets/Gallery/IMG20220815111443.jpg';

import Navbar from '../components/Navbar';
import Footer from './Footer';

const images = [
  { src: image1, quote: `"A boon for the earth"` },
  { src: image2, quote: `"The farmer has to be an optimist or he wouldn't still be a farmer. – Will Rogers"` },
  { src: image3, quote: `"The nation that destroys its soil destroys itself. – Franklin D. Roosevelt"` },
  { src: image4, quote: `"Farming is a profession of hope. – Brian Brett"` },
  { src: image5, quote: `"In every conceivable manner, the family is link to our past, bridge to our future. – Alex Haley"` },
  { src: image6, quote: `"The best fertilizer is the farmer's shadow."` },
];

const GalleryScreen = () => {
  return (
    <>
    <Navbar />
      <div className="bg-gray-100 pt-36 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Gallery</h1>
          {images.map((image, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
            >
              <div className="md:w-1/2 md:p-4 mt-4">
                <div className="text-2xl text-primary-700 border shadow-2xl p-2 bg-green-100 text-center">{image.quote}</div>
                
              </div>
              <div className="md:w-1/2 md:p-4">
                <img src={image.src} alt={image.title} className="w-full h-auto object-cover rounded-lg shadow-2xl z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GalleryScreen;
