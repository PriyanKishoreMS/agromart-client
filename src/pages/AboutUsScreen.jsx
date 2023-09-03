import React from 'react';
import abtimage from "../assets/Gallery/IMG20220815084053.jpg"; // Replace with your actual image path
import Navbar from '../components/Navbar';
import Footer from './Footer';
import promovideo from "../assets/Gallery/Agrovaango.mp4"
import SWP from "../assets/SustainableWorldPeace.jpg"

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
                <img src={abtimage} className="w-full h-auto md:h-3/4 px-4 md:px-10 rounded-xl" alt="SustainableWorldPeace" />
              </div>
              <h1 className='text-primary-700 text-center font-bold text-2xl mt-6'>#IndiaSuperPower2047</h1>
            </div>
            <div className="md:order-1">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                Colonel Sengol Raju
              </h2>
              <p className="text-gray-600 mb-4 text-justify">
                Colonel Sengol Raju is an Indian Army veteran, having served for 36 years and 31 days with an exemplary service record.
                He holds a degree in engineering (EC) and a postgraduate degree in Defence and Strategic Studies.
                He is also an alumnus of IIM Indore. With extensive qualifications and vast experience in military warfare communication,
                operational field expertise, and managerial and training aspects, he stands out.
                Notably, he served as Assistant Director and Head of the Communication Department at the
                Defense Research and Development Organization (DRDO) Lab,
                specifically at the Missile Research Lab founded by Dr. APJ Abdul Kalam.
                Hailing from the agricultural village of Piranthanvayal in the Ramanathapuram District of Tamil Nadu,
                he experienced the challenges of poverty in his childhood due to rain-dependent agriculture.
                His aspiration to become an IAS officer was driven by his determination to alleviate poverty.
                He envisioned overcoming poverty through rainwater harvesting and permaculture agricultural practices,
                ensuring a stable income throughout the year and ultimately eradicating poverty in the village.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-10">
            <div className="w-full md:w-1/2 p-4">
              <div className="flex items-center mb-4 justify-center my-auto">
                <h2 className="lg:text-4xl font-serif text-2xl text-primary-700 mr-2 text-justify">
                  Join us in enriching the journey of changing this world towards a sustainable world peace!</h2>
              </div>
              <video
                controls  // This adds play and pause controls
                className="w-full h-auto"
              >
                <source src={promovideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0 my-auto">
              <img src={SWP} className="w-full h-auto md:h-3/4 px-4 md:px-10" alt="SustainableWorldPeace" />
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">
              VISION
            </h2>
            <p className="text-gray-600 mb-4 text-justify">
              To make INDIA superpower by 2047 by way of sustainable agriculture and educational
              and industrial practice by way of decentralising the infrastructure and make India as
              a test bed to be emulated by the whole world into sustainable peaceful living with its
              own indigenous people with global connect.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">
              MISSION
            </h2>
            <p className="text-gray-600 mb-4 text-justify">
              Currently, farmers in villages are practicing traditional agricultural methods.
              However, these practices have not yielded sufficient economic viability for their families,
              resulting in extensive migration of the youth to urban areas for livelihoods.
              This has consequently led to a shortage of younger agricultural practitioners in the villages.

              Presently, elderly farmers aged 60 to 80 are the ones staying in the villages,
              upholding their land and engaging in unsustainable agricultural practices.
              Among them, there is a visionary individual with the ambition to shift mindsets from traditional farming to permaculture.
              Additionally, this visionary aims to reform education and industrial practices, emphasizing decentralization.
              The ultimate goal is to encourage reverse migration, drawing the younger populace back from towns and cities to villages,
              thus alleviating urban congestion.

              This visionary's broader vision is to establish the infrastructure for education and foster industries that capitalize
              on local resources available in their place of birth.
              This strategic approach seeks to ensure even development across the state or country,
              in contrast to the prevailing trend of concentrating industries, educational institutions,
              and infrastructure in a few cities and towns. This centralization has significantly undermined sustainable living.

              It's pertinent to note that the globalization of the economy has exacerbated wealth disparities,
              enriching the affluent while further marginalizing the less privileged.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
