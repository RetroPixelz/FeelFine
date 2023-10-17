import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from 'react-native-vector-icons';


const Journal = () => {
    const [text, onChangeText] = useState('Useless Text');
  return (
    <View style={styles.container}>
        <Text>How are you feeling today?</Text>
        <View style={styles.EmojiBox}>
            <View style={styles.emoji}></View>
            <View style={styles.emoji}></View>
            <View style={styles.emoji}></View>
            <View style={styles.emoji}></View>
            <View style={styles.emoji}></View>
        </View>
      <View style={styles.JournalSection}> 
      <Text style={styles.HowWasDay}>How was your day</Text>
      <TextInput style={styles.input}
      onChangeText={onChangeText}
      value={text}
      multiline={true} // Enable multiline input
  numberOfLines={1} 
      />
      <View style={styles.submitBox}>
        <View style={styles.CameraBox}>
        <MaterialCommunityIcons name="camera-outline" color={"white"} size={40} />
        </View>
        <View style={styles.Analyse}> 
           <Text style={styles.AnalyseText}>Analyse</Text>
        </View>                         
      </View>                
      </View>                        
    </View>
  )
}
    
export default Journal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        // alignItems: 'center', // Center horizontally
        padding: 25
      },
      EmojiBox: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 10
      },
      emoji: {
        width: 55,
        height: 55,
        margin: 5,
        backgroundColor: "#F5F6FA",
        borderRadius: 30
      },
      JournalSection: {
        alignItems: 'center'
      },
      HowWasDay: {
        fontWeight: "bold",
        fontSize: 20
      },
      input: {
        width: 350,
        height: 350,
        backgroundColor: "#F5F6FA",
        borderRadius: 15,
        marginTop: 20,
        padding: 15
      },
      submitBox: {
        flexDirection: "row",
        width: 350,
        height: 75,
        marginTop: 25,
        
      },
      CameraBox: {
        width: 75,
        height: 65,
        backgroundColor: "#8B80F8",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
      },
      Analyse: { 
        width: 255,
        height:  65,
        backgroundColor: "#8B80F8",
        marginLeft: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
      },
      AnalyseText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold"
      }
})