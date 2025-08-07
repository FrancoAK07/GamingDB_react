import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_URL}/comment`;

export const getComments = async () => {
	const comments = await axios.get(`${apiUrl}`);
	return comments;
};

export const saveComment = async (comment, userId, reviewId) => {
	const response = await axios.post(`${apiUrl}`, { comment, userId, reviewId });
	return response;
};
