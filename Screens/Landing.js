import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCurrentUser, signOutUser } from '../Services/firebaseAuth'
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { GetUserEntries } from '../Services/firebasedb';


const Landing = () => {
  const user = getCurrentUser();
  const navigation = useNavigation();
  const [AllEntries, setAllEntries] = useState([]);
  const [uid, setUid] = useState();
  const [HealthScore, setHealthScore] = useState("0");

  const Signout = async () => {
    signOutUser();
    navigation.navigate("Login");
  }

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (err) {
      console.log("Error @clearOnboarding: ", err);
    }
  }

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

    getEntries();
  }, [uid]);

  useEffect(() => {
    if (AllEntries.length > 0) {
      // Filter out entries without emotions
      const entriesWithEmotions = AllEntries.filter(item => item.JournalEntry && Array.isArray(item.JournalEntry.emotions) && item.JournalEntry.emotions.length > 0);
  
      if (entriesWithEmotions.length > 0) {
        const validScores = entriesWithEmotions.map(item => {
          const totalScore = item.JournalEntry.emotions.reduce((accumulator, emotionObject) => {
            return accumulator + emotionObject.score;
          }, 0);
  
          return {
            id: item.id,
            averageScore: totalScore / item.JournalEntry.emotions.length,
          };
        });
  
        const scores = validScores.map(item => item.averageScore);
  
        if (scores.length > 0) {
          const minScore = Math.min(...scores);
          const maxScore = Math.max(...scores);
  
          function scaleToHealthScore(score) {
            if (maxScore === minScore) {
              return 0; // Prevent division by zero
            }
            return ((score - minScore) / (maxScore - minScore)) * 10;
          }
  
          const overallHealthScore = scores.reduce((accumulator, score) => accumulator + scaleToHealthScore(score), 0) / scores.length;
  
          const roundedHealthScore = parseFloat(overallHealthScore).toFixed(1);
          setHealthScore(roundedHealthScore);
          console.log(roundedHealthScore);
        } else {
          setHealthScore(0);
        }
      } else {
        setHealthScore(0);
      }
    }
  }, [AllEntries]);
  

  const GetSuggestions = (HealthScore) => {
    if (HealthScore <= 2) {
      
      return "score <= 2";
    } else if (HealthScore <= 4) {
      
      return "score > 2 and <= 4";
    } else if (HealthScore <= 6) {
      
      return "score > 4 and <= 6";
    } else if (HealthScore <= 8) {
      
      return "score > 6 and <= 8";
    } else if (HealthScore <= 10) {
      
      return "score > 8 and <= 10";
    } else {
      
      return "above 10";
    }
  };

  
  const handleRecommendation = () => {
    const recommendation = GetSuggestions(HealthScore);
    Alert.alert('Recommendation', recommendation);
  };

  useEffect(() => {
    if (Array.isArray(AllEntries) && AllEntries.length > 0) {
      const emotionAverages = calculateAverageEmotionScores(AllEntries);
      
      console.log(emotionAverages);
    }
  }, [AllEntries]);
  
  const calculateAverageEmotionScores = (entries) => {
    const emotionAverages = {};
  
    // Initialize emotion sums and counts
    const emotionSums = {
      anger: 0,
      disgust: 0,
      fear: 0,
      joy: 0,
      sadness: 0,
      
    };
    const emotionCounts = { ...emotionSums };
  
    // make sure array not undefined
    if (Array.isArray(entries)) {
      // Calculate emotion sums and counts
      entries.forEach((entry) => {
        if (entry.JournalEntry.emotions && entry.JournalEntry.emotions.length > 0) {
          entry.JournalEntry.emotions.forEach((emotion) => {
            // Update emotion sums and counts
            emotionSums[emotion.emotion] += emotion.score;
            emotionCounts[emotion.emotion]++;
          });
        }
      });
    }
  
    // Calculate average emotion scores
    for (const emotion in emotionSums) {
      emotionAverages[emotion] = (emotionSums[emotion] / emotionCounts[emotion]).toFixed(2);
    }
  
    return emotionAverages;
  };
  
  


  return (
    <ScrollView style={styles.container}>
      {AllEntries.length === 0 ? (
        <View style={styles.heroBox}>
          <Text style={styles.heroText}>Get Journaling</Text>
          <Text style={styles.heroPara}>
            Before we can give you a summary of your mental health score for the last month, you need to make an entry first
          </Text>
          <TouchableOpacity style={styles.MakeEntry}>
            <Text style={styles.MakeEntryText}>Make an entry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.heroBoxWithHealthScore}>
          <View style={styles.healthScoreActiveBox}>
            <View style={styles.healthScoreDisplay}>
              <Text style={styles.healthScore}>{HealthScore}</Text>

            </View>

            <Text style={styles.heroPara}>
              Your average mental health score is calculated based on the scores gathered from your journal entries.
            </Text>
          </View>

          <TouchableOpacity onPress={handleRecommendation} style={styles.recommend}>
            <Text style={styles.recommendText}>Get Recommendation</Text>
          </TouchableOpacity>

        </View>
      )}

      <View style={styles.YourEntries}>
        <Text style={styles.entriesText}> Emotion Overview </Text>

        {/* {AllEntries.map((Entry, index) => (
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
                      .slice(0, 10) 
                      .join(' ')
                    : ''} </Text>


              </View>
            </View>
          </TouchableOpacity>
        ))} */}

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

      <TouchableOpacity onPress={calculateAverageEmotionScores} style={styles.clear}>
        <Text>average</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default Landing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 25
  },
  heroBox: {
    width: 350,
    height: 200,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
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
  heroBoxWithHealthScore: {
    width: 350,
    height: 200,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    // paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,

  },
  healthScoreActiveBox: {
    flexDirection: 'row'
  },
  healthScoreDisplay: {
    width: 100,
    height: 100,
    backgroundColor: '#AF8EFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthScore: {
    fontSize: 30,
    color: 'white'
  },
  MakeEntry: {
    width: 250,
    height: 40,
    backgroundColor: "#AF8EFF",
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 5
  },
  MakeEntryText: {
    color: "white",
    fontSize: 20
  },
  Categories: {
    flexDirection: 'row', 
    width: 350,
    paddingTop: 25
  },
  Doctors: {
    flex: 1, 
    height: 200,
    backgroundColor: '#F5F6FA',
    marginRight: 10, 
    borderRadius: 15
  },
  Exercises: {
    flex: 1, 
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
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  recommend: {
    width: 200,
    height: 30,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#AF8EFF",
    justifyContent: 'center',
    alignItems: 'center', 
    color: 'white'
  },
  recommendText: {
    color: 'white'
  }



})