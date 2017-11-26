import React from 'react'
import { Platform } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Deck from './Deck'
import DeckList from './DeckList'
import AddCard from './AddCard'
import DeckQuestion from './DeckQuestion'
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
    screen: AddCard,
    navigationOptions: {
      tabBarLabel: 'Add new card',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  }
}, {
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

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})