import * as ActionTypes from "./ActionTypes";

export const comments = (state = { errMess: null, comments: [] }, action) => {
	switch (action.type) {
		case ActionTypes.ADD_COMMENTS:
			return { ...state, errMess: null, comments: action.payload };

		case ActionTypes.ADD_COMMENT:
			const comment = action.payload;
			comment.id = state.comments.length + 1;

			const newComments = state.comments.concat(comment);

			return { ...state, errMess: null, comments: newComments };

		case ActionTypes.COMMENTS_FAILED:
			return { ...state, errMess: action.payload };

		default:
			return state;
	}
};
