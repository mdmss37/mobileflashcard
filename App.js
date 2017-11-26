import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'

const myStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.StatusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>  
  )

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
