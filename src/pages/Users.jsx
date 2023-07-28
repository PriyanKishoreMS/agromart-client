import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import { getUsers } from "../api/usersApi";
import Footer from "./Footer";
// import users from "../components/userlistdummy";
import { useNavigate } from "react-router-dom";
import "../components/loading.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
	const { isError, isLoading, isSuccess, data, error } = useQuery(
		["users"],
		getUsers
	);

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
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<div className="mt-8 overflow-x-auto">
					<div className="w-full overflow-hidden">
						<table className="w-full border-collapse">
							<thead>
								<tr className="bg-slate-200">
									<th className="p-4 text-left font-semibold">Name</th>
									<th className="p-4 text-left font-semibold">Email</th>
									<th className="p-4 text-left font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{data &&
									data.user.map(user => (
										<tr key={user.id} className="bg-white">
											<td className="p-4">{user.name}</td>
											<td className="p-4">{user.email}</td>
											<td className="p-4">
												<button
													// onClick={handleUserEdit}
													className="px-3 py-1 rounded-md bg-mybgcolor-500 text-white hover:bg-yellow-700"
												>
													Edit
												</button>
												<button
													// onClick={handleUserDelete}
													className="px-3 py-1 ml-2 rounded-md bg-red-500 text-white hover:bg-red-600"
												>
													Delete
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
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
