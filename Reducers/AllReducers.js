import { combineReducers } from "redux";
import { user } from './UserReducer';
import { tokens } from './TokenReducer';
export const allReducers = combineReducers({
	user,
	tokens
})
