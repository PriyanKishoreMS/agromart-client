import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth";
import Footer from "../Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Carousel.css";
import { useState } from "react";
import SellProductDashboard from "../SellProductsDashboard";
import Dashboard from "../LandLeaseDashboard";


const AdminProfile = () => {
	const [showPopupProduct, setShowPopupProduct] = useState(false);
	const [showPopupLandLease, setshowPopupLandLease] = useState(false);

	const { user } = useAuth();

	const navigate = useNavigate();

	const handleworkinprogress = () => {
		navigate('/workinprogress');
	};

	const handlesellproducts = () => {
		navigate('/sellproductservice');
	};

	const togglePopupProduct = () => {
		setshowPopupLandLease(false);
		setShowPopupProduct(!showPopupProduct);
	};

	const togglePopupLandLease = () => {
		setShowPopupProduct(false);
		setshowPopupLandLease(!showPopupLandLease);
	};

	return (
		<>
			<div className="bg-fixed bg-yellow-50 bg-no-repeat bg-cover"
			 >
				<Navbar />
				<div className="lg:ml-4 bg-transparent -mt-4 rounded-lg shadow-lg">
					<div className="p-6 flex items-center justify-between">
						<div className="lg:flex sm:mx-auto items-center">
							<img src={user?.photoURL} alt="Profile Logo" className="w-12 h-12  sm:mb-4 rounded-full" />
							<h2 className="lg:text-xl sm:text-xs font-semibold font-serif italic text-center ml-4" style={{ color: "#93674D" }}>{user?.displayName}</h2>
						</div>
						<div className="text-white lg:block hidden">
							<button onClick={handleworkinprogress} className="bg-mybgcolor rounded font-bold border border-mybgcolor font-serif italic mr-4 px-4 py-2.5">
								Your Order
							</button>
							<button onClick={handleworkinprogress} className="bg-mybgcolor rounded font-bold border border-mybgcolor font-serif italic mr-4 px-4 py-2.5">
								Your Account
							</button>
							<button onClick={handleworkinprogress} className="bg-mybgcolor rounded font-bold border border-mybgcolor font-serif italic mr-4 px-4 py-2.5">
								Your List
							</button>
							<button onClick={handleworkinprogress} className="bg-mybgcolor rounded font-bold border border-mybgcolor font-serif italic mr-4 px-4 py-2.5">
								Buy Again
							</button>
							<button onClick={handleworkinprogress} className="bg-mybgcolor rounded font-bold border border-mybgcolor font-serif italic mr-4 px-4 py-2.5">
								Review your purchases
							</button>
							<button onClick={handleworkinprogress} className="bg-mybgcolor rounded font-bold border border-mybgcolor font-serif italic mr-4 px-4 py-2.5">
								Wish List
							</button>
							<button onClick={handleworkinprogress} className="bg-mybgcolor rounded font-bold border border-mybgcolor font-serif italic mr-4 px-4 py-2.5">
								Sign out
							</button>

						</div>
					</div>
				</div>
				<div className="flex flex-col lg:flex-row">
					<div className="py-8 lg:w-1/4">
						<div className="justify-start lg:ml-5 mt-4 max-w-xs">
							<div
								onClick={togglePopupLandLease}
								className="flex flex-col justify-center items-center bg-mybgcolor text-white p-4 rounded-lg cursor-pointer hover:bg-opacity-80 mr-2 mb-2 relative"
							>
								<h4 className="text-lg font-semibold">Land Lease Service</h4>
							</div>

							<div
								onClick={togglePopupProduct}
								className="flex flex-col justify-center items-center bg-mybgcolor text-white p-4 rounded-lg cursor-pointer hover:bg-opacity-80 mr-2 mb-2 relative"
							>
								<h4 className="text-lg font-semibold">Buy Products</h4>
							</div>
							<div
								onClick={handlesellproducts}
								className="flex flex-col justify-center items-center bg-mybgcolor text-white p-4 rounded-lg cursor-pointer hover:bg-opacity-80 mr-2 mb-2 relative"
							>
								<h4 className="text-lg font-semibold">Sell Your Products</h4>
							</div>
						</div>
					</div>
					<div className="lg:w-3/4">
						{showPopupProduct && <SellProductDashboard />}
						{showPopupLandLease && <Dashboard />}
					</div>
				</div>
				<Footer />
			</div>

		</>
	);
};

export default AdminProfile;
