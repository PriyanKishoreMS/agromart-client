import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signin() {
	const { googleSignIn, user } = useAuth();
	const navigate = useNavigate();
	const handleSignInGoogle = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user) navigate("/profile");
	}, [user]);

	return (
		<>
			<div className='flex flex-col items-center justify-center min-h-screen bg-slate-200'>
				<div className='flex flex-col items-center justify-center w-full px-6 py-4 bg-white rounded-lg shadow-md sm:max-w-md'>
					<div className='mt-5 text-3xl font-bold text-teal-500'>AgroMart</div>
					<h1 className='mt-4 mb-8 text-2xl font-semibold text-center text-gray-800'>
						Sign in to your account
					</h1>
					{/* <form className='w-full'>
						<div className='flex flex-col mb-2'>
							<div className='relative flex '>
								<span className='absolute left-0 inline-flex items-center justify-center pl-3 top-2'>
									<svg
										className='w-6 h-6 text-gray-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M4 6h16M4 10h16M4 14h16M4 18h16'
										></path>
									</svg>
								</span>
								<input
									type='email'
									className='w-full h-10 pl-10 pr-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'
									placeholder='Email'
								/>
							</div>
						</div>
						<div className='flex flex-col mb-6'>
							<div className='relative flex '>
								<span className='absolute left-0 inline-flex items-center justify-center pl-3 top-2'>
									<svg
										className='w-6 h-6 text-gray-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
										></path>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M15 12H3a9 9 0 0118 0h-2.118'
										></path>
									</svg>
								</span>
								<input
									type='password'
									className='w-full h-10 pl-10 pr-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline'
									placeholder='Password'
								/>
							</div>
						</div>
						<div className='flex items-center mb-6 -mt-4'>
							<div className='flex ml-auto'>
								<a
									href='#'
									className='inline-flex text-xs font-thin text-gray-500 hover:text-black'
								>
									Forgot Your Password?
								</a>
							</div>
						</div>
						<div className='flex w-full'>
							<button
								type='submit'
								className='flex items-center justify-center w-full px-6 py-3 text-base font-medium leading-5 text-white transition duration-150 ease-in-out bg-teal-500 border border-transparent rounded-lg shadow hover:bg-teal-400 focus:outline-none focus:border-teal-600 focus:shadow-outline-teal'
							>
								<span className='w-full'>Login</span>
							</button>
						</div>
					</form> */}
					{/* google sign in button in google color*/}
					<div className='flex w-full mt-4'>
						{/* google sign in button with google color */}
						<button
							type='submit'
							className='flex items-center justify-center w-full px-6 py-3 text-base font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-lg shadow hover:bg-blue-400 focus:outline-none focus:border-blue-600 focus:shadow-outline-blue'
							onClick={handleSignInGoogle}
						>
							<span className='w-full'>Sign in with Google</span>
						</button>
					</div>

					<div className='flex items-center justify-center mt-6'>
						<a
							href='#'
							className='inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-black'
						>
							<span className='ml-2'>You don't have an account?</span>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
