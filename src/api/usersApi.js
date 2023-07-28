import axios from "axios";
const ENDPOINT_URL = "https://agromart-dev.onrender.com/api";
// const ENDPOINT_URL = "http://localhost:3000/api";

export const createUser = async userData => {
	try {
		const response = await axios.post(`${ENDPOINT_URL}/postUser`, userData);
		localStorage.setItem("token", response.data.token);
		console.log(response.data, "tokennnnnnnn");
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

export const getFilteredLandServices = async (search, page) => {
	try {
		console.log("Pages", page);
		const limit = 50;
		// const skip = page * limit;
		const response = await axios.get(`${ENDPOINT_URL}/getLandService`, {
			params: {
				page: page, 
				limit: limit, 
				search: search},
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
	// console.log("Entered", localStorage.getItem("token"));
	try {
		const formData = new FormData();

		formData.append("landLocation", landServiceData.landLocation);
		formData.append("landArea", landServiceData.landArea);
		formData.append("registered", landServiceData.registered);
		formData.append("cropType", landServiceData.cropType);
		formData.append("cultivationType", landServiceData.cultivationType);
		formData.append("cultivationHistory", landServiceData.cultivationHistory);
		formData.append("waterFacility", landServiceData.waterFacility);
		formData.append("landPrice", landServiceData.landPrice);
		formData.append("landDesc", landServiceData.landDesc);

		landServiceData.landImage.forEach((image, index) => {
			formData.append("landImage", image);
		});

		console.log(formData, "ddddddddddddd");

		const response = await axios.post(`${ENDPOINT_URL}/postLandService`, formData, {
			headers: {
				"auth-token": localStorage.getItem("token"),
				"Content-Type": "multipart/form-data",
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
		const formData = new FormData();

		formData.append("productName", productData.productName);
		formData.append("productCategory", productData.productCategory);
		formData.append("productPrice", productData.productPrice);
		formData.append("productManufacturer", productData.productManufacturer);
		formData.append("productQuantity", productData.productQuantity);
		formData.append("productDescription", productData.productDescription);

		productData.productImage.forEach((image, index) => {
			formData.append("productImage", image)
		})

		const response = await axios.post(`${ENDPOINT_URL}/postProduct`, formData, {
			headers: {
				"auth-token": localStorage.getItem("token"),
				"Content-Type": "multipart/form-data",
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