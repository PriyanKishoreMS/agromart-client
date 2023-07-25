import Navbar from "../components/Navbar";
import backgroundImage from '../assets/hero.png';
import quote from '../assets/quote.svg';
import how from '../assets/how-is-works-bg.png';
import invest1 from '../assets/investments/invest-1.png';
import invest2 from '../assets/investments/invest-2.png';
import prof1 from '../assets/testimonials/1.png';
import prof2 from '../assets/testimonials/2.png';
import prof3 from '../assets/testimonials/3.png';
import agribg1 from '../assets/bg/Agribg2.jpeg';
import agribg2 from '../assets/bg/Agribg.jpeg';
import agribg3 from '../assets/bg/Agribg3.jpg';
import agribg4 from '../assets/bg/Agribg4.jpg';
import agribg5 from '../assets/bg/Agribg5.jpg';
import { useEffect, useState } from "react";
import './Home.css';
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import bgprof from "../assets/bgprof.png"

const Home = () => {
	const [showHeader, setShowHeader] = useState(false);
	const [leaseData, setLeaseData] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const location = useLocation();
	const formData = location.state;

	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		const handleScroll = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const windowHeight = window.innerHeight || document.documentElement.clientHeight;
			const scrollPosition = scrollTop + windowHeight;

			const element = document.getElementById('center-content');
			const elementOffsetTop = element.offsetTop;
			const elementHeight = element.offsetHeight;
			const elementPosition = elementOffsetTop + elementHeight;

			if (scrollPosition > elementPosition) {
				setIsVisible(true);
			}
		};

		window.addEventListener('scroll', handleScroll);
		setIsLoading(false)
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);


	useEffect(() => {
		setShowHeader(true);
	}, []);

	const handlebrowsefarm = () => {
		window.location.href = 'https://sustainableworldpeacetrust.org/';
	}

	const handleSignin = () => {
		navigate("/signin");
	}

	const handlelearnmore = () => {
		window.location.href = 'https://www.renature.co/articles/long-term-investment-unlocks-agricultural-profit/';
	}


	if (isLoading) {
		return <div className="loading-container">
			<div className="loading-content">
				<FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
				<span>Loading...</span>
			</div>
		</div>
	}

	return (
		<>
			<div className="bg-white">
				<Navbar />
				<div className="bg-white pb-0 min-h-screen flex flex-col md:flex-row">
					<div className="container px-4 my-8 mx-auto bg-fixed bg-auto bg-right md:w-1/2">
						<div className="bg-cover bg-center flex justify-center items-center transition-opacity duration-1000">
							<h1 className={`lg:text-4xl md:text-3xl mb-8 text-2xl font-bold text-center text-mybgcolor	 animate-fade-in`}>
								Welcome to
								<h2 className="text-4xl font-bold text-mybgcolor font-serif italic">Agroவாங்கோ</h2>
								{/* <p>Agroவாங்கோ</p> */}
							</h1>
						</div>
						<div className="mt-20 px-5 justify-center items-center text-center"> {/* Added text-center class */}
							<div className="lg:mx-12 lg:px-4 sm:px-1 sm:mx-4">
								<h1 className="text-black font-bold text-center lg:text-5xl sm:text-sm font-serif"> {/* Added text-center class */}
									A single step taken forward will pave the way for thousands to follow!
								</h1>
								<p className="text-slate-800 mt-5 text-center">
									Company provides farmers, ranchers, private foresters, and agricultural producers with online self-service applications and educational materials.
								</p>
								<button onClick={handleSignin} className="border-2 mt-4 p-3 rounded-lg font-bold border-mybgcolor text-white bg-mybgcolor hover:text-mybgcolor hover:bg-white px-4 py-3  outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex"> {/* Added mx-auto class */}
									Register Now
								</button>
							</div>
						</div>
					</div>
					<div className="w-full md:w-1/2 bg-cover bg-no-repeat bg-right md:bg-center md:flex md:items-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
				</div>
				<div className="bg-white pb-12 lg:pt-20 justify-center items-center bg-no-repeat bg-cover">
					<div>
						<h2 className="text-center text-4xl mt-10 font-bold text-black">New Opportunities</h2>
						<p className="text-center mt-8 mb-10 sm:px-4 lg:px-72 text-black text-xl">We are the first and the only crowdfunding platform enabling you to help finance our farmers.</p>
					</div>
					<div className="container mx-auto pt-0">
						<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
							<div className="p-6 sm:p-10 py-20 sm:py-28 transition-all duration-150 ease-in-out bg-slate-100 rounded shadow hover:shadow-2xl bg-cover" style={{ backgroundImage: `url(${agribg4})` }}>
								<h2 className="mb-4 text-2xl font-bold text-yellow-700">
									Connect with our farmers and Land Holders
								</h2>
								<p className="mb-4 text-white">
									Invest along with our people to make our world a better place.
								</p>
							</div>

							<div className="p-6 sm:p-10 py-20 sm:py-28 transition-all duration-150 ease-in-out bg-slate-100 rounded shadow hover:shadow-2xl bg-cover" style={{ backgroundImage: `url(${agribg3})` }}>
								<h2 className="mb-4 text-2xl font-bold text-yellow-700">
									Grow your business
								</h2>
								<p className="mb-4 text-gray-700">
									Grow your own green revolutionary business.
								</p>
							</div>

							<div className="p-6 sm:p-10 py-20 sm:py-28 transition-all duration-150 ease-in-out bg-slate-100 rounded shadow hover:shadow-2xl bg-cover"   style={{ backgroundImage: `url(${agribg5})` }}>
								<h2 className="mb-4 text-2xl font-bold text-yellow-700">
									Social Impact Investment
								</h2>
								<p className="mb-4 text-white">
									Be a person to bring a green change by doing what you love.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-16 justify-center items-center bg-white bg-no-repeat bg-cover" style={{ backgroundImage: `url(${agribg1})` }}>
					<div>
						<h1 className="mb-4 lg:text-4xl sm:text-2xl font-bold text-yellow-700 px-4 sm:pl-10">
							Invest on your convenience
						</h1>
						<p className="mt-10 lg:text-xl text-white lg:w-1/2 px-4 sm:pl-10">
							Take part based on your convenience and necessity. Even small green steps count!
						</p>
					</div>
					<div
						id="center-content"
						className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
					>
						<div className="container mx-auto px-4 lg:px-72 py-8">
							<div className="grid grid-cols-1 gap-10 sm:grid-cols-1 lg:grid-cols-2">
								<div className="p-6 sm:p-10 transition-all duration-150 ease-in-out rounded shadow hover:shadow-2xl animate-custom" style={{ backgroundImage: `url(${invest1})` }}>
									<h2 className="mb-4 text-2xl font-semibold text-mybgcolor">
										New Farm Today
									</h2>
									<h1 className="mb-4 mt-8 text-4xl font-bold text-white">Short-term investment</h1>
									<p className="text-white">
										Invest in farms that will be ready for harvest in 3-18 months
									</p>
									<button onClick={handlebrowsefarm} className="border-2 mt-4 p-3 rounded-lg font-bold border-mybgcolor text-white bg-mybgcolor hover:text-mybgcolor hover:bg-white">Browse Farm</button>
								</div>
								<div className="p-6 sm:p-10 transition-all duration-150 ease-in-out rounded shadow hover:shadow-2xl animate-custom" style={{ backgroundImage: `url(${invest2})` }}>
									<h2 className="mb-4 text-2xl font-semibold text-mybgcolor">
										Fully Funded
									</h2>
									<h1 className="mb-4 mt-8 text-4xl font-bold text-white">Long-term investment</h1>
									<p className="text-white">
										Consider farms that have a long-term investment program
									</p>
									<button onClick={handlelearnmore} className="border-2 mt-4 p-3 rounded-lg font-bold border-mybgcolor text-white bg-mybgcolor hover:text-mybgcolor hover:bg-white">Learn more</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="justify-center pt-10 items-center pb-20 bg-yellow-50 bg-no-repeat bg-cover">
					<div className="mx-8 md:mx-48 pb-16 bg-mybgcolor border pt-12 bg-cover relative">
						<h1 className="mb-4 text-center lg:text-4xl sm:text-2xl font-bold text-white pl-4 md:pl-10">How it works</h1>
						<p className="text-white text-center text-xl md:text-2xl mx-4 md:mx-48">
							Take lands based on your requirements. We provide you affordable options.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-5 py-8 border-2 border-mybgcolor mx-4 md:mx-48 mt-10 transition-all duration-150 ease-in-out rounded-xl shadow-lg">
							<div>
								<p className="mb-4 text-center lg:text-3xl sm:text-sm font-bold text-white">
									Select your farmshare and complete the reservation form.
								</p>
							</div>
							<div>
								<p className="mb-4 mt-3 text-center lg:text-xl sm:text-sm text-white">
									Each and every step you take brings a change, a change that the earth and future generations require.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="justify-center items-center bg-white py-8 bg-no-repeat bg-cover"  style={{ backgroundImage: `url(${agribg2})` }}>
					<div className="grid grid-cols-1 mt-10 gap-2 sm:grid-cols-2 lg:grid-cols-3">
						<div className="my-6 py-8 transition-all duration-150 ease-in-out bg-white rounded shadow animate-fade-in">
							<div className="p-10 flex flex-col gap-10 md:flex-row">
								<img src={prof1} className="w-1/4 h-1/3 z-0 animate-bounce" alt="Profile 1" />
								<div className="flex-grow">
									<h2 className="mb-4 text-2xl font-bold text-yellow-700">
										Mr. Singh
									</h2>
									<p className="mb-4 text-gray-700">
										Telecommunication Engineer
									</p>
								</div>
							</div>
							<div>
								<p className="text-justify px-6 text-rose-950 text-2xl animate-pulse">"A boon for the earth"</p>
							</div>
						</div>
						<div className="my-6 py-8 transition-all duration-150 ease-in-out bg-white rounded shadow animate-fade-in">
							<div className="p-10 flex flex-col gap-10 md:flex-row">
								<img src={prof2} className="w-1/4 h-1/3 z-0 animate-bounce" alt="Profile 2" />
								<div className="flex-grow">
									<h2 className="mb-4 text-2xl font-bold text-yellow-700">
										Mrs. Nair
									</h2>
									<p className="mb-4 text-gray-700">
										Head Engineer of Agromart Group
									</p>
								</div>
							</div>
							<div>
								<p className="text-justify px-6 text-rose-950 text-2xl animate-pulse">"Heal the world through green. If you wanted the same, Join us!"</p>
							</div>
						</div>
						<div className="my-6 py-8 transition-all duration-150 ease-in-out bg-white rounded shadow animate-fade-in">
							<div className="p-10 flex flex-col gap-10 md:flex-row">
								<img src={prof3} className="w-1/4 h-1/3 z-0 animate-bounce" alt="Profile 3" />
								<div className="flex-grow">
									<h2 className="mb-4 text-2xl font-bold text-yellow-700">
										Mr. Shah
									</h2>
									<p className="mb-4 text-gray-700">
										Software Engineer
									</p>
								</div>
							</div>
							<div>
								<p className="text-justify px-6 text-rose-950 text-2xl animate-pulse">“This not only brings a green revolution, but also a sense of fraternity among different people and communities.“</p>
							</div>
						</div>
					</div>
				</div>
				<div className="justify-center items-center bg-white py-8 bg-no-repeat bg-cover">
					<div className="mx-auto lg:w-3/4">
						<div className="border-2 lg:py-12 duration-150 bg-yellow-50 rounded shadow-xl">
							<h1 className="text-black text-center lg:text-4xl md:text-3xl">
								The future of <a className="text-mybgcolor font-serif font-bold">
									<span className="text-yellow-900">Farm</span> Investing
								</a> is <span className="text-yellow-700 font-serif font-bold italic">Agroவாங்கோ</span>
							</h1>
							<div className="flex justify-center items-center pt-5">
								<button onClick={handleSignin} className="border-2 mt-4 px-8 py-3 rounded-lg font-bold border-mybgcolor text-white bg-mybgcolor hover:text-mybgcolor hover:bg-white">
									Join Us
								</button>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Home;
