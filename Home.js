import { Container, Header, Left, Right, Body, Title, Thumbnail, Content, Card, CardItem, View } from "native-base";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform, Image, Text, Button, StyleSheet } from "react-native";
import firebase from 'firebase';
import 'firebase/firestore';
import { addItem, clearItems } from "./Actions/ItemActions";
const config = {
	androidClientId: '142900377950-mkftg41i2e4fe8g5dppe4ut1gk9cj0md.apps.googleusercontent.com',
	iosClientId: '142900377950-d3nqfe8n2e2223ngt0a5dk8rnatncef3.apps.googleusercontent.com',
}

export function Home() {
	const tokens = useSelector(state => state.tokens);
	const user = useSelector(state => state.user);
	const history = useHistory();
	const items = useSelector(state => state.items);
	const dispatch = useDispatch();
	const database = firebase.firestore();
	const accessToken = tokens.accessToken;
	const logOut = async () => {
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

	useEffect(() => {
		database.collection("Items")
		.get()
		.then(querySnapshot => {
			dispatch(clearItems());
			return querySnapshot;
		})
		.then(querySnapshot => querySnapshot.forEach(doc => dispatch(addItem(doc.data()))))
		.then(() => console.log('-------------------------------------------------------------------------------'))
		.then(() => console.log(items))
		.catch(error => console.log("Error getting document:", error))
	}, [])
	return (
		<Container >
			<Header>
				<Left>
					<Icon name='logout' size={25} color={Platform.select({
						ios: 'black',
						android: 'white'
					})} onPress={() => logOut()} />
				</Left>
				<Body>
					<Title>Home</Title>
				</Body>
				<Right>
					<Thumbnail small source={{uri: user.photoUrl || user.photoURL}}></Thumbnail>
				</Right>
			</Header>
			<Content>{
				items.map((item, i) => (
					<Card key={i}>
						<CardItem>
							<Body
								style={{flex: 1, display: 'flex', flexDirection: 'row'}}
							>
								<View>
									<Image source={{uri: item.photoURL}} resizeMode='contain' style={{height: 220, width: 200}}/>
								</View>
								<View
									style={{marginTop: 30}}
								>
									<Text textAlign='center' style={styles.descriptionText}>{item.name}</Text>
									<Text style={styles.descriptionText}>{`Chip ${item.Chip}`}</Text>
									<Text style={styles.descriptionText}>{`Display ${item.Display}-inch`}</Text>
									<Text style={styles.descriptionText}>{`Capacity ${item.Capacity} GB`}</Text>
									<Text style={styles.descriptionText}>{`Price ${item.Price}$`}</Text>
									<Button rounded title='Buy' color='#3F51B5' />
								</View>
							</Body>
						</CardItem>
						<CardItem>
							<Body>

							</Body>
						</CardItem>
					</Card>
				))
				}</Content>

		</Container>
	)
}

const styles = StyleSheet.create({
	descriptionText: {
		fontSize: 18,
		padding: 4
	}
})
