import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { signInUser } from '../Services/firebaseAuth';


const Login = () => {
    const [email, setEmail] = useState('Email');
    const [password, setPassword] = useState('Password');

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const logOn = async () => {

        setLoading(true);

        if (!email || !password) {
            Alert.alert("Whoops", "Please provide your email and password");
        } else {
            try {

                await signInUser(email, password).then(() => {
                    setLoading(false)
                })

                navigation.navigate('tabNavigator');

            } catch (error) {

                console.error("Login error: ", error);
                Alert.alert("Login Failed", "Please check your credentials.");
            }
        }
    };

    return (
        <View style={styles.container}>

            {!loading ?
                (
                    <>
                        <Image source={require('../assets/FEEL_FINE.png')} style={[styles.image, { resizeMode: 'contain' }]} />

                        <Text style={styles.inputLabel} >Email</Text>
                        <TextInput style={styles.input} onChangeText={(newValue) => setEmail(newValue)} placeholder='Enter Email' />

                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput style={styles.input} onChangeText={(newValue) => setPassword(newValue)}  placeholder='Enter Password'/>

                        <TouchableOpacity onPress={logOn} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <Text onPress={() => navigation.navigate('Register')} style={styles.extra}>Create an account?</Text>
                    </>
                )
                :

                <View style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator />
                    <Text style={styles.loading}>Loading...</Text>
                </View>
            }
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    image: {
        flex: 0.5,
        height: 300,
        width: 150,
        justifyContent: 'center',
        marginBottom: 50,
        // backgroundColor: "red"
    },
    inputLabel: {
        fontSize: 12,
        marginTop: 20,
        alignItems: "center",
        marginBottom: 5,
        color: 'black', 
        fontFamily: 'MontserratRegular',
    },
    input: {
        backgroundColor: '#F5F6FA',
        height: 50,
        width: 300,
        borderRadius: 20,
        color: 'black',
        alignSelf: 'center',
        paddingLeft: 20,
        fontFamily: 'MontserratRegular',

    },
    button: {
        width: 200,
        height: 40,
        backgroundColor: '#AF8EFF',
        borderRadius: 15,
        // padding: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        marginBottom: 20
    },
    buttonText: {
        fontFamily: 'MontserratBold',
        fontSize: 16,
        color: "white"
    },
    extra: {
        fontFamily: 'MontserratRegular',
        fontSize: 12
    },
    loading: {
        fontSize: 15
    }

})