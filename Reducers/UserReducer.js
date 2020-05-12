export function user(state = {}, action) {
	switch(action.type) {
		case 'SIGN_IN':
			return state = action.user;
		case 'SIGN_OUT':
			return state = {};
		default:
			return state;
	}
}
