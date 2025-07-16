import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function List() {
	const listId = sessionStorage.getItem("listId");
	const [listGames, setListGames] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get("https://gamingdb-react.onrender.com/listGames/games", { params: { listId: listId } }).then((data) => {
			setListGames(data.data);
			setLoading(false);
		});
	}, [listId]);

	function deleteListGame(listId, gameId) {
		if (window.confirm(`remove game from list ${listGames[0].List_Name}`)) {
			axios
				.delete("https://gamingdb-react.onrender.com/listGames", {
					params: { listId: listId, gameId: gameId },
				})
				.then(() => {
					toast.success("game removed", { style: { background: "#212529", color: "white", border: "1px solid gray" } });
					axios.get("https://gamingdb-react.onrender.com/listGames/games", { params: { listId: listId } }).then((data) => {
						setListGames(data.data);
					});
				});
		}
	}
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

			<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 w-75 m-auto row-gap-1">
				{listGames.map((game, index) => {
					return (
						<div className="gamecol col rounded p-2 position-relative" key={game.Game_ID}>
							<div className="d-block h-100">
								<img
									className="myreview-game rounded w-100 "
									src={require(`../assets/images/${game.Game_Img}`)}
									alt={"game title"}
								/>
								<div className="hover-name position-absolute top-50 start-50 translate-middle text-white fw-bold text-center">
									{game.Game_Title}
								</div>
							</div>
							<div className="delete-listGame-icon position-absolute rounded-5">
								<img
									className="bg-secondary rounded-5"
									src={require("../assets/images/trashcan2.png")}
									alt=""
									onClick={() => deleteListGame(game.List_Id, game.Game_ID)}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default List;
