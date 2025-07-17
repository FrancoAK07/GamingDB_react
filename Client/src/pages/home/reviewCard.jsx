import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { saveLike2 } from "../../utils/helpers.js";

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

	function expandOrShrink2(index, e) {
		if (isExpanded[index] === true) {
			reviewRef.current[index].classList.add("user-review");
			let isExpandedCopy = isExpanded;
			isExpandedCopy[index] = false;
			setIsExpanded(isExpandedCopy);
			e.target.innerHTML = "Read More";
		} else {
			reviewRef.current[index].classList.remove("user-review");
			let isExpandedCopy = isExpanded;
			isExpandedCopy[index] = true;
			setIsExpanded(isExpandedCopy);
			e.target.innerHTML = "Read Less";
		}
	}

	const countLikes = (review, index) => {
		let likeCount = 0;
		for (let like of likes) {
			if (parseInt(review.Review_ID) === parseInt(like.Review_Id)) {
				likeCount += 1;
			}
		}
		reviewsLikes[index] = likeCount;
	};

	function checkIfLiked(review, index) {
		for (let like of likes) {
			if (parseInt(like.User_Id) === parseInt(userId) && parseInt(like.Review_Id) === parseInt(review.Review_ID)) {
				return (
					<div className="d-flex align-items-center bg-secondary p-1 rounded-2">
						{reviewsLikes[index]}
						<img className="ms-2 text-center" src={require(`../../assets/images/heart2.png`)} alt="" />
					</div>
				);
			}
		}
		return (
			<div className="d-flex align-items-center bg-secondary p-1 rounded-2">
				{reviewsLikes[index]}
				<img className="ms-2 text-center" src={require(`../../assets/images/heart3.png`)} alt="" />
			</div>
		);
	}

	const countComments = (review, index) => {
		let commentCount = 0;
		for (let comment of comments) {
			if (parseInt(comment.Review_Id) === parseInt(review.Review_ID)) {
				commentCount += 1;
			}
		}
		reviewsComments[index] = commentCount;
	};

	const expandComments = (index) => {
		if (userLogged) {
			let showCommentsCopy = showComments;
			showCommentsCopy.forEach((item, i) => {
				if (index === i) {
					showCommentsCopy[index] = !showCommentsCopy[index];
				} else {
					showCommentsCopy[i] = false;
				}
			});
			setShowComments([...showCommentsCopy]);
		} else {
			toast("Sign in to add a comment", {
				style: { background: "#212529", color: "white", border: "1px solid gray" },
				duration: 2000,
			});
		}
	};

	const checkCommentRef = (item, index) => {
		if (item && showComments[index]) {
			commentRef.current.push(item);
		} else {
			commentRef.current = [];
		}
	};

	function displayComment(review) {
		let matchingComments = [];

		comments.forEach((comment, index) => {
			if (parseInt(review.Review_ID) === parseInt(comment.Review_Id)) {
				matchingComments.push(
					<div className="col-12 p-2 border border-1 border-secondary rounded-2 mb-2 text-white" key={index}>
						<div className="row w-100 m-auto">{comment.User_Name}</div>
						<div className="row w-100 m-auto ms-2">{comment.Comment_Text}</div>
					</div>
				);
			}
		});
		return matchingComments;
	}

	const saveComment2 = async (review) => {
		if (commentRef.current[0].value) {
			const commentsCopy = comments.slice();
			const commentText = commentRef.current[0].value;
			commentRef.current[0].value = "";
			setComments((prevComments) => [
				...prevComments,
				{ Comment_Text: commentText, User_Id: userId, Review_Id: review.Review_ID, User_Name: user },
			]);

			try {
				await axios.post("https://gamingdb-react.onrender.com/comment", {
					userId: userId,
					comment: commentText,
					reviewId: review.Review_ID,
				});
			} catch (error) {
				console.error("Error posting comment:", error);
				toast.error("Error posting comment", {
					style: { background: "#212529", color: "white", border: "1px solid gray" },
				});
				setComments(commentsCopy);
			}
		} else {
			toast("Can't add empty comment", {
				style: { background: "#212529", color: "white", border: "1px solid gray" },
				duration: 2000,
			});
		}
	};

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
							<div className="col-12 col-lg text-white p-0">
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
									<div className="user-review border border-secondary rounded p-2" ref={(item) => reviewRef.current.push(item)}>
										{review.Game_Review}
									</div>
									{showReadMoreOrLess[index] ? (
										<Link className="text-decoration-none text-center" onClick={(e) => expandOrShrink2(index, e)}>
											Read More
										</Link>
									) : null}
								</div>
								{countLikes(review, index)}
								{countComments(review, index)}
								<div className="row w-100 m-auto text-white mt-2">
									<div className="col-2">
										<button
											className="like-btn btn rounded text-white border-0"
											onClick={() => {
												saveLike2(userId, review.Review_ID, likes, setLikes);
											}}>
											{checkIfLiked(review, index)}
										</button>
									</div>
									<div className="col-2 ms-3">
										<button
											className="comment-btn btn rounded text-white border-0"
											onClick={() => {
												expandComments(index);
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
											ref={(item) => checkCommentRef(item, index)}
											placeholder="Your comment here..."></textarea>
										<button className="d-block btn btn-primary mb-4" onClick={() => saveComment2(review)}>
											Save Comment
										</button>
									</div>
									{displayComment(review)}
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
