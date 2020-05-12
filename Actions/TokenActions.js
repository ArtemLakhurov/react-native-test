export const addTokens = (accessToken, refreshToken) => {
	return {
		type: 'ADD_TOKENS',
		accessToken,
		refreshToken
	}
}
export const clearTokens = () => {
	return {
		type: 'CLEAR_TOKENS',
	}
}
