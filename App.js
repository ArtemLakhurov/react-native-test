import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { firebaseConfig } from './firebase.config';
import SignIn from './SignIn';
import { NativeRouter, Route, Redirect, Switch } from 'react-router-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { allReducers } from './Reducers/AllReducers';
import { PrivateRoute } from './PrivateRoute';
import { Home } from './Home';
import LoadingScreen from './Loading';
import { Root } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const store = createStore(allReducers)
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    }).then(() => setLoading(false))

  }, [])
  if (loading) {
    return (
      <Root>
        <AppLoading />
      </Root>
    );
  }
  return (
    <Provider store={store}>
      <NativeRouter>
        <Switch>
          <Route exact path='/login' component={SignIn} />
          <Route exact path='/loading' component={LoadingScreen} />
          <PrivateRoute exact path='/home' component={Home}/>
          <PrivateRoute  path='*' component={Home} />
        </Switch>
      </NativeRouter>
    </Provider>
    );
  }
