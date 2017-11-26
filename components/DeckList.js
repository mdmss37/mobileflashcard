import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { purple } from '../utils/colors'

class DeckList extends Component {
  render() {
    return (
      <View>
        <Text style={{color: purple, fontSize: 25}}>
          DeckList
        </Text>
      </View>
    )    
  }
}

export default DeckList