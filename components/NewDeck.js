import React, { Component } from 'react'
import { Text } from 'react-native'
import { purple } from '../utils/colors'

class NewDeck extends Component {
  render() {
    return (
      <View>
        <Text style={{color: purple, fontSize: 25}}>
          NewDeck
        </Text>
      </View>
    )    
  }
}

export default NewDeck