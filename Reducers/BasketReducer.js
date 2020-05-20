export function basket(state = [], action) {
	switch(action.type) {
		case 'ADD_IN_BASKET':
			return [...state, action.item];
		case 'REMOVE_FROM_BASKET':
			return state = state.filter(item => item.id != action.itemId);
		case 'CLEAR_BASKET':
			return state = [];
		default:
			return state;
	}
}
