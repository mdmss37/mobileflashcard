import React from 'react'
import { Platform } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { white, purple, udacityBlue } from '../utils/colors'
import Deck from './Deck'
import DeckList from './DeckList'
import AddCard from './AddCard'
import AddDeck from './AddDeck'
import Quiz from './Quiz'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My flash card deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddCard: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add new Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
}, {
  animationEnabled: true,
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
})

const Stacks = StackNavigator({
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
})

export const Navigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Stacks: {
    screen: Stacks,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})