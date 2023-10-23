import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { registerNewUser } from '../Services/firebaseAuth';
import { useNavigation, CommonActions } from '@react-navigation/native';




const Register = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');



    const registerUser = async () => {

        if (!email || !password ) {
            Alert.alert("Whoops", "Please provide your email and password");
          } else {
            try {
              // Attempt to sign in the user
              console.log("Registering...")
              registerNewUser(username, email, password)
        
              //navigate if loggin was successfull
              navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      { name: 'Login' }, // Replace with your actual TabNavigator screen name
                    ],
                  })
                );
        
              
            } catch (error) {
             
              console.error("Regsister error: ", error);
              Alert.alert("Register Failed", "Please check your credentials.");
            }
          }
        }
    
      return (
        <View style={styles.container}>
                  <Image source={require('../assets/Logo.png')} style={[styles.image, { resizeMode: 'contain'}]}/>
            
            <Text style={styles.inputLabel} >Username</Text>
            <TextInput style={styles.input} onChangeText={(newValue) => setUsername(newValue)}/>

            <Text style={styles.inputLabel} >Email</Text>
            <TextInput style={styles.input} onChangeText={(newValue) => setEmail(newValue)}/>
            
            <Text style={styles.inputLabel}>password</Text>
            <TextInput style={styles.input} onChangeText={(newValue) => setPassword(newValue)}/>
    
    <TouchableOpacity onPress={registerUser} style={styles.button}>
        <Text>Register</Text>
    </TouchableOpacity>
<Text onPress={() => navigation.navigate('Login')}>Already have an account?</Text>

          {/* <Text onPress={loggingin}>Login</Text> */}
        </View>
      )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      },
      image: {
        flex: 0.3,
        height: 100,
        justifyContent: 'center',
        marginBottom: 100
      },
      inputLabel: {
        fontSize: 12,
        marginTop: 20,
        alignItems: "center",
        marginBottom: 5,
        color: 'black'
    },
      input: {
        backgroundColor: '#F5F6FA',
        height: 50,
        width: 300,
        borderRadius: 20,
        color: 'black',
        alignSelf: 'center',
        paddingLeft: 20
    },
    button: {
        width: 200,
        backgroundColor: '#AF8EFF',
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        marginTop: 50,
        marginBottom: 20
    }
})