import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'


function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...action.decks
      }
    default :
      return state
  }
}

export default decks

// Deck is like below
// {
//   title: 'React',
//   questions: [
//     {
//       question: 'What is React?',
//       answer: 'A library for managing user interfaces'
//     },
//     {
//       question: 'Where do you make Ajax requests in React?',
//       answer: 'The componentDidMount lifecycle event'
//     }
//   ]
// }