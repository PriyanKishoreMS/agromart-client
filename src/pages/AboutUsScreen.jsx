import React from 'react';
import abtimage from "../assets/Gallery/IMG20220815084053.jpg"; // Replace with your actual image path
import Navbar from '../components/Navbar';
import Footer from './Footer';
import promovideo from "../assets/Gallery/Agrovaango.mp4"

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 pt-36 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:order-2">
              <div className="relative">
                <video
                  controls  // This adds play and pause controls
                  className="w-full h-auto"
                >
                  <source src={promovideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h1 className='text-primary-700 text-center font-bold text-2xl mt-6'>#India to the super power <a className='underline'>2047</a></h1>
            </div>
            <div className="md:order-1">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                Colonel Sengol Raju
              </h2>
              <p className="text-gray-600 mb-4 text-justify capitalize">
                Birth place Ramanadhapuram district of Tamil Nadu
                Born and brought up in a agricultural family
                First graduate in family
                Was ambitious about becoming a IAS officer to contibute to his society
                Instead joined Indian Army and served the nation for over 36 years.
                Field of expertise was in Electronics and Telecommunication.
                Highly skilled in Human Resources Management, leadership.
                Expert in HR Management. An expert Motivational Speaker.
                Aquired Military Training, weapon as well as Physical training Skills and Man Management.
                Posted as Assistant Director and Head Of Department Communication, in Defence Reserch and Development Organisation.
                Post retirement he envisioned the dream of actuating sustainable world peace.
                Later he founded "Sustainabel world peace charity trust" as a foundation of his dream.
                He is also coaching and mentoring for "INTERNATIONAL POLITICAL LEADERSHIP AND WORLD PEACE LIFE MANAGEMENT".
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
