import { StyleSheet } from 'react-native'
import { qiitaGreen } from './colors'

export const buttons = StyleSheet.create({
  deckBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: qiitaGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
    minWidth: 200,
  }
})