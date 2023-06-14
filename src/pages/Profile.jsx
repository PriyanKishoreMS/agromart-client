import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
	const { user } = useAuth();
	return (
		<>
			<Navbar />
			<div className='p-5 m-5'>
				<h1 className='text-lg'>This is the profile page</h1>
				<h2 className='text-lg'>Welcome {user?.displayName}</h2>
			</div>
		</>
	);
};

export default Profile;
