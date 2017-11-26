import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { purple } from '../utils/colors'

class Deck extends Component {
  render() {
    return (
      <View>
        <Text style={{color: purple, fontSize: 25}}>
          Deck
        </Text>
      </View>
    )    
  }
}

export default Deck