import axios from "axios";

const apiUrl = "https://gamingdb-react.onrender.com/list";

export const getMyLists = async (userId) => {
	const myLists = await axios.get(`${apiUrl}/myLists`, { params: { userId: userId } });
	return myLists;
};

export const createList = async (listName, userId) => {
	const response = await axios.post(`${apiUrl}/create`, { listName, userId });
	return response;
};
export const addToList = async (listId, gameId) => {
	const createdList = await axios.post(`${apiUrl}/add`, { listId, gameId });
	return createdList;
};
export const getListImage = async (userId) => {
	const response = await axios.get(`${apiUrl}/listImage`, { params: userId });
	return response;
};
export const deleteList = async (listId) => {
	const response = await axios.delete(`${apiUrl}`, { params: { listId: listId } });
	return response;
};
