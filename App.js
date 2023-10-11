import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './Screens/Landing';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { NavigationContainer, } from '@react-navigation/native';


// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator iinitialRouteName='Landing'>
      <Stack.Screen 
           name="Landing" 
           component={Landing}
           options={{headerShown: true}}

           />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
