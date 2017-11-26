import React, { Component } from 'react'
import { Text } from 'react-native'
import { purple } from '../utils/colors'

class NewQuestion extends Component {
  render() {
    return (
      <View>
        <Text style={{color: purple, fontSize: 25}}>
          NewQuestion
        </Text>
      </View>
    )    
  }
}

export default NewQuestion