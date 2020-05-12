import React, { Component, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { useHistory } from 'react-router-native';
function LoadingScreen () {
  const history = useHistory();
  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        console.log('AUTH STATE CHANGED CALLED ')
        if (user) {
          history.push('/home')
        } else {
          history.push('/login')
        }
      }
    );
  };
  useEffect(checkIfLoggedIn, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
