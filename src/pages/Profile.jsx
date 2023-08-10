import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import Footer from "./Footer";
// import bgprof from "../assets/bgprof.png"
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";
import Dashboard from "./LandLeaseDashboard";
import { useState } from "react";
import SellProductDashboard from "./SellProductsDashboard";
import Dropdown from "../components/Dropdown";
import MyLandDashboard from "./MyLandLeaseDashboard";
// import Lands from "./Lands";


const Profile = () => {
	const [showPopupProduct, setShowPopupProduct] = useState(false);
	const [showPopupLandLease, setshowPopupLandLease] = useState(false);
	const [showPopupMyLandLease, setshowPopupMyLandLease] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
	
	const [openDropdown, setOpenDropdown] = useState(null);

	const { user } = useAuth();

	const navigate = useNavigate();

	const handleworkinprogress = () => {
		navigate('/workinprogress');
	};

	// const toggleDropdown = (title) => {
    //     setIsOpen(!isOpen);
    // };
	
    // const closeDropdowns = () => {
    //     setIsOpen(false);
    // };

	const toggleDropdown = (dropdownTitle) => {
		if (openDropdown === dropdownTitle) {
		  setOpenDropdown(null); // If the same dropdown is clicked, close it
		} else {
		  setOpenDropdown(dropdownTitle); // Otherwise, open the clicked dropdown
		}
	  };
	
	  const closeDropdowns = () => {
		setOpenDropdown(null); // Close all dropdowns
	  };

	const handleOptionClick = (item) => {
		console.log("optionnnnn", item);
        setSelectedOption(item);
		if(item.label === "Tender List") {
			togglePopupLandLease();
		}
		if(item.label === "My Tender List"){
			toggleMyPopupLandLease();
		}
		if(item.label === "Product List") {
			togglePopupProduct();
		}
        closeDropdowns();
        // Do something with the selected option
    };

	const togglePopupProduct = () => {
		setshowPopupMyLandLease
		setshowPopupLandLease(false);
		setShowPopupProduct(!showPopupProduct);
	};

	const togglePopupLandLease = () => {
		setShowPopupProduct(false);
		setshowPopupMyLandLease(false);
		setshowPopupLandLease(!showPopupLandLease);
	};

	const toggleMyPopupLandLease = () => {
		setShowPopupProduct(false);
		setshowPopupLandLease(false);
		setshowPopupMyLandLease(!showPopupMyLandLease);
	};

	const tenderdropdownOptions = [ { label: "My Tender List"}, {label: "Tender List"}]
	const productsdropdownOptions = [ { label: "My Product List"}, {label: "Product List"}]

	return (
		<>
			<div className="bg-fixed bg-white bg-no-repeat bg-cover flex flex-col min-h-screen"
			//  style={{ backgroundImage: `url(${bgprof})` }}
			>
				<Navbar />
				<div className="lg:mx-4 pt-36 bg-transparent -mt-4 rounded-lg shadow-lg">
					<div className="px-0 py-1.5 flex items-center justify-between">
						<div className="lg:flex">
							<img src={user?.photoURL} alt="Profile Logo" className="w-12 h-12 sm:mb-4 lg:-mb-1 rounded-full mx-auto" />
							<h2 className="lg:text-xl my-auto sm:text-xs font-semibold font-serif italic text-center ml-4 text-primary-700">{user?.displayName}</h2>
						</div>
						<div className="text-white lg:flex lg:w-auto hidden">
							<Dropdown
								title="Tenders"
								items={tenderdropdownOptions}
								isOpen={openDropdown === "Tenders"}
								toggleDropdown={toggleDropdown}
								closeDropdowns={closeDropdowns}
								onOptionClick={handleOptionClick}
							/>
							<Dropdown
								title="Products"
								items={productsdropdownOptions}
								isOpen={openDropdown === "Products"}
								toggleDropdown={toggleDropdown}
								closeDropdowns={closeDropdowns}
								onOptionClick={handleOptionClick}
							/>
							{/* <button onClick={togglePopupLandLease} className="bg-primary-500 rounded font-bold border border-primary-500 font-serif italic mr-4 px-4 py-2.5">
								Tenders
							</button>
							<button onClick={togglePopupProduct} className="bg-primary-500 rounded font-bold border border-primary-500 font-serif italic mr-4 px-4 py-2.5">
								Products
							</button> */}
						</div>
					</div>
				</div>
				<div className="flex flex-col lg:flex-row lg:mb-20">
					{/* <div className="py-8 lg:w-1/4">
						<div className="justify-start lg:ml-5 mt-4 max-w-xs">
							<div
								onClick={togglePopupLandLease}
								className="flex flex-col justify-center items-center bg-primary-500 text-white p-4 rounded-lg cursor-pointer hover:bg-opacity-80 mr-2 mb-2 relative"
							>
								<h4 className="text-lg font-semibold">Tenders</h4>
							</div>

							<div
								onClick={togglePopupProduct}
								className="flex flex-col justify-center items-center bg-primary-500 text-white p-4 rounded-lg cursor-pointer hover:bg-opacity-80 mr-2 mb-2 relative"
							>
								<h4 className="text-lg font-semibold">Buy Products</h4>
							</div>
						</div>
					</div> */}
					<div className="">
						{showPopupProduct && <SellProductDashboard />}
						{showPopupLandLease && <Dashboard />}
						{showPopupMyLandLease && <MyLandDashboard />}
					</div>
				</div>
				<Footer />
			</div>

		</>
	);
};

export default Profile;
