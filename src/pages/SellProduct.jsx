import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useRef, useState } from "react";
// import firebase from "../components/postfirebase";
import backgroundImage from '../assets/postingpage.png';
// import 'firebase/compat/storage';
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "../components/loading.css";
import { postProduct } from "../api/usersApi";

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

    const resizeImage = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 500; // Define your desired maximum width
                    const MAX_HEIGHT = 350; // Define your desired maximum height
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    console.log("Height:",height,"width:", width);
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], image.name, { type: image.type });
                        resolve(resizedFile);
                    }, image.type);
                };
                img.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(image);
        });
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        // const storage = firebase.storage();
        // const storageRef = storage.ref('productImage');
        // const imageURLs = [];

        // for (const image of formData.productImage) {
        //     const resizedImage = await resizeImage(image);
        //     const imageRef = storageRef.child(image.name);
        //     await imageRef.put(resizedImage);
        //     const imageURL = await imageRef.getDownloadURL();
        //     imageURLs.push(imageURL);
        // }

        const newData = {
            productName: formData.productName,
            productCategory: formData.productCategory,
            productPrice: formData.productPrice,
            productManufacturer: formData.productManufacturer,
            productQuantity: formData.productQuantity,
            productDescription: formData.productDescription,
            productImage: formData.productImage,
        };
        // console.log(
        //     typeof(formData.productName),
        //     typeof(formData.productCategory),
        //     typeof(formData.productPrice),
        //     typeof(formData.productManufacturer),
        //     typeof(formData.productQuantity),
        //     typeof(formData.productDescription),
        //     );

        postProduct(newData);

        // const formDataRef = firebase.database().ref('sellProducts');
        // formDataRef
        //     .push(newData)
        //     .then(() => {
        //         console.log('Data saved to Firebase');
        //         alert('Data Saved Successfully.');
        //         navigate('/productdashboard');
        //     })
        //     .catch((error) => {
        //         console.error('Error saving data to Firebase:', error);
        //     });
        setIsLoading(false);
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
                <div className="max-w-6xl mx-auto rounded-lg shadow-lg bg-transparent">
                    <div className="container mx-auto px-4 lg:px-0 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="p-6 bg-transparent rounded animate-custom">
                                <h2 className="mb-4 text-2xl font-semibold text-yellow-700">
                                    Lease/Rent the Property
                                </h2>
                                <ul className="text-black">
                                    <li className="mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-mybgcolor-500"
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
                                        Trustable Owners
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-mybgcolor-500"
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
                                        Trustable Dealers
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-mybgcolor-500"
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
                                        You can easily Lease the Land.
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-mybgcolor-500"
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
                                        Agroவாங்கோ one of the most trustable Platform
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 bg-yellow-50 rounded animate-custom">
                                <h2 className="mb-4 text-2xl font-semibold text-yellow-700">
                                    Post Your Product Here
                                </h2>
                                {/* <form action="http://localhost:3000/uploads/lands" method="post" encType="multipart/form-data"> */}
                                <form action="http://localhost:3000/uploads/lands" method="post" encType="multipart/form-data">
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
                                                        {/* <input
                                                            className={`border ${errors.productCategory ? 'border-red-500' : 'border-gray-300'}  rounded-md py-2 px-4 w-full`}
                                                            // ref={nameInputRef}
                                                            type="text"
                                                            id="productCategory"
                                                            name="productCategory"
                                                            placeholder="Product Category"
                                                            value={formData.productCategory}
                                                            onChange={handleChange}
                                                        // onSelect={(e) => handleNameSelection(e.target.value)}
                                                        /> */}
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
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-mybgcolor-500 text-white bg-mybgcolor-500 hover:text-yellow-700 hover:bg-white mx-2"
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
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-mybgcolor-500 text-white bg-mybgcolor-500 hover:text-yellow-700 hover:bg-white mx-2"
                                                            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                                        >
                                                            Go Back
                                                        </button>
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-mybgcolor-500 text-white bg-mybgcolor-500 hover:text-yellow-700 hover:bg-white mx-2"
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
                                                    {/* Display the form data for preview */}
                                                    <div className="mb-4">
                                                        <p>Product Name: {formData.productName}</p>
                                                        <p>Product Category: {formData.productCategory}</p>
                                                        <p>Product Manufacturer: {formData.productManufacturer}</p>
                                                        <p>Product Price: {formData.productPrice}</p>
                                                        <p>Product Quantity: {formData.productQuantity} kg</p>
                                                        <p>Product Description: {formData.productDescription}</p>
                                                    </div>
                                                    <div>
                                                        {formData && formData.productImage && formData.productImage.length > 0 ? (
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
                                                    <div className="flex justify-end">
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-mybgcolor-500 text-white bg-mybgcolor-500 hover:text-yellow-700 hover:bg-white mx-2"
                                                            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                                        >
                                                            Go Back
                                                        </button>
                                                        <button
                                                            className="border-2 mt-4 p-3 rounded-lg font-bold border-mybgcolor-500 text-white bg-mybgcolor-500 hover:text-yellow-700 hover:bg-white mx-2"
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
                <Footer />
                {/* <footer className=" justify-center items-center text-white bg-mybgcolor-500 bg-no-repeat">
                    <div className="container mx-auto py-8 px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Company</h2>
                                <ul className="list-none">
                                    <li><a href="/">About Us</a></li>
                                    <li><a href="/">Team</a></li>
                                    <li><a href="/">Careers</a></li>
                                    <li><a href="/">Contact Us</a></li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-4">Legal</h2>
                                <ul className="list-none">
                                    <li><a href="/">Privacy Policy</a></li>
                                    <li><a href="/">Terms and Conditions</a></li>
                                    <li><a href="/">Security</a></li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-4">Invest</h2>
                                <ul className="list-none">
                                    <li><a href="/">Features</a></li>
                                    <li><a href="/">Investment Opportunities</a></li>
                                    <li><a href="/">Investor Relations</a></li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                                <ul className="list-none">
                                    <li><a href="/">Facebook</a></li>
                                    <li><a href="/">Twitter</a></li>
                                    <li><a href="/">Instagram</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 text-center">
                            <p>&copy; 2023 Agroவாங்கோ. All rights reserved.</p>
                        </div>
                    </div>
                </footer> */}
            </div >
        </>
    )
}

export default SellProductService;