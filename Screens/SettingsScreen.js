import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { signOutUser } from '../Services/firebaseAuth';
import AsyncStorage from '@react-native-async-storage/async-storage'


const SettingsScreen = ({navigation}) => {

  const Signout = async () => {
    signOutUser();
    navigation.navigate("Onboarding");
  }

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (err) {
      console.log("Error @clearOnboarding: ", err);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.created}>Created by Justin Koster</Text>
      <Text style={styles.version}>Version 1.0</Text>

      <TouchableOpacity style={styles.Clear} onPress={clearOnboarding}>
        <Text style={styles.text}>Clear Onboarding</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Logout} onPress={Signout}>
      <Text style={styles.text}>Sign Out</Text>

      </TouchableOpacity>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",

  },
  created: {
    fontFamily: "MontserratRegular",
    marginTop: 200
  },
  version: {
    fontFamily: "MontserratRegular",
    marginTop: 5
  },
  Clear: {
    backgroundColor: "#AF8EFF",
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 300
  },
  Logout: {
    backgroundColor: "#AF8EFF",
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20
  },
  text: {
    fontFamily: "MontserratBold",
    color: "white"
  }
})