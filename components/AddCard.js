import React, { Component } from 'react'
import { Text } from 'react-native'
import { purple } from '../utils/colors'

class AddCard extends Component {
  render() {
    return (
      <View>
        <Text style={{color: purple, fontSize: 25}}>
          AddCard
        </Text>
      </View>
    )    
  }
}

export default AddCard