import React, { Component } from 'react'
import { Text, FlatList, View, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

const Separator = () => {
  return (
    <View 
      style={{
      height: 1,
      width: '100%',
      backgroundColor: 'Black'
    }} />
  )
}

class DeckList extends Component {
  state = {
    decks: [
       {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      }
    
    ]
  }

  render() {
    const { decks } = this.state
    console.log(decks)
    return (
      <View style={styles.container}>
        <Text style={{color: purple, fontSize: 25}}>
          DeckList
        </Text>
        <FlatList 
          data={decks}
          renderItem={({item}) => <Text>{item.title}</Text>}
          keyExtractor={item => item.title}
          />
      </View>
    )    
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  }
})


export default DeckList