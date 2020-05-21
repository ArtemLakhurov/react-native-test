import React, { useEffect } from 'react';
import { useSelector } from "react-redux"
import { Route, Redirect } from 'react-router-native';
import { AsyncStorage } from 'react-native';

export function PrivateRoute ({ component: Component, ...rest }) {
	// const tokens = useSelector(state => state.tokens);
	const token = AsyncStorage.getItem('accessToken');
	return (
		<Route
			{...rest}
			render={props =>
				token	 ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "login",
							state: { from: props.location }
						}}
					/>
				)
			}
	  />
	)
}
