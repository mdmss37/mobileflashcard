import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, qiitaGreen, orange } from '../utils/colors'
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
          <View style={{flex: 5, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 60}}>{title}</Text>
            <Text style={{textAlign: 'center', fontSize: 40}}>
              {pluralize(deck.questions.length, 'card')}
            </Text>          
          </View>
          <TouchableOpacity style={styles.startQuizBtn}>
            <Text style={{textAlign: 'center', fontSize: 25}}>Start quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addCardBtn} onPress={() => navigation.navigate('AddCard', { title })}>
            <Text style={{textAlign: 'center', fontSize: 25}}>Add new card</Text>
          </TouchableOpacity>
        </View>
      </View>
    )    
  }
}

const styles = StyleSheet.create({
  startQuizBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: qiitaGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
    minWidth: 200,
  },
  addCardBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
    minWidth: 200,
  }
})

const mapStateToProps = (state) => {
  return {
    decks: state,
  }
}

export default connect(mapStateToProps)(Deck)
