import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import { getUsers } from "../api/usersApi";

const Users = () => {
	const { isError, isLoading, isSuccess, data, error } = useQuery(
		["users"],
		getUsers
	);

	if (isSuccess) console.log(data);

	return (
		<>
			<Navbar />
			<div className='container mx-auto'>
				<h1 className='mb-4 text-2xl font-bold'>User List</h1>
				{isLoading && <p>Loading...</p>}
				{isError && <p>{error.message}</p>}
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{data &&
						data.user.map(user => (
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
			</div>
		</>
	);
};

export default Users;
