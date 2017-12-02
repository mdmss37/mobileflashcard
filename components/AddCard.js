import React, { Component } from 'react'
import { 
  Text,
  TextInput,
  TouchableOpacity, 
  View, 
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard 
} from 'react-native'
import { purple, lightPurp, lightGray, gray, orange, white } from '../style/colors'
import { containers } from '../style/containers'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'

class AddCard extends Component {
  state = {
    questionBorderColor: lightGray,
    answerBorderColor: lightGray,
    question: '',
    answer: '',
  }

  handleSubmit = () => {
    const { question, answer } = this.state
    const card = { question, answer }
    const { title } = this.props.navigation.state.params
    if (question !== '' && answer !== '') {
      addCardToDeck(title, card)
        .then(() => {
          this.props.dispatch(addCard(title, card))
          this.setState({
            question: '',
            answer: '',
          })
        })
      this.props.navigation.goBack()
    }
  }

  // https://facebook.github.io/react-native/docs/textinput.html
  render() {
    return (
      <View style={[containers.baseContainer, {padding: 20}]} onTouchStart={Keyboard.dismiss}>
        <KeyboardAvoidingView style={[containers.baseContainer, {padding: 10}]} behavior='padding'>
          <TextInput
            multiline={true}
            placeholder='Please input question'
            onFocus={() => this.setState({ questionBorderColor: gray })}
            onBlur={() => this.setState({ questionBorderColor: lightGray })}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            style={[styles.textInput, {borderColor: `${this.state.questionBorderColor}`}]}
            />

          <TextInput
            multiline={true}
            placeholder='Please input answer'
            onFocus={() => this.setState({ answerBorderColor: gray })}
            onBlur={() => this.setState({ answerBorderColor: lightGray })}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
            style={[styles.textInput, {borderColor: `${this.state.answerBorderColor}`}]}
            />
          <TouchableOpacity style={styles.submitCardBtn} onPress={this.handleSubmit}>
            <Text style={{color: white, textAlign: 'center' }}>Add your card to deck</Text>
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
  submitCardBtn: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: orange,
    padding: 20,
    minWidth: 200,
  }
})

// Passing the state, and any other argument is optional, 
// as you can pass individual reducers into your state using the following practices:
//  function mapStateToProps({ reducer1, reducer2 }){
//     return { reducer1, reducer2 };
// }
// Make sure your argument names match your return assignment names :squirrel:
// Utilizing ES6 in this situation is helpful since it helps you shorten your code 

const mapStateToProps = (decks) => ({ decks })

export default connect(mapStateToProps)(AddCard)
