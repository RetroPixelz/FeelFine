import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { saveJournalEntry } from '../Services/firebasedb';
import { getCurrentUser, signOutUser } from '../Services/firebaseAuth';
import analyzeEmotion from '../Services/analyzeEmotion';


const Journal = () => {
  //consts
  const user = getCurrentUser()
  const userId = user.uid;

  //usestates
  const [title, setTitle] = useState('Give your entry a title');
  const [emotion, setEmotion] = useState(null);
  const [text, setText] = useState('Tell me about your day.');

 //functions
 const handleAnalyzeAndSave = async () => {
  const emotionResult = await analyzeEmotion(text);
  setEmotion(emotionResult);
  console.log(emotionResult);

  // Create an emotion object for the entry
  const entryEmotions = [
    { emotion: "anger", score: emotionResult.anger },
    { emotion: "disgust", score: emotionResult.disgust },
    { emotion: "fear", score: emotionResult.fear },
    { emotion: "joy", score: emotionResult.joy },
    { emotion: "sadness", score: emotionResult.sadness }
  ];

  // Step 2: Create Journal Entry with Emotions
  const journalEntry = {
    title,
    text,
    emotions: entryEmotions
  };

  // Step 3: Save the Entry to the Database
  const success = await saveJournalEntry(userId, journalEntry);

  if (success === true) {
    console.log("Added Journal successfully");
    Alert.alert("Added Journal successfully");
  } else {
    console.log("Whoops... adding Entry failed.");
    Alert.alert("whoops", "something went wrong when trying to add Journal Entry");
  }
};



  // const handleAnalyze = async () => {
  //   const emotionResult = await analyzeEmotion(text);
  //   setEmotion(emotionResult);
  //   console.log(emotion)
  // };

  // const CreateEntry = async () => {
    
  //   var JournalEntry = {
  //     text,
      
  //   }

  //   //sentiment analyss save in array en dan save dit saam met die entry hier onder saam JournalEntry
  //   // var skins = []
  //   // image && skins.push({imageUrl: image, title: name})
  //   const success = await saveJournalEntry(userId, JournalEntry)
  //   if (success === true) {
  //     console.log("Added Journal successfully")
  //     Alert.alert("Added Journal successfully")
  //   } else {
  //     console.log("Whoops... adding Entry failed.")
  //     Alert.alert("whoops", "something went wrong when trying to add Journal Entry")
  //   }
  // }


  return (
    <View style={styles.container}>
      {/* <Text>How are you feeling today?</Text> */}
      <Text style={styles.HowWasDay}>How was your day</Text>

      <View style={styles.JournalSection}>

      <View style={styles.TitleBox}>
        <TextInput style={styles.titleInput}
        onChange={setTitle}
        value={title}
        />
      </View>
        
        <TextInput style={styles.input}
          onChangeText={setText}
          value={text}
          multiline={true} 
          numberOfLines={1}
        />
        <View style={styles.submitBox}>
          <TouchableOpacity style={styles.CameraBox}>
            <MaterialCommunityIcons name="camera-outline" color={"white"} size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Analyse} onPress={handleAnalyzeAndSave}>
            <Text style={styles.AnalyseText}>Analyse</Text>
          </TouchableOpacity>
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
  HowWasDay: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: 'center'
  },
  TitleBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  JournalSection: {
    alignItems: 'center'
  },
  titleInput: {
    width: 350,
    backgroundColor: "#F5F6FA",
    borderRadius: 15,
    padding: 15
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
    height: 55,
    backgroundColor: "#8B80F8",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  Analyse: {
    width: 255,
    height: 55,
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