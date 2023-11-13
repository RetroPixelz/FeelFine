import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Settings, StyleSheet, Text, View } from 'react-native';
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
import Register from './Screens/Register';
import EntryDetails from './Screens/EntryDetails';
import JournalScreen from './Screens/JournalScreen';
import { useFonts } from 'expo-font';
import SettingsScreen from './Screens/SettingsScreen';
// import { useFonts} from '@expo-google-fonts/montserrat';



const Tab = createBottomTabNavigator();

const Loading = () => {
  <View>
    <ActivityIndicator size="large" />
  </View>
}
const Stack = createStackNavigator();

function JournalStackScreen() {
  return (
    <JournalStack.Navigator>
      <JournalStack.Screen name="Journal" component={Journal} options={{ headerShown: false }} />
      {/* Other screens within the Journal tab if needed */}
    </JournalStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{
      style: {
        backgroundColor: 'purple', // Background color of the tab bar
        
      },
      activeTintColor: '#AF8EFF', // Color for active tab icons
      inactiveTintColor: 'gray', // Color for inactive tab icons
      
    }}
    >
 
       <Tab.Screen
        name="Home"
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
        name="JournalScreen"
        component={JournalScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Settings"
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login} 
        options={{
          tabBarButton: () => null, 
        }}
      />
      <Tab.Screen
        name="EntryDetails"
        component={EntryDetails} 
        options={{
          tabBarButton: () => null, 
        }}
      />
      
    </Tab.Navigator>
  );
}



export default function App({navigation, props}) {

  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const [loaded] = useFonts({
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratLight: require('./assets/fonts/Montserrat-Light.ttf'),


  })

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

  if(!loaded) {
    return null;
   }
  

  return (
    <NavigationContainer>
      {loading ? (
        <Loading />
      ) : viewedOnboarding ? (
        <TabNavigator />
      ) : (
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={Onboarding}  options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="EntryDetails" component={EntryDetails} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name="Journal" component={Journal} options={{ headerShown: false }}/>
          <Stack.Screen name="tabNavigator" component={TabNavigator} options={{ headerShown: false }}/>

          {/* <Stack.Screen name="LoginStack" component={Login} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
      )}
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
