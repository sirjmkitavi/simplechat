import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native'
import firebase from 'react-native-firebase'
import { NavigationActions } from 'react-navigation'

const ChatItem = ({ conversationId }) => {
  const [conversation, setConversation] = useState(null)

  useEffect(() => {
    if (!conversation) {
      firebase.database().ref('conversations/' + conversationId).on('value', (snapshot) => {
        setConversation(snapshot.val())
      })
    }
  })

  if (!conversation) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <TouchableOpacity style={styles.container}>
      <Text>{conversation.lastMessage}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    alignContent: 'center',
  },
})

export default ChatItem