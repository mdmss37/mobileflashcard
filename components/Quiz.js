import React, { Component } from 'react'
import { Text } from 'react-native'
import { purple } from '../utils/colors'

class Quiz extends Component {
  render() {
    return (
      <View>
        <Text style={{color: purple, fontSize: 25}}>
          Quiz
        </Text>
      </View>
    )    
  }
}

export default Quiz