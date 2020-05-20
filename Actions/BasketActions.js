export const addInBasket = item => {
	return {
		type: 'ADD_IN_BASKET',
		item
	}
}

export const removeFromBasket = itemId => {
	return {
		type: 'REMOVE_FROM_BASKET',
		itemId
	}
}

export const clearBasket = () => {
	return {
		type: 'CLEAR_BASKET'
	}
}
