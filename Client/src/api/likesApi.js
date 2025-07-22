import axios from "axios";

const apiUrl = "https://gamingdb-react.onrender.com/likes";

export const getLikes = async () => {
	const likes = await axios.get(`${apiUrl}`);
	return likes;
};
export const saveLike = async (userId, reviewId) => {
	const response = await axios.post(`${apiUrl}`, { userId, reviewId });
	return response;
};
export const deleteLike = async (userId, reviewId) => {
	const response = await axios.delete(`${apiUrl}`, { params: { userId: userId, reviewId: reviewId } });
	return response;
};
