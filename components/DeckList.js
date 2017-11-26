import React, { Component } from 'react'
import { Text, FlatList, View, TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'
import { connect } from 'react-redux'
import { recieveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { AppLoading } from 'expo'

const DeckListItem = ({ navigation, title, questionNum }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Deck', { title } )}>
      <View>
        <Text>{title}</Text>
        <Text>This deck has {questionNum} cards</Text>
      </View>
      
    </TouchableOpacity>
  )
}

const Separator = () => {
  return (
    <View 
      style={{
      height: 1,
      width: '100%',
      backgroundColor: 'black'
    }} />
  )
}

class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    getDecks()
      .then(decks => this.props.dispatch(recieveDecks(decks)))
      .then(() => this.setState(() => ({
        ready: true,
      })))
  }

  render() {
    const { decks } = this.props
    const decksLength = Object.keys(decks).length
    const decksArray = Object.keys(decks).map((key) => decks[key])
    console.log(decksArray)
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <Text style={{color: purple, fontSize: 25}}>
          DeckList
        </Text>
        { decksLength > 0 
          ?
          <FlatList 
            data={decksArray}
            renderItem={({ item }) => 
              <DeckListItem
                navigation={this.props.navigation}
                title={item.title}
                questionNum={item.questions.length}
              />
            }
              
            keyExtractor={item => item.title}
            ItemSeparatorComponent={Separator}
          />
          :
          <Text>No Deck Available, Please add Deck.</Text>          
        }

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

function mapStateToProps(state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(DeckList)

