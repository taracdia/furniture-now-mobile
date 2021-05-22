import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { furnitures } from "./furnitures";
import { comments } from "./comments";

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			furnitures,
			comments,
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
};
