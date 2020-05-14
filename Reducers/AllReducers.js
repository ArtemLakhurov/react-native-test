import { combineReducers } from "redux";
import { user } from './UserReducer';
import { tokens } from './TokenReducer';
import { items } from './ItemReducer';

export const allReducers = combineReducers({
	user,
	tokens,
	items
})
