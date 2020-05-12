import React, { useEffect } from 'react';
import { useSelector } from "react-redux"
import { Route, Redirect } from 'react-router-native';

export function PrivateRoute ({ component: Component, ...rest }) {
	const tokens = useSelector(state => state.tokens);
	return (
		<Route
			{...rest}
			render={props =>
				tokens.accessToken ? (
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
