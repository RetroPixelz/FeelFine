import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Doctors = ({navigation}) => (
  <View style={styles.container}>
    <Text style={styles.heroText}>Let's find a doctor</Text>

    <View style={styles.searchBar}>
      <Text style={styles.searchBarText}>
        Search for a doctor
      </Text>
    </View>

    <ScrollView style={styles.DoctorCardSection}>

      <View style={styles.DoctorCard}>
          <View style={styles.DoctorDetails}>
            <View style={styles.DoctorImage}>

            </View>
            <View style={styles.DetailSection}>
              <Text style={styles.DoctorName}>Dr.Lincoln</Text>
              <Text style={styles.Proffesion}>Psychiatrist</Text>
              <Text style={styles.Location}>Menlyn Main</Text>
            </View>
            
          </View>

          <View style={styles.BottomSection}>
          <Text>0528332005</Text>
          <View style={styles.GetInTouch}>
            <Text style={styles.GetInTouchText}>Get In Touch</Text>
          </View>
          </View>
          
      </View>

      <View style={styles.DoctorCard}>
          <View style={styles.DoctorDetails}>
            <View style={styles.DoctorImage}>

            </View>
            <View style={styles.DetailSection}>
              <Text style={styles.DoctorName}>Dr.Lincoln</Text>
              <Text style={styles.Proffesion}>Psychiatrist</Text>
              <Text style={styles.Location}>Menlyn Main</Text>
            </View>
            
          </View>

          <View style={styles.BottomSection}>
          <Text>0528332005</Text>
          <View style={styles.GetInTouch}>
            <Text style={styles.GetInTouchText}>Get In Touch</Text>
          </View>
          </View>
          
      </View>

      <View style={styles.DoctorCard}>
          <View style={styles.DoctorDetails}>
            <View style={styles.DoctorImage}>

            </View>
            <View style={styles.DetailSection}>
              <Text style={styles.DoctorName}>Dr.Lincoln</Text>
              <Text style={styles.Proffesion}>Psychiatrist</Text>
              <Text style={styles.Location}>Menlyn Main</Text>
            </View>
            
          </View>

          <View style={styles.BottomSection}>
          <Text>0528332005</Text>
          <View style={styles.GetInTouch}>
            <Text style={styles.GetInTouchText}>Get In Touch</Text>
          </View>
          </View>
          
      </View>

    </ScrollView>

  </View>
)

export default Doctors

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
  DoctorCardSection: {
    marginTop: 30,
    width: 360
  },
  DoctorCard: {
    width: 350,
    height: 200,
    backgroundColor: '#F5F6FA',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15
  },
  DoctorDetails: {
    width: 325,
    height: 100,
    // backgroundColor: "red",
    flexDirection: "row"
  },
  DoctorImage: {
    width: 100,
    height: 100,
    backgroundColor: "gray",
    borderRadius: 5,
    marginRight: 20
  },
  DetailSection: {
    flexDirection: "column"
  },
  DoctorName: {
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