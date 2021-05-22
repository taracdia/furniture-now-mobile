import * as ActionTypes from "./ActionTypes";

export const furnitures = (
	state = { isLoading: true, errMess: null, furnitures: [] },
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_FURNITURES:
			return {
				...state,
				isLoading: false,
				errMess: null,
				furnitures: action.payload,
			};

		case ActionTypes.FURNITURES_LOADING:
			return { ...state, isLoading: true, errMess: null, furnitures: [] };

		case ActionTypes.FURNITURES_FAILED:
			return { ...state, isLoading: false, errMess: action.payload };

		default:
			return state;
	}
};
