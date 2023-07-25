import axios from "axios";
const ENDPOINT_URL = "https://agromart-dev.onrender.com/api";

export const createUser = async userData => {
	try {
		const response = await axios.post(`${ENDPOINT_URL}/postUser`, userData);
		localStorage.setItem("token", response.data.token);
		// console.log(response.data);
	} catch (err) {
		console.error({ Message: "Error posting user data", Error: err });
	}
};

export const getUsers = async () => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getUser`);
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting user data", Error: err });
	}
};

export const getLandServices = async () => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getLandService`, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};

export const getFilteredLandServices = async search => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getLandService?search=${search}`, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},	
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};

export const postLandService = async landServiceData => {
	// console.log("Entered", landServiceData);
	try {
		const response = await axios.post(`${ENDPOINT_URL}/postLandService`, landServiceData, {
			headers: {
				"auth-token": localStorage.getItem("token")
			}
		});	
		console.log(response.data);
	} catch (err) {
		console.error({ Message: "Error posting Land Service data", Error: err });
	}
};

export const postProduct = async productData => {
	console.log("Entered", productData);
	try {
		const response = await axios.post(`${ENDPOINT_URL}/postProduct`, productData, {
			headers: {
				"auth-token": localStorage.getItem("token")
			}
		});	
		console.log(response.data);
	} catch (err) {
		console.error({ Message: "Error posting Product Service data", Error: err });
	}
};

// fetch(`${ENDPOINT_URL}/postLandService`, {
		// 	method: 'POST',
		// 	headers: {
		// 	  'Content-Type': 'application/json',
		// 	  "auth-token": localStorage.getItem("token"),
		// 	},
		// 	body: JSON.stringify(landServiceData),
		// });

export const getProduct = async () => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getProduct`, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};