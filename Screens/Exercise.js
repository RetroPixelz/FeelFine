import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const Exercise = () => {
  const Exercises = [
    { name: 'Childs Pose', type: 'stretch', duration: '10-20 min', },
    { name: 'Childs Pose', type: 'stretch', duration: '10-20 min', },
    { name: 'Childs Pose', type: 'stretch', duration: '10-20 min', },
    { name: 'Rose', type: 'stretch', duration: '10-20 min', },
  ]

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExercises, setFilteredExercises] = useState(Exercises);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = Exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(text.toLowerCase()) ||
      exercise.type.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.heroText}>Let's find a Exercise</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for an Exercise"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <ScrollView style={styles.ExerciseCardSection}>

        {filteredExercises.length === 0 ? (
          <Text style={styles.noResultsText}>No Exercise found</Text>
        ) : (
          <View >
            {filteredExercises.map((exercise, index) => (
              <View style={styles.ExerciseCard} key={index}>
                <View style={styles.ExerciseDetails}>
                  <View style={styles.DetailSection}>
                    <Text style={styles.ExerciseName}>{exercise.name}</Text>
                    <Text style={styles.ExerciseType}>{exercise.type}</Text>
                  </View>
                </View>
                <View style={styles.BottomSection}>
                  <Text style={styles.duration}>{exercise.duration}</Text>
                  <View style={styles.TryOut}>
                    <Text style={styles.TryOutText}>Try it out</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>

    </View>
  )
}

export default Exercise

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: 'center',
    padding: 25
  },
  heroText: {
    fontSize: 20,
    fontFamily: 'MontserratBold',

  },
  searchBar: {
    width: 350,
    height: 40,
    backgroundColor: '#F5F6FA',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: "center",
    paddingLeft: 10,
    fontFamily: 'MontserratRegular',

  },
  searchBarText: {
    color: "black",
    fontSize: 15,
    fontFamily: 'MontserratBold',

  },
  ExerciseCardSection: {
    marginTop: 30,
    width: 360
  },
  ExerciseCard: {
    width: 350,
    height: 200,
    backgroundColor: '#F5F6FA',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15
  },
  ExerciseDetails: {
    width: 325,
    height: 100,
    flexDirection: "row"
  },
  ExerciseImage: {
    width: 100,
    height: 100,
    backgroundColor: "gray",
    borderRadius: 5,
    marginRight: 20
  },
  DetailSection: {
    flexDirection: "column"
  },
  ExerciseName: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
    marginBottom: 10,

  },
  ExerciseType: {
    fontSize: 12.5,
    marginBottom: 2.5,
    fontFamily: 'MontserratRegular',

  },
  Location: {
    fontSize: 12.5,
    fontFamily: 'MontserratRegular',

  },
  BottomSection: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center"
  },
  TryOut: {
    width: 150,
    height: 40,
    backgroundColor: "#AF8EFF",
    marginLeft: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  TryOutText: {
    color: "white",
    fontSize: 15,
    fontFamily: 'MontserratBold',

  },
  duration: {
    width: 150,
    fontFamily: 'MontserratRegular',

  },
  noResultsText: {
    alignSelf: "center",
    fontFamily: 'MontserratRegular',
    fontSize: 20
  }
})