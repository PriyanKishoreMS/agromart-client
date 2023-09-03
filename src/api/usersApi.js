import axios from "axios";

const ENDPOINT_URL = "https://agromart-dev.onrender.com/api";
// const ENDPOINT_URL = "http://localhost:3000/api";



export const createUser = async userData => {
	try {
		const response = await axios.post(`${ENDPOINT_URL}/postUser`, userData);

		localStorage.setItem("token", response.data.token);

		return response.data
	} catch (err) {
		console.error({ Message: "Error posting user data", Error: err });
	}
};

export const updateUser = async (updateduserData) => {
	try {
		const response = await axios.put(`${ENDPOINT_URL}/updateUser/${updateduserData.userId}`, updateduserData.formData, {
			headers: {
				"auth-token": localStorage.getItem("token")
			},
		});
		return response.data
	} catch (err) {
		console.error({ Message: "Error posting user data", Error: err });
	}
};

export const getUsers = async () => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getUser`, {
			headers: {
				"auth-token": localStorage.getItem("token")
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting user data", Error: err });
	}
};

export const getMyLandServices = async (id, page, limit) => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/userLands/${id}`, {
			params: {
				page: page,
				limit: limit
			},
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};

export const getMyProductServices = async (id, page, limit) => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/userProducts/${id}`, {
			params: {
				page: page,
				limit: limit
			},
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};

export const getLandDetail = async (id) => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getLandService/${id}`, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};

export const DeleteLandData = async (id) => {
	try {
		const response = await axios.delete(`${ENDPOINT_URL}/deleteLandService/${id}`, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};

export const DeleteProductData = async (id) => {
	try {
		const response = await axios.delete(`${ENDPOINT_URL}/deleteProduct/${id}`, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};


export const getFilteredLandServices = async (search, page, limit) => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getLandService`, {
			params: {
				page: page,
				limit: limit,
				search: search
			},
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};

export const getBlogs = async (search, page, limit) => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getBlogs`, {
			params: {
				page: page,
				limit: limit,
				search: search
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting blog data", Error: err });
	}
};

export const postBlog = async blogData => {
	try {
		const response = await axios.post(`${ENDPOINT_URL}/postBlog`, blogData, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
	} catch (err) {
		console.error({ Message: "Error posting Blog data", Error: err });
		throw err;
	}
};

export const deleteBlog = async (blogId) => {
	try {
		const response = await axios.delete(`${ENDPOINT_URL}/deleteBlog/${blogId}`, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export const deleteGalleryImage = async (imgId) => {
	try {
		const response = await axios.delete(`${ENDPOINT_URL}/deleteGallery/${imgId}`, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export const postLandService = async landServiceData => {
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

		const response = await axios.post(`${ENDPOINT_URL}/postLandService`, formData, {
			headers: {
				"auth-token": localStorage.getItem("token"),
				"Content-Type": "multipart/form-data",
			}
		});
	} catch (err) {
		console.error({ Message: "Error posting Land Service data", Error: err });
	}
};

export const postProduct = async productData => {
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
	} catch (err) {
		console.error({ Message: "Error posting Product Service data", Error: err });
	}
};

export const postDonation = async donateData => {
	try {
		const formData = new FormData();

		formData.append("name", donateData.name);
		formData.append("email", donateData.email);
		formData.append("donation", donateData.donate_amount);
		formData.append("transactionMode", donateData.transaction_mode);
		formData.append("purpose", donateData.donate_purpose);
		formData.append("type", donateData.donate_purpose);
		formData.append("transactionId", donateData.transaction_id);
		formData.append("message", donateData.message);

		const response = await axios.post(`${ENDPOINT_URL}/postDonation`, formData, {
			headers: {
				"Content-Type": "application/json",
			}
		});
	} catch (err) {
		console.error({ Message: "Error posting Donation data", Error: err });
		throw err;
	}
};

export const getDonationList = async () => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getDonations`);
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};

export const getProduct = async (search, page, limit) => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getProduct`, {
			params: {
				page: page,
				limit: limit,
				search: search
			},
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};

export const addImageToGallery = async (galleryData) => {
	try {

		const formData = new FormData();
		formData.append('galleryImage', galleryData.galleryImage);
		formData.append('content', galleryData.content);

		const response = await axios.post(`${ENDPOINT_URL}/postGallery`, formData, {
			headers: {
				"auth-token": localStorage.getItem("token"),
				"Content-Type": "multipart/form-data",
			}
		});
		return response.data;
	} catch (error) {
		throw new Error('Failed to add image to the gallery.');
	}
};

export const getGalleryList = async () => {
	try {
		const response = await axios.get(`${ENDPOINT_URL}/getGallery`);
		return response.data;
	} catch (err) {
		console.error({ Message: "Error getting land data", Error: err });
	}
};