export function items(state = [], action) {
	switch(action.type) {
		case 'ADD_ITEM':
			return [...state, action.item]
		case 'CLEAR_ITEMS':
			return state = [];
		default:
			return state
	}
}
