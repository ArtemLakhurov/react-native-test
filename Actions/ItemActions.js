export const addItem = (item) => {
	return {
		type: 'ADD_ITEM',
		item
	}
}
export const clearItems = () => {
	return {
		type: 'CLEAR_ITEMS'
	}
}
