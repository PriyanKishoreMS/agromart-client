import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import signinbg from "../assets/signinbg.jpg";

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

			<div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-mybgcolor to-yellow-600 bg-no-repeat bg-cover"  style={{ backgroundImage: `url(${signinbg})` }}>
				<div className="flex flex-col items-center justify-center w-full max-w-lg px-6 py-28  rounded-lg shadow-md">
					<h1 className="text-4xl font-bold text-mybgcolor-500 mb-8">Agroவாங்கோ</h1>
					<p className="text-gray-700 text-xl mb-8">Sign in to your account</p>
					<button
						type="submit"
						className="bg-mybgcolor-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
						onClick={handleSignInGoogle}
					>
						Sign in with Google
					</button>
					<p className="text-gray-500 text-sm mt-6">
						Don't have an account? <a href="#" className="text-mybgcolor-500 underline">Sign up</a>
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
}
