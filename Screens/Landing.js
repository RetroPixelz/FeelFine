import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Alert, useWindowDimensions } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCurrentUser, signOutUser } from '../Services/firebaseAuth'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { GetUserEntries } from '../Services/firebasedb';
import EmotionChart from './EmotionChart';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const Landing = () => {
  const user = getCurrentUser();
  const navigation = useNavigation();
  const [AllEntries, setAllEntries] = useState([]);
  const [uid, setUid] = useState();
  const [HealthScore, setHealthScore] = useState("0");
  const [dataForChart, setDataForChart] = useState([]);
  const { width } = useWindowDimensions();

  const [todaysAverage, setTodaysAverage] = useState();
  const [yesturdaysAverage, setYesturdaysAverage] = useState();
  const [thisWeekAverage, setThisWeekAverage] = useState();



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
  }, []);


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
      const emotionAverages = calculateEmotionAverages(dataForChart, 'today');
      setTodaysAverage(emotionAverages)
      console.log('Today Averages:', emotionAverages);

      const yesterdayAverages = calculateEmotionAverages(dataForChart, 'yesterday');
      setYesturdaysAverage(yesterdayAverages)
      console.log('Yesterday Averages:', yesterdayAverages);

      const thisWeekAverages = calculateEmotionAverages(dataForChart, 'thisWeek');
      setThisWeekAverage(thisWeekAverages)
      console.log('This Week Averages:', thisWeekAverages);
    }
  }, [AllEntries]);

  const calculateEmotionAverages = (data, dateFilter) => {
    const emotionSumCount = {
      anger: { sum: 0, count: 0 },
      disgust: { sum: 0, count: 0 },
      fear: { sum: 0, count: 0 },
      joy: { sum: 0, count: 0 },
      sadness: { sum: 0, count: 0 },
    };

    const currentDate = new Date(); // Store the current date

    // Filter the data based on the provided date range
    const filteredData = data.filter((entry) => {
      const entryDate = entry.date;

      if (dateFilter === 'today') {
        const today = new Date();
        return (
          entryDate.getDate() === today.getDate() &&
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        );
      }

      if (dateFilter === 'yesterday') {
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
        if (isSameDay(entryDate, yesterday)) {

          return true;
        }
      }

      if (dateFilter === 'thisWeek' && isSameWeek(entryDate, currentDate)) {

        return true;
      }

      return false;
    });

    // calculate the sum and count for each emotion
    filteredData.forEach((entry) => {
      Object.keys(entry).forEach((emotion) => {
        if (emotion !== 'date') {
          emotionSumCount[emotion].sum += entry[emotion];
          emotionSumCount[emotion].count += 1;
        }
      });
    });

    // Calculate the average for each emotion
    const emotionAverages = {};
    Object.keys(emotionSumCount).forEach((emotion) => {
      emotionAverages[emotion] =
        emotionSumCount[emotion].count > 0
          ? emotionSumCount[emotion].sum / emotionSumCount[emotion].count
          : 0;
    });

    return emotionAverages;
  };

  // Helper function to check if two dates are on the same day
  const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  const isSameWeek = (date1, date2) => {
    return true;
  };

  AllEntries.forEach(entry => {
    // Check if the entry has a timestamp
    if (entry.timestamp) {
      const timestamp = entry.timestamp;
      // econds and nanoseconds from timestamp
      const seconds = timestamp.seconds;
      const nanoseconds = timestamp.nanoseconds;
      // create a Date object
      const javascriptDate = new Date(seconds * 1000 + nanoseconds / 1000000);
      console.log(javascriptDate);
    } else {
      console.log("Timestamp is missing for this entry");
    }
  });

  useEffect(() => {
    const transformedData = AllEntries
      .filter(entry => entry.timestamp && entry.JournalEntry && entry.JournalEntry.emotions)
      .map(entry => ({
        date: new Date(entry.timestamp.seconds * 1000 + entry.timestamp.nanoseconds / 1000000),
        anger: (entry.JournalEntry.emotions.find(emotion => emotion.emotion === 'anger')?.score || 0),
        disgust: (entry.JournalEntry.emotions.find(emotion => emotion.emotion === 'disgust')?.score || 0),
        fear: (entry.JournalEntry.emotions.find(emotion => emotion.emotion === 'fear')?.score || 0),
        joy: (entry.JournalEntry.emotions.find(emotion => emotion.emotion === 'joy')?.score || 0),
        sadness: (entry.JournalEntry.emotions.find(emotion => emotion.emotion === 'sadness')?.score || 0),
      }));

    setDataForChart(transformedData);

  }, [AllEntries]);


  return (
    <ScrollView style={styles.container}>
      {AllEntries.length === 0 ? (
        <View style={styles.heroBox}>
          <Text style={styles.heroText}>Get Journaling</Text>
          <Text style={styles.heroPara1}>
            Before we can give you a summary of your mental health score for the last month, you need to make an entry first
          </Text>
          <TouchableOpacity style={styles.MakeEntry} onPress={() => navigation.navigate('JournalScreen')}>
            <Text style={styles.MakeEntryText} >Make an entry</Text>
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

        <EmotionChart
          todayAverages={todaysAverage}
          yesterdayAverages={yesturdaysAverage}
          thisWeekAverages={thisWeekAverage}

        />

        <View>

        </View>

      </View>

      <TouchableOpacity onPress={getEntries} style={styles.button}>
        <Text style={styles.refresh}>Refresh</Text>
      </TouchableOpacity>


      <View style={styles.buttons}>
        <TouchableOpacity onPress={clearOnboarding} style={styles.clear}>
          <Text>clear Onboarding</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={Signout} style={styles.clear}>
          <Text>Sign out</Text>
        </TouchableOpacity>

      </View>



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
  heroPara1: {
    fontSize: 10,
    textAlign: "center",
    width: 250,
    padding: 20
  },
  heroPara: {
    fontSize: 15,
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
    height: 350,
    backgroundColor: "#F5F6FA",
    marginTop: 25,
    alignItems: "center",
    paddingTop: 15,
    marginBottom: 10,
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
    width: 140,
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
  },
  chart: {
    height: 200,
    width: 320,
  },
  buttons: {
    flexDirection: "row"
  },
  button: {
    width: 350,
    height: 50,
    backgroundColor: "#AF8EFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,

  },
  refresh: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  }



})