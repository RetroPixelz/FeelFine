import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Landing = () => {
  return (
    <View styles={styles.container}>
      <Text>Landing</Text>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
container: {
    padding: 20,
    paddingTop: 40,
}

})