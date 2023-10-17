import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Exercise = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.heroText}>Let's find a Exercise</Text>

    <View style={styles.searchBar}>
      <Text style={styles.searchBarText}>
        Search for a Exercise
      </Text>
    </View>

    <ScrollView style={styles.ExerciseCardSection}>

      <View style={styles.ExerciseCard}>
          <View style={styles.ExerciseDetails}>
            <View style={styles.ExerciseImage}>

            </View>
            <View style={styles.DetailSection}>
              <Text style={styles.ExerciseName}>Childs Pose</Text>
              <Text style={styles.Proffesion}>10-20 min</Text>
              <Text style={styles.Location}>Back pain</Text>
            </View>
            
          </View>

          <View style={styles.BottomSection}>
          <Text>10-20 min</Text>
          <View style={styles.GetInTouch}>
            <Text style={styles.GetInTouchText}>Get In Touch</Text>
          </View>
          </View>
          
      </View>

      

    </ScrollView>

  </View>
  )
}

export default Exercise

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: 'center', // Center horizontally
        padding: 25
      },
      heroText: {
        fontSize: 20
      },
      searchBar: {
        width: 350,
        height: 40,
        backgroundColor: '#F5F6FA',
        marginTop: 20,
        borderRadius: 5,
        justifyContent: "center",
        paddingLeft: 10
      },
      searchBarText: {
        color: "black",
        fontSize: 15
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
        // backgroundColor: "red",
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
        fontWeight: "bold",
        marginBottom: 15
      },
      Proffesion: {
        fontSize: 12.5,
        marginBottom: 2.5
      },
      Location: {
        fontSize: 12.5
      },
      BottomSection: {
       flexDirection: "row",
       marginTop: 25,
       alignItems: "center"
      },
      GetInTouch: {
        width: 150,
        height: 40, 
        backgroundColor: "#8B80F8",
        marginLeft: 80,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
      },
      GetInTouchText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        
      }
    
})