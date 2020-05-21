export function basket(state = [], action) {
	switch(action.type) {
		case 'ADD_IN_BASKET':
			const resultObject = Object.assign({counter: 1,},action.item);
			const existingItem = state.find(item => item.id === action.item.id);
			if(existingItem) {
				++existingItem.counter;
				return state;
			} else {
				return [...state, resultObject];
			}
		case 'REMOVE_FROM_BASKET':
			return state = state.filter(item => item.id != action.itemId);
		case 'CLEAR_BASKET':
			return state = [];
		case 'COUNTER_INCREMENT':
			++state.find(item => item.id === action.itemId).counter;
			return state;
		case 'COUNTER_DECRIMENT':
			--state.find(item => item.id === action.itemId).counter;
			return state;
		default:
			return state;
	}
}
