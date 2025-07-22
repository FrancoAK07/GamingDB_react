import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getMyLists, getListImage, createList, deleteList } from "../api";

function Lists() {
	const [lists, setLists] = useState([]);
	const listNameRef = useRef(null);
	const formRef = useRef(null);
	const userIdRef = useRef(sessionStorage.getItem("userId"));
	const [listInfo, setListInfo] = useState([]);
	let lastThreeListInfo = [];
	const createListBtnRef = useRef();
	const [loading, setLoading] = useState(true);

	const showForm = () => {
		formRef.current.classList.toggle("d-none");
	};

	useEffect(() => {
		getMyLists(userIdRef.current).then((data) => {
			setLists(data.data);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		getListImage(userIdRef.current).then((result) => {
			setListInfo(result.data);
		});
	}, []);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (formRef.current && !formRef.current.contains(e.target) && !createListBtnRef.current.contains(e.target)) {
				formRef.current.classList.add("d-none");
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	});

	async function createList2() {
		if (listNameRef.current.value) {
			const listsCopy = lists.slice();
			setLists((prevLists) => [...prevLists, { List_Name: listNameRef.current.value, User_Id: userIdRef.current }]);
			showForm();
			try {
				await createList(listNameRef.current.value, userIdRef.current);
				listNameRef.current.value = "";

				try {
					const updatedLists = await getMyLists(userIdRef.current);

					setLists(updatedLists.data);
				} catch (getError) {
					console.error("Error updating Lists:", getError);
					toast.error("Error updating Lists", {
						style: { background: "#212529", color: "white", border: "1px solid gray" },
					});
				}
			} catch (postError) {
				console.error("Error creating new list:", postError);
				toast.error("Error creating new list", {
					style: { background: "#212529", color: "white", border: "1px solid gray" },
				});
				setLists(listsCopy);
				listNameRef.current.value = "";
			}
		} else {
			toast("Please enter a name for the list", {
				style: { background: "#212529", color: "white", border: "1px solid gray" },
			});
		}
	}

	function filterLists(listId) {
		let filteredListInfo = [];
		lastThreeListInfo = [];
		if (listInfo.length) {
			filteredListInfo = listInfo.filter((item) => {
				return item.List_Id === listId;
			});

			if (filteredListInfo.length) {
				for (let i = 1; i <= filteredListInfo.length; i++) {
					if (i <= 3) {
						lastThreeListInfo.push(filteredListInfo[filteredListInfo.length - i]);
					} else break;
				}
			}
		}
	}

	async function deleteList2(listId) {
		if (window.confirm("delete list?")) {
			const listsCopy = lists.slice(); //copy of starting lists
			setLists((prevLists) => prevLists.filter((list) => list.List_Id !== listId));
			try {
				await deleteList(listId);
			} catch (error) {
				console.error("Error deleting list:", error);
				toast.error("Error deleting list", {
					style: { background: "#212529", color: "white", border: "1px solid gray" },
				});
				setLists(listsCopy);
			}
		}
	}

	return (
		<div className="container min-vh-100 position-relative">
			<h1 className="text-center text-white mt-2">My Lists</h1>
			<div className="row justify-content-center mt-3 w-100 m-auto">
				<button className="btn btn-primary w-auto" onClick={showForm} ref={createListBtnRef}>
					Create List
				</button>
			</div>
			{loading ? (
				<div className="row w-75 m-auto justify-content-center position-absolute top-50 start-50 translate-middle">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : null}
			<div className="lists row text-center text-white mt-2 w-100 m-auto">
				{lists.map((list) => {
					return (
						<div className="list-col col-12 col-md-6 col-lg-4 mt-3 position-relative" key={list.List_Name}>
							<h5 className="row m-auto ms-2 mb-1">{list.List_Name}</h5>
							<div className="row m-auto">
								{filterLists(list.List_Id)}
								<div className="list-game col-5 rounded position-relative">
									<Link to="/list" onClick={() => sessionStorage.setItem("listId", list.List_Id)}>
										<div className="w-100 h-100 rounded position-absolute list-img1 list-img border border-secondary">
											{lastThreeListInfo.length && lastThreeListInfo[0] ? (
												<img
													className="h-100 w-100 rounded"
													src={require(`../assets/images/${lastThreeListInfo[0].Game_Img}`)}
													alt=""
												/>
											) : null}
										</div>
										<div className="w-100 h-100 rounded position-absolute list-img2 list-img border border-secondary">
											{lastThreeListInfo.length && lastThreeListInfo[1] ? (
												<img
													className="h-100 w-100 rounded"
													src={require(`../assets/images/${lastThreeListInfo[1].Game_Img}`)}
													alt=""
												/>
											) : null}
										</div>
										<div className="w-100 h-100 rounded position-absolute list-img3 list-img border border-secondary">
											{lastThreeListInfo.length && lastThreeListInfo[2] ? (
												<img
													className="h-100 w-100 rounded"
													src={require(`../assets/images/${lastThreeListInfo[2].Game_Img}`)}
													alt=""
												/>
											) : null}
										</div>
									</Link>
								</div>
							</div>
							<div className="delete-list-icon position-absolute rounded-3">
								<img
									className="bg-secondary rounded-3"
									src={require("../assets/images/trashcan2.png")}
									alt="delete"
									onClick={() => deleteList2(list.List_Id)}
								/>
							</div>
						</div>
					);
				})}
			</div>
			<div
				className="form row position-absolute start-50 top-50 translate-middle d-none m-auto justify-content-center bg-secondary rounded"
				ref={formRef}>
				<div className="col-12 p-1">
					<div className="row w-100 m-auto text-center">
						<label className="text-white m-0 p-0  m-auto" htmlFor="listName">
							List Name
						</label>
						<input type="text" name="listName" ref={listNameRef} />
						<button className="btn btn-primary mt-2 w-auto m-auto" onClick={createList2}>
							Create
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Lists;
