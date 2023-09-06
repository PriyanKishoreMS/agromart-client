import Navbar from "../components/Navbar";
import backgroundImage from '../assets/hero.png';
import agribg1 from '../assets/bg/Agribg2.jpeg';
import agribg2 from '../assets/bg/Agribg.jpeg';
import agribg3 from '../assets/bg/Agribg3.jpg';
import agribg4 from '../assets/bg/Agribg4.jpg';
import agribg5 from '../assets/bg/Agribg5.jpg';
import permaculture from '../assets/permaculture.jpg';
import honeybee from '../assets/honeybee.mp4';
import question from '../assets/qustion.png';
import agriculture from '../assets/agriculture.jpg';
import whatsappicon from '../assets/whatsappicon.jpg';
import { useEffect, useState } from "react";
import './Home.css';
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ImageSlider from "../components/ImageSlider";
import QuoteSlider from "../components/QuoteSlider";
import { getBlogs } from "../api/usersApi";
import { useQuery } from "react-query";
import BlogSlider from "../components/BlogSlider";


const Home = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [currentPara, setCurrentPara] = useState(0);
	// const [currentBlogIndex, setCurrentBlogIndex] = useState(1);
	const itemsPerPage = 9999;

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPara((prevPara) => (prevPara + 1) % 4); // 4 is the total number of paragraphs
		}, 6000); // 6000ms = 6 seconds (3 seconds for fadeIn + 3 seconds for fadeOut)

		return () => clearInterval(interval);
	}, []);

	const navigate = useNavigate();



	useEffect(() => {
		setIsLoading(true);
		const handleScroll = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const windowHeight = window.innerHeight || document.documentElement.clientHeight;
			const scrollPosition = scrollTop + windowHeight;

			const element = document.getElementById('center-content');
			const elementOffsetTop = element?.offsetTop;
			const elementHeight = element?.offsetHeight;
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
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const { data: blogslist, error, isLoading: isBlogLoading } = useQuery(
		['blogs', null, 1], // Adjust query key
		() => getBlogs(null, 1, itemsPerPage)
	);

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handlebrowsefarm = () => {
		window.location.href = 'https://sustainableworldpeacetrust.org/';
	}

	const handleSignin = () => {
		navigate("/signin");
	}

	const handlelearnmore = () => {
		window.location.href = 'https://www.renature.co/articles/long-term-investment-unlocks-agricultural-profit/';
	}

	const quotes = [
		"A boon for the earth",
		"The farmer has to be an optimist or he wouldn't still be a farmer. – Will Rogers",
		"The nation that destroys its soil destroys itself. – Franklin D. Roosevelt",
		"Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals, and happiness. – Thomas Jefferson",
		"Farming is a profession of hope. – Brian Brett",
		"In every conceivable manner, the family is link to our past, bridge to our future. – Alex Haley",
		"The best fertilizer is the farmer's shadow."
		// Add more quotes here
	];

	const openWhatsApp = () => {
		window.open('https://wa.me/+919176889201', '_blank');
	};

	// const images = ['Agribg.jpg', 'Agribg2.jpeg', 'Agribg3.jpg', 'Agribg4.jpg', 'Agribg5.jpg']


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
			<div className="bg-black">
				<Navbar />
				<div className="bg-black pt-28 pb-0 min-h-screen flex flex-col md:flex-row">
					<div className="container px-4 my-8 mx-auto bg-fixed bg-auto bg-right md:w-1/2">
						<div className="bg-cover bg-center flex justify-center items-center transition-opacity duration-1000">
							<h1 className={`lg:text-4xl md:text-3xl mb-8 text-2xl font-bold text-center text-primary-500	 animate-fade-in`}>
								Welcome to

								<p className="text-4xl font-bold text-primary-500 font-serif italic">Agro Edu Vaango</p>
							</h1>
						</div>
						<div className="mt-20 px-5 justify-center items-center text-center">
							<div className="lg:mx-12 lg:px-4 sm:px-1 sm:mx-4">
								<h1 className="text-white font-bold text-center lg:text-5xl sm:text-sm font-serif">
									A single step taken forward will pave the way for thousands to follow!
								</h1>
								<p className="text-slate-300 mt-5 text-center">
									Company provides farmers, ranchers, private foresters, and agricultural producers with online self-service applications and educational materials.
								</p>
								<button onClick={handleSignin} className="border-2 mt-4 p-3 rounded-lg font-bold border-primary-500 text-white bg-primary-500 hover:text-primary-500 hover:bg-black px-4 py-3  outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex">
									Register Now
								</button>
							</div>
						</div>
					</div>
					<div className="w-full md:w-1/2 bg-cover bg-no-repeat bg-right md:bg-center md:flex md:items-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
				</div>
				<ImageSlider />
				<div className="bg-black pb-12 lg:pt-20 justify-center items-center bg-no-repeat bg-cover">
					<div>
						<h2 className="text-center text-4xl mt-10 font-bold text-white">New Opportunities</h2>
						<p className="text-center mt-8 mb-10 sm:px-4 lg:px-72 text-white text-xl">We are the first and the only crowdfunding platform enabling you to help finance our farmers.</p>
					</div>
					<div className="container mx-auto pt-0">
						<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
							<div className="p-6 sm:p-10 py-20 sm:py-28 transition-all duration-150 ease-in-out bg-slate-100 rounded shadow hover:shadow-2xl bg-cover" style={{ backgroundImage: `url(${agribg4})` }}>
								<h2 className="mb-4 text-2xl font-bold text-primary-700">
									Connect with our farmers and Land Holders
								</h2>
								<p className="mb-4 text-white">
									Invest along with our people to make our world a better place.
								</p>
							</div>

							<div className="p-6 sm:p-10 py-20 sm:py-28 transition-all duration-150 ease-in-out bg-slate-100 rounded shadow hover:shadow-2xl bg-cover" style={{ backgroundImage: `url(${agribg3})` }}>
								<h2 className="mb-4 text-2xl font-bold text-primary-700">
									Grow your business
								</h2>
								<p className="mb-4 text-gray-700">
									Grow your own green revolutionary business.
								</p>
							</div>

							<div className="p-6 sm:p-10 py-20 sm:py-28 transition-all duration-150 ease-in-out bg-slate-100 rounded shadow hover:shadow-2xl bg-cover" style={{ backgroundImage: `url(${agribg5})` }}>
								<h2 className="mb-4 text-2xl font-bold text-primary-700">
									Social Impact Investment
								</h2>
								<p className="mb-4 text-white">
									Be a person to bring a green change by doing what you love.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:flex-row mt-10">
					<div className="w-full md:w-1/2 p-4">
						<div className="flex items-center mb-4">
							<h2 className="text-5xl text-primary-700 mr-2">Why Agriculture</h2>
							<img src={question} className="w-12 h-12 rounded-full" alt="Question mark" />
						</div>
						<p className="text-xl text-justify text-slate-200">
							Agriculture, the silent symphony of sustenance, beckons us with its primal rhythm.
							It's the art of coaxing life from soil's embrace, a tapestry that weaves communities, nourishes nations,
							and reverberates through generations. From the seed's hopeful embrace of earth to the table's final feast,
							agriculture is the heartbeat of existence, a dance that harmonizes humanity and nature.
							Agriculture is the universal bridge that spans time and cultures, reminding us that our story is rooted in the soil and intertwined with every meal shared.
							In the end, agriculture isn't just about what we grow; it's about who we are and the legacy we nurture.
						</p>
					</div>
					<div className="w-full md:w-1/2 mt-4 md:mt-0">
						<img src={agriculture} className="w-full h-auto md:h-3/4 px-4 md:px-10 rounded-xl" alt="Agriculture" />
					</div>
				</div>
				<div className="bg-black bg-no-repeat bg-cover">
					<h1 class="text-4xl font-semibold text-center mb-12 text-primary-700 pt-10" style={{ fontFamily: 'cursive' }}>Bond between Honeybee & Agriculture</h1>
					<div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
						<div className="flex-1">
							<div className="">
								<div className={`text-lg ${currentPara === 0 ? 'fade-in-out' : 'hidden'}`}>
									<h2 className="text-2xl font-semibold mb-4 text-primary-700">Invisible Warriors of Agriculture</h2>
									<p className="text-justify px-4 text-white">
										Honey bees are the secret to flourishing crops and bountiful harvests. With their delicate yet
										powerful dance of pollination, they unlock nature's bounty, ensuring juicy fruits, luscious
										vegetables, and abundant seeds.
									</p>
									<h2 className="text-2xl font-semibold mt-4 mb-4 text-primary-700">Pollination</h2>
									<p className="text-justify px-4 text-white">
										Honey bees are efficient pollinators, transferring pollen from one flower to another while foraging for nectar.
										This process helps plants produce fruits, vegetables, and seeds.
										It is estimated that honey bees are responsible for pollinating about one-third of the world's food crops,
										including various fruits, nuts, and vegetables.
									</p>
								</div>

								<div className={`text-lg ${currentPara === 1 ? 'fade-in-out' : 'hidden'}`}>
									<h2 className="text-2xl font-semibold mb-4 text-primary-700">A Symphony of Life</h2>
									<p className="text-justify px-4 text-white">
										Honey bees orchestrate the harmony of ecosystems, pollinating wildflowers and crops alike. Their
										tireless work sustains biodiversity, creating a vibrant tapestry of life in fields and meadows.
									</p>
									<h2 className="text-2xl font-semibold mt-4 mb-4 text-primary-700">Conservation Efforts</h2>
									<p className="text-justify px-4 text-white">
										Recognizing the importance of honey bees in agriculture, efforts to conserve and
										protect bee populations have gained prominence. Farmers, beekeepers, and policymakers work together
										to promote bee-friendly practices and habitat preservation.
									</p>
								</div>

								<div className={`text-lg ${currentPara === 2 ? 'fade-in-out' : 'hidden'}`}>
									<h2 className="text-2xl font-semibold mb-4 text-primary-700">Crop Yield and Quality</h2>
									<p className="text-justify px-4 text-white">
										Honey bee pollination significantly enhances crop yield and quality.
										When crops receive adequate pollination, they produce larger, healthier, and more uniform fruits and seeds.
										This, in turn, improves the market value and profitability of agricultural produce.
									</p>
									<h2 className="text-2xl font-semibold mt-4 mb-4 text-primary-700">Beyond Sweetness</h2>
									<p className="text-justify px-4 text-white">
										The buzz of honey bees goes beyond producing golden nectar. They safeguard our food security,
										driving economic prosperity and empowering sustainable farming practices.
									</p>
								</div>

								<div className={`text-lg ${currentPara === 3 ? 'fade-in-out' : 'hidden'}`}>
									<h2 className="text-2xl font-semibold mb-4 text-primary-700">Guardians of Tomorrow</h2>
									<p className="text-justify px-4 text-white">
										In a world of challenges, honey bees remind us of our interdependence with nature. Their
										conservation is a testament to our collective responsibility in nurturing a thriving planet.
									</p>
									<h2 className="text-2xl font-semibold mt-4 mb-4 text-primary-700">Economic Impact</h2>
									<p className="text-justify px-4 text-white">
										The honey bee-agriculture bond also has significant economic implications.
										By supporting pollination services, the honey bee industry contributes billions of dollars
										to the global economy each year.
									</p>
								</div>
							</div>
						</div>
						<div className="flex-1">
							<div className="relative h-full">
								<video autoPlay loop muted className="w-full h-full">
									<source src={honeybee} type="video/mp4" />
								</video>
							</div>
						</div>
					</div>
				</div>
				<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${permaculture})` }}>
					<h1 className="text-4xl font-bold text-center mb-12 text-primary-700">Welcome to Permaculture</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						<div className="bg-black p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold mb-2 text-primary-500">Sustainability</h2>
							<p className="text-white">Permaculture promotes sustainable practices by working with nature rather than against it, ensuring long-term viability.</p>
						</div>
						<div className="bg-black p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold mb-2 text-primary-500">Regenerative Agriculture</h2>
							<p className="text-white">It focuses on regenerating the soil and natural ecosystems, leading to improved soil health and fertility.</p>
						</div>
						<div className="bg-black p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold mb-2 text-primary-500">Biodiversity</h2>
							<p className="text-white">Permaculture encourages the cultivation of diverse plant and animal species, enhancing ecosystem resilience.</p>
						</div>
						<div className="bg-black p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold mb-2 text-primary-500">Water Conservation</h2>
							<p className="text-white">It emphasizes the efficient use and management of water resources, reducing waste and enhancing water quality.</p>
						</div>
						<div className="bg-black p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold mb-2 text-primary-500">Energy Efficiency</h2>
							<p className="text-white">Permaculture design seeks to minimize energy inputs and optimize energy outputs in various systems.</p>
						</div>
						<div className="bg-black p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold mb-2 text-primary-500">Local Food Production</h2>
							<p className="text-white">Permaculture encourages the cultivation of food locally, reducing the dependence on distant supply chains.</p>
						</div>
						<div className="bg-black p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold mb-2 text-primary-500">Community Engagement</h2>
							<p className="text-white">Permaculture often fosters a strong sense of community, as it encourages cooperation and sharing of resources.</p>
						</div>
						<div className="bg-black p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold mb-2 text-primary-500">Waste Reduction</h2>
							<p className="text-white">Permaculture systems aim to minimize waste by reusing and recycling materials within the ecosystem.</p>
						</div>
						<div className="bg-black p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold mb-2 text-primary-500">Climate Change Mitigation</h2>
							<p className="text-white">By sequestering carbon through tree planting and sustainable land management, permaculture can help combat climate change.</p>
						</div>
					</div>
				</div>
				<BlogSlider
					blogs={blogslist?.blogs}
					isLoading={isBlogLoading}
				/>
				<QuoteSlider quotes={quotes} />
				<div className="justify-center items-center bg-black py-8 bg-no-repeat bg-cover">
					<div className="mx-auto lg:w-3/4">
						<div className="border-2 border-primary-700 lg:py-12 duration-150 bg-black rounded shadow-xl">
							<h1 className="text-white text-center lg:text-4xl md:text-3xl">
								The future of <a className="text-primary-700 font-serif font-bold">
									<span className="text-primary-800">Farm</span> Investing
								</a> is <span className="text-primary-500 font-serif font-bold italic">Agro Edu Vaango</span>
							</h1>
							<div className="flex justify-center items-center pt-5">
								<button onClick={handleSignin} className="border-2 mt-4 mb-4 px-8 py-3 rounded-lg font-bold border-primary-500 text-white bg-primary-500 hover:text-primary-500 hover:bg-black">
									Join Us
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="fixed bottom-16 right-10 pb-1 z-50">
						<Link to="#" onClick={openWhatsApp}>
							<img
								src={whatsappicon}
								alt="WhatsApp Icon"
								className="w-12 h-12 rounded-lg"
							/>
						</Link>
				</div>
				<button
					className={`fixed z-50 bottom-4 right-10 p-3 bg-primary-700 text-white rounded-lg ${showButton ? 'block' : 'hidden'
						}`}
					onClick={handleScrollToTop}
				>
					<svg
						className={`w-6 h-6 transition-transform rotate-180`}
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				<Footer />
			</div>
		</>
	);
};

export default Home;
