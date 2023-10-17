import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Landing from './Screens/Landing';
import Doctors from './Screens/Doctors';
import { createStackNavigator } from '@react-navigation/stack'; // Make sure this import is correct
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Journal from './Screens/Journal';
import Exercise from './Screens/Exercise';
import Onboarding from './Screens/Components/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Login from './Screens/Login';

const Tab = createBottomTabNavigator();

const Loading = () => {
  <View>
    <ActivityIndicator size="large" />
  </View>
}
const Stack = createStackNavigator();


function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{
      style: {
        backgroundColor: 'purple', // Background color of the tab bar
      },
      activeTintColor: 'purple', // Color for active tab icons
      inactiveTintColor: 'gray', // Color for inactive tab icons
      
    }}
    >
      
       <Tab.Screen
        name="Landing"
        component={Landing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Doctors"
        component={Doctors}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Exercise"
        component={Exercise}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Journal"
        component={Journal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}



export default function App({navigation, props}) {

  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if(value !== null) {
        setViewedOnboarding(true)
      }
    } catch (err) {
      console.log('error @checkOnboarding: ', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkOnboarding();
  }, [])

  return (
    <NavigationContainer>
      {loading ? (
        <Loading />
      ) : viewedOnboarding ? (
        <TabNavigator />
      ) : (
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="tabNavigator" component={TabNavigator} options={{ headerShown: false }}/>

          {/* Add other screens to the stack as needed */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
    // <NavigationContainer>
    //   {loading ? <Loading /> : viewedOnboarding ? <TabNavigator /> : <Onboarding/>}
    //   {/* <TabNavigator /> */}
    // </NavigationContainer>
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
