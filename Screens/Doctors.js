import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Doctors = ({ navigation }) => {
  const allDoctors = [
    { name: 'Dr. C de Bloq', Proffesion: 'General Practitioner', Location: 'Menlyn Main' },
    { name: 'Dr. M Steele', Proffesion: 'Clinical Psychologist', Location: 'Menlyn Main' },
    { name: 'Dr. M Viljoen', Proffesion: 'Clinical Psychologist', Location: 'Menlyn Main' },
    { name: 'Ashley Chetty', Proffesion: 'Clinical Psychologist', Location: 'Menlyn Main' },
    { name: 'Laura Pakendorf', Proffesion: 'Occupational Therapist',  Location: 'Midstream' },

  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(allDoctors);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = allDoctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(text.toLowerCase()) ||
      doctor.Proffesion.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heroText}>Let's find a doctor</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for a doctor"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <ScrollView style={styles.DoctorCardSection}>
        {filteredDoctors.map((doctor, index) => (
          <View style={styles.DoctorCard} key={index}>
            <View style={styles.DoctorDetails}>
              <View style={styles.DoctorImage}>
                {/* images */}
              </View>
              <View style={styles.DetailSection}>
                <Text style={styles.DoctorName}>{doctor.name}</Text>
                <Text style={styles.Proffesion}>{doctor.Proffesion}</Text>
                <Text style={styles.Location}>{doctor.Location}</Text>
              </View>
            </View>
            <View style={styles.BottomSection}>
              <Text style={styles.contact}>{doctor.contact}</Text>
              <TouchableOpacity style={styles.GetInTouch}>
                <Text style={styles.GetInTouchText}>Get In Touch</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Doctors

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: 'center',
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
    marginLeft: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  GetInTouchText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  contact: {
    width: 150,
  }
})