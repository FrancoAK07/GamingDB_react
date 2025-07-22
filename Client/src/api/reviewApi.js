import axios from "axios";

const apiUrl = "https://gamingdb-react.onrender.com/review";

export const getLastReviews = async () => {
	const lastReviews = await axios.get(`${apiUrl}/recent`);
	return lastReviews;
};

export const getMyReviews = async (userId) => {
	const myReviews = await axios.get(`${apiUrl}/myReviews`, { params: { userId: userId } });
	return myReviews;
};

export const getReviewInfo = async (reviewId) => {
	const reviewInfo = await axios.get(`${apiUrl}/reviewInfo`, { params: { reviewID: reviewId } });
	return reviewInfo;
};

export const saveReview = async (review, rating, platform, user, gameId, userId) => {
	console.log(review, rating, platform, user, gameId, userId);
	const savedReview = await axios.post(`${apiUrl}`, { review, rating, platform, user, gameId, userId });
	return savedReview;
};

export const update = async (review, rating, platform, reviewID) => {
	const response = await axios.put(`${apiUrl}`, { review, rating, platform, reviewID });
	return response;
};

export const deleteReview = async (reviewId) => {
	const response = await axios.delete(`${apiUrl}`, { params: { reviewID: reviewId } });
	return response;
};
