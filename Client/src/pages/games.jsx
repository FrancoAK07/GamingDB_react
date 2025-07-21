import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { isLoading } from "../utils/helpers.js";
import { getAllGames } from "../api/gamesApi.js";

function Games({ getID, getGameImg, getBackground, getGameID }) {
	const [games, setGames] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [userLists, setUserLists] = useState([]);
	const userLogged = sessionStorage.getItem("logged");
	const userId = sessionStorage.getItem("userId");
	const addToListFormRef = useRef(null);
	const optionsRef = useRef(null);
	const optionsBtnRef = useRef(null);
	const [showListsForm, setShowListsForm] = useState(false);
	let listsId = [];
	const gameid = useRef();
	const addToListBtnRef = useRef([]);
	const [listGames, setListGames] = useState();
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// axios.get("https://gamingdb-react.onrender.com/game/getAll").then((data) => {
		// 	setGames(data.data);
		// 	setOptions(
		// 		data.data.map(() => {
		// 			return false;
		// 		})
		// 	);
		// 	setLoading(false);
		// });

		getAllGames().then((games) => {
			setGames(games.data);
			setOptions(
				games.data.map(() => {
					return false;
				})
			);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		if (userId) {
			axios.get("https://gamingdb-react.onrender.com/review/myReviews", { params: { userId: userId } }).then((userReviews) => {
				setReviews(userReviews.data);
			});
		}
	}, [userId]);

	useEffect(() => {
		if (userId) {
			axios.get("https://gamingdb-react.onrender.com/list/myLists", { params: { userId: userId } }).then((lists) => {
				setUserLists(lists.data);
			});
		}
	}, [userId]);

	useEffect(() => {
		axios.get("https://gamingdb-react.onrender.com/listGames/all").then((data) => {
			setListGames(data.data);
		});
	}, []);

	function checkReview(gameID) {
		if (userLogged) {
			for (let review of reviews) {
				if (gameID === review.Game_ID) {
					return "/editreview";
				}
			}
			return "/createreview";
		} else {
			return "/games";
		}
	}

	function checkID(title) {
		for (let review of reviews) {
			if (review.Game_Title === title) {
				getID(review.Review_ID);
				return;
			}
		}
		for (let game of games) {
			if (game.Game_Title === title) {
				getBackground(game.Game_Background);
				getGameID(game.Game_ID);
				getGameImg(game.Game_Img);
				return;
			}
		}
	}

	function checkIfLoggedIn() {
		if (!userLogged) {
			toast("Sign in to create a review", {
				style: { background: "#212529", color: "white", border: "1px solid gray" },
				duration: 2000,
			});
		}
	}

	function addToList(gameId) {
		gameid.current = gameId;
		setShowListsForm(!showListsForm);
	}

	function addListId(listId) {
		if (listsId.includes(listId)) {
			listsId = listsId.filter((item) => {
				return item !== listId;
			});
		} else {
			listsId.push(listId);
		}
	}

	function addGameToList() {
		for (let id of listsId) {
			let alreadyInList = listGames.some((item) => item.List_Id === id && item.Game_Id === gameid.current);

			if (!alreadyInList) {
				axios.post("https://gamingdb-react.onrender.com/list/add", { listId: id, gameId: gameid.current }).then((result) => {});
				toast.success("Added successfully", {
					style: {
						background: "#212529",
						color: "white",
						border: "1px solid gray",
					},
				});
			} else {
				toast("Game already in this list", {
					style: {
						background: "#212529",
						color: "white",
						border: "1px solid gray",
					},
				});
			}
		}
		setShowListsForm(false);
	}

	const showOptions = (index) => {
		if (userLogged) {
			let showOptions = options.map((item, i) => {
				if (index === i) {
					item = !item;
					return item;
				} else {
					return false;
				}
			});
			setOptions([...showOptions]);
		} else {
			toast("Sign in to create a review", {
				style: { background: "#212529", color: "white", border: "1px solid gray" },
				duration: 2000,
			});
		}
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (showListsForm && !addToListFormRef.current.contains(e.target) && !addToListBtnRef.current.includes(e.target)) {
				setShowListsForm(false);
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	});

	return (
		<div className="container mb-4">
			<div className="row text-center mt-2">
				<h1 className="text-white">Games</h1>
			</div>
			{loading ? (
				isLoading(loading)
			) : (
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 w-75 m-auto row-gap-1">
					{games.map((game, index) => {
						return (
							<div className="gamecol col rounded p-2 position-relative" key={game.Game_ID} onClick={checkIfLoggedIn}>
								<img
									className="myreview-game rounded w-100"
									src={require(`../assets/images/${game.Game_Img}`)}
									alt={game.Game_Title}
									onClick={(e) => {
										checkID(e);
									}}
								/>
								<div className="hover-name text-center text-white fw-bold">{game.Game_Title}</div>
								{userLogged && (
									<div className="options position-absolute text-end" ref={optionsBtnRef}>
										<img
											className="h-50 w-50 btn p-0"
											src={require(`../assets/images/options.png`)}
											alt=""
											onClick={() => {
												showOptions(index);
											}}
										/>
									</div>
								)}
								{options[index] && (
									<div className="position-absolute bottom-0 start-50 translate-middle-x pb-3" ref={optionsRef}>
										<div
											className="add-to-list bg-dark rounded p-1 text-white mb-1 w-auto text-center"
											ref={(item) => addToListBtnRef.current.push(item)}
											onClick={() => addToList(game.Game_ID)}>
											Add to list
										</div>
										<Link className="text-decoration-none" to={checkReview(game.Game_ID)}>
											<div
												className="add-to-list bg-dark rounded p-1 text-white w-auto text-center"
												onClick={() => {
													checkID(game.Game_Title);
												}}>
												Create/Edit Review
											</div>
										</Link>
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}

			{showListsForm ? (
				<div
					className="listsForm row position-absolute bg-secondary top-50 start-50 translate-middle p-2 m-auto rounded"
					ref={addToListFormRef}>
					<div className="col-12 p-1">
						{userLists.map((list, i) => {
							return (
								<div className="list p-1 row justify-content-between w-100 m-auto" key={list.List_Id}>
									<label className="text-white p-0 me-2 w-auto" htmlFor={"list" + i}>
										{list.List_Name}
									</label>
									<input className="w-auto" type="checkbox" name={"list" + i} id="" onClick={() => addListId(list.List_Id)} />
								</div>
							);
						})}
						<div className="row justify-content-center w-100 m-auto">
							<button className="btn btn-primary mt-2 w-auto" onClick={addGameToList}>
								Add
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Games;
