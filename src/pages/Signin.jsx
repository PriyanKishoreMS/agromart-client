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
					<div className='flex w-full mt-4'>
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
