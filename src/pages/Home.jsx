import Navbar from "../components/Navbar";

const Home = () => {
	return (
		<>
			<div className=' bg-stone-100'>
				<Navbar />
				<div className='container px-4 py-8 mx-auto'>
					<h1 className='mb-8 text-4xl font-bold text-center text-cyan-800'>
						Welcome to AgroMart
					</h1>
					<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
						<div className='p-8 transition-all duration-150 ease-in-out bg-white rounded shadow hover:shadow-2xl'>
							<h2 className='mb-4 text-2xl font-bold text-cyan-800'>
								Buy Products
							</h2>
							<p className='mb-4 text-gray-700'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
							<img
								src='https://picsum.photos/id/46/300/200'
								alt='Buy Products'
								className='mx-auto'
							/>
						</div>

						<div className='p-8 transition-all duration-150 ease-in-out bg-white rounded shadow hover:shadow-2xl'>
							<h2 className='mb-4 text-2xl font-bold text-cyan-800'>
								Sell Products
							</h2>
							<p className='mb-4 text-gray-700'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
							<img
								src='https://picsum.photos/id/45/300/200'
								alt='Sell Products'
								className='mx-auto'
							/>
						</div>

						<div className='p-8 transition-all duration-150 ease-in-out bg-white rounded shadow hover:shadow-2xl'>
							<h2 className='mb-4 text-2xl font-bold text-cyan-800'>
								Lease Lands
							</h2>
							<p className='mb-4 text-gray-700'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
							<img
								src='https://picsum.photos/id/47/300/200'
								alt='Lease Lands'
								className='mx-auto'
							/>
						</div>

						<div className='p-8 transition-all duration-150 ease-in-out bg-white rounded shadow hover:shadow-2xl '>
							<h2 className='mb-4 text-2xl font-bold text-cyan-800'>Donate</h2>
							<p className='mb-4 text-gray-700'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
							<img
								src='https://picsum.photos/id/48/300/200'
								alt='Donate'
								className='mx-auto'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
