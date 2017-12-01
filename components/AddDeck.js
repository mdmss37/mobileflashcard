import React, { Component } from 'react'
import { 
  Text, 
  View, 
  Keyboard, 
  KeyboardAvoidingView, 
  TextInput,
  TouchableOpacity,
  StyleSheet } from 'react-native'
import { purple, orange, gray, lightGray, white, udacityBlue } from '../style/colors'
import { containers } from '../style/containers'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'

class AddDeck extends Component {
  state = {
    title: '',
    inputBorderColor: lightGray
  }

  handleSubmit = () => {
    const { title } = this.state
    if (title !== '') {
      saveDeckTitle(title)
        .then(() => {
          this.props.dispatch(addDeck(title))
          this.setState({
            title: ''
          })
          this.props.navigation.goBack()  
      })
    }
  }

  render() {
    return (
      <View style={[containers.baseContainer, { padding: 20 }]} onTouchStart={Keyboard.dismiss}>
        <KeyboardAvoidingView style={[containers.baseContainer, { padding: 10 }]} behavior='padding'>
          <TextInput
            multiline={true}
            placeholder='Please input title of your deck'
            onFocus={() => this.setState({ inputBorderColor: gray })}
            onBlur={() => this.setState({ inputBorderColor: lightGray })}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            style={[styles.textInput, {borderColor: `${this.state.inputBorderColor}`}]}
            />
          <TouchableOpacity style={styles.submitDeckBtn} onPress={this.handleSubmit}>
            <Text style={{color: white, textAlign: 'center' }}>Add your new deck</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )    
  }
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
  submitDeckBtn: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: udacityBlue,
    padding: 20,
    minWidth: 200,
  }
})

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(AddDeck)
