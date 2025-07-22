import React, { useState, useRef } from "react";
import StarRating from "../components/starRating";
import Dropdown from "../components/dropdown";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { saveReview } from "../api";

function CreateReview({ gameImg1, background1, gameID }) {
	const [rating, setRating] = useState(null);
	const [platform, setPlatform] = useState("");
	const navigate = useNavigate();
	const reviewTextRef = useRef(null);
	const user = useRef(sessionStorage.getItem("user"));
	const userId = useRef(sessionStorage.getItem("userId"));

	function getRating(rating) {
		setRating(rating);
	}

	function getPlatform(platform) {
		setPlatform(platform);
	}

	function createReview() {
		if (!reviewTextRef.current.value || !rating || !platform) {
			toast.error("please complete the review", {
				style: {
					background: "#212529",
					color: "white",
					border: "1px solid gray",
				},
			});
		} else {
			saveReview(reviewTextRef.current.value, parseInt(rating), platform, user.current, gameID, userId.current)
				.then(() => {
					toast.success("review created!", {
						style: {
							background: "#212529",
							color: "white",
							border: "1px solid gray",
						},
					});
					navigate("/reviews");
				})
				.catch((err) => console.error("this is the error:", err));
		}
	}

	return (
		<div className="create-review vh-100 bg-dark container-fluid p-0">
			<div className="background position-relative">
				<div className="gradient position-absolute"></div>
				<img
					className="background-img w-100 h-100"
					src={background1 ? require(`../assets/images/${background1}`) : null}
					alt=""
				/>
				<div className="background-upload position-absolute top-0 start-0 "></div>
				<div className="game-img position-absolute start-50 top-50 translate-middle text-center">
					<img className="img-fluid h-100 w-100" src={gameImg1 ? require(`../assets/images/${gameImg1}`) : null} alt="" />
				</div>
			</div>
			<div className="container">
				<div className="row justify-content-center mt-2 ">
					<div className="col-12 justify-content-center w-75">
						<textarea
							className="d-block w-100 bg-transparent text-white"
							cols="40"
							rows="7"
							placeholder="Your Review Here..."
							ref={reviewTextRef}></textarea>
						<button
							className="btn btn-primary d-block mx-auto mt-2"
							type="button"
							onClick={() => {
								createReview();
							}}>
							create review
						</button>
					</div>
					<div className="col-12 justify-content-between d-flex mt-3">
						<StarRating getRating={getRating} />
						<Dropdown getPlatform={getPlatform} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateReview;
