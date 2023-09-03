import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useRef, useState } from "react";
import backgroundImage from '../assets/postingpage.png';
import { postLandService } from "../api/usersApi";
import Footer from "./Footer";
import "../components/loading.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from "react-query";
import Alert from "../components/Alert";

const LandLeaseService = () => {
    const [errors, setErrors] = useState({
        landLocation: "",
        landArea: "",
        landRegistered: "",
        cropType: "",
        cultivationType: "",
        cultivationHistory: "",
        soilType: "",
        waterFacility: "",
        landPrice: "",
        landDesc: "",
        landImage: "",
    });
    const [formData, setFormData] = useState({
        landLocation: "",
        landArea: "",
        landRegistered: false,
        cropType: "",
        cultivationType: "",
        cultivationHistory: [],
        soilType: "",
        waterFacility: "",
        landPrice: "",
        landDesc: "",
        landImage: []
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const { user } = useAuth();


    const [currentPage, setCurrentPage] = useState(1);

    const queryClient = useQueryClient();

    const addLandServiceMutation = useMutation(postLandService, {
        onSuccess: () => {
            queryClient.invalidateQueries('lands');
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            const selectedFiles = Array.from(files);
            setFormData((prevData) => ({
                ...prevData,
                [name]: selectedFiles,
            }));
        }
        else {
            const fieldValue = type === 'checkbox' ? checked : value;
            setFormData((prevData) => ({
                ...prevData,
                [name]: fieldValue
            }));
        }
    };

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        setFormData((prevFormData) => {

            let cultivationHistory = [...prevFormData.cultivationHistory];
            if (isChecked) {
                cultivationHistory.push(value);
            } else {
                cultivationHistory = cultivationHistory.filter((v) => v !== value)
            }
            return {
                ...prevFormData,
                cultivationHistory
            }
        });
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {
            landLocation: "",
            landArea: "",
            landRegistered: "",
            cropType: "",
            cultivationType: "",
            cultivationHistory: "",
            soilType: "",
            waterFacility: "",
            landPrice: "",
            landDesc: "",
            landImage: "",
        };

        if (!formData.landLocation) {
            newErrors.landLocation = "Land Location is required.";
        }

        if (!formData.landArea) {
            newErrors.landArea = "Land Area is required.";
        }

        if (!formData.cropType) {
            newErrors.cropType = "Crop Type is required.";
        }

        if (!formData.cultivationType) {
            newErrors.cultivationType = " Cultivation Type is required.";
        }

        if (formData.cultivationHistory.length === 0) {
            newErrors.cultivationHistory = "Cultivation History is required.";
        }

        if (!formData.soilType) {
            newErrors.soilType = "Soil Type is required.";
        }

        if (!formData.waterFacility) {
            newErrors.waterFacility = "Water Facility is required.";
        }

        if (!formData.landPrice) {
            newErrors.landPrice = "Land Price is required.";
        }

        if (!formData.landDesc) {
            newErrors.landDesc = "Land Description is required.";
        }


        return newErrors;
    };

    const handleClose = () => {
        setShowAlert(false);
        console.log('Alert CLosing');
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault();

            const newErrors = validateForm();

            setErrors(newErrors);

            const hasErrors = Object.values(newErrors).some((error) => !!error);

            let cultHistory = formData.cultivationHistory.join(',');

            const landServiceData = {
                landLocation: formData.landLocation,
                landArea: formData.landArea,
                registered: formData.landRegistered,
                cropType: formData.cropType,
                cultivationType: formData.cultivationType,
                cultivationHistory: cultHistory,
                soilType: formData.soilType,
                waterFacility: formData.waterFacility,
                landPrice: formData.landPrice,
                landDesc: formData.landDesc,
                landImage: formData.landImage,
            };

            if (!hasErrors) {
                addLandServiceMutation.mutate(landServiceData);
                setFormData(null);
                navigate(-1);
                // console.log("success");
            }
            else {
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error adding blog:', error);
        }
    };

    const cropTypeoptions = [
        'Rice (அரிசி)',
        'Millets (தினை, குதிரை, வரகு, சாமை)',
        'Pulses (பருப்பு வகைகள்)',
        'Sugarcane (கரும்பு)',
        'Oilseeds (எண்ணெய்வகைகள்)',
        'Vegetables and Fruits (காய்கறி மற்றும் பழங்கள்)'
    ];

    const cultivationTypeoptions = [
        'Wetland Cultivation',
        'Dryland Cultivation',
        'Horticulture Cultivation',
        'Organic Cultivation',
        'Plantation Cultivation',
    ];

    const waterFacilityoptions = [
        'Canal Irrigation (நீர்வழிகாட்டு விநிதி)',
        'Tanks (அணைகள்)',
        'Wells (கிணற்றுகள்)',
        'Borewells',
        'Rainwater Harvesting'
    ];

    const soilTypeoptions = [
        'Red Soil (சிவப்பு மண்)',
        'Black Soil (கருப்பு மண்)',
        'Alluvial Soil (அண்ணாவின் மண்)',
        'Laterite Soil (வடகம் மண்)',
        'Sandy Soil (மணல் மண்)',
    ];

    const cultivationHistoryoptions = [
        'Rice',
        'Millets',
        'Pulses',
        'Sugarcane',
        'Cotton',
        'Oilseeds',
        'Spices',
        'Vegetables',
        'Fruits',
    ];

    if (isLoading) {
        return <>
            <Navbar />
            <div className="loading-container">
                <div className="loading-content">
                    <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
                    <span>Loading...</span>
                </div>
            </div>
            <Footer />
        </>
    }

    return (
        <>
            <div className="bg-white bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <Navbar />
                <div className="max-w-6xl mx-auto rounded-lg shadow-lg bg-transparent pt-36">
                    <div className="container mx-auto px-4 lg:px-0 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="p-6 bg-transparent rounded animate-custom -mt-12">
                                <h2 className="mb-4 text-2xl font-semibold text-primary-300">
                                    Tender the Property
                                </h2>
                                <ul className="text-primary-700">
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-primary-500 mr-3" />
                                        Unleash the Potential: Tender this Spectacular Property Today!
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-primary-500 mr-3" />
                                        Discover Your Dream Space: Bid for this Prime Property Now!
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-primary-500 mr-3" />
                                        Investment Opportunity Knocking: Tender this Hidden Gem!
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-primary-500 mr-3" />
                                        Calling All Visionaries: Secure Your Future with this Land!
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-primary-500 mr-3" />
                                        Rare Opportunity Awaits: Tender this Exclusive Property!
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-primary-500 mr-3" />
                                        Make Your Mark: Tender the Key to Your New Beginning!
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 bg-white rounded animate-custom">
                                <h2 className="mb-4 text-2xl font-semibold text-primary-700">
                                    Post Your Tender Here
                                </h2>
                                <form action="https://agromart-dev.onrender.com/uploads/lands" method="post" encType="multipart/form-data">
                                {/* <form action="http://localhost:3000/uploads/lands" method="post" encType="multipart/form-data"> */}
                                    <div className="container mx-auto p-4">
                                        <div className="max-w-md mx-auto">
                                            {currentPage === 1 && (
                                                <div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Land Location:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.landLocation ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            // ref={nameInputRef}
                                                            type="text"
                                                            id="landLocation"
                                                            name="landLocation"
                                                            placeholder="Location"
                                                            value={formData.landLocation}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.landLocation && <p className="text-red-500">{errors.landLocation}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Land Area:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.landArea ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            // ref={nameInputRef}
                                                            type="text"
                                                            id="landArea"
                                                            name="landArea"
                                                            placeholder="Land Area"
                                                            value={formData.landArea}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.landArea && <p className="text-red-500">{errors.landArea}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Land Crop Type:
                                                        </label>
                                                        <select className="rounded-md py-2 px-4 w-full" id="cropType" name="cropType" value={formData.cropType} onChange={handleChange}>
                                                            <option value="">Select an option</option>
                                                            {cropTypeoptions.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.cropType && <p className="text-red-500">{errors.cropType}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <input
                                                            className={`border ${errors.landRegistered ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 mr-4 `}
                                                            // ref={nameInputRef}
                                                            type="checkbox"
                                                            id="landRegistered"
                                                            name="landRegistered"
                                                            placeholder="Land Area"
                                                            checked={formData.landRegistered}
                                                            onChange={handleChange}
                                                        />
                                                        <a className="text-black mb-2">
                                                            Please check whether your land is Registered
                                                        </a>
                                                        {errors.landRegistered && <p className="text-red-500">{errors.landRegistered}</p>}
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-black bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={handleNext}
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {currentPage === 2 && (
                                                <div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Land Cultivation Type:
                                                        </label>
                                                        <select className="rounded-md py-2 px-4 w-full" id="cultivationType" name="cultivationType" value={formData.cultivationType} onChange={handleChange}>
                                                            <option value="">Select an option</option>
                                                            {cultivationTypeoptions.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.cultivationType && <p className="text-red-500">{errors.cultivationType}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Land Cultivation History:
                                                        </label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {cultivationHistoryoptions.map((option) => (
                                                                <div key={option} className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={option}
                                                                        name="cultivationHistory"
                                                                        value={option}
                                                                        checked={formData.cultivationHistory.includes(option)}
                                                                        onChange={handleCheckboxChange}
                                                                    />
                                                                    <label className="text-black ml-1" htmlFor={option}>{option}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {errors.cultivationHistory && <p className="text-red-500">{errors.cultivationHistory}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Land Soil Type:
                                                        </label>
                                                        <select className="rounded-md py-2 px-4 w-full" id="soilType" name="soilType" value={formData.soilType} onChange={handleChange}>
                                                            <option value="">Select an option</option>
                                                            {soilTypeoptions.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.soilType && <p className="text-red-500">{errors.soilType}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Land Water Facility:
                                                        </label>
                                                        <select className="rounded-md py-2 px-4 w-full" id="waterFacility" name="waterFacility" value={formData.waterFacility} onChange={handleChange}>
                                                            <option value="">Select an option</option>
                                                            {waterFacilityoptions.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.waterFacility && <p className="text-red-500">{errors.waterFacility}</p>}
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-black bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                                        >
                                                            Go Back
                                                        </button>
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-black bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={handleNext}
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {currentPage === 3 && (
                                                <div>
                                                    {/* <h1 className="text-2xl font-bold mb-4">Page 3</h1> */}
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Land Price:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.landPrice ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            // ref={nameInputRef}
                                                            type="text"
                                                            id="landPrice"
                                                            name="landPrice"
                                                            placeholder="Land Price"
                                                            value={formData.landPrice}
                                                            onChange={handleChange}
                                                        // onSelect={(e) => handleNameSelection(e.target.value)}
                                                        />
                                                        {errors.landPrice && <p className="text-red-500">{errors.landPrice}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Land Description:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.landDesc ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            // ref={nameInputRef}
                                                            type="text"
                                                            id="landDesc"
                                                            name="landDesc"
                                                            placeholder="Land Description"
                                                            value={formData.landDesc}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.landDesc && <p className="text-red-500">{errors.landDesc}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="images">
                                                            Upload Land Images:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.landImage ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            type="file"
                                                            id="landImage"
                                                            name="landImage"
                                                            accept="image/*"
                                                            multiple
                                                            onChange={handleChange}
                                                        />
                                                        {errors.landImage && <p className="text-red-500">{errors.landImage}</p>}
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-black bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                                        >
                                                            Go Back
                                                        </button>
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-black bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={handleNext}
                                                        >
                                                            Preview
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {currentPage === 4 && (
                                                <div className="bg-green-100 p-2 rounded">
                                                    <h1 className="text-2xl font-bold mb-4">Confirm the Details:</h1>


                                                    {formData && (
                                                        <>
                                                            <div className="mb-4">
                                                                <p>Land Location: {formData.landLocation}</p>
                                                                <p>Land Area: {formData.landArea}</p>
                                                                <p>Land Crop Type: {formData.cropType}</p>
                                                                <p>Land Registered: {formData.landRegistered === true ? "Land is Registered" : "Land is not Registered"}</p>
                                                                <p>Land Cultivation Type: {formData.cultivationType}</p>
                                                                <p>Land Cultivation History: {formData.cultivationHistory.join(',')}</p>
                                                                <p>Land Soil Type: {formData.soilType}</p>
                                                                <p>Land Water Facility: {formData.waterFacility}</p>
                                                                <p>Land Price: {formData.landPrice}</p>
                                                                <p>Land Description: {formData.landDesc}</p>
                                                            </div>


                                                            <div>
                                                                {formData?.landImage?.length > 0 ? (
                                                                    <div className="grid grid-cols-3 gap-4">
                                                                        {formData.landImage.map((image, index) => (
                                                                            <img
                                                                                key={index}
                                                                                src={URL.createObjectURL(image)}
                                                                                alt={`Image ${index + 1}`}
                                                                                className="w-full h-64 object-cover"
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <p>No images selected</p>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                    <div className="flex justify-end">
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-black bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                                        >
                                                            Go Back
                                                        </button>
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-black bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={handleSubmit}
                                                        >
                                                            Post
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
                {showAlert && (
                    <Alert
                        message={'Kindly Enter all the fields'}
                        type={'warning'}
                        onClose={handleClose}
                    />
                )}
                <Footer />
            </div >
        </>
    )
}

export default LandLeaseService;