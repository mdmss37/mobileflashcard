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
import { purple, lightPurp, lightGray, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {
  state = {
    questionBorderColor: lightGray,
    answerBorderColor: lightGray,
    question: '',
    answer: '',
  }
  // https://facebook.github.io/react-native/docs/textinput.html
  render() {
    return (
      <View style={{flex: 1, padding: 20}} onTouchStart={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{flex: 1, padding: 10}} behavior='padding'>
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
  }
})


function mapStateToProps(state) {
  return state
}



export default connect(mapStateToProps)(AddCard)