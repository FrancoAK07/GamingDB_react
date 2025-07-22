import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getThisListGames, deleteListGame } from "../api";

function List() {
	const listId = sessionStorage.getItem("listId");
	const [listGames, setListGames] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getThisListGames(listId).then((data) => {
			setListGames(data.data);
			setLoading(false);
		});
	}, [listId]);

	const deleteListGame2 = async (listId, gameId) => {
		if (window.confirm(`remove game from list ${listGames[0].List_Name}`)) {
			const listGamesCopy = listGames.slice();
			setListGames((prevListGames) => prevListGames.filter((game) => game.Game_ID !== gameId));
			try {
				await deleteListGame(listId, gameId);
			} catch (error) {
				console.error("Error deleting game:", error);
				toast.error("Error deleting game", {
					style: { background: "#212529", color: "white", border: "1px solid gray" },
				});
				setListGames(listGamesCopy);
			}
		}
	};
	return (
		<div className="container mb-3">
			<div className="row text-center">
				<h1 className="text-white mt-2">{listGames[0]?.List_Name}</h1>
			</div>

			{loading ? (
				<div className="row w-75 m-auto justify-content-center position-absolute top-50 start-50 translate-middle">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : null}

			<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 m-auto">
				{listGames.map((game) => {
					return (
						<div className="gamecol col rounded p-4 p-sm-2 " key={game.Game_ID}>
							<div className="d-block h-100 position-relative">
								<img
									className="myreview-game rounded w-100 "
									src={require(`../assets/images/${game.Game_Img}`)}
									alt={"game title"}
								/>
								<div className="hover-name position-absolute top-50 start-50 translate-middle text-white fw-bold text-center">
									{game.Game_Title}
								</div>
								<div className="delete-listGame-icon position-absolute rounded-5">
									<img
										className="bg-secondary rounded-5"
										src={require("../assets/images/trashcan2.png")}
										alt=""
										onClick={() => deleteListGame2(game.List_Id, game.Game_ID)}
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default List;
