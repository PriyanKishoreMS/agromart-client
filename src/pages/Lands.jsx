import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import { getLandServices } from "../api/usersApi";
const Lands = () => {
	const { isError, isLoading, isSuccess, data, error } = useQuery(
		["lands"],
		getLandServices
	);

	// "landLocation": "Kathmandu",
	//         "soilType": "Black",
	//         "waterFacility": "Yes",
	//         "landPrice": "100000",
	//         "landDesc": "This is a land",
	//         "landImage": [
	//             "uploads/lands/1687369824368--567.jpeg",
	//             "uploads/lands/1687369824369--Screenshot from 2021-11-02 15-39-52.png",
	//             "uploads/lands/1687369824377--Screenshot-20211215145343-1920x1080.png"
	//         ],

	if (isSuccess) console.log(data);
	return (
		<>
			<Navbar />
			<div className='container mx-auto'>
				<h1 className='mb-4 text-2xl font-bold'>Land List</h1>
				{isLoading && <p>Loading...</p>}
				{isError && <p>{error.message}</p>}
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{data &&
						data.landService.map(land => (
							<button
								key={land.id}
								className='flex items-center p-4 duration-200 ease-in-out rounded-lg shadow-md bg-slate-200 hover:bg-slate-300 transition:all'
							>
								{land.landImage.map((image, index) => {
									return (
										<img
											key={index}
											src={`http://localhost:3000/${image}`}
											alt={land.landLocation}
											className='w-24 h-24 mb-2 mr-4 '
										/>
									);
								})}
								{/* <img
									src={`http://localhost:3000/${land.landImage[0]}`}
									alt={land.landLocation}
									className='w-24 h-24 mb-2 mr-4 rounded-full'
								/> */}
								<div className='text-left'>
									<h2 className='mb-2 text-xl font-bold'>
										{land.landLocation}
									</h2>
									<p className='text-gray-600'>{land.landDesc}</p>
								</div>
							</button>
						))}
				</div>
			</div>
		</>
	);
};
export default Lands;
