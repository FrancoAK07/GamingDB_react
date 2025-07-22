import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import ReviewCard2 from "../components/reviewCard2.jsx";
import { getMyReviews, deleteReview, getLikes, getComments } from "../api";
import { isLoading } from "../utils/helpers.js";

function Reviews({ getGameID, getID }) {
	const [reviews, setReviews] = useState([]);
	const userIdRef = useRef(sessionStorage.getItem("userId"));
	const [likes, setLikes] = useState([]);
	const [showComments, setShowComments] = useState([]);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			getMyReviews(userIdRef.current).then((data) => {
				setReviews(data.data);
				setShowComments(
					data.data.map(() => {
						return false;
					})
				);
				setLoading(false);
			});
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getLikes().then((data) => {
			setLikes(data.data);
		});
	}, []);

	useEffect(() => {
		getComments().then((data) => {
			setComments(data.data);
		});
	}, []);

	async function deleteReview2(reviewId) {
		if (window.confirm("Delete review?")) {
			const reviewsCopy = reviews.slice();
			setReviews((prevReviews) => prevReviews.filter((review) => review.Review_ID !== reviewId));
			try {
				await deleteReview(reviewId);
			} catch (error) {
				console.error("Error deleting review:", error);
				toast.error("Error deleting review", {
					style: { background: "#212529", color: "white", border: "1px solid gray" },
				});
				setReviews(reviewsCopy);
			}
		}
	}

	return (
		<div className="review-card container mb-4 ">
			<h1 className="mb-3 text-white text-center mt-2">My Reviews</h1>
			{loading
				? isLoading()
				: reviews.map((review, index) => {
						return (
							<ReviewCard2
								key={review.Review_ID}
								likes={likes}
								setLikes={setLikes}
								comments={comments}
								setComments={setComments}
								review={review}
								index={index}
								deleteReview={deleteReview2}
								getGameID={getGameID}
								getID={getID}
								showComments={showComments}
								setShowComments={setShowComments}
							/>
						);
					})}
		</div>
	);
}

export default Reviews;
