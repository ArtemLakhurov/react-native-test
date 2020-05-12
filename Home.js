import { Container, Text, Button, Header, Left, Right, Body, Title, Thumbnail } from "native-base";
import React, { useEffect } from 'react';
import * as Google from 'expo-google-app-auth';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform } from "react-native";
import firebase from 'firebase';

const config = {
	androidClientId: '142900377950-mkftg41i2e4fe8g5dppe4ut1gk9cj0md.apps.googleusercontent.com',
	iosClientId: '142900377950-d3nqfe8n2e2223ngt0a5dk8rnatncef3.apps.googleusercontent.com',
}

export function Home() {
	const tokens = useSelector(state => state.tokens);
	const user = useSelector(state => state.user);
	const history = useHistory();
	const accessToken = tokens.accessToken;
	const logOut = async () => {
		await Google.logOutAsync({accessToken, ...config});
		history.push('/login');
	}
	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if(user) {
				history.push('/home')
			} else {
				history.push('/login')
			}
		})
	},[])
	return (
		<Container >
			<Header>
				<Left>
					<Icon name='logout' size={25} color={Platform.select({
						ios: 'black',
						android: 'white'
					})} onPress={() => logOut()} />
					{/* <Button hasText transparent onPress={() => logOut()}>
						<Text>Log Out</Text>
					</Button> */}
				</Left>
				<Body>
					<Title>Home</Title>
				</Body>
				<Right>
					<Thumbnail small source={{uri: user.photoUrl}}></Thumbnail>
				</Right>
			</Header>

		</Container>
	)
}
