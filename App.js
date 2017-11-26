import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { createStore } from 'react'
import { Provider } from 'react-redux'
import { udacityBlue } from './utils/colors'
import { Navigator } from './components/Navigator'

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>  
)

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MyStatusBar backgroundColor={udacityBlue} barStyle='light-content'/>
          <Navigator />
        </View>        
      </Provider>
    );
  }
}

