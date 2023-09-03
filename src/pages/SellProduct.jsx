import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import backgroundImage from '../assets/postingpage.png';
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "../components/loading.css";
import { postProduct } from "../api/usersApi";
import { useMutation, useQueryClient } from "react-query";
import Alert from "../components/Alert";

const SellProductService = () => {

    const [errors, setErrors] = useState({
        productName: "",
        productCategory: "",
        productManufacturer: "",
        productDescription: "",
        productPrice: "",
        productQuantity: "",
        productImage: ""
    });
    const [formData, setFormData] = useState({
        productName: "",
        productCategory: "",
        productManufacturer: "",
        productDescription: "",
        productPrice: "",
        productQuantity: "",
        productImage: []
    });

    // console.log(formData.landRegistered, "Land Register");

    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const queryClient = useQueryClient();

    const addProductMutation = useMutation(postProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            // Handle multiple file selection
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

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {
            productName: "",
            productCategory: "",
            productManufacturer: "",
            productDescription: "",
            productPrice: "",
            productQuantity: "",
            productImage: ""
        };

        if (!formData.productName) {
            newErrors.productName = "Product Name is required.";
        }

        if (!formData.productCategory) {
            newErrors.productCategory = "Product Category is required.";
        }

        if (!formData.productManufacturer) {
            newErrors.productManufacturer = "Product Manufacturer is required.";
        }

        if (!formData.productDescription) {
            newErrors.productDescription = "Product Description is required.";
        }

        if (!formData.productPrice) {
            newErrors.productPrice = "Product Price is required.";
        }

        if (!formData.productQuantity) {
            newErrors.productQuantity = "Product Quantity is required.";
        }

        return newErrors;
    };

    // const resizeImage = (image) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = function (event) {
    //             const img = new Image();
    //             img.onload = function () {
    //                 const canvas = document.createElement('canvas');
    //                 const MAX_WIDTH = 500; // Define your desired maximum width
    //                 const MAX_HEIGHT = 350; // Define your desired maximum height
    //                 let width = img.width;
    //                 let height = img.height;

    //                 if (width > height) {
    //                     if (width > MAX_WIDTH) {
    //                         height *= MAX_WIDTH / width;
    //                         width = MAX_WIDTH;
    //                     }
    //                 } else {
    //                     if (height > MAX_HEIGHT) {
    //                         width *= MAX_HEIGHT / height;
    //                         height = MAX_HEIGHT;
    //                     }
    //                 }

    //                 canvas.width = width;
    //                 canvas.height = height;
    //                 const ctx = canvas.getContext('2d');
    //                 console.log("Height:", height, "width:", width);
    //                 ctx.drawImage(img, 0, 0, width, height);

    //                 canvas.toBlob((blob) => {
    //                     const resizedFile = new File([blob], image.name, { type: image.type });
    //                     resolve(resizedFile);
    //                 }, image.type);
    //             };
    //             img.src = event.target.result;
    //         };
    //         reader.onerror = reject;
    //         reader.readAsDataURL(image);
    //     });
    // };


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

            const newData = {
                productName: formData.productName,
                productCategory: formData.productCategory,
                productPrice: formData.productPrice,
                productManufacturer: formData.productManufacturer,
                productQuantity: formData.productQuantity,
                productDescription: formData.productDescription,
                productImage: formData.productImage,
            };

            if (!hasErrors) {
                addProductMutation.mutate(newData);
                setFormData(null);
                navigate(-1);
                // console.log('Success');
            }
            else {
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error adding blog:', error);
        }
    };

    const productCategoryoptions = [
        'Cereal Crops (தானிய பயிர்கள்)',
        'Pulses and Legumes (பருப்பு மற்றும் தனியான பயிர்கள்)',
        'Oilseeds (எண்ணெய்க் கீரைகள்)',
        'Cash Crops (பணம் பயிர்கள்)',
        'Horticultural Crops (தோட்ட பயிர்கள்)',
        'Plantation Crops (நிலக்கட்டி பயிர்கள்)',
        'Medicinal and Aromatic Crops (மருத்துவம் மற்றும் வாசன பயிர்கள்)',
        'Organic Farming Products (இயற்கை விவசாய தயார்ப்புக்கள்)'
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
                <div className="max-w-6xl pt-36 mx-auto rounded-lg shadow-lg bg-transparent">
                    <div className="container mx-auto px-4 lg:px-0 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="p-6 bg-transparent rounded animate-custom">
                                <h2 className="mb-4 text-2xl font-semibold text-primary-300">
                                    Post your Products Here..
                                </h2>
                                <ul className="text-black">
                                    <li className="mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-primary-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.05-7.05a1 1 0 010-1.41l4-4a1 1 0 111.42 1.42l-4 4a1 1 0 01-1.42 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Irresistible Offer: Check Out Our Amazing Products!
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-primary-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.05-7.05a1 1 0 010-1.41l4-4a1 1 0 111.42 1.42l-4 4a1 1 0 01-1.42 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Quality Meets Affordability: Grab Our Exclusive Deals!
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-primary-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.05-7.05a1 1 0 010-1.41l4-4a1 1 0 111.42 1.42l-4 4a1 1 0 01-1.42 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Unveil the Beauty: Find Your Perfect Product Here!
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-primary-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.05-7.05a1 1 0 010-1.41l4-4a1 1 0 111.42 1.42l-4 4a1 1 0 01-1.42 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Your One-Stop Shop: Find Everything You Need Right Here!
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 bg-white rounded animate-custom">
                                <h2 className="mb-4 text-2xl font-semibold text-primary-700">
                                    Post Your Product Here
                                </h2>
                                <form action="https://agromart-dev.onrender.com/uploads/lands" method="post" encType="multipart/form-data">
                                {/* <form action="http://localhost:3000/uploads/lands" method="post" encType="multipart/form-data"> */}
                                    <div className="container mx-auto p-4">
                                        <div className="max-w-md mx-auto">
                                            {currentPage === 1 && (
                                                <div>
                                                    {/* <h1 className="text-2xl font-bold mb-4">Page 1</h1> */}
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Product Name:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.productName ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            // ref={nameInputRef}
                                                            type="text"
                                                            id="productName"
                                                            name="productName"
                                                            placeholder="Product Name"
                                                            value={formData.productName}
                                                            onChange={handleChange}
                                                        // onSelect={(e) => handleNameSelection(e.target.value)}
                                                        />
                                                        {errors.productName && <p className="text-red-500">{errors.productName}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Product Category:
                                                        </label>
                                                        <select className="rounded-md py-2 px-4 w-full" id="productCategory" name="productCategory" value={formData.productCategory} onChange={handleChange}>
                                                            <option value="">Select an option</option>
                                                            {productCategoryoptions.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.productCategory && <p className="text-red-500">{errors.productCategory}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter the Product Manufacturer:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.productManufacturer ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            // ref={nameInputRef}
                                                            type="text"
                                                            id="productManufacturer"
                                                            name="productManufacturer"
                                                            placeholder="Product Manufacturer"
                                                            value={formData.productManufacturer}
                                                            onChange={handleChange}
                                                        // onSelect={(e) => handleNameSelection(e.target.value)}
                                                        />
                                                        {errors.productManufacturer && <p className="text-red-500">{errors.productManufacturer}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Product Description:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.productDescription ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            // ref={nameInputRef}
                                                            type="text"
                                                            id="productDescription"
                                                            name="productDescription"
                                                            placeholder="Product Description"
                                                            value={formData.productDescription}
                                                            onChange={handleChange}
                                                        // onSelect={(e) => handleNameSelection(e.target.value)}
                                                        />
                                                        {errors.productDescription && <p className="text-red-500">{errors.productDescription}</p>}
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-white bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={handleNext}
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {currentPage === 2 && (
                                                <div>
                                                    {/* <h1 className="text-2xl font-bold mb-4">Page 3</h1> */}
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your Product Price:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.productPrice ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            // ref={nameInputRef}
                                                            type="text"
                                                            id="productPrice"
                                                            name="productPrice"
                                                            placeholder="Product Price"
                                                            value={formData.productPrice}
                                                            onChange={handleChange}
                                                        // onSelect={(e) => handleNameSelection(e.target.value)}
                                                        />
                                                        {errors.productPrice && <p className="text-red-500">{errors.productPrice}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="name">
                                                            Enter Your productQuantity:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.productQuantity ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            // ref={nameInputRef}
                                                            type="text"
                                                            id="productQuantity"
                                                            name="productQuantity"
                                                            placeholder="Product Quantity (In kgs) (Only No.)"
                                                            value={formData.productQuantity}
                                                            onChange={handleChange}
                                                        // onSelect={(e) => handleNameSelection(e.target.value)}
                                                        />
                                                        {errors.productQuantity && <p className="text-red-500">{errors.productQuantity}</p>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="text-black mb-2" htmlFor="images">
                                                            Upload Product Images:
                                                        </label>
                                                        <input
                                                            className={`border ${errors.productImage ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            type="file"
                                                            id="productImage"
                                                            name="productImage"
                                                            accept="image/*"
                                                            multiple
                                                            onChange={handleChange}
                                                        />
                                                        {errors.productImage && <p className="text-red-500">{errors.productImage}</p>}
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-white bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                                        >
                                                            Go Back
                                                        </button>
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-white bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={handleNext}
                                                        >
                                                            Preview
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {currentPage === 3 && (
                                                <div>
                                                    <h1 className="text-2xl font-bold mb-4">Confirm the Details:</h1>
                                                    {formData && (
                                                        <>
                                                            <div className="mb-4">
                                                                <p>Product Name: {formData.productName}</p>
                                                                <p>Product Category: {formData.productCategory}</p>
                                                                <p>Product Manufacturer: {formData.productManufacturer}</p>
                                                                <p>Product Price: {formData.productPrice}</p>
                                                                <p>Product Quantity: {formData.productQuantity} kg</p>
                                                                <p>Product Description: {formData.productDescription}</p>
                                                            </div>
                                                            <div>
                                                                {formData?.productImage?.length > 0 ? (
                                                                    <div className="grid grid-cols-3 gap-4">
                                                                        {formData.productImage.map((image, index) => (
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
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-white bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
                                                            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                                        >
                                                            Go Back
                                                        </button>
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-white bg-primary-500 hover:text-primary-700 hover:bg-white mx-2"
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

export default SellProductService;