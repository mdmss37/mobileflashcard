import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { udacityBlue } from './utils/colors'

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>  
)

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MyStatusBar backgroundColor={udacityBlue} barStyle='light-content'/>
      </View>
    );
  }
}

