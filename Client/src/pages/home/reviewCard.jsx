import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import {
	saveLike2,
	expandOrShrink2,
	countLikes,
	checkIfLiked,
	saveComment2,
	countComments,
	expandComments,
	checkCommentRef,
	displayComment,
} from "../../utils/helpers.js";

function ReviewCard() {
	const [reviews, setReviews] = useState([]);
	const [isExpanded, setIsExpanded] = useState([]);
	const reviewRef = useRef([]);
	const commentRef = useRef([]);
	const [showReadMoreOrLess, setShowReadMoreOrLess] = useState([]);
	const [likes, setLikes] = useState([]);
	const [comments, setComments] = useState([]);
	const userId = sessionStorage.getItem("userId");
	const user = sessionStorage.getItem("user");
	let reviewsLikes = [];
	let reviewsComments = [];
	const [showComments, setShowComments] = useState([]);
	const userLogged = sessionStorage.getItem("logged");

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

	useEffect(() => {
		axios.get("https://gamingdb-react.onrender.com/review/recent").then((data) => {
			setReviews(data.data);
			setShowReadMoreOrLess(
				data.data.map(() => {
					return false;
				})
			);
			setShowComments(
				data.data.map(() => {
					return false;
				})
			);
		});
	}, []);

	useEffect(() => {
		if (reviewRef.current[0]) {
			reviewRef.current.forEach((div, i) => {
				if (div?.scrollHeight > 56) {
					setShowReadMoreOrLess((prevState) => {
						let newArray = [...prevState];
						newArray[i] = true;
						return newArray;
					});
				}
			});
		}
	}, [reviews]);

	return (
		<div className="review-card container position-relative">
			{!reviews.length ? (
				<div className="row w-75 m-auto justify-content-center position-absolute top-50 start-50 translate-middle">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : null}
			{reviews.map((review, index) => {
				return (
					<div className="p-2 mb-4 rounded border border-secondary" key={review.Review_ID}>
						<div className="row w-100 m-auto">
							<h2 className="text-white">{review.Game_Title}</h2>
						</div>
						<div className="row w-100 m-auto">
							<div className="col-6 col-lg-2 mh-100 text-center p-2 mx-auto">
								<img className="img-fluid" src={require(`../../assets/images/${review.Game_Img}`)} alt="" />
							</div>
							<div className="col-12 col-lg-10 text-white p-0">
								<div className="user-name row w-100 m-auto">{review.User}</div>
								<div className="platform row mt-2 w-100 m-auto">{review.Platform}</div>
								<div className="row mt-2 justify-content-start w-100 m-auto">
									<div className="rating1 col p-0">
										{[...Array(5)].map((star, i) => {
											return (
												<FaStar color={review.Game_Rating >= i + 1 ? "#ffc107" : "#e4e5e9"} key={`${review.Review_ID}-${i}`} />
											);
										})}
									</div>
								</div>
								<div className={"row w-100 m-auto mt-2 rounded" + index}>
									<div
										className="user-review review-content mw-100 border border-secondary rounded p-2"
										ref={(item) => reviewRef.current.push(item)}>
										{review.Game_Review}
									</div>
									{showReadMoreOrLess[index] ? (
										<Link
											className="text-decoration-none text-center"
											onClick={(e) => expandOrShrink2(index, e, isExpanded, setIsExpanded, reviewRef)}>
											Read More
										</Link>
									) : null}
								</div>
								{countLikes(review, index, likes, reviewsLikes)}
								{countComments(review, index, comments, reviewsComments)}
								<div className="row w-100 m-auto text-white mt-2">
									<div className="col-2">
										<button
											className="like-btn btn rounded text-white border-0"
											onClick={() => {
												saveLike2(userId, review.Review_ID, likes, setLikes);
											}}>
											{checkIfLiked(review, index, likes, userId, reviewsLikes)}
										</button>
									</div>
									<div className="col-2 ms-3">
										<button
											className="comment-btn btn rounded text-white border-0"
											onClick={() => {
												expandComments(index, userLogged, showComments, setShowComments);
											}}>
											<div className="d-flex align-items-center bg-secondary p-1 rounded-2">
												{reviewsComments[index]}
												<img className="ms-2 text-center" src={require(`../../assets/images/comments.png`)} alt="" />
											</div>
										</button>
									</div>
								</div>
							</div>
							{showComments[index] && (
								<div className="row w-100 m-auto rounded-2 p-2">
									<div>
										<textarea
											className="mt-2 w-100 p-1"
											name="comment"
											id="comment"
											rows="3"
											cols="5"
											ref={(item) => checkCommentRef(item, index, showComments, commentRef)}
											placeholder="Your comment here..."></textarea>
										<button
											className="d-block btn btn-primary mb-4"
											onClick={() => saveComment2(review, comments, commentRef, setComments, userId, user)}>
											Save Comment
										</button>
									</div>
									{displayComment(review, comments)}
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ReviewCard;
