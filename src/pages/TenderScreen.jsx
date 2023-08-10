import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from './Footer';

const Tender = () => {
    const [userName, setUserName] = useState("");
    const [userMessage, setUserMessage] = useState("");

    const location = useLocation();
    const { data, index } = location.state;

    // const data.user = {
    //     id: 1,
    //     title: 'Beautiful Land for Sale',
    //     description: 'A scenic piece of land with breathtaking views.',
    //     postedBy: 'John Doe',
    //     contactEmail: 'john@example.com',
    //     contactPhone: '+1234567890',
    // };


    //     const emailSubject = `Inquiry about land available to tender in ${data.landLocation}`;
    //     const emailBody = `Hello, ${data.user.name}

    // I am interested in the following land tender:
    // Land Location: ${data.landLocation}
    // Land Area: ${data.landArea}

    // Please provide me with more details.

    // Best regards,
    // [Your Name]`;

    //     const emailLink = `mailto:${data.user.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;


    console.log(data, "data");
    const handleSendEmail = () => {
    const emailSubject = `Inquiry about land available to tender in ${data.landLocation}`;
    const emailBody = `Hello, ${data.user.name}

        I am ${userName} and I am interested in the following land tender:
        Land Location: ${data.landLocation}
        Land Area: ${data.landArea}

        ${userMessage}

        Please provide me with more details.

        Best regards,
        ${userName}`;

    const emailLink = `mailto:${data.user.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = emailLink;
    // const gmailComposeUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${data.user.email}&su=${emailSubject}&body=${emailBody}`;

    // window.open(gmailComposeUrl, "_blank");
    };

    return (
        <>
            <Navbar />
            <div key={index} className="flex flex-col min-h-screen bg-gray-100 p-8 pt-36">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Location: {data.landLocation}</h2>
                    <p className="text-gray-600">{data.description}</p>
                    <p className="mt-4">Posted by: {data.user.name}</p>
                    <p>Email: {data.user.email}</p>
                    {/* <p>Phone: 1234567890</p> */}
                </div>
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-semibold mb-4">Contact Land Owner</h2>
                    <form onSubmit={handleSendEmail}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            ></textarea>
                        </div>
                        <div className="text-right">
                            <button
                                onClick={handleSendEmail}
                                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Send Email
                            </button>
                            {/* <a
                                href={emailLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Send Email
                            </a> */}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Tender;
