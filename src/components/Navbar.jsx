import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, logOut } = useAuth();

	const handleSignOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className='flex flex-wrap items-center justify-between w-full p-6 mb-10 bg-teal-500 lg:px-20'>
			<div className='flex items-center flex-shrink-0 mr-6 text-white'>
				<Link to='/'>
					<span className='text-xl font-semibold tracking-tight'>AgroMart</span>
				</Link>
			</div>
			<div className='block lg:hidden'>
				<button
					className='flex items-center px-3 py-2 text-teal-200 border border-teal-400 rounded hover:text-white hover:border-white'
					onClick={() => setIsOpen(!isOpen)}
				>
					<svg
						className='w-3 h-3 fill-current'
						viewBox='0 0 20 20'
						// xmlns='http://www.w3.org/2000/svg'
					>
						<title>Menu</title>
						<path
							d='M0 0h20v20H0V0zm2 9h16v2H2V9zm0-4h16v2H2V5zm0 8h16v2H2v-2z'
							fillRule='evenodd'
						/>
					</svg>
				</button>
			</div>
			<div className='flex-grow w-full lg:flex lg:items-center lg:w-auto'>
				<div className='text-sm lg:flex-grow'>
					{user?.displayName && (
						<Link
							to='/profile'
							className='block mt-4 mr-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white'
						>
							Profile
						</Link>
					)}
					<Link
						to='/'
						className='block mt-4 mr-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white'
					>
						Home
					</Link>
					<Link
						to='/users'
						className='block mt-4 mr-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white'
					>
						Users
					</Link>
				</div>
				{user?.displayName ? (
					<div>
						<button
							className='inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0'
							onClick={handleSignOut}
						>
							Log Out
						</button>
						<img
							className='inline-block mx-5 rounded-full w-7 h-7'
							src={user?.photoURL}
							alt={user?.displayName}
						/>
					</div>
				) : (
					<div>
						<Link
							to='/signin'
							className='inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0'
						>
							Sign In
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
