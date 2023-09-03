import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth";
import Footer from "../Footer";
// import bgprof from "../assets/bgprof.png"
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import "../Carousel.css";
import Dashboard from "../LandLeaseDashboard";
import { useState } from "react";
import SellProductDashboard from "../SellProductsDashboard";
import DashboardBlogScreen from "../BlogScreen";
import DonationListScreen from "../DonationListScreen";
// import Lands from "./Lands";


const AdminProfile = () => {
	const [showPopupProduct, setShowPopupProduct] = useState(false);
	const [showPopupLandLease, setshowPopupLandLease] = useState(false);
	const [showPopupBlog, setshowPopupBlog] = useState(false);
	const [showPopupDonate, setshowPopupDonate] = useState(false);

	const { user } = useAuth();

	const navigate = useNavigate();

	const handleworkinprogress = () => {
		navigate('/workinprogress');
	};

	const togglePopupProduct = () => {
		setshowPopupLandLease(false);
		setshowPopupBlog(false);
		setshowPopupDonate(false);
		setShowPopupProduct(!showPopupProduct);
	};

	const togglePopupLandLease = () => {
		setShowPopupProduct(false);
		setshowPopupBlog(false)
		setshowPopupDonate(false);
		setshowPopupLandLease(!showPopupLandLease);
	};

	const togglePopupBlog = () => {
		setShowPopupProduct(false);
		setshowPopupLandLease(false);
		setshowPopupDonate(false);
		setshowPopupBlog(!showPopupBlog);
	};

	const togglePopupDonate = () => {
		setShowPopupProduct(false);
		setshowPopupLandLease(false);
		setshowPopupBlog(false);
		setshowPopupDonate(!showPopupDonate);
	};

	return (
		<>
			<div className="bg-fixed bg-white bg-no-repeat bg-cover flex flex-col min-h-screen"
			//  style={{ backgroundImage: `url(${bgprof})` }}
			>
				<Navbar />
				<div className="lg:mx-4 pt-36 bg-transparent -mt-4 rounded-lg shadow-lg">
					<div className="px-0 py-1.5 flex flex-col lg:flex-row items-center gap-10">
						<div className="lg:flex">
							<img
								src={user?.photoURL}
								alt="Profile Logo"
								className="w-12 h-12 sm:mb-4 lg:-mb-1 rounded-full mx-auto"
							/>
							<h2 className="lg:text-xl my-auto sm:text-xs font-semibold font-serif italic text-center ml-4 text-primary-700">
								{user?.displayName}
							</h2>
						</div>
						<div className="text-white lg:flex lg:w-auto space-y-2 lg:space-y-0 lg:space-x-4">
							<button
								onClick={togglePopupLandLease}
								className="btn bg-primary-500 rounded font-bold border border-primary-500 font-serif italic px-4 py-2.5 w-full"
							>
								Tenders
							</button>
							<button
								onClick={togglePopupProduct}
								className="btn bg-primary-500 rounded font-bold border border-primary-500 font-serif italic px-4 py-2.5 w-full"
							>
								Products
							</button>
							<button
								onClick={togglePopupBlog}
								className="btn bg-primary-500 rounded font-bold border border-primary-500 font-serif italic px-4 py-2.5 w-full"
							>
								Blog
							</button>
							<button
								onClick={togglePopupDonate}
								className="btn bg-primary-500 rounded font-bold border border-primary-500 font-serif italic px-4 py-2.5 w-full"
							>
								Donate
							</button>
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
						{showPopupBlog && <DashboardBlogScreen />}
						{showPopupDonate && <DonationListScreen />}
					</div>
				</div>
				<Footer />
			</div>

		</>
	);
};

export default AdminProfile;