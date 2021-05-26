import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchComments = () => dispatch => {
	return fetch(baseUrl + "comments")
		.then(
			response => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			error => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then(response => response.json())
		.then(comments => dispatch(addComments(comments)))
		.catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errMess,
});

export const addComments = comments => ({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments,
});

export const postComment = (furnitureId, rating, author, text) => dispatch => {
	const newComment = {
		furnitureId,
		rating,
		author,
		text,
	};
	newComment.date = new Date().toISOString();

	setTimeout(() => {
		dispatch(addComment(newComment));
	}, 2000);
};

export const addComment = comment => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comment,
});

export const fetchFurnitures = () => dispatch => {
	dispatch(furnituresLoading());

	return fetch(baseUrl + "furnitures")
		.then(
			response => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status}: ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			error => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then(response => response.json())
		.then(furnitures => dispatch(addFurnitures(furnitures)))
		.catch(error => dispatch(furnituresFailed(error.message)));
};

export const furnituresLoading = () => ({
	type: ActionTypes.FURNITURES_LOADING,
});

export const furnituresFailed = errMess => ({
	type: ActionTypes.FURNITURES_FAILED,
	payload: errMess,
});

export const addFurnitures = furnitures => ({
	type: ActionTypes.ADD_FURNITURES,
	payload: furnitures,
});

export const postFavorite = furnitureId => dispatch => {
	console.log(furnitureId);
	setTimeout(() => {
		dispatch(addFavorite(furnitureId));
	}, 2000);
};

export const addFavorite = furnitureId => ({
	type: ActionTypes.ADD_FAVORITE,
	payload: furnitureId,
});
