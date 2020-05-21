import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import { Container, Header, Left, Right, Body, Title, Thumbnail, Content, Card, CardItem, Item, Input, Label } from "native-base";
import { TouchableOpacity, Image, Text, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { counterIncrement, counterDecriment } from './Actions/BasketActions';

export function Basket() {
	const user = useSelector(state => state.user);
	const history = useHistory();
	const basket = useSelector(state => state.basket);
	const dispatch = useDispatch();
	const itemCounterIncrement = item => {
		dispatch(counterIncrement(item.id));
		console.log(basket)
	}
	const itemCounterDecriment = item => {
		dispatch(counterDecriment(item.id))
		console.log(basket);
	}
	return(
		<Container >
			<Header>
				<Left>
					<TouchableOpacity onPress={() => {history.goBack()}}>
						<Icon
							name='arrow-left'
							size={25}
							color={Platform.select({
								ios: 'black',
								android: 'white'
							})}
						/>
					</TouchableOpacity>
				</Left>
				<Body>
					<Title>Basket</Title>
				</Body>
				<Right>
					<Thumbnail small source={{uri: user.photoUrl || user.photoURL}}></Thumbnail>
				</Right>
			</Header>
			<Content>{
				basket.map((item, i) => (
					<Card key={i}>
						<CardItem>
							<Body style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
								<View style={{ flex: 1, display: 'flex', flexDirection: 'row'}}>
									<Image source={{uri: item.photoURL}} resizeMode='contain' style={{height: 150, width: 150}} />
									<Text style={{fontSize: 20}}>{item.name}</Text>
								</View>
								<View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
									<Text style={styles.fontSize}>{item.Price}$</Text>
									<TouchableOpacity onPress={() => itemCounterIncrement(item)}>
										<Icon name='plus' style={styles.fontSize} />
									</TouchableOpacity >
									<Text style={styles.fontSize}>{item.counter}</Text>
									<TouchableOpacity onPress={() => itemCounterDecriment(item)}>
										<Icon name='minus' style={styles.fontSize} />
									</TouchableOpacity>
									<Text style={styles.fontSize}>{item.Price * item.counter}$</Text>
								</View>
							</Body>
						</CardItem>
					</Card>
				))
			}</Content>
		</Container>
	)
}

const styles = StyleSheet.create({
	fontSize: {
		fontSize: 25,
		paddingHorizontal: 5
	}
})
