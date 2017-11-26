import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'flashcard:storage'

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(result => {
      const data = JSON.parse(result)
      return data
    })
}

export function getDeck() {
  
}

export function saveDeckTitle() {
  
}

export function addCardToDeck() {
  
}