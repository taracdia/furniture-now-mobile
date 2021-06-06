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

		case ActionTypes.CHANGE_FURNITURE_NUMBER_IN_CART:
			const newNumber = action.payload.number;
			const furnitureId = action.payload.furnitureId;
			state.furnitures.forEach(furniture => {
				if (furniture.id == furnitureId) {
					furniture.quantity = newNumber;
				}
			});
		default:
			return state;
	}
};
