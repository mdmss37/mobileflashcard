import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'Flashcard:Notifications'


export function pluralize(num, thing) {
  return num === 1 ? `${num} ${thing}` : `${num} ${thing}s`
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAlllScheduledNotificationsAsync)
} 

function createNotification() {
  console.log("createNotification")
  return {
    title: "Practice makes Perfect",
    body: "👋 to retain your memory, please try flash card everyday!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    console.log(data)
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          console.log(status)
          if (status === 'granted' || status === 'undetermined') {
            Notifications.cancelAllScheduledNotificationsAsync()
            let tommorrow = new Date()
            tommorrow.setDate(tommorrow.getDate() + 1)
            tommorrow.setHours(20)
            tommorrow.setMinutes(0)
            
            const notificationSchedule = {
                time: tommorrow,
                repeat: 'day',
              }

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              notificationSchedule,
            )
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            console.log("Notification set")
            console.log(notificationSchedule)
          }
        })
    }
  })
}
