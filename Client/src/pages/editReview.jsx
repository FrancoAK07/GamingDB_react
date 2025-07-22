import React, { useState, useEffect, useRef } from "react";
import StarRating from "../components/starRating";
import Dropdown from "../components/dropdown";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { isLoading } from "../utils/helpers.js";
import { getReviewInfo, update } from "../api";

function EditReview({ reviewID, gameID }) {
	const [file, setFile] = useState(null);
	const [gameFile, setGameFile] = useState(null);
	const [dbRating, setDbRating] = useState(null);
	const reviewRef = useRef();
	const [platform, setPlatform] = useState("");
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [reviewText, setReviewText] = useState("");

	function getRating(rating) {
		setDbRating(rating);
	}

	function getPlatform(platform) {
		setPlatform(platform);
	}

	useEffect(() => {
		getReviewInfo(reviewID)
			.then((data) => {
				setDbRating(data.data[0].Game_Rating);
				setPlatform(data.data[0].Platform);
				setReviewText(data.data[0].Game_Review);
				setFile(data.data[0].Game_Background);
				setGameFile(data.data[0].Game_Img);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [reviewID]);

	function updateReview() {
		if (!reviewRef.current.value || !dbRating || !platform) {
			alert("please complete the review");
		} else {
			update(reviewRef.current.value, parseInt(dbRating), platform, reviewID).then(() => {
				toast.success("review updated!", { style: { background: "#212529", color: "white", border: "1px solid gray" } });
				navigate("/reviews");
			});
		}
	}

	return (
		<div className="create-review vh-100 bg-dark container-fluid p-0">
			{loading ? (
				isLoading()
			) : (
				<>
					<div className="background position-relative">
						<div className="gradient position-absolute"></div>
						<img className="background-img w-100 h-100" src={file ? require(`../assets/images/${file}`) : null} alt="" />
						<div className="background-upload position-absolute top-0 start-0 "></div>
						<div className="game-img position-absolute start-50 top-50 translate-middle text-center">
							<img className="img-fluid h-100 w-100" src={gameFile ? require(`../assets/images/${gameFile}`) : null} alt="" />
						</div>
					</div>
					<div className="container">
						<div className="row justify-content-center mt-2 ">
							<div className="col-12 justify-content-center w-75">
								<textarea
									className="d-block w-100 bg-transparent text-white p-2"
									cols="40"
									rows="7"
									ref={reviewRef}
									defaultValue={reviewText ? reviewText : null}
									placeholder="Your Review Here..."></textarea>
								<button
									className="btn btn-primary d-block mx-auto mt-2"
									type="button"
									onClick={() => {
										updateReview();
									}}>
									Update review
								</button>
							</div>
							<div className="col-12 justify-content-between d-flex mt-3">
								<StarRating getRating={getRating} dbRating={dbRating} />
								<Dropdown getPlatform={getPlatform} platform={platform} />
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default EditReview;
