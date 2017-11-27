import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { purple } from '../utils/colors'
import { connect } from 'react-redux'
import { pluralize } from '../utils/helpers'

class Deck extends Component {
  render() {
    const { navigation, decks } = this.props
    const title = navigation.state.params.title
    const deck = decks[title]
    console.log(deck)
    return (
      <View style={{flex: 1, padding: 40}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 25}}>{title}</Text>
          <Text style={{textAlign: 'center', fontSize: 25}}>
            {pluralize(deck.questions.length, 'card')}
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Start quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Add new card</Text>
          </TouchableOpacity>
        </View>

      </View>
    )    
  }
}


const mapStateToProps = (state) => {
  return {
    decks: state,
  }
}

export default connect(mapStateToProps)(Deck)