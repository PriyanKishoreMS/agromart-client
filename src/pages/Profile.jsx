import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import Footer from "./Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";
import Dashboard from "./LandLeaseDashboard";
import { useState } from "react";
import SellProductDashboard from "./SellProductsDashboard";
import Dropdown from "../components/Dropdown";
import MyLandDashboard from "./MyLandLeaseDashboard";
import MyProductDashboard from "./MyProductDashboard";


const Profile = () => {
	const [showPopupProduct, setShowPopupProduct] = useState(false);
	const [showPopupLandLease, setshowPopupLandLease] = useState(false);
	const [showPopupMyLandLease, setshowPopupMyLandLease] = useState(false);
	const [showPopupMyProduct, setshowPopupMyProduct] = useState(false);
	
	const [openDropdown, setOpenDropdown] = useState(null);

	const { user } = useAuth();

	const navigate = useNavigate();

	const toggleDropdown = (dropdownTitle) => {
		if (openDropdown === dropdownTitle) {
		  setOpenDropdown(null);
		} else {
		  setOpenDropdown(dropdownTitle);
		}
	  };
	
	  const closeDropdowns = () => {
		setOpenDropdown(null);
	  };

	const handleOptionClick = (item) => {
		if(item.label === "Tender List") {
			togglePopupLandLease();
		}
		if(item.label === "My Tender List"){
			togglePopupMyLandLease();
		}
		if(item.label === "My Product List"){
			togglePopupMyProduct();
		}
		if(item.label === "Product List") {
			togglePopupProduct();
		}
        closeDropdowns();
        // Do something with the selected option
    };

	const togglePopupProduct = () => {
		setshowPopupMyLandLease(false);
		setshowPopupLandLease(false);
		setshowPopupMyProduct(false);
		setShowPopupProduct(!showPopupProduct);
	};

	const togglePopupLandLease = () => {
		setShowPopupProduct(false);
		setshowPopupMyLandLease(false);
		setshowPopupMyProduct(false);
		setshowPopupLandLease(!showPopupLandLease);
	};

	const togglePopupMyLandLease = () => {
		setShowPopupProduct(false);
		setshowPopupLandLease(false);
		setshowPopupMyProduct(false);
		setshowPopupMyLandLease(!showPopupMyLandLease);
	};
	const togglePopupMyProduct = () => {
		setShowPopupProduct(false);
		setshowPopupLandLease(false);
		setshowPopupMyLandLease(false);
		setshowPopupMyProduct(!showPopupMyProduct);
	};

	const tenderdropdownOptions = [ { label: "My Tender List"}, {label: "Tender List"}]
	const productsdropdownOptions = [ { label: "My Product List"}, {label: "Product List"}]

	return (
		<>
			<div className="bg-fixed bg-white bg-no-repeat bg-cover flex flex-col min-h-screen"
			>
				<Navbar />
				<div className="lg:mx-4 pt-36 bg-transparent -mt-4 rounded-lg shadow-lg">
					<div className="px-0 py-1.5 lg:flex items-center justify-between">
						<div className="lg:flex">
							<img src={user?.photoURL} alt="Profile Logo" className="w-12 h-12 sm:mb-4 lg:-mb-1 rounded-full mx-auto" />
							<h2 className="lg:text-xl my-auto sm:text-xs font-semibold font-serif italic text-center ml-4 text-primary-700">{user?.displayName}</h2>
						</div>
						<div className="text-white lg:flex lg:w-auto">
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
							
						</div>
					</div>
				</div>
				<div className="flex flex-col lg:flex-row lg:mb-20">
					<div className="">
						{showPopupProduct && <SellProductDashboard />}
						{showPopupLandLease && <Dashboard />}
						{showPopupMyLandLease && <MyLandDashboard />}
						{showPopupMyProduct && <MyProductDashboard />}
					</div>
				</div>
				<Footer />
			</div>

		</>
	);
};

export default Profile;