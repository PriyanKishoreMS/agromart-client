import React from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import plantation from "../assets/Services/plantation.jpg";
import kidseducation from "../assets/Services/kidseducation.jpg";
import povertyshelter from "../assets/Services/povertyshelter.jpg";
import foodforpoor from "../assets/Services/foodforpoor.jpg";
import health from "../assets/Services/health.jpg";
import clothing from "../assets/Services/clothing.jpg";

const services = [
    {
        title: 'PLANTATION',
        description: 'Trees and plants are the ultimate savior of all living beings on earth. The rising need for ecological conservation has brought attention towards it. This has made a lot of NGOs take up the issue at hand and focus steadfastly in growing trees and plants. We at Sustainable World Peace  have committed to making the earth greener. We constantly conduct environment drives and campaigns to not just bring awareness on the importance of growing plants, but also to practice what is preached. There are a lot of seeds sowed  as a part of our campaigns and we are driven to increase the count further more in the future.',
        // icon: '🌳',
        imageSrc: plantation,
    },
    {
        title: 'CHILD EDUCATION',
        description: 'Children are tiny tots who carry in their hearts and minds, the rays of hope for their future. They must be guided towards the right direction to invest their energy and skills to ensure sustainability of this planet. We are highly concerned about the education system of our children. We have always strived hard to educate as many underprivileged children as possible. These honorary acts are carried out with the help of our sponsors, who have graciously accepted to fund us in our mission. With the educated future generation, we are confident and hopeful that the future days are safer, saner and sustainable.',
        // icon: '🌼',
        imageSrc: kidseducation,
    },
    {
        title: 'POVERTY SHELTER',
        description: 'No one is born poor. But it is our ignorance, greed and uncaring attitude to amaze wealth, which lead to creating the society into rich and poor. We should join our hands together in constructing and ensuring that each and every human being has the shelter over their head. Twist and turn of unexpected events take place, which affects the normal life of human beings, which can be either by natural calamity or man-made. Thus, to offer shelter to the unfortunate, we strive hard in providing shelter to the needy in an equal platform and care in various parts of the world.',
        // icon: '💧',
        imageSrc: povertyshelter,
    },
    {
        title: 'FOOD DELIVERY FOR THE POOR',
        description: 'Food is one of the most essential commodities which need to be provided for the survival of all human beings. With our food delivery mission, we strive to help and support to those who are poor, starving with hunger. ',
        // icon: '🦗',
        imageSrc: foodforpoor,
    },
    {
        title: 'HEALTH',
        description: 'Health is the most important need of all human beings. Healthy human can only contribute significantly towards himself/herself and others growth.  To ensure good health of the needy, we  conduct  health camps. We associate with major health centers and offer free health checkups. This will help the underprivileged to overcome their health issues. Apart from that, we also conduct awareness camps on major health issues like cancer, AIDs etc inorder to ensure precautionary health consciousness.',
        // icon: '🦗',
        imageSrc: health,
    },
    {
        title: 'CLOTHING',
        description: 'Poverty arises due to greed and mismanagement of resources. Food, shelter and clothing are the basic necessity of every human being. We in our community strive hard to provide clothing to the needy by visiting various poverty centers and places. ',
        // icon: '🦗',
        imageSrc: clothing,
    },
];

const OurServices = () => {
    return (
        <>
            <Navbar />
            <div className="bg-gray-100 pt-36 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Services</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={service.imageSrc}
                                        alt={service.title}
                                        className="w-full h-44 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-primary-500 bg-opacity-70 flex items-center justify-center">
                                        <img
                                            src={service.imageSrc}
                                            alt={service.title}
                                            className="w-12 h-12 text-white"
                                        />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mt-2 mb-2">{service.title}</h2>
                                    <p className="text-gray-600 text-justify">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OurServices;