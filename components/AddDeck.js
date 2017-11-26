import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { purple } from '../utils/colors'

class AddDeck extends Component {
  render() {
    return (
      <View>
        <Text style={{color: purple, fontSize: 25}}>
          AddDeck
        </Text>
      </View>
    )    
  }
}

export default AddDeck
