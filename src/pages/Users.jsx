import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import { getUsers } from "../api/usersApi";
import Footer from "./Footer";
// import users from "../components/userlistdummy";
import { useNavigate } from "react-router-dom";
import "../components/loading.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEdit } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
	const { isError, isLoading, isSuccess, data, error } = useQuery(
		["users"],
		getUsers
	);
	

	console.log(data, "dataaaa");

	const navigate = useNavigate();

	// if (isSuccess) console.log(data);

	// const users = [
	// 	{ name: 'John Doe', email: 'john.doe@example.com', mobile: '1234567890', propertyType: 'Agri' },
	// 	{ name: 'Jane Smith', email: 'jane.smith@example.com', mobile: '9876543210', propertyType: 'Agri' },
	// 	{ name: 'Robert Johnson', email: 'robert.johnson@example.com', mobile: '5678901234', propertyType: 'NonAgri' },
	// 	{ name: 'Robert Johnson', email: 'robert.johnson@example.com', mobile: '5678901234', propertyType: 'NonAgri' },
	// 	{ name: 'Robert Johnson', email: 'robert.johnson@example.com', mobile: '5678901234', propertyType: 'NonAgri' },
	// ];

	const handleusernav = () => {
		navigate('/workinprogress');
	}

	const handleUserEdit = (data) => {
		navigate(`/updateUser/`, { state: { data } });
	}

	if (isLoading) {
		return (
		  <div className="loading-container">
			<FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
			<span className="loading-text">Loading...</span>
		  </div>
		);
	  }	

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<div className="mt-8 pt-32 overflow-x-auto">
					<div className="w-full overflow-hidden grid md:grid-cols-2 gap-4">
						{data &&
							data.user.map((user) => (
								<div className="vh-10" key={user.uid}>
									<div className="container mx-auto">
										<div className="flex justify-center">
											<div className="mt-5 mb-5 md:w-9/12 lg:w-7/12 xl:w-5/12">
												<div className="bg-white rounded-lg shadow-lg p-4 -mr-20">
													<div className="flex text-black">
														<div className="flex-shrink-0">
															<img
																className="w-28 h-28 rounded-full"
																src={user?.photoURL}
																alt="Profile"
															/>
														</div>
														<div className="flex-grow-1 ms-3">
															<h2 className="text-xl font-semibold">{user?.name}</h2>
															<div className="flex rounded-md bg-gray-300 p-2 mb-2">
																<div className="mr-4">
																	<p className="text-sm text-gray-500 mb-1">Lands Posted</p>
																	<p className="text-lg font-semibold">0</p>
																</div>
																<div className="px-4">
																	<p className="text-sm text-gray-500 mb-1">Products Posted</p>
																	<p className="text-lg font-semibold">0</p>
																</div>
															</div>
															<div className="flex justify-end">
																<button onClick={() => handleUserEdit(user)} className="text-primary-500 hover:text-primary-700">
																	<FontAwesomeIcon icon={faEdit} />
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
				<Footer />
			</div>
			{/* <div className='container mx-auto'>
				<h1 className='mb-4 text-2xl font-bold'>User List</h1>
				{isLoading && <p>Loading...</p>}
				{isError && <p>{error.message}</p>}
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{data &&
						data.map(user => (
							<button
								key={user.id}
								className='flex items-center p-4 duration-200 ease-in-out rounded-lg shadow-md bg-slate-200 hover:bg-slate-300 transition:all'
							>
								<img
									src={user.photoURL}
									alt={user.name}
									className='w-24 h-24 mb-2 mr-4 rounded-full'
								/>
								<div className='text-left'>
									<h2 className='mb-2 text-xl font-bold'>{user.name}</h2>
									<p className='text-gray-600'>{user.email}</p>
								</div>
							</button>
						))}
				</div>	
			</div> */}
		</>
	);
};

export default Users;
