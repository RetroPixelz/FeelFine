import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';


const Login = () => {
const navigation = useNavigation();

const loggingin = () => {
    navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'tabNavigator' }, // Replace with your actual TabNavigator screen name
          ],
        })
      );
    
}

  return (
    <View>
      <Text onPress={loggingin}>Login</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})