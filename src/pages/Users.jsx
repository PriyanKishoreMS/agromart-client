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

	const navigate = useNavigate();

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
					<div className="container mx-auto grid md:grid-cols-2 gap-4">
						{data &&
							data.user.map((user) => (
								<div className="vh-10" key={user.uid}>
									<div className="flex justify-center">
										<div className="mt-5 mb-5 w-full md:w-9/12 lg:w-7/12 xl:w-5/12">
											<div className="bg-white rounded-lg shadow-lg p-4 -mr-20">
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<img
															className="w-20 h-20 rounded-full"
															src={user?.photoURL}
															alt="Profile"
														/>
														<h2 className="text-lg font-semibold ml-3">{user?.name}</h2>
													</div>
													<div className="flex-shrink-0">
														<button
															onClick={() => handleUserEdit(user)}
															className="text-primary-500 hover:text-primary-700"
														>
															<FontAwesomeIcon icon={faEdit} />
														</button>
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
		</>
	);
};

export default Users;
