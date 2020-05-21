import React, { useState, useEffect } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, Left, Right, Title, Body, View } from 'native-base';
import firebase from 'firebase';
import { firebaseConfig } from './firebase.config';
import * as Google from 'expo-google-app-auth';
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTokens } from './Actions/TokenActions';
import { signIn } from './Actions/UserActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Facebook from 'expo-facebook';
import { AsyncStorage } from 'react-native';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const tokens = useSelector(state => state.tokens);
  const user = useSelector(state => state.user);

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '142900377950-mkftg41i2e4fe8g5dppe4ut1gk9cj0md.apps.googleusercontent.com',
        iosClientId: '142900377950-d3nqfe8n2e2223ngt0a5dk8rnatncef3.apps.googleusercontent.com',
        androidStandaloneAppClientId: '142900377950-mkftg41i2e4fe8g5dppe4ut1gk9cj0md.apps.googleusercontent.com',
        iosStandaloneAppClientId: '142900377950-d3nqfe8n2e2223ngt0a5dk8rnatncef3.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        // behavior: 'web'
      });

      if (result.type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
        firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          dispatch(addTokens(result.accessToken, result.refreshToken));
          dispatch(signIn(result.user));
          AsyncStorage.setItem('accessToken', result.accessToken);
          history.push('/loading');
        })
        .catch(error => console.log(error));
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  const FacebookLogin = async () => {
    Facebook.initializeAsync('231825834937888');
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permission: 'public_profile'
    })
    if ( type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(result => {
          dispatch(signIn(result.user));
          // dispatch(addTokens(result., result.stsTokenManager.refreshToken))
          console.log(user)
          // console.log(tokens)
          history.push('/loading')
        })
        .catch(error => console.log(error));
    }
  }

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Test-app</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
		  {/* <Link to='/home'> */}
			<Button primary full style={{marginTop: 30, marginBottom: 30}}>
				<Text>Sign In</Text>
			</Button>
      <Icon.Button name='google'  onPress={() => {
        alert('Google Sign In');
        signInWithGoogleAsync();
      }}>Login with Google</Icon.Button>
      <View style={{marginTop: 15}} />
      <Icon.Button
        name="facebook"
        backgroundColor="#3b5998"
        onPress={() => FacebookLogin()}
      >
      Login with Facebook
    </Icon.Button>

		  {/* </Link> */}

        </Content>
      </Container>
    );
  }
