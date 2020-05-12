export function tokens(state = {}, action) {
	switch(action.type) {
		case 'ADD_TOKENS':
			state.accessToken = action.accessToken;
			state.refreshToken = action.refreshToken;
			return state;
		case 'CLEAR_TOKENS':
			return state = {};
		default:
			return state;
	}
}
