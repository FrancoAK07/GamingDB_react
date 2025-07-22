import toast from "react-hot-toast";
import { saveComment, deleteLike, saveLike } from "../api";

// save comment
const saveComment2 = async (review, comments, commentRef, setComments, userId, user) => {
	if (commentRef.current[0].value) {
		const commentsCopy = comments.slice();
		const commentText = commentRef.current[0].value;
		commentRef.current[0].value = "";
		setComments((prevComments) => [
			...prevComments,
			{ Comment_Text: commentText, User_Id: userId, Review_Id: review.Review_ID, User_Name: user },
		]);

		try {
			await saveComment(commentText, userId, review.Review_ID);
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

// save like
async function saveLike2(userId, reviewId, likes, setLikes) {
	if (!userId) {
		toast.error("Log in to like a comment", {
			style: { background: "#212529", color: "white", border: "1px solid gray" },
		});
		return;
	} else {
		const alreadyLiked = likes.some(
			(like) => parseInt(like.User_Id) === parseInt(userId) && parseInt(like.Review_Id) === parseInt(reviewId)
		);

		if (alreadyLiked) {
			setLikes((prevLikes) =>
				prevLikes.filter(
					(like) => !(parseInt(like.User_Id) === parseInt(userId) && parseInt(like.Review_Id) === parseInt(reviewId))
				)
			);
			await deleteLike(userId, reviewId).catch((error) => {
				console.error("Error removing like:", error);
				toast.error("Error removing like", {
					style: { background: "#212529", color: "white", border: "1px solid gray" },
				});
				setLikes((prevLikes) => [...prevLikes, { User_Id: userId, Review_Id: reviewId }]);
			});
		} else {
			setLikes((prevLikes) => [...prevLikes, { User_Id: userId, Review_Id: reviewId }]);
			await saveLike(userId, reviewId).catch((error) => {
				console.error("Error adding like:", error);
				toast.error("Error adding like", {
					style: { background: "#212529", color: "white", border: "1px solid gray" },
				});
				setLikes((prevLikes) =>
					prevLikes.filter(
						(like) => !(parseInt(like.User_Id) === parseInt(userId) && parseInt(like.Review_Id) === parseInt(reviewId))
					)
				);
			});
		}
	}
}

// expand or shrink review
function expandOrShrink2(e, isExpanded, setIsExpanded, reviewRef) {
	if (isExpanded === true) {
		reviewRef.current.classList.add("user-review");
		setIsExpanded(false);
		e.target.innerHTML = "Read More";
	} else {
		reviewRef.current.classList.remove("user-review");
		setIsExpanded(true);
		e.target.innerHTML = "Read Less";
	}
}

// count number of likes
const countLikes = (review, index, likes, reviewsLikes) => {
	let likeCount = 0;
	for (let like of likes) {
		if (parseInt(review.Review_ID) === parseInt(like.Review_Id)) {
			likeCount += 1;
		}
	}
	reviewsLikes[index] = likeCount;
};

// Check if the current user liked a review
function checkIfLiked(review, index, likes, userId, reviewsLikes) {
	for (let like of likes) {
		if (parseInt(like.User_Id) === parseInt(userId) && parseInt(like.Review_Id) === parseInt(review.Review_ID)) {
			return (
				<div className="d-flex align-items-center bg-secondary p-1 rounded-2">
					{reviewsLikes[index]}
					<img className="ms-2 text-center" src={require(`../assets/images/heart2.png`)} alt="" />
				</div>
			);
		}
	}
	return (
		<div className="d-flex align-items-center bg-secondary p-1 rounded-2">
			{reviewsLikes[index]}
			<img className="ms-2 text-center" src={require(`../assets/images/heart3.png`)} alt="" />
		</div>
	);
}

// Count number of comments for a review
const countComments = (review, index, comments, reviewsComments) => {
	let commentCount = 0;
	for (let comment of comments) {
		if (parseInt(comment.Review_Id) === parseInt(review.Review_ID)) {
			commentCount += 1;
		}
	}
	reviewsComments[index] = commentCount;
};

// expand the comment section
const expandComments = (index, userLogged, showComments, setShowComments) => {
	if (userLogged) {
		let showCommentsCopy = showComments;
		showCommentsCopy.forEach((_, i) => {
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

const checkCommentRef = (item, index, showComments, commentRef) => {
	if (item && showComments[index]) {
		commentRef.current.push(item);
	} else {
		commentRef.current = [];
	}
};

function displayComment(review, comments) {
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

function isLoading(loading) {
	return (
		<div className="row w-75 m-auto justify-content-center position-absolute top-50 start-50 translate-middle">
			<div className="spinner-border text-primary" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}

export {
	saveComment2,
	saveLike2,
	expandOrShrink2,
	countLikes,
	checkIfLiked,
	countComments,
	expandComments,
	checkCommentRef,
	displayComment,
	isLoading,
};
