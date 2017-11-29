import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { purple, white, udacityBlue, red } from '../utils/colors'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

class Quiz extends Component {
  state = {
    answers: undefined,
    ready: false,
    questionIdx: 0,
    isShowingAnswer: false,
    finishedQuiz: false
  }

  componentDidMount() {
    const questions = this.props.deck.questions
    const answers = Array(questions.length).fill(undefined)
    this.setState({
      answers,
      ready: true,
    })
  }

  handleAnswerSubmit = (remember) => {
    const { answers, questionIdx } = this.state
    answers[questionIdx] = remember
    this.setState({
      answers,
    })
    if ( questionIdx === answers.length -1) {
      this.setState({
        finishedQuiz: true
      })
    } else {
      this.setState({
        questionIdx: questionIdx + 1
      })
    }
  }

  handleToggleShowingAnswer = () => {
    const { isShowingAnswer }  = this.state
    this.setState({
      isShowingAnswer: !isShowingAnswer,
    })
  }

  render() {
    if (this.state.ready === false) {
      return <AppLoading />
    }
    const { questions } = this.props.deck
    const { answers, questionIdx, isShowingAnswer, finishedQuiz } = this.state

    if (answers.length === 0) {
      return (
        <View>
          <Text>There are no cards in the deck, please add card</Text>  
        </View>
      )
    }

    const { question, answer } = questions[questionIdx]

    return (
      <View style={styles.container}>
      { isShowingAnswer
        ?
        <View style={styles.container}>
          <Text>Question: {`${questionIdx + 1}/${questions.length}`}</Text>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{answer}</Text>
          <TouchableOpacity onPress={this.handleToggleShowingAnswer}>
            <Text style={{fontSize: 20, textAlign: 'center', color: red, fontWeight: 'bold'}}>Click to show question</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.submitBtn, {backgroundColor:'#0F7F12'}]} onPress={() => this.handleAnswerSubmit(true)}>
            <Text style={{color: white, textAlign: 'center' }}>I knew this</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.submitBtn, {backgroundColor:'#D22A25'}]} onPress={() => this.handleAnswerSubmit(false)}>
            <Text style={{color: white, textAlign: 'center' }}>I didn't know this</Text>
          </TouchableOpacity>
        </View>
        : finishedQuiz
        ?
        <View style={styles.container}>
          <Text>You finished quiz</Text>
        </View>
        :
        <View style={styles.container}>
          <Text>Question: {`${questionIdx + 1}/${questions.length}`}</Text>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{question}</Text>
          <TouchableOpacity onPress={this.handleToggleShowingAnswer}>
            <Text style={{fontSize: 20, textAlign: 'center', color: red, fontWeight: 'bold'}}>Click to show answer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.submitBtn, {backgroundColor:'#0F7F12'}]} onPress={() => this.handleAnswerSubmit(true)}>
            <Text style={{color: white, textAlign: 'center' }}>I knew this</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.submitBtn, {backgroundColor:'#D22A25'}]} onPress={() => this.handleAnswerSubmit(false)}>
            <Text style={{color: white, textAlign: 'center' }}>I didn't know this</Text>
          </TouchableOpacity>
        </View>
      }        
      </View>
     
    )    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
  submitBtn: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#fff',
    padding: 20,
    width: 200,
  }
})

function mapStateToProps(state, { navigation }) {
  const title = navigation.state.params.title
  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(Quiz)
