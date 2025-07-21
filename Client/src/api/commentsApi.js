import axios from "axios";

const apiUrl = "https://gamingdb-react.onrender.com/comment";

export const getComments = async () => {
	const comments = await axios.get(`${apiUrl}`);
	return comments;
};

export const saveComment = async (comment, userId, reviewId) => {
	const response = await axios.post(`${apiUrl}`, { comment, userId, reviewId });
	return response;
};
