import axios from "axios";
const ENDPOINT_URL = "http://localhost:3000/api";

export const createUser = async userData => {
	try {
		const response = await axios.post(`${ENDPOINT_URL}/postUser`, userData);
		localStorage.setItem("token", response.data.token);
		console.log(response.data);
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
