import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCurrentUser, signOutUser } from '../Services/firebaseAuth'
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { GetUserEntries } from '../Services/firebasedb';

const Landing = () => {
  //consts
  const user = getCurrentUser()
  const navigation = useNavigation();
  // const userId = user.uid;

  //usestates
  const [AllEntries, setAllEntries] = useState([])
  const [uid, setUid] = useState()

  
  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setUid(user.uid);
    }
  }, []);

  const getEntries = async () => {
    try {
      console.log("Getting data");
      const UserEntries = await GetUserEntries(uid);
      setAllEntries(UserEntries);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    // console.log(AllEntries);
  }, [AllEntries]);

// get average score for all entries
  const averagesForSets = AllEntries.map(item => {
    if (item.JournalEntry.emotions && item.JournalEntry.emotions.length > 0) {
      const totalScore = item.JournalEntry.emotions.reduce((accumulator, emotionObject) => {
        return accumulator + emotionObject.score;
      }, 0);

      return {
        id: item.id,
        averageScore: totalScore / item.JournalEntry.emotions.length,
      };
    } else {
      return {
        id: item.id,
        averageScore: 0, // Default average when no emotions are present
      };
    }
  });

  console.log(averagesForSets.averageScore);

  const scores = averagesForSets.map(item => item.averageScore);

  // console.log('Individual Scores:', scores);
  const minScore = Math.min(...scores); // Find the minimum score
  const maxScore = Math.max(...scores); // Find the maximum score

  // Define a function to scale the scores to the 0-10 range
  function scaleToHealthScore(score) {
    return ((score - minScore) / (maxScore - minScore)) * 10;
  }

  // Calculate the overall health score
  const overallHealthScore = scores.reduce((accumulator, score) => accumulator + scaleToHealthScore(score), 0) / scores.length;

  console.log('Overall Health Score:', overallHealthScore);


  const Signout = async () => {
    signOutUser();
    // navigation.navigate('LoginStack');
    //TODO: add navigation to navigate to login when signing out
  }

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding')
    } catch (err) {
      console.log("Error @clearOnboarding: ", err)
    }
  }

  //Dummy Data
  const Entries = [
    { title: 'what a rough day', entry: 'today was a rough day at work, i had a bit of a fight with someone and i dont feel good about it' },
    { title: 'what a rough night', entry: 'today was a rough day at work, i had a bit of a fight with someone and i dont feel good about it' }
  ]

  //if statement wat usestates set vir die hero text, if no entry dan wys die get journaling, as da entries is dan wys health score

  return (
    <ScrollView style={styles.container}>

      <View style={styles.heroBox}>
        <Text style={styles.heroText}>Get Journaling</Text>
        <Text style={styles.heroPara} >Before we can give you a summary of your mental health score for the last month, you need to make an entry first</Text>
        <TouchableOpacity style={styles.MakeEntry}>
          <Text style={styles.MakeEntryText}>Make an entry</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.YourEntries}>
        <Text style={styles.entriesText}> Your Entries </Text>

        {AllEntries.map((Entry, index) => (
          <TouchableOpacity key={index}
            onPress={() => navigation.navigate("EntryDetails", { Entry })}
            activeOpacity={0.75}>
            <View style={styles.Entry}>
              <View style={styles.EntryBlock}></View>
              <View style={styles.EntryTextBlock}>
                <Text> {Entry.JournalEntry.title}</Text>
                <Text style={styles.EntryThumbnail}>
                  {Entry.JournalEntry.text
                    ? Entry.JournalEntry.text
                      .split(' ')
                      .slice(0, 10) // Display the first 20 words
                      .join(' ')
                    : ''} </Text>


              </View>
            </View>
          </TouchableOpacity>
        ))}

      </View>
      <TouchableOpacity onPress={clearOnboarding} style={styles.clear}>
        <Text>clear Onboarding</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={Signout} style={styles.clear}>
        <Text>Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={getEntries} style={styles.clear}>
        <Text>test</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default Landing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // alignItems: 'center', // Center horizontally
    padding: 25
  },
  heroBox: {
    width: 350, // Adjust width as needed
    // height: 160, // Adjust height as needed
    backgroundColor: '#F5F6FA', // Optional background color
    justifyContent: 'center', // Center child view vertically
    alignItems: 'center', // Center child view horizontally
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20
  },
  heroText: {
    fontSize: 30
  },
  heroPara: {
    fontSize: 10,
    textAlign: "center",
    width: 250,
    padding: 20
  },
  MakeEntry: {
    width: 250,
    height: 40,
    backgroundColor: "#AF8EFF",
    justifyContent: 'center', // Center child view vertically
    alignItems: 'center', // Center child view horizontally
    borderRadius: 5
  },
  MakeEntryText: {
    color: "white",
    fontSize: 20
  },
  Categories: {
    flexDirection: 'row', // To place the child views next to each other
    width: 350,
    paddingTop: 25
  },
  Doctors: {
    flex: 1, // This allows the child views to take equal width
    height: 200,
    backgroundColor: '#F5F6FA',
    marginRight: 10, // To add spacing between the child views
    borderRadius: 15
  },
  Exercises: {
    flex: 1, // This allows the child views to take equal width
    height: 200,
    backgroundColor: '#F5F6FA',
    borderRadius: 15

  },
  YourEntries: {
    width: 350,
    backgroundColor: "#F5F6FA",
    marginTop: 25,
    alignItems: "center",
    paddingTop: 15,
    marginBottom: 50,
    borderRadius: 15
  },
  entriesText: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 15
  },
  Entry: {
    width: 300,
    height: 70,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 15
  },
  EntryBlock: {
    height: 50,
    width: 60,
    backgroundColor: "#8B80F8",
    borderRadius: 15,
  },
  EntryTextBlock: {
    height: 50,
    width: 200,
    marginLeft: 10
  },
  EntryThumbnail: {
    fontSize: 10
  },
  clear: {
    width: 200,
    height: 30,
    borderRadius: 10,
    margin: 20,
    backgroundColor: "#AF8EFF",
    justifyContent: 'center', // Center child view vertically
    alignItems: 'center', // Center child view horizontally
  }



})