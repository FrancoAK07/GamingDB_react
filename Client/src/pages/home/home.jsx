import React, { useState, useEffect } from "react";
import axios from "axios";
import list from "../../assets/images/list_1950715.png";
import ReviewCard from "./reviewCard";
import toast from "react-hot-toast";

function Home() {
	const [recentGames, setRecentGames] = useState([]);
	const [imagesLoading, setImagesLoading] = useState([]);

	useEffect(() => {
		axios.get("https://gamingdb-react.onrender.com/game/recent").then((data) => {
			setRecentGames(data.data);
			let imagesArray = [];
			data.data.forEach(() => {
				imagesArray.push(true);
			});
			setImagesLoading([...imagesArray]);
		});

		toast("The page can take a minute or so to load completely, thanks for your patience", {
			id: "loading_message",
			style: {
				background: "#212529",
				color: "white",
				border: "1px solid gray",
			},
			duration: 6000,
			position: "top-left",
		});
	}, []);

	function handleImageLoading(index) {
		setImagesLoading((prevImages) => {
			let newImages = [...prevImages];
			newImages[index] = false;
			return newImages;
		});
	}

	return (
		<div className="home h-100">
			<div className="home-background position-relative w-100">
				<div className="home-gradient h-100 w-100 position-absolute"></div>
				<img className="h-100 w-100" src={require("../../assets/images/gamingDbbg.jpg")} alt="" />
				<div className="position-absolute top-0 w-100">
					<div className="container mb-5">
						<div className="row w-100 m-auto text-center text-white my-4 ">
							<h1>GamingDB</h1>
						</div>
						<div className="row w-100 m-auto text-start ">
							<div className="col-12 p-0">
								<h2 className="text-white headlines rounded-3 p-3 w-auto">
									<img src={list} alt="list" /> Create your lists of games
								</h2>
							</div>
							<div className="col-12 p-0">
								<h2 className="text-white headlines rounded-3 p-3">
									<img src={list} alt="list" /> Review games and read reviews from other players
								</h2>
							</div>
						</div>
						<div className="row text-center w-50 ms-auto me-auto mt-3">
							<div className="col p-0 w-100">
								<div className="row m-auto">
									<h1 className="text-light p-0">New Games</h1>
								</div>
								{!recentGames.length ? (
									<div className="row w-100 m-auto justify-content-center">
										<div className="spinner-border text-primary" role="status">
											<span className="visually-hidden">Loading...</span>
										</div>
									</div>
								) : null}
								<div className="row row-cols-2 row-cols-md-4 w-100 m-auto">
									{recentGames.length
										? recentGames.map((game, i) => {
												return (
													<div className="col p-1" key={game.Game_ID}>
														<img
															className="img-fluid"
															src={require(`../../assets/images/${game.Game_Img}`)}
															alt=""
															style={{ display: imagesLoading[i] ? "none" : "block" }}
															onLoad={() => handleImageLoading(i)}
														/>
													</div>
												);
											})
										: null}
								</div>
							</div>
						</div>
					</div>
					<div className="row text-center w-100 m-auto mb-3">
						<h1 className="text-white">Recent Reviews</h1>
					</div>
					<ReviewCard />
				</div>
			</div>
		</div>
	);
}

export default Home;
