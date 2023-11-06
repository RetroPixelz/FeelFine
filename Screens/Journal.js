import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { saveJournalEntry } from '../Services/firebasedb';
import { getCurrentUser, signOutUser } from '../Services/firebaseAuth';
import analyzeEmotion from '../Services/analyzeEmotion';


const Journal = ({navigation}) => {
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

    //Create Journal Entry with Emotions
    const journalEntry = {
      title,
      text,
      emotions: entryEmotions
    };

    //Save the Entry to the Database
    const success = await saveJournalEntry(userId, journalEntry);

    if (success === true) {
      console.log("Whoops... adding Entry failed.");
      Alert.alert("whoops", "something went wrong when trying to add Journal Entry");
    } else {
      console.log("Added Journal successfully");
      Alert.alert("Wohoo!", "Entry added, you can view your entries on the Home screen.");

    }
  };


  return (
    <View style={styles.container}>
 {/* <Button
        title="Go back to JournalScreen"
        onPress={() => navigation.navigate('JournalScreen')}
      /> */}
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('JournalScreen')}>
                    <Text style={styles.btnText}> Back </Text>
      </TouchableOpacity>
      <Text style={styles.HowWasDay}>How was your day</Text>

      <View style={styles.JournalSection}>

        <View style={styles.TitleBox}>
          <TextInput style={styles.titleInput}
            onChangeText={setTitle}
            value={title}
            multiline={true}
            numberOfLines={1}
          />
        </View>

        <TextInput style={styles.input}
          onChangeText={setText}
          value={text}
          multiline={true}
          placeholder={text}
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
  },
  btn: {
    height: 40,
    width: 60,
    backgroundColor: "#8B80F8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
},
btnText: {
    color: 'white',
    fontSize: 20
},
})