import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { purple, white, udacityBlue, red, qiitaGreen, lightGray, orange } from '../utils/colors'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { pluralize } from '../utils/helpers'
import { 
  setLocalNotification, 
  clearLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    answers: undefined,
    ready: false,
    questionIdx: 0,
    finishedQuiz: false
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })    
  }

  componentDidMount() {
    const questions = this.props.deck.questions
    const answers = Array(questions.length).fill(undefined)
    this.setState({
      answers,
      ready: true,
    })
    clearLocalNotification()
      .then(setLocalNotification())
  }

  handleRestartGame = () => {
    const questions = this.props.deck.questions
    const answers = Array(questions.length).fill(undefined)
    this.animatedValue.setValue(0)
    this.setState({
      answers,
      questionIdx: 0,
      finishedQuiz: false
    })
  }

  handleAnswerSubmit = (remember) => {
    this.animatedValue.setValue(0)
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

  handleFlipCard = () => {
    if(this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start()
    }
  }

  countElement = (arr, element) => arr.filter((elem) => elem === element).length

  render() {
    const { questions } = this.props.deck
    const { answers, questionIdx, isShowingAnswer, finishedQuiz, ready } = this.state

    if (ready === false || !answers) {
      return <AppLoading />
    }

    if (answers.length === 0) {
      return (
        <View style={styles.container}>
          <Text>There are no cards in the deck, please add card</Text>  
        </View>
      )
    }
    
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }

    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate}
      ]
    }

    const { question, answer } = questions[questionIdx]

    return (
      <View style={styles.container}>
      { finishedQuiz
        ?
        <View style={{flex: 1, padding: 20}}>
          <View style={{flex: 3, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 40}}>
              You finished quiz
            </Text>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              {this.countElement(answers, true)} correct out of {pluralize(questions.length, 'question')}
            </Text>          
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity 
              style={styles.restartQuizBtn}
              onPress={this.handleRestartGame}>
              <Text style={{textAlign: 'center', fontSize: 25, color: white}}>
                Click to restart flash card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.restartQuizBtn, {marginTop: 20, marginBottom: 20, backgroundColor: orange}]}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={{textAlign: 'center', fontSize: 25, color: white}}>
                Go back to Deck
              </Text>
            </TouchableOpacity>            
          </View>
        </View>
        :
        <View style={styles.container}>
          <Text>Question: {`${questionIdx + 1}/${questions.length}`}</Text>
          <View>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{question}</Text>  
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
              <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{answer}</Text>  
            </Animated.View>            
          </View>
          <TouchableOpacity style={{marginTop: 20}} onPress={this.handleFlipCard}>
            <Text style={{fontSize: 20, textAlign: 'center', color: red, fontWeight: 'bold'}}>
              Click to flip card
            </Text>
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
    marginTop: 10,
    marginBottom: 10,
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightGray,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: lightGray,
    position: "absolute",
    top: 0,
  },
  restartQuizBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: qiitaGreen,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minWidth: 200,
  },
})

function mapStateToProps(state, { navigation }) {
  const title = navigation.state.params.title
  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(Quiz)
