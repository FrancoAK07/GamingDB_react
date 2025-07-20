import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReviewCard2 from "../components/reviewCard2.jsx";

function Reviews({ getGameID, getID }) {
	const [reviews, setReviews] = useState([]);
	const userIdRef = useRef(sessionStorage.getItem("userId"));
	const [likes, setLikes] = useState([]);
	const [showComments, setShowComments] = useState([]);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			axios
				.get("https://gamingdb-react.onrender.com/review/myReviews", { params: { userId: userIdRef.current } })
				.then((data) => {
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
		axios.get("https://gamingdb-react.onrender.com/likes").then((data) => {
			setLikes(data.data);
		});
	}, []);

	useEffect(() => {
		axios.get("https://gamingdb-react.onrender.com/comment").then((data) => {
			setComments(data.data);
		});
	}, []);

	async function deleteReview2(reviewId) {
		if (window.confirm("Delete review?")) {
			const reviewsCopy = reviews.slice();
			setReviews((prevReviews) => prevReviews.filter((review) => review.Review_ID !== reviewId));
			try {
				await axios.delete("https://gamingdb-react.onrender.com/review", { params: { reviewID: reviewId } });
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
			{loading ? (
				<div className="row w-75 m-auto justify-content-center position-absolute top-50 start-50 translate-middle">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : (
				reviews.map((review, index) => {
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
				})
			)}
		</div>
	);
}

export default Reviews;
